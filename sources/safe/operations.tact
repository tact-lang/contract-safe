struct SafeParameters {
    timeout: Int as uint32;
    requestPrice: Int as coins;
}

struct SafeOperation {
    transfer: SafeOperationTransfer?;
    parameters: SafeOperationUpdateParameters?;
}

struct SafeOperationTransfer {
    to: Address;
    value: Int as coins;
    mode: Int as uint8;
    body: Cell?;
}

struct SafeOperationUpdateParameters {
    parameters: SafeParameters;
}