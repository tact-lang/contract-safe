import "@stdlib/deploy";
import "./operations.tact";
import "./signer.tact";

const DEFAULT_REQUEST_PRICE: Int = ton("1");
const DEFAULT_TIMEOUT: Int = 60 * 60 * 24; // 24 hours

message SafeDeployment {
    remaining: Address;
}

message SafeRequestOperation {
    operation: SafeOperation;
}

contract Safe with Deployable {
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
            requestPrice: DEFAULT_REQUEST_PRICE
        };
    }

    receive(deploy: SafeDeployment) {
        send(SendParameters{
            to: deploy.remaining,
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(request: SafeRequestOperation) {
        
        // Check sender
        let ctx: Context = context();
        require(self.owners.get(ctx.sender) == true, "Not a member");
        require(ctx.value >= self.parameters.requestPrice, "Not enough value");

        // Check operation
        let notNullOperations: Int = 0;
        if (request.operation.transfer != null) {
            notNullOperations = notNullOperations + 1;
        }
        if (request.operation.parameters != null) {
            notNullOperations = notNullOperations + 1;
        }
        require(notNullOperations != 1, "Exactly one operation must be specified");

        // Check timeout
    }

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