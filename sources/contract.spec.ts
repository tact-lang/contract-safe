import { Address, Dictionary, toNano } from "ton";
import { ContractSystem, Verbosity } from "@tact-lang/emulator";
import { SafeDeployerContract } from "./output/safe_SafeDeployerContract";
import { SafeContract, SafeOperation } from "./output/safe_SafeContract";
import { VoteContract, VoteArgs } from "./output/safe_VoteContract";
import { beginCoverage, completeCoverage } from "@tact-lang/coverage";

describe("contract", () => {

  // beforeAll(() => {
  //   beginCoverage();
  // });

  // afterAll(() => {
  //   completeCoverage(__dirname + '/output/*.boc');
  // });

  it("should deploy correctly", async () => {
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let contract = system.open(await SafeDeployerContract.fromInit(owner.address, toNano('1'), toNano('1')));
    let tracker = system.track(contract);
    let logs = system.log(contract);
    system.verbosity(contract, Verbosity.DEBUG);
    system.name(contract, "deployer");

    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
    await system.run();
    expect(tracker.collect()).toMatchSnapshot();

    // console.warn(logs.collect());
  });

  it('should create request', async () => {
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let contract = system.open(await SafeContract.fromInit(owner.address, 0n));
    system.name(contract, 'safe');
    let tracker = system.track(contract);

    // Deploy
    await contract.send(owner, { value: toNano(1) }, { $$type: 'SafeDeployment', remaining: owner.address });
    await system.run();
    expect(tracker.collect()).toMatchSnapshot();

    // Create request
    let operations = Dictionary.empty<number, SafeOperation>();
    await contract.send(owner, { value: toNano(1) }, {
      $$type: 'SafeRequestOperation',
      ops: {
        $$type: 'SafeOperations',
        ops: operations,
        count: BigInt(operations.size)
      }
    });
    await system.run();
    expect(tracker.collect()).toMatchSnapshot();
  });

  it('should create vote', async () => {

    // Create system
    let now = 1000;
    let system = await ContractSystem.create({ now });
    let safe = system.treasure('safe');
    let owner1 = system.treasure("owner1");
    let owner2 = system.treasure("owner2");
    let unknown = system.treasure("unknown");

    // Deploy signer
    let args: VoteArgs = {
      $$type: 'VoteArgs',
      safe: safe.address,
      owners: Dictionary.empty<Address, boolean>()
        .set(owner1.address, true)
        .set(owner2.address, true),
      ownersCount: 2n,
      treshold: 2n,
      timeout: BigInt(now + 10000),
      ops: {
        $$type: 'SafeOperations',
        ops: Dictionary.empty<number, SafeOperation>(),
        count: 0n
      }
    };
    let contract = system.open(await VoteContract.fromInit(args));
    let tracker = system.track(contract);
    system.name(contract, 'signer');
    await contract.send(safe, { value: toNano(1) }, { $$type: 'VoteDeploy', queryId: 0n });
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('deploy');

    // Vote
    await contract.send(owner1, { value: toNano(1) }, 'YES');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('vote');

    // Double Vote
    await contract.send(owner1, { value: toNano(1) }, 'YES');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('double vote');

    // Invalid Voter
    await contract.send(unknown, { value: toNano(1) }, 'YES');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('invalid vote');

    // Final Vote
    await contract.send(owner2, { value: toNano(1) }, 'YES');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('vote');
  });

  it('should fail vote', async () => {

    // Create system
    let now = 1000;
    let system = await ContractSystem.create({ now });
    let safe = system.treasure('safe');
    let owner1 = system.treasure("owner1");
    let owner2 = system.treasure("owner2");
    let owner3 = system.treasure("owner3");
    let unknown = system.treasure("unknown");

    // Deploy signer
    let args: VoteArgs = {
      $$type: 'VoteArgs',
      safe: safe.address,
      owners: Dictionary.empty<Address, boolean>()
        .set(owner1.address, true)
        .set(owner2.address, true),
      ownersCount: 3n,
      treshold: 2n,
      timeout: BigInt(now + 10000),
      ops: {
        $$type: 'SafeOperations',
        ops: Dictionary.empty<number, SafeOperation>(),
        count: 0n
      }
    };
    let contract = system.open(await VoteContract.fromInit(args));
    let tracker = system.track(contract);
    system.name(contract, 'signer');
    await contract.send(safe, { value: toNano(1) }, { $$type: 'VoteDeploy', queryId: 0n });
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('deploy');

    // Vote
    await contract.send(owner1, { value: toNano(1) }, 'NO');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('vote');

    // Double Vote
    await contract.send(owner1, { value: toNano(1) }, 'NO');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('double vote');

    // Invalid Voter
    await contract.send(unknown, { value: toNano(1) }, 'NO');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('invalid vote');

    // Final Vote
    await contract.send(owner2, { value: toNano(1) }, 'NO');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('vote');

    // Vote after  ending
    await contract.send(owner3, { value: toNano(1) }, 'NO');
    await system.run();
    expect(tracker.collect()).toMatchSnapshot('after completed');
  });
});
