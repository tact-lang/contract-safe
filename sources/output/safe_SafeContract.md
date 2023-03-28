# TACT Compilation Report
Contract: SafeContract
BOC Size: 1926 bytes

# Types
Total Types: 21

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## SafeDeployParams
TLB: `_ deploy:coins devFee:coins = SafeDeployParams`
Signature: `SafeDeployParams{deploy:coins,devFee:coins}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## SafeParameters
TLB: `_ timeout:uint32 requestPrice:coins = SafeParameters`
Signature: `SafeParameters{timeout:uint32,requestPrice:coins}`

## SafeOperations
TLB: `_ ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}> count:uint8 = SafeOperations`
Signature: `SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8}`

## SafeOperation
TLB: `_ transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell} parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}} = SafeOperation`
Signature: `SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}`

## SafeOperationTransfer
TLB: `_ to:address value:coins mode:uint8 bounce:bool body:Maybe ^cell = SafeOperationTransfer`
Signature: `SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell}`

## SafeOperationUpdateParameters
TLB: `_ parameters:SafeParameters{timeout:uint32,requestPrice:coins} = SafeOperationUpdateParameters`
Signature: `SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}`

## EventSafeDeployed
TLB: `event_safe_deployed#51a47444 by:address address:address = EventSafeDeployed`
Signature: `EventSafeDeployed{by:address,address:address}`

## EventVote
TLB: `event_vote#9dc5d639 yes:bool address:address = EventVote`
Signature: `EventVote{yes:bool,address:address}`

## EventVoteCompleted
TLB: `event_vote_completed#e7e1407c success:bool = EventVoteCompleted`
Signature: `EventVoteCompleted{success:bool}`

## SafeDeployment
TLB: `safe_deployment#6eb08253 remaining:address = SafeDeployment`
Signature: `SafeDeployment{remaining:address}`

## SafeRequestOperation
TLB: `safe_request_operation#ff7de06c ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8} = SafeRequestOperation`
Signature: `SafeRequestOperation{ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8}}`

## VoteSuccess
TLB: `vote_success#cdf42430 args:VoteArgs{safe:address,owners:dict<address, bool>,ownersCount:uint32,treshold:uint32,timeout:uint64,ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8}} = VoteSuccess`
Signature: `VoteSuccess{args:VoteArgs{safe:address,owners:dict<address, bool>,ownersCount:uint32,treshold:uint32,timeout:uint64,ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8}}}`

## VoteFailure
TLB: `vote_failure#9895f337 args:VoteArgs{safe:address,owners:dict<address, bool>,ownersCount:uint32,treshold:uint32,timeout:uint64,ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8}} = VoteFailure`
Signature: `VoteFailure{args:VoteArgs{safe:address,owners:dict<address, bool>,ownersCount:uint32,treshold:uint32,timeout:uint64,ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8}}}`

## VoteArgs
TLB: `_ safe:address owners:dict<address, bool> ownersCount:uint32 treshold:uint32 timeout:uint64 ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8} = VoteArgs`
Signature: `VoteArgs{safe:address,owners:dict<address, bool>,ownersCount:uint32,treshold:uint32,timeout:uint64,ops:SafeOperations{ops:dict<int, ^SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,bounce:bool,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}>,count:uint8}}`

## VoteDeploy
TLB: `vote_deploy#56137615 queryId:uint64 = VoteDeploy`
Signature: `VoteDeploy{queryId:uint64}`

# Get Methods
Total Get Methods: 5

## parameters

## treshold

## seqno

## isOwner
Argument: address

## owners

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
3094: Already signed or not an owner
4755: Timeout
5165: Not enough value
7464: Request price must be less or equals than 10 TON
8884: Wrong owners
17702: Not timeouted
25849: Not enough value to deploy a Safe
31822: Timeout must be less than a year
32453: Wrong safe address
36682: Sender is not safe
37479: Wrong treshold
38009: Request price must be more or equals than 1 TON
40810: Completed
44757: Exactly one operation must be specified
45379: Wrong signer address
46307: Not a member
62638: Wrong owners count