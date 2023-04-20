import "@stdlib/deploy";
import "@stdlib/ownable";
import "./types.tact";
import "./safe.tact";

struct SafeDeployParams {
    deploy: Int as coins;
    devFee: Int as coins;
}

contract SafeDeployerContract with OwnableTransferable, Deployable {
    override const storageReserve: Int = ton("0.1");

    owner: Address;
    devFee: Int as coins;
    deployValue: Int as coins;
    counter: Int as uint64; // Big enought

    init(owner: Address, devFee: Int, deployValue: Int) {
        self.owner = owner;
        self.devFee = devFee;
        self.deployValue = deployValue;
        self.counter = 0;
    }

    get fun params(): SafeDeployParams {
        return SafeDeployParams{deploy: self.deployValue, devFee: self.devFee};
    }

    receive("Deploy new Safe") {

        // Check if the value is enough
        let ctx: Context = context();
        require(ctx.value >= self.devFee + self.deployValue, "Not enough value to deploy a Safe");

        // Allocate counter
        let counter: Int = self.counter;
        self.counter = self.counter + 1;

        // Deploy Safe
        let init: StateInit = initOf SafeContract(ctx.sender, counter);
        let safeAddress: Address = contractAddress(init);
        send(SendParameters{
            to: safeAddress,
            value: self.deployValue,
            code: init.code,
            data: init.data,
            body: SafeDeployment{
                remaining: self.owner
            }.toCell()
        });

        // Emit event
        emit(EventSafeDeployed{
            by: ctx.sender,
            address: safeAddress
        }.toCell());

        // Send fee to owner
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }
}