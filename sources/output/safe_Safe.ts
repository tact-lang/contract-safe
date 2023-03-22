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

export type OperationsSigned = {
    $$type: 'OperationsSigned';
    args: SignerArgs;
}

export function storeOperationsSigned(src: OperationsSigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1877523644, 32);
        b_0.store(storeSignerArgs(src.args));
    };
}

export function loadOperationsSigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1877523644) { throw Error('Invalid prefix'); }
    let _args = loadSignerArgs(sc_0);
    return { $$type: 'OperationsSigned' as const, args: _args };
}

function loadTupleOperationsSigned(source: TupleReader) {
    const _args = loadTupleSignerArgs(source.readTuple());
    return { $$type: 'OperationsSigned' as const, args: _args };
}

function storeTupleOperationsSigned(source: OperationsSigned) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSignerArgs(source.args));
    return builder.build();
}

function dictValueParserOperationsSigned(): DictionaryValue<OperationsSigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOperationsSigned(src)).endCell());
        },
        parse: (src) => {
            return loadOperationsSigned(src.loadRef().beginParse());
        }
    }
}

export type SignerArgs = {
    $$type: 'SignerArgs';
    safe: Address;
    owners: Dictionary<Address, boolean>;
    ownersCount: bigint;
    treshold: bigint;
    timeout: bigint;
    ops: SafeOperations;
}

export function storeSignerArgs(src: SignerArgs) {
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

export function loadSignerArgs(slice: Slice) {
    let sc_0 = slice;
    let _safe = sc_0.loadAddress();
    let _owners = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _ownersCount = sc_0.loadUintBig(32);
    let _treshold = sc_0.loadUintBig(32);
    let _timeout = sc_0.loadUintBig(64);
    let _ops = loadSafeOperations(sc_0);
    return { $$type: 'SignerArgs' as const, safe: _safe, owners: _owners, ownersCount: _ownersCount, treshold: _treshold, timeout: _timeout, ops: _ops };
}

function loadTupleSignerArgs(source: TupleReader) {
    let _safe = source.readAddress();
    let _owners = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _ownersCount = source.readBigNumber();
    let _treshold = source.readBigNumber();
    let _timeout = source.readBigNumber();
    const _ops = loadTupleSafeOperations(source.readTuple());
    return { $$type: 'SignerArgs' as const, safe: _safe, owners: _owners, ownersCount: _ownersCount, treshold: _treshold, timeout: _timeout, ops: _ops };
}

function storeTupleSignerArgs(source: SignerArgs) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.safe);
    builder.writeCell(source.owners.size > 0 ? beginCell().storeDictDirect(source.owners, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.ownersCount);
    builder.writeNumber(source.treshold);
    builder.writeNumber(source.timeout);
    builder.writeTuple(storeTupleSafeOperations(source.ops));
    return builder.build();
}

function dictValueParserSignerArgs(): DictionaryValue<SignerArgs> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSignerArgs(src)).endCell());
        },
        parse: (src) => {
            return loadSignerArgs(src.loadRef().beginParse());
        }
    }
}

export type SignerDeploy = {
    $$type: 'SignerDeploy';
    queryId: bigint;
}

export function storeSignerDeploy(src: SignerDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3523526908, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadSignerDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3523526908) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'SignerDeploy' as const, queryId: _queryId };
}

function loadTupleSignerDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'SignerDeploy' as const, queryId: _queryId };
}

function storeTupleSignerDeploy(source: SignerDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserSignerDeploy(): DictionaryValue<SignerDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSignerDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadSignerDeploy(src.loadRef().beginParse());
        }
    }
}

export type SafeDeployedEvent = {
    $$type: 'SafeDeployedEvent';
    by: Address;
    address: Address;
}

export function storeSafeDeployedEvent(src: SafeDeployedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1758984588, 32);
        b_0.storeAddress(src.by);
        b_0.storeAddress(src.address);
    };
}

export function loadSafeDeployedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1758984588) { throw Error('Invalid prefix'); }
    let _by = sc_0.loadAddress();
    let _address = sc_0.loadAddress();
    return { $$type: 'SafeDeployedEvent' as const, by: _by, address: _address };
}

function loadTupleSafeDeployedEvent(source: TupleReader) {
    let _by = source.readAddress();
    let _address = source.readAddress();
    return { $$type: 'SafeDeployedEvent' as const, by: _by, address: _address };
}

function storeTupleSafeDeployedEvent(source: SafeDeployedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.by);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserSafeDeployedEvent(): DictionaryValue<SafeDeployedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSafeDeployedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadSafeDeployedEvent(src.loadRef().beginParse());
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

 type Safe_init_args = {
    $$type: 'Safe_init_args';
    owner: Address;
    id: bigint;
}

function initSafe_init_args(src: Safe_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.id, 257);
    };
}

async function Safe_init(owner: Address, id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSafe_init_args({ $$type: 'Safe_init_args', owner, id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Safe_errors: { [key: number]: { message: string } } = {
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

export class Safe implements Contract {
    
    static async init(owner: Address, id: bigint) {
        return await Safe_init(owner, id);
    }
    
    static async fromInit(owner: Address, id: bigint) {
        const init = await Safe_init(owner, id);
        const address = contractAddress(0, init);
        return new Safe(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Safe(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Safe_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SafeDeployment | SafeRequestOperation | OperationsSigned | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SafeDeployment') {
            body = beginCell().store(storeSafeDeployment(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SafeRequestOperation') {
            body = beginCell().store(storeSafeRequestOperation(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OperationsSigned') {
            body = beginCell().store(storeOperationsSigned(message)).endCell();
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