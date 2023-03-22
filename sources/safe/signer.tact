import "@stdlib/deploy";
import "./operations.tact";

message OperationsSigned {
    args: SignerArgs;
}

struct SignerArgs {
    safe: Address;
    owners: map<Address, Bool>;
    ownersCount: Int as uint32;
    treshold: Int as uint32;
    timeout: Int as uint64;
    ops: SafeOperations;
}

message SignerDeploy {
    queryId: Int as uint64;
}

contract Signer {
    owners: map<Address, Bool>;
    args: SignerArgs;
    weight: Int as uint32;
    completed: Bool;
    
    init(args: SignerArgs) {

        // Only safe could deploy this contract
        require(sender() == args.safe, "Sender is not safe");

        // Init struct
        self.args = args;
        self.owners = args.owners;
        self.weight = 0;
        self.completed = false;
    }

    receive(src: SignerDeploy) {
        // Nothing to do
    }

    receive("YES") {

        // Checks
        let sender: Address = sender();
        require(now() <= self.args.timeout, "Timeout");
        require(!self.completed, "Completed");
        require(self.owners.get(sender) == true, "Already signed or not an owner");

        // Preform vote
        self.owners.set(sender, null);
        self.weight = self.weight + 1;

        // Cashback
        send(SendParameters{
            value: 0, 
            to: sender, 
            mode: SendIgnoreErrors + SendRemainingValue,
            bounce: false, 
            body: "Vote YES accepted".asComment()
        });

        // Complete if treshold reached
        if (self.weight >= self.args.treshold) {
            self.completed = true;

            // Emit event
            emit("Voting ended with success".asComment());

            // Send result
            send(SendParameters{
                value: 0, 
                to: self.args.safe, 
                mode: SendRemainingBalance + SendIgnoreErrors, 
                bounce: false, 
                body: OperationsSigned{ args: self.args }.toCell()
            });
        }
    }

    get fun args(): SignerArgs {
        return self.args;
    }

    get fun completed(): Bool {
        return self.completed;
    }

    get fun weight(): Int {
        return self.weight;
    }

    get fun remaining(): map<Address, Bool> {
        return self.owners;
    }
}