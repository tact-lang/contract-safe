import "@stdlib/deploy";
import "./types.tact";
import "./vote.tact";

const DEFAULT_REQUEST_PRICE: Int = ton("1");
const DEFAULT_TIMEOUT: Int = 60 * 60 * 24; // 24 hours
const DEFAULT_TIMELOCK: Int = 0; // No timelock

message SafeDeployment {
    remaining: Address;
}

message SafeRequestOperation {
    ops: SafeOperations;
}

contract SafeContract with Deployable {
    seqno: Int as uint64; // Impossible to overflow
    owners: map<Address, Bool>;
    ownersCount: Int;
    treshold: Int;
    parameters: SafeParameters;

    init(owner: Address, id: Int /* unused */) {
        self.seqno = 0;
        self.owners = emptyMap();
        self.owners.set(owner, true);
        self.ownersCount = 1;
        self.treshold = 1;
        self.parameters = SafeParameters{
            timeout: DEFAULT_TIMEOUT,
            requestPrice: DEFAULT_REQUEST_PRICE,
            timelock: DEFAULT_TIMELOCK
        };
    }

    receive(deploy: SafeDeployment) {
        send(SendParameters{
            to: deploy.remaining,
            value: 0,
            mode: SendRemainingValue
        });
    }

    //
    // Request
    //

    receive(request: SafeRequestOperation) {
        
        // Check sender
        let ctx: Context = context();
        require(self.owners.get(ctx.sender) == true, "Not a member");
        require(ctx.value >= self.parameters.requestPrice, "Not enough value");

        // Check operation
        let i: Int = 0;
        repeat(request.ops.count) {

            // Load operation
            let op: SafeOperation = request.ops.ops.get(i)!!;

            // Check operation
            let notNullOperations: Int = 0;
            if (op.transfer != null) {
                notNullOperations = notNullOperations + 1;
            }
            if (op.parameters != null) {
                let params: SafeParameters = (op.parameters!!).parameters;
                require(params.requestPrice <= ton("10"), "Request price must be less or equals than 10 TON");
                require(params.requestPrice >= ton("1"), "Request price must be more or equals than 1 TON");
                require(params.timeout <= 60 * 60 * 24 * 365, "Timeout must be less than a year");
                require(params.timeout >= 60 * 60, "Timeout must be more than an hour");
                notNullOperations = notNullOperations + 1;
            }
            require(notNullOperations != 1, "Exactly one operation must be specified");

            // Next
            i = i + 1;
        }

        // Send request
        let args: VoteArgs = VoteArgs{
            safe: myAddress(),
            owners: self.owners,
            ownersCount: self.ownersCount,
            treshold: self.treshold,
            timeout: now() + self.parameters.timeout,
            ops: request.ops
        };
        let init: StateInit = initOf VoteContract(args);
        let address: Address = contractAddress(init);
        send(SendParameters{
            value: 0, 
            to: address, 
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            code: init.code,
            data: init.data,
            body: VoteDeploy{queryId:0}.toCell()
        });
    }

    //
    // Response
    //

    receive(aborted: VoteFailure) {
        // Do nothing
    }

    receive(signed: VoteSuccess) {

        // Check the message
        let args: VoteArgs = signed.args;
        let ctx: Context = context();
        require(args.safe == myAddress(), "Wrong safe address");
        require(args.owners == self.owners, "Wrong owners");
        require(args.ownersCount == self.ownersCount, "Wrong owners count");
        require(args.treshold == self.treshold, "Wrong treshold");
        require(now() <= args.timeout, "Timeout");
        let init: StateInit = initOf VoteContract(args);
        let address: Address = contractAddress(init);
        require(ctx.sender == address, "Wrong signer address");

        // Execute operations
        let i: Int = 0;
        repeat(args.ops.count) {

            // Load operation
            let op: SafeOperation = args.ops.ops.get(i)!!;

            // Execute operation
            self.execute(op);

            // Next
            i = i + 1;
        }
    }

    //
    // Execution
    //

    fun execute(op: SafeOperation) {
        if (op.transfer != null) {
            self.executeTransfer(op.transfer!!);
        }
        if (op.parameters != null) {
            self.executeParameters(op.parameters!!);
        }
    }

    fun executeTransfer(op: SafeOperationTransfer) {
        send(SendParameters{
            value: op.value, 
            to: op.to, 
            mode: op.mode, 
            bounce: op.bounce,
            body: op.body
        });
    }

    fun executeParameters(op: SafeOperationUpdateParameters) {
        self.parameters = op.parameters;
    }

    //
    // Get Methods
    //

    get fun parameters(): SafeParameters {
        return self.parameters;
    }

    get fun treshold(): Int {
        return self.treshold;
    }

    get fun seqno(): Int {
        return self.seqno;
    }

    get fun isOwner(address: Address): Bool {
        return self.owners.get(address) == true;
    }

    get fun owners(): map<Address, Bool> {
        return self.owners;
    }
}