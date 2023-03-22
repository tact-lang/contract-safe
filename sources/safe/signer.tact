import "./operations.tact";

message OperationSigned {
    operation: SafeOperation;
}

contract Signer {
    safe: Address;
    treshold: Int;
    weight: Int;
    timeout: Int;
    signers: map<Address, Bool>;
    operation: SafeOperation;
    completed: Bool;
    
    init(safe: Address, signers: map<Address, Bool>, treshold: Int, timeout: Int, operation: SafeOperation) {

        // Only safe could deploy this contract
        require(sender() == safe, "Sender is not safe");

        // Init struct
        self.safe = safe;
        self.treshold = treshold;
        self.weight = 0;
        self.signers = signers;
        self.operation = operation;
        self.timeout = timeout;
        self.completed = false;
    }

    receive("YES") {

        // Checks
        require(self.timeout > now(), "Timeout");
        require(!self.completed, "Completed");

        // Load weitght
        let sender: Address = sender();
        let weight: Bool = self.signers.get(sender)!!;
        self.signers.set(sender, null);

        // Update weight
        self.weight = self.weight + 1;
        if (self.weight >= self.treshold) {
            self.completed = true;
            send(SendParameters{
                value: 0, 
                to: self.safe, 
                mode: SendRemainingBalance + SendIgnoreErrors, 
                bounce: false, 
                body: OperationSigned{ operation: self.operation }.toCell()
            });
        }
    }

    get fun operation(): SafeOperation {
        return self.operation;
    }
}