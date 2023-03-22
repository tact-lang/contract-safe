# TACT Compilation Report
Contract: SafeDeployer
BOC Size: 964 bytes

# Types
Total Types: 13

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## SafeDeployment
TLB: `safe_deployment#6eb08253 remaining:address = SafeDeployment`
Signature: `SafeDeployment{remaining:address}`

## SafeRequestOperation
TLB: `safe_request_operation#a2670d5d operation:SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}} = SafeRequestOperation`
Signature: `SafeRequestOperation{operation:SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}}`

## SafeParameters
TLB: `_ timeout:uint32 requestPrice:coins = SafeParameters`
Signature: `SafeParameters{timeout:uint32,requestPrice:coins}`

## SafeOperation
TLB: `_ transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,body:Maybe ^cell} parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}} = SafeOperation`
Signature: `SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}`

## SafeOperationTransfer
TLB: `_ to:address value:coins mode:uint8 body:Maybe ^cell = SafeOperationTransfer`
Signature: `SafeOperationTransfer{to:address,value:coins,mode:uint8,body:Maybe ^cell}`

## SafeOperationUpdateParameters
TLB: `_ parameters:SafeParameters{timeout:uint32,requestPrice:coins} = SafeOperationUpdateParameters`
Signature: `SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}`

## OperationSigned
TLB: `operation_signed#c2668027 operation:SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}} = OperationSigned`
Signature: `OperationSigned{operation:SafeOperation{transfer:Maybe SafeOperationTransfer{to:address,value:coins,mode:uint8,body:Maybe ^cell},parameters:Maybe SafeOperationUpdateParameters{parameters:SafeParameters{timeout:uint32,requestPrice:coins}}}}`

# Get Methods
Total Get Methods: 1

## owner

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
4755: Timeout
5165: Not enough value
25849: Not enough value to deploy a Safe
36682: Sender is not safe
40810: Completed
44757: Exactly one operation must be specified
46307: Not a member