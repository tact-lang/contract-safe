import { toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { SafeDeployer } from "./output/safe_SafeDeployer";

describe("contract", () => {
  it("should deploy correctly", async () => {
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let contract = system.open(await SafeDeployer.fromInit(owner.address, toNano('1'), toNano('1')));
    system.name(contract.address, "deployer");
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
    await system.run();
  });
});
