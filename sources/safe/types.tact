struct SafeParameters {
    timeout: Int as uint32;
    requestPrice: Int as coins;
    timelock: Int as uint32;
}

struct SafeOperations {
    ops: map<Int as uint8, SafeOperation>;
    count: Int as uint8;
}

struct SafeOperation {
    transfer: SafeOperationTransfer?;
    parameters: SafeOperationUpdateParameters?;
    add: SafeOperationAdd?;
    remove: SafeOperationRemove?;
    replace: SafeOperationReplace?;
}

struct SafeOperationAdd {
    owner: Address;
}

struct SafeOperationRemove {
    owner: Address;
}

struct SafeOperationReplace {
    old: Address;
    new: Address;
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

//
// Events
//

message EventSafeDeployed {
    by: Address;
    address: Address;
}

message EventVote {
    yes: Bool;
    address: Address;
}

message EventVoteCompleted {
    success: Bool;
}