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
    operation: SafeOperation;
}

export function storeSafeRequestOperation(src: SafeRequestOperation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2724662621, 32);
        b_0.store(storeSafeOperation(src.operation));
    };
}

export function loadSafeRequestOperation(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2724662621) { throw Error('Invalid prefix'); }
    let _operation = loadSafeOperation(sc_0);
    return { $$type: 'SafeRequestOperation' as const, operation: _operation };
}

function loadTupleSafeRequestOperation(source: TupleReader) {
    const _operation = loadTupleSafeOperation(source.readTuple());
    return { $$type: 'SafeRequestOperation' as const, operation: _operation };
}

function storeTupleSafeRequestOperation(source: SafeRequestOperation) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSafeOperation(source.operation));
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
    body: Cell | null;
}

export function storeSafeOperationTransfer(src: SafeOperationTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        b_0.storeUint(src.mode, 8);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
    };
}

export function loadSafeOperationTransfer(slice: Slice) {
    let sc_0 = slice;
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    let _mode = sc_0.loadUintBig(8);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SafeOperationTransfer' as const, to: _to, value: _value, mode: _mode, body: _body };
}

function loadTupleSafeOperationTransfer(source: TupleReader) {
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    return { $$type: 'SafeOperationTransfer' as const, to: _to, value: _value, mode: _mode, body: _body };
}

function storeTupleSafeOperationTransfer(source: SafeOperationTransfer) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
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

export type OperationSigned = {
    $$type: 'OperationSigned';
    operation: SafeOperation;
}

export function storeOperationSigned(src: OperationSigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3261497383, 32);
        b_0.store(storeSafeOperation(src.operation));
    };
}

export function loadOperationSigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3261497383) { throw Error('Invalid prefix'); }
    let _operation = loadSafeOperation(sc_0);
    return { $$type: 'OperationSigned' as const, operation: _operation };
}

function loadTupleOperationSigned(source: TupleReader) {
    const _operation = loadTupleSafeOperation(source.readTuple());
    return { $$type: 'OperationSigned' as const, operation: _operation };
}

function storeTupleOperationSigned(source: OperationSigned) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSafeOperation(source.operation));
    return builder.build();
}

function dictValueParserOperationSigned(): DictionaryValue<OperationSigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOperationSigned(src)).endCell());
        },
        parse: (src) => {
            return loadOperationSigned(src.loadRef().beginParse());
        }
    }
}

 type Signer_init_args = {
    $$type: 'Signer_init_args';
    safe: Address;
    signers: Dictionary<Address, boolean>;
    treshold: bigint;
    timeout: bigint;
    operation: SafeOperation;
}

function initSigner_init_args(src: Signer_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.safe);
        b_0.storeDict(src.signers, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeInt(src.treshold, 257);
        b_0.storeInt(src.timeout, 257);
        let b_1 = new Builder();
        b_1.store(storeSafeOperation(src.operation));
        b_0.storeRef(b_1.endCell());
    };
}

async function Signer_init(safe: Address, signers: Dictionary<Address, boolean>, treshold: bigint, timeout: bigint, operation: SafeOperation) {
    const __code = Cell.fromBase64('te6ccgECMwEABGcAART/APSkE/S88sgLAQIBYgIDAgLKBAUCASAvMAIBIAYHAgJxKywCASAICQIBIBARAs/YDoaYGAuNhgAMi/yLhxAP0gAJBrpMCAhd15cEQQa4WFEEGE3QDAgn/dWPlwRCooKYG3gnwwgXwxdqJoagD8MekAAMp4ErYMR0R4E4NoqoJtnnEqi+2eGGR8IYDmP4DlACq4eBNk9qpDEKAgEgDg8BjO2i7ftwIddJwh+VMCDXCx/eApJbf+ABwACOp/kBgvAirubQptwUZXcnfdWNBq4wkKPN09iohWEYQgiuX26wObrjApEw4nALAbiBEpMl+CO88vSCAJ9qIbPy9PhCFIEBCwFtcSFulVtZ9FkwmMgBzwBBM/RB4gWkUwa+jqMzf3CBAIJwU1TIWYIQwmaAJ1ADyx8C8A/JK1UgREBtbds8A94FA3/bMQwB9shxAcoBUAcBygBwAcoCUAXwCc8WUAP6AnABymgjbrMlbrOxjkx/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIQ0ANG6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAADdkg10mBAQu68uCIINcLCiCDCboBgQT/urHy4IiAFHxC3Wc0/qAHlAAD4CfgKSrgZAWUAcRC3Wcy/gOUAAPgM+A1KOBllAHFAIBIBITAgEgHR4CASAUFQIBIBgZAAVW8EgCASAWFwArPpAAfAJAfoA0wfSAAGR1JJtAeJVMIAAPCBu8tCAbySACASAaGwIBIBwqADcUEPwCc8WAfoCEssHIW6zlX8BygDMlHAyygDigACEIG6SMG2ZIG7y0IBvJPAW4oAAFG8EgAgEgHyACASAlJgIBICEiAgEgIyQABTwHYAAPCBu8tCAbyKAABTwHoAAhCBukjBtmSBu8tCAbyLwHOKACASAnKAIBICkqAAk8B9vAYAALNMf+gBZgAA0AssfAfoCgAAUbwKAAe1+kAB8AkBgQEB1wCBAQHXANQB0IEBAdcA9ATSAAGU8BLwEZFt4gHSAAGU8BjwF5Ft4hIC0gAwEFgQVxBWEoAgEgLS4AlxQh/AJzxYVgQEBzwATgQEBzwAByIEBAc8AEvQAQAQhbrOaf1ADygAB8BPwFJVwMgLKAOIhbrOZfwHKAAHwGfAalHAyygDiygDJAcyAAbT6QAHwCQH0BIEBAdcAgQEB1wDUAdDSAAGU8BLwEZFt4gHSAAGU8BjwF5Ft4hIyECYQJRAkQwCACSb/kn2omhqAPwx6QAAyngStgxHRHgTg2iqgm2ecW2eAPgKgPgNwxMgCVvd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4bLzjN0Yc3hPWW1CYmtxu8sACCCAI9K+EInxwXy9HAERVVwAAYwbFI=');
    const __system = Cell.fromBase64('te6cckECNQEABHEAAQHAAQEFoFqXAgEU/wD0pBP0vPLICwMCAWIIBAIBIAYFAJW93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThsvOM3RhzeE9ZbUJia3G7ywCSb/kn2omhqAPwx6QAAyngStgxHRHgTg2iqgm2ecW2eAPgKgPgNw0BwAGMGxSAgLKDgkCAnENCgIBIAwLAG0+kAB8AkB9ASBAQHXAIEBAdcA1AHQ0gABlPAS8BGRbeIB0gABlPAY8BeRbeISMhAmECUQJEMAgAJcUIfwCc8WFYEBAc8AE4EBAc8AAciBAQHPABL0AEAEIW6zmn9QA8oAAfAT8BSVcDICygDiIW6zmX8BygAB8BnwGpRwMsoA4soAyQHMgAHtfpAAfAJAYEBAdcAgQEB1wDUAdCBAQHXAPQE0gABlPAS8BGRbeIB0gABlPAY8BeRbeISAtIAMBBYEFcQVhKAIBICsPAgEgHhACASAXEQIBIBQSAgEgEyEADQCyx8B+gKACASAWFQALNMf+gBZgAAk8B9vAYAIBIBsYAgEgGhkAIQgbpIwbZkgbvLQgG8i8BzigAAU8B6ACASAdHAAPCBu8tCAbyKAABTwHYAIBICYfAgEgIyACASAiIQAFG8CgAAUbwSACASAlJAAhCBukjBtmSBu8tCAbyTwFuKAANxQQ/AJzxYB+gISywchbrOVfwHKAMyUcDLKAOKACASAqJwIBICkoAA8IG7y0IBvJIAArPpAAfAJAfoA0wfSAAGR1JJtAeJVMIAAFVvBIAgEgLywCASAuLQBR8Qt1nNP6gB5QAA+An4Ckq4GQFlAHEQt1nMv4DlAAD4DPgNSjgZZQBxQAN2SDXSYEBC7ry4Igg1wsKIIMJugGBBP+6sfLgiICz9gOhpgYC42GAAyL/IuHEA/SAAkGukwICF3XlwRBBrhYUQQYTdAMCCf91Y+XBEKigpgbeCfDCBfDF2omhqAPwx6QAAyngStgxHRHgTg2iqgm2ecSqL7Z4YZHwhgOY/gOUAKrh4E2T2qkNDABjO2i7ftwIddJwh+VMCDXCx/eApJbf+ABwACOp/kBgvAirubQptwUZXcnfdWNBq4wkKPN09iohWEYQgiuX26wObrjApEw4nAxAbiBEpMl+CO88vSCAJ9qIbPy9PhCFIEBCwFtcSFulVtZ9FkwmMgBzwBBM/RB4gWkUwa+jqMzf3CBAIJwU1TIWYIQwmaAJ1ADyx8C8A/JK1UgREBtbds8A94FA3/bMTIB9shxAcoBUAcBygBwAcoCUAXwCc8WUAP6AnABymgjbrMlbrOxjkx/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiITMANG6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAACCCAI9K+EInxwXy9HAERVVwg0e/BA==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSigner_init_args({ $$type: 'Signer_init_args', safe, signers, treshold, timeout, operation })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Signer_errors: { [key: number]: { message: string } } = {
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
    4755: { message: `Timeout` },
    5165: { message: `Not enough value` },
    25849: { message: `Not enough value to deploy a Safe` },
    36682: { message: `Sender is not safe` },
    40810: { message: `Completed` },
    44757: { message: `Exactly one operation must be specified` },
    46307: { message: `Not a member` },
}

export class Signer implements Contract {
    
    static async init(safe: Address, signers: Dictionary<Address, boolean>, treshold: bigint, timeout: bigint, operation: SafeOperation) {
        return await Signer_init(safe, signers, treshold, timeout, operation);
    }
    
    static async fromInit(safe: Address, signers: Dictionary<Address, boolean>, treshold: bigint, timeout: bigint, operation: SafeOperation) {
        const init = await Signer_init(safe, signers, treshold, timeout, operation);
        const address = contractAddress(0, init);
        return new Signer(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Signer(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Signer_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'YES') {
        
        let body: Cell | null = null;
        if (message === 'YES') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOperation(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('operation', builder.build())).stack;
        const result = loadTupleSafeOperation(source);
        return result;
    }
    
}