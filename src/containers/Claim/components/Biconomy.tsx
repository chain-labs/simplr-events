import { BICONOMY_API_KEY } from '@/utils/constants'
import { ChainId } from '@biconomy/core-types'
import SmartAccount from '@biconomy/smart-account'

const options = {
  activeNetworkId: ChainId.POLYGON_MUMBAI,
  supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
  networkConfig: [
    {
      chainId: ChainId.POLYGON_MUMBAI,
      dappAPIKey: BICONOMY_API_KEY,
    },
  ],
}

export const createSmartAccount = async (provider) => {
  let smartAccount = new SmartAccount(provider, options)
  smartAccount = await smartAccount.init()
  return smartAccount
}
