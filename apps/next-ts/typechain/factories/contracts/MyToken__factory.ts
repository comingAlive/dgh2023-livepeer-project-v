/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { MyToken, MyTokenInterface } from "../../contracts/MyToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200102738038062001027833981016040819052620000349162000168565b6040518060400160405280600881526020016726bc902a37b5b2b760c11b8152506040518060400160405280600981526020016822a921991821a62aa160b91b81525081600390816200008891906200029f565b5060046200009782826200029f565b505050620000ac3382620000b360201b60201c565b50620003e0565b6001600160a01b038216620000e55760405162461bcd60e51b8152600401620000dc906200036b565b60405180910390fd5b8060026000828254620000f99190620003bd565b90915550506001600160a01b038216600081815260208190526040808220805485019055517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906200014d908590620003d3565b60405180910390a35b5050565b505050565b80515b92915050565b6000602082840312156200017f576200017f600080fd5b60006200018d84846200015f565b949350505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052602260045260246000fd5b600281046001821680620001d657607f821691505b602082108103620001eb57620001eb620001ab565b50919050565b600062000162620001ff8381565b90565b6200020d83620001f1565b81546008840282811b60001990911b908116901990911617825550505050565b60006200015a81848462000202565b818110156200015657620002526000826200022d565b6001016200023c565b601f8211156200015a576000818152602090206020601f85010481016020851015620002845750805b620002986020601f8601048301826200023c565b5050505050565b81516001600160401b03811115620002bb57620002bb62000195565b620002c78254620001c1565b620002d48282856200025b565b506020601f8211600181146200030c5760008315620002f35750848201515b600019600885021c198116600285021785555062000298565b600084815260208120601f198516915b828110156200033e57878501518255602094850194600190920191016200031c565b50848210156200035c5783870151600019601f87166008021c191681555b50505050600202600101905550565b602080825281016200016281601f81527f45524332303a206d696e7420746f20746865207a65726f206164647265737300602082015260400190565b634e487b7160e01b600052601160045260246000fd5b80820180821115620001625762000162620003a7565b8181526020810162000162565b610c3780620003f06000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806370a0823111610081578063a457c2d71161005b578063a457c2d7146101a3578063a9059cbb146101b6578063dd62ed3e146101c957600080fd5b806370a082311461015d57806395d89b4114610186578063a0712d681461018e57600080fd5b806323b872dd116100b257806323b872dd14610128578063313ce5671461013b578063395093511461014a57600080fd5b806306fdde03146100d9578063095ea7b3146100f757806318160ddd14610117575b600080fd5b6100e1610202565b6040516100ee91906106c6565b60405180910390f35b61010a61010536600461071f565b610294565b6040516100ee9190610766565b6002545b6040516100ee919061077a565b61010a610136366004610788565b6102ae565b60126040516100ee91906107e1565b61010a61015836600461071f565b6102d2565b61011b61016b3660046107ef565b6001600160a01b031660009081526020819052604090205490565b6100e1610311565b6101a161019c366004610818565b610320565b005b61010a6101b136600461071f565b61032d565b61010a6101c436600461071f565b61038a565b61011b6101d7366004610839565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546102119061089b565b80601f016020809104026020016040519081016040528092919081815260200182805461023d9061089b565b801561028a5780601f1061025f5761010080835404028352916020019161028a565b820191906000526020600020905b81548152906001019060200180831161026d57829003601f168201915b5050505050905090565b6000336102a2818585610398565b60019150505b92915050565b6000336102bc85828561044c565b6102c78585856104cc565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906102a2908290869061030c9087906108f6565b610398565b6060600480546102119061089b565b61032a33826105bc565b50565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561037d5760405162461bcd60e51b815260040161037490610963565b60405180910390fd5b6102c78286868403610398565b6000336102a28185856104cc565b6001600160a01b0383166103be5760405162461bcd60e51b8152600401610374906109cb565b6001600160a01b0382166103e45760405162461bcd60e51b815260040161037490610a33565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061043f90859061077a565b60405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146104c657818110156104b95760405162461bcd60e51b815260040161037490610a77565b6104c68484848403610398565b50505050565b6001600160a01b0383166104f25760405162461bcd60e51b815260040161037490610adf565b6001600160a01b0382166105185760405162461bcd60e51b815260040161037490610b47565b6001600160a01b038316600090815260208190526040902054818110156105515760405162461bcd60e51b815260040161037490610baf565b6001600160a01b0380851660008181526020819052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906105af90869061077a565b60405180910390a36104c6565b6001600160a01b0382166105e25760405162461bcd60e51b815260040161037490610bf1565b80600260008282546105f491906108f6565b90915550506001600160a01b038216600081815260208190526040808220805485019055517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061064690859061077a565b60405180910390a35050565b60005b8381101561066d578181015183820152602001610655565b50506000910152565b6000610680825190565b808452602084019350610697818560208601610652565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920192915050565b602080825281016106d78184610676565b9392505050565b60006001600160a01b0382166102a8565b6106f8816106de565b811461032a57600080fd5b80356102a8816106ef565b806106f8565b80356102a88161070e565b6000806040838503121561073557610735600080fd5b60006107418585610703565b925050602061075285828601610714565b9150509250929050565b8015155b82525050565b602081016102a8828461075c565b80610760565b602081016102a88284610774565b6000806000606084860312156107a0576107a0600080fd5b60006107ac8686610703565b93505060206107bd86828701610703565b92505060406107ce86828701610714565b9150509250925092565b60ff8116610760565b602081016102a882846107d8565b60006020828403121561080457610804600080fd5b60006108108484610703565b949350505050565b60006020828403121561082d5761082d600080fd5b60006108108484610714565b6000806040838503121561084f5761084f600080fd5b600061085b8585610703565b925050602061075285828601610703565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6002810460018216806108af57607f821691505b6020821081036108c1576108c161086c565b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156102a8576102a86108c7565b60258152602081017f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7781527f207a65726f000000000000000000000000000000000000000000000000000000602082015290505b60400190565b602080825281016102a881610909565b60248152602081017f45524332303a20617070726f76652066726f6d20746865207a65726f2061646481527f72657373000000000000000000000000000000000000000000000000000000006020820152905061095d565b602080825281016102a881610973565b60228152602081017f45524332303a20617070726f766520746f20746865207a65726f20616464726581527f73730000000000000000000000000000000000000000000000000000000000006020820152905061095d565b602080825281016102a8816109db565b601d8152602081017f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000815290505b60200190565b602080825281016102a881610a43565b60258152602081017f45524332303a207472616e736665722066726f6d20746865207a65726f20616481527f64726573730000000000000000000000000000000000000000000000000000006020820152905061095d565b602080825281016102a881610a87565b60238152602081017f45524332303a207472616e7366657220746f20746865207a65726f206164647281527f65737300000000000000000000000000000000000000000000000000000000006020820152905061095d565b602080825281016102a881610aef565b60268152602081017f45524332303a207472616e7366657220616d6f756e742065786365656473206281527f616c616e636500000000000000000000000000000000000000000000000000006020820152905061095d565b602080825281016102a881610b57565b601f8152602081017f45524332303a206d696e7420746f20746865207a65726f20616464726573730081529050610a71565b602080825281016102a881610bbf56fea26469706673582212203618690d1f9860804cc3fcb3df49c7bc559f0b1d3c0ac53b0f3308fae47a4c7b64736f6c63430008110033";

type MyTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyToken__factory extends ContractFactory {
  constructor(...args: MyTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MyToken> {
    return super.deploy(initialSupply, overrides || {}) as Promise<MyToken>;
  }
  override getDeployTransaction(
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(initialSupply, overrides || {});
  }
  override attach(address: string): MyToken {
    return super.attach(address) as MyToken;
  }
  override connect(signer: Signer): MyToken__factory {
    return super.connect(signer) as MyToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyTokenInterface {
    return new utils.Interface(_abi) as MyTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MyToken {
    return new Contract(address, _abi, signerOrProvider) as MyToken;
  }
}