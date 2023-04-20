import "@stdlib/deploy";
import "./types.tact";

message VoteSuccess {
    args: VoteArgs;
}

message VoteFailure {
    args: VoteArgs;
}

struct VoteArgs {
    safe: Address;
    owners: map<Address, Bool>;
    ownersCount: Int as uint32;
    treshold: Int as uint32;
    timeout: Int as uint64;
    ops: SafeOperations;
}

message VoteDeploy {
    queryId: Int as uint64;
}

contract VoteContract {
    override const storageReserve: Int = ton("0.1");
    owners: map<Address, Bool>;
    args: VoteArgs;
    votedYes: Int as uint32;
    votedNo: Int as uint32;
    completed: Bool;
    
    init(args: VoteArgs) {

        // Only safe could deploy this contract
        require(sender() == args.safe, "Sender is not safe");

        // Init struct
        self.args = args;
        self.owners = args.owners;
        self.votedYes = 0;
        self.votedNo = 0;
        self.completed = false;
    }

    receive(src: VoteDeploy) {
        // Nothing to do
    }

    receive("YES") {
        let sender: Address = sender();
        self.doVote(sender, true);
    }

    receive("NO") {
        let sender: Address = sender();
        self.doVote(sender, false);
    }

    receive("Recover") {

        // Checks
        let sender: Address = sender();
        require(self.args.timeout < now(), "Not timeouted");
        require(!self.completed, "Completed");

        // Complete vote
        self.completed = true;

        // Send cashback
        self.notify("Recovery completed".asComment());

        // Emit event
        emit(EventVoteCompleted{ success: false }.toCell());

        // Send result
        send(SendParameters{
            value: 0, 
            to: self.args.safe, 
            mode: SendRemainingBalance + SendIgnoreErrors, 
            bounce: false, 
            body: VoteFailure{ args: self.args }.toCell()
        });
    }

    external("Timeout") {

        // Checks
        require(self.args.timeout < now(), "Not timeouted");
        require(!self.completed, "Completed");
        acceptMessage();

        // Complete vote
        self.completed = true;

        // Emit event
        emit(EventVoteCompleted{ success: false }.toCell());

        // Send result
        send(SendParameters{
            value: 0, 
            to: self.args.safe, 
            mode: SendRemainingBalance + SendIgnoreErrors, 
            bounce: false, 
            body: VoteFailure{ args: self.args }.toCell()
        });
    }

    fun doVote(address: Address, yes: Bool) {

        // Checks
        require(now() <= self.args.timeout, "Timeout");
        require(!self.completed, "Completed");
        require(self.owners.get(address) == true, "Already signed or not an owner");

        // Preform vote
        self.owners.set(address, null);
        if (yes) {
            self.votedYes = self.votedYes + 1;
        } else {
            self.votedNo = self.votedNo + 1;
        }
        emit(EventVote{ yes: yes, address: address }.toCell());

        // Cashback
        self.notify("Vote accepted".asComment());

        // Complete if treshold reached
        if (self.votedYes >= self.args.treshold) {
            self.completed = true;

            // Emit event
            emit(EventVoteCompleted{ success: true }.toCell());

            // Send result
            send(SendParameters{
                value: 0, 
                to: self.args.safe, 
                mode: SendRemainingBalance + SendIgnoreErrors, 
                bounce: false, 
                body: VoteSuccess{ args: self.args }.toCell()
            });
        }

        // Abort if negative treshold reached
        if (self.votedNo > (self.args.ownersCount - self.args.treshold)) {
            self.completed = true;

            // Emit event
            emit(EventVoteCompleted{ success: false }.toCell());

            // Send result
            send(SendParameters{
                value: 0, 
                to: self.args.safe, 
                mode: SendRemainingBalance + SendIgnoreErrors, 
                bounce: false, 
                body: VoteFailure{ args: self.args }.toCell()
            });
        }
    }

    get fun args(): VoteArgs {
        return self.args;
    }

    get fun completed(): Bool {
        return self.completed;
    }

    get fun votedYes(): Int {
        return self.votedYes;
    }

    get fun votedNo(): Int {
        return self.votedNo;
    }

    get fun remaining(): map<Address, Bool> {
        return self.owners;
    }
}