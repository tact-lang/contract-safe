import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type SafeDeployParams = {
    $$type: 'SafeDeployParams';
    deploy: bigint;
    devFee: bigint;
}

export function storeSafeDeployParams(src: SafeDeployParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.deploy);
        b_0.storeCoins(src.devFee);
    };
}

export function loadSafeDeployParams(slice: Slice) {
    let sc_0 = slice;
    let _deploy = sc_0.loadCoins();
    let _devFee = sc_0.loadCoins();
    return { $$type: 'SafeDeployParams' as const, deploy: _deploy, devFee: _devFee };
}

function loadTupleSafeDeployParams(source: TupleReader) {
    let _deploy = source.readBigNumber();
    let _devFee = source.readBigNumber();
    return { $$type: 'SafeDeployParams' as const, deploy: _deploy, devFee: _devFee };
}

function storeTupleSafeDeployParams(source: SafeDeployParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.deploy);
    builder.writeNumber(source.devFee);
    return builder.build();
}

function dictValueParserSafeDeployParams(): DictionaryValue<SafeDeployParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeDeployParams(src)).endCell());
        },
        parse: (src) => {
            return loadSafeDeployParams(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type SafeParameters = {
    $$type: 'SafeParameters';
    timeout: bigint;
    requestPrice: bigint;
}

export function storeSafeParameters(src: SafeParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.timeout, 32);
        b_0.storeCoins(src.requestPrice);
    };
}

export function loadSafeParameters(slice: Slice) {
    let sc_0 = slice;
    let _timeout = sc_0.loadUintBig(32);
    let _requestPrice = sc_0.loadCoins();
    return { $$type: 'SafeParameters' as const, timeout: _timeout, requestPrice: _requestPrice };
}

function loadTupleSafeParameters(source: TupleReader) {
    let _timeout = source.readBigNumber();
    let _requestPrice = source.readBigNumber();
    return { $$type: 'SafeParameters' as const, timeout: _timeout, requestPrice: _requestPrice };
}

function storeTupleSafeParameters(source: SafeParameters) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.timeout);
    builder.writeNumber(source.requestPrice);
    return builder.build();
}

function dictValueParserSafeParameters(): DictionaryValue<SafeParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSafeParameters(src.loadRef().beginParse());
        }
    }
}

export type SafeOperations = {
    $$type: 'SafeOperations';
    ops: Dictionary<bigint, SafeOperation>;
    count: bigint;
}

export function storeSafeOperations(src: SafeOperations) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.ops, Dictionary.Keys.BigInt(257), dictValueParserSafeOperation());
        b_0.storeUint(src.count, 8);
    };
}

export function loadSafeOperations(slice: Slice) {
    let sc_0 = slice;
    let _ops = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSafeOperation(), sc_0);
    let _count = sc_0.loadUintBig(8);
    return { $$type: 'SafeOperations' as const, ops: _ops, count: _count };
}

function loadTupleSafeOperations(source: TupleReader) {
    let _ops = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSafeOperation(), source.readCellOpt());
    let _count = source.readBigNumber();
    return { $$type: 'SafeOperations' as const, ops: _ops, count: _count };
}

function storeTupleSafeOperations(source: SafeOperations) {
    let builder = new TupleBuilder();
    builder.writeCell(source.ops.size > 0 ? beginCell().storeDictDirect(source.ops, Dictionary.Keys.BigInt(257), dictValueParserSafeOperation()).endCell() : null);
    builder.writeNumber(source.count);
    return builder.build();
}

function dictValueParserSafeOperations(): DictionaryValue<SafeOperations> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeOperations(src)).endCell());
        },
        parse: (src) => {
            return loadSafeOperations(src.loadRef().beginParse());
        }
    }
}

export type SafeOperation = {
    $$type: 'SafeOperation';
    transfer: SafeOperationTransfer | null;
    parameters: SafeOperationUpdateParameters | null;
}

export function storeSafeOperation(src: SafeOperation) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.transfer !== null && src.transfer !== undefined) { b_0.storeBit(true); b_0.store(storeSafeOperationTransfer(src.transfer)); } else { b_0.storeBit(false); }
        if (src.parameters !== null && src.parameters !== undefined) { b_0.storeBit(true); b_0.store(storeSafeOperationUpdateParameters(src.parameters)); } else { b_0.storeBit(false); }
    };
}

export function loadSafeOperation(slice: Slice) {
    let sc_0 = slice;
    let _transfer = sc_0.loadBit() ? loadSafeOperationTransfer(sc_0) : null;
    let _parameters = sc_0.loadBit() ? loadSafeOperationUpdateParameters(sc_0) : null;
    return { $$type: 'SafeOperation' as const, transfer: _transfer, parameters: _parameters };
}

function loadTupleSafeOperation(source: TupleReader) {
    const _transfer_p = source.readTupleOpt();
    const _transfer = _transfer_p ? loadTupleSafeOperationTransfer(_transfer_p) : null;
    const _parameters_p = source.readTupleOpt();
    const _parameters = _parameters_p ? loadTupleSafeOperationUpdateParameters(_parameters_p) : null;
    return { $$type: 'SafeOperation' as const, transfer: _transfer, parameters: _parameters };
}

function storeTupleSafeOperation(source: SafeOperation) {
    let builder = new TupleBuilder();
    if (source.transfer !== null && source.transfer !== undefined) {
        builder.writeTuple(storeTupleSafeOperationTransfer(source.transfer));
    } else {
        builder.writeTuple(null);
    }
    if (source.parameters !== null && source.parameters !== undefined) {
        builder.writeTuple(storeTupleSafeOperationUpdateParameters(source.parameters));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserSafeOperation(): DictionaryValue<SafeOperation> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeOperation(src)).endCell());
        },
        parse: (src) => {
            return loadSafeOperation(src.loadRef().beginParse());
        }
    }
}

export type SafeOperationTransfer = {
    $$type: 'SafeOperationTransfer';
    to: Address;
    value: bigint;
    mode: bigint;
    bounce: boolean;
    body: Cell | null;
}

export function storeSafeOperationTransfer(src: SafeOperationTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        b_0.storeUint(src.mode, 8);
        b_0.storeBit(src.bounce);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
    };
}

export function loadSafeOperationTransfer(slice: Slice) {
    let sc_0 = slice;
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    let _mode = sc_0.loadUintBig(8);
    let _bounce = sc_0.loadBit();
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SafeOperationTransfer' as const, to: _to, value: _value, mode: _mode, bounce: _bounce, body: _body };
}

function loadTupleSafeOperationTransfer(source: TupleReader) {
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _bounce = source.readBoolean();
    let _body = source.readCellOpt();
    return { $$type: 'SafeOperationTransfer' as const, to: _to, value: _value, mode: _mode, bounce: _bounce, body: _body };
}

function storeTupleSafeOperationTransfer(source: SafeOperationTransfer) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeBoolean(source.bounce);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserSafeOperationTransfer(): DictionaryValue<SafeOperationTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeOperationTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadSafeOperationTransfer(src.loadRef().beginParse());
        }
    }
}

export type SafeOperationUpdateParameters = {
    $$type: 'SafeOperationUpdateParameters';
    parameters: SafeParameters;
}

export function storeSafeOperationUpdateParameters(src: SafeOperationUpdateParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeSafeParameters(src.parameters));
    };
}

export function loadSafeOperationUpdateParameters(slice: Slice) {
    let sc_0 = slice;
    let _parameters = loadSafeParameters(sc_0);
    return { $$type: 'SafeOperationUpdateParameters' as const, parameters: _parameters };
}

function loadTupleSafeOperationUpdateParameters(source: TupleReader) {
    const _parameters = loadTupleSafeParameters(source.readTuple());
    return { $$type: 'SafeOperationUpdateParameters' as const, parameters: _parameters };
}

function storeTupleSafeOperationUpdateParameters(source: SafeOperationUpdateParameters) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSafeParameters(source.parameters));
    return builder.build();
}

function dictValueParserSafeOperationUpdateParameters(): DictionaryValue<SafeOperationUpdateParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeOperationUpdateParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSafeOperationUpdateParameters(src.loadRef().beginParse());
        }
    }
}

export type EventSafeDeployed = {
    $$type: 'EventSafeDeployed';
    by: Address;
    address: Address;
}

export function storeEventSafeDeployed(src: EventSafeDeployed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1369732164, 32);
        b_0.storeAddress(src.by);
        b_0.storeAddress(src.address);
    };
}

export function loadEventSafeDeployed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1369732164) { throw Error('Invalid prefix'); }
    let _by = sc_0.loadAddress();
    let _address = sc_0.loadAddress();
    return { $$type: 'EventSafeDeployed' as const, by: _by, address: _address };
}

function loadTupleEventSafeDeployed(source: TupleReader) {
    let _by = source.readAddress();
    let _address = source.readAddress();
    return { $$type: 'EventSafeDeployed' as const, by: _by, address: _address };
}

function storeTupleEventSafeDeployed(source: EventSafeDeployed) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.by);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserEventSafeDeployed(): DictionaryValue<EventSafeDeployed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventSafeDeployed(src)).endCell());
        },
        parse: (src) => {
            return loadEventSafeDeployed(src.loadRef().beginParse());
        }
    }
}

export type EventVote = {
    $$type: 'EventVote';
    yes: boolean;
    address: Address;
}

export function storeEventVote(src: EventVote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2646988345, 32);
        b_0.storeBit(src.yes);
        b_0.storeAddress(src.address);
    };
}

export function loadEventVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2646988345) { throw Error('Invalid prefix'); }
    let _yes = sc_0.loadBit();
    let _address = sc_0.loadAddress();
    return { $$type: 'EventVote' as const, yes: _yes, address: _address };
}

function loadTupleEventVote(source: TupleReader) {
    let _yes = source.readBoolean();
    let _address = source.readAddress();
    return { $$type: 'EventVote' as const, yes: _yes, address: _address };
}

function storeTupleEventVote(source: EventVote) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.yes);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserEventVote(): DictionaryValue<EventVote> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventVote(src)).endCell());
        },
        parse: (src) => {
            return loadEventVote(src.loadRef().beginParse());
        }
    }
}

export type EventVoteCompleted = {
    $$type: 'EventVoteCompleted';
    success: boolean;
}

export function storeEventVoteCompleted(src: EventVoteCompleted) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3890299004, 32);
        b_0.storeBit(src.success);
    };
}

export function loadEventVoteCompleted(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3890299004) { throw Error('Invalid prefix'); }
    let _success = sc_0.loadBit();
    return { $$type: 'EventVoteCompleted' as const, success: _success };
}

function loadTupleEventVoteCompleted(source: TupleReader) {
    let _success = source.readBoolean();
    return { $$type: 'EventVoteCompleted' as const, success: _success };
}

function storeTupleEventVoteCompleted(source: EventVoteCompleted) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.success);
    return builder.build();
}

function dictValueParserEventVoteCompleted(): DictionaryValue<EventVoteCompleted> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventVoteCompleted(src)).endCell());
        },
        parse: (src) => {
            return loadEventVoteCompleted(src.loadRef().beginParse());
        }
    }
}

export type SafeDeployment = {
    $$type: 'SafeDeployment';
    remaining: Address;
}

export function storeSafeDeployment(src: SafeDeployment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1857061459, 32);
        b_0.storeAddress(src.remaining);
    };
}

export function loadSafeDeployment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1857061459) { throw Error('Invalid prefix'); }
    let _remaining = sc_0.loadAddress();
    return { $$type: 'SafeDeployment' as const, remaining: _remaining };
}

function loadTupleSafeDeployment(source: TupleReader) {
    let _remaining = source.readAddress();
    return { $$type: 'SafeDeployment' as const, remaining: _remaining };
}

function storeTupleSafeDeployment(source: SafeDeployment) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.remaining);
    return builder.build();
}

function dictValueParserSafeDeployment(): DictionaryValue<SafeDeployment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeDeployment(src)).endCell());
        },
        parse: (src) => {
            return loadSafeDeployment(src.loadRef().beginParse());
        }
    }
}

export type SafeRequestOperation = {
    $$type: 'SafeRequestOperation';
    ops: SafeOperations;
}

export function storeSafeRequestOperation(src: SafeRequestOperation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4286439532, 32);
        b_0.store(storeSafeOperations(src.ops));
    };
}

export function loadSafeRequestOperation(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4286439532) { throw Error('Invalid prefix'); }
    let _ops = loadSafeOperations(sc_0);
    return { $$type: 'SafeRequestOperation' as const, ops: _ops };
}

function loadTupleSafeRequestOperation(source: TupleReader) {
    const _ops = loadTupleSafeOperations(source.readTuple());
    return { $$type: 'SafeRequestOperation' as const, ops: _ops };
}

function storeTupleSafeRequestOperation(source: SafeRequestOperation) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSafeOperations(source.ops));
    return builder.build();
}

function dictValueParserSafeRequestOperation(): DictionaryValue<SafeRequestOperation> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeRequestOperation(src)).endCell());
        },
        parse: (src) => {
            return loadSafeRequestOperation(src.loadRef().beginParse());
        }
    }
}

export type VoteSuccess = {
    $$type: 'VoteSuccess';
    args: VoteArgs;
}

export function storeVoteSuccess(src: VoteSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3455329328, 32);
        b_0.store(storeVoteArgs(src.args));
    };
}

export function loadVoteSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3455329328) { throw Error('Invalid prefix'); }
    let _args = loadVoteArgs(sc_0);
    return { $$type: 'VoteSuccess' as const, args: _args };
}

function loadTupleVoteSuccess(source: TupleReader) {
    const _args = loadTupleVoteArgs(source.readTuple());
    return { $$type: 'VoteSuccess' as const, args: _args };
}

function storeTupleVoteSuccess(source: VoteSuccess) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleVoteArgs(source.args));
    return builder.build();
}

function dictValueParserVoteSuccess(): DictionaryValue<VoteSuccess> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVoteSuccess(src)).endCell());
        },
        parse: (src) => {
            return loadVoteSuccess(src.loadRef().beginParse());
        }
    }
}

export type VoteFailure = {
    $$type: 'VoteFailure';
    args: VoteArgs;
}

export function storeVoteFailure(src: VoteFailure) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2559963959, 32);
        b_0.store(storeVoteArgs(src.args));
    };
}

export function loadVoteFailure(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2559963959) { throw Error('Invalid prefix'); }
    let _args = loadVoteArgs(sc_0);
    return { $$type: 'VoteFailure' as const, args: _args };
}

function loadTupleVoteFailure(source: TupleReader) {
    const _args = loadTupleVoteArgs(source.readTuple());
    return { $$type: 'VoteFailure' as const, args: _args };
}

function storeTupleVoteFailure(source: VoteFailure) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleVoteArgs(source.args));
    return builder.build();
}

function dictValueParserVoteFailure(): DictionaryValue<VoteFailure> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVoteFailure(src)).endCell());
        },
        parse: (src) => {
            return loadVoteFailure(src.loadRef().beginParse());
        }
    }
}

export type VoteArgs = {
    $$type: 'VoteArgs';
    safe: Address;
    owners: Dictionary<Address, boolean>;
    ownersCount: bigint;
    treshold: bigint;
    timeout: bigint;
    ops: SafeOperations;
}

export function storeVoteArgs(src: VoteArgs) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.safe);
        b_0.storeDict(src.owners, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeUint(src.ownersCount, 32);
        b_0.storeUint(src.treshold, 32);
        b_0.storeUint(src.timeout, 64);
        b_0.store(storeSafeOperations(src.ops));
    };
}

export function loadVoteArgs(slice: Slice) {
    let sc_0 = slice;
    let _safe = sc_0.loadAddress();
    let _owners = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _ownersCount = sc_0.loadUintBig(32);
    let _treshold = sc_0.loadUintBig(32);
    let _timeout = sc_0.loadUintBig(64);
    let _ops = loadSafeOperations(sc_0);
    return { $$type: 'VoteArgs' as const, safe: _safe, owners: _owners, ownersCount: _ownersCount, treshold: _treshold, timeout: _timeout, ops: _ops };
}

function loadTupleVoteArgs(source: TupleReader) {
    let _safe = source.readAddress();
    let _owners = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _ownersCount = source.readBigNumber();
    let _treshold = source.readBigNumber();
    let _timeout = source.readBigNumber();
    const _ops = loadTupleSafeOperations(source.readTuple());
    return { $$type: 'VoteArgs' as const, safe: _safe, owners: _owners, ownersCount: _ownersCount, treshold: _treshold, timeout: _timeout, ops: _ops };
}

function storeTupleVoteArgs(source: VoteArgs) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.safe);
    builder.writeCell(source.owners.size > 0 ? beginCell().storeDictDirect(source.owners, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.ownersCount);
    builder.writeNumber(source.treshold);
    builder.writeNumber(source.timeout);
    builder.writeTuple(storeTupleSafeOperations(source.ops));
    return builder.build();
}

function dictValueParserVoteArgs(): DictionaryValue<VoteArgs> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVoteArgs(src)).endCell());
        },
        parse: (src) => {
            return loadVoteArgs(src.loadRef().beginParse());
        }
    }
}

export type VoteDeploy = {
    $$type: 'VoteDeploy';
    queryId: bigint;
}

export function storeVoteDeploy(src: VoteDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1444115989, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadVoteDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1444115989) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'VoteDeploy' as const, queryId: _queryId };
}

function loadTupleVoteDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'VoteDeploy' as const, queryId: _queryId };
}

function storeTupleVoteDeploy(source: VoteDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserVoteDeploy(): DictionaryValue<VoteDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVoteDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadVoteDeploy(src.loadRef().beginParse());
        }
    }
}

 type SafeContract_init_args = {
    $$type: 'SafeContract_init_args';
    owner: Address;
    id: bigint;
}

function initSafeContract_init_args(src: SafeContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.id, 257);
    };
}

async function SafeContract_init(owner: Address, id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSafeContract_init_args({ $$type: 'SafeContract_init_args', owner, id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SafeContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3094: { message: `Already signed or not an owner` },
    4755: { message: `Timeout` },
    5165: { message: `Not enough value` },
    7464: { message: `Request price must be less or equals than 10 TON` },
    8884: { message: `Wrong owners` },
    17702: { message: `Not timeouted` },
    25849: { message: `Not enough value to deploy a Safe` },
    31822: { message: `Timeout must be less than a year` },
    32453: { message: `Wrong safe address` },
    36682: { message: `Sender is not safe` },
    37479: { message: `Wrong treshold` },
    38009: { message: `Request price must be more or equals than 1 TON` },
    40810: { message: `Completed` },
    44757: { message: `Exactly one operation must be specified` },
    45379: { message: `Wrong signer address` },
    46307: { message: `Not a member` },
    62638: { message: `Wrong owners count` },
}

export class SafeContract implements Contract {
    
    static async init(owner: Address, id: bigint) {
        return await SafeContract_init(owner, id);
    }
    
    static async fromInit(owner: Address, id: bigint) {
        const init = await SafeContract_init(owner, id);
        const address = contractAddress(0, init);
        return new SafeContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SafeContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: SafeContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SafeDeployment | SafeRequestOperation | VoteFailure | VoteSuccess | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SafeDeployment') {
            body = beginCell().store(storeSafeDeployment(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SafeRequestOperation') {
            body = beginCell().store(storeSafeRequestOperation(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'VoteFailure') {
            body = beginCell().store(storeVoteFailure(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'VoteSuccess') {
            body = beginCell().store(storeVoteSuccess(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getParameters(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('parameters', builder.build())).stack;
        const result = loadTupleSafeParameters(source);
        return result;
    }
    
    async getTreshold(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('treshold', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getSeqno(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('seqno', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getIsOwner(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('isOwner', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwners(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owners', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
        return result;
    }
    
}