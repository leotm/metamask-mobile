export interface VerifyContractDetailsProps {
  /**
   * contract address
   */
  contractAddress: string;
  closeVerifyContractView: () => void;
  tokenAddress: string;
  savedContactListToArray: any[];
  /**
   * copy contract address
   */
  copyAddress: (address: string) => void;
  /**
   * toggle block explorer view
   */
  toggleBlockExplorer: (address: string) => void;
  /**
   * toggle nickname view
   */
  showNickname: (address: string) => void;
  tokenSymbol: string;
  networkProvider: {
    type: string;
    rpcTarget: string;
  };
  frequentRpcList: any[];
}
