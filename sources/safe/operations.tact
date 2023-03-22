struct SafeParameters {
    timeout: Int as uint32;
    requestPrice: Int as coins;
}

struct SafeOperations {
    ops: map<Int, SafeOperation>;
    count: Int as uint8;
}

struct SafeOperation {
    transfer: SafeOperationTransfer?;
    parameters: SafeOperationUpdateParameters?;
}

struct SafeOperationTransfer {
    to: Address;
    value: Int as coins;
    mode: Int as uint8;
    bounce: Bool;
    body: Cell?;
}

struct SafeOperationUpdateParameters {
    parameters: SafeParameters;
}