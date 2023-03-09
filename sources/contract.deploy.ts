import { Address, beginCell, contractAddress, toNano } from "ton";
import { SafeDeployer, storeDeploy } from "./output/safe_SafeDeployer";
import { deploy } from "./utils/deploy";
import { printAddress, printHeader } from "./utils/print";

(async () => {

    // Parameters
    let owner = Address.parse('some-owner'); // Replace owner with your address
    let packed = beginCell().store(storeDeploy({ $$type: 'Deploy', queryId: 0n })).endCell(); // Replace if you want another message used
    let init = await SafeDeployer.init(owner, toNano('1'), toNano('1'));
    let address = contractAddress(0, init);
    let deployAmount = toNano(10);
    let testnet = true;

    // Print basics
    printHeader('SampleTactContract');
    printAddress(address);
    // printDeploy(init, deployAmount, packed, testnet);

    // Do deploy
    await deploy(init, deployAmount, packed, testnet);
})();