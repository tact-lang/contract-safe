import "@stdlib/deploy";
import "@stdlib/ownable";
import "./safe/safe.tact";

contract SafeDeployer with OwnableTransferable, Deployable {

    owner: Address;
    fee: Int as coins;
    deployValue: Int as coins;
    counter: Int as uint64; // Big enought

    init(owner: Address, fee: Int, deployValue: Int) {
        self.owner = owner;
        self.fee = fee;
        self.deployValue = deployValue;
        self.counter = 0;
    }

    receive("Deploy new Safe") {

        // Check if the value is enough
        let ctx: Context = context();
        require(ctx.value >= self.fee + self.deployValue, "Not enough value to deploy a Safe");

        // Allocate counter
        let counter: Int = self.counter;
        self.counter = self.counter + 1;

        // Deploy Safe
        let init: StateInit = initOf Safe(ctx.sender, counter);
        let safeAddress: Address = contractAddress(init);
        send(SendParameters{
            to: safeAddress,
            value: self.deployValue,
            body: SafeDeployment{
                remaining: self.owner
            }.toCell()
        });

        // Send fee to owner
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }
}