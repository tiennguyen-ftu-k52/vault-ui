import {
  AbiRegistry,
  Address,
  ResultsParser,
  SmartContract,
  TokenTransfer,
} from '@multiversx/sdk-core'
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions'
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers'
import abiJson from '../assets/vault.abi.json'
import { CONTRACT_ADDRESS, GAS_LIMIT, NETWORK_ENV } from '../constants/network'
import { ASSET_TOKEN, BIGINT_UNIT } from '../constants/contract'

const vaultContract = createVaultContract()
const networkProvider = createNetworkProvider()
console.log(vaultContract.methods)

export async function getCollatRatio() {
  return await executeQuery('getCollateralizationP', [])
}

export async function getTotalSupply() {
  return await executeQuery('getTotalSupply', [])
}

export async function getShareToAssetsPrice() {
  return await executeQuery('getShareToAssetsPrice', [])
}

export async function getMaxAccPnlPerToken() {
  return await executeQuery('getMaxAccPnlPerToken', [])
}

export async function getAvailableAssets() {
  return await executeQuery('getAvailableAssets', [])
}

function createNetworkProvider() {
  return new ProxyNetworkProvider(
    `https://${NETWORK_ENV}-gateway.multiversx.com`,
  )
}

interface DepositParams {
  amount: number
  address: string
}

export async function deposit({ amount, address }: DepositParams) {
  const transfer = TokenTransfer.fungibleFromAmount(
    ASSET_TOKEN,
    (amount * BIGINT_UNIT) / 100,
    2,
  )
  const transaction = vaultContract.methods
    .deposit([])
    .withSingleESDTTransfer(transfer)
    .withSender(new Address(address))
    .withGasLimit(GAS_LIMIT)
    .withChainID('D')
    .buildTransaction()

  try {
    const { error } = await sendTransactions({
      transactions: [transaction],
    })
    return !error
  } catch (error) {
    return false
  }
}

function createVaultContract() {
  const vaultAbi = AbiRegistry.create(abiJson)

  return new SmartContract({
    address: new Address(CONTRACT_ADDRESS),
    abi: vaultAbi,
  })
}

async function executeQuery(method: string, args: never[] | undefined) {
  const interaction = vaultContract.methods[method](args)
  const query = interaction.check().buildQuery()
  const queryResponse = await networkProvider.queryContract(query)
  const typedBundle = new ResultsParser().parseQueryResponse(
    queryResponse,
    interaction.getEndpoint(),
  )
  return typedBundle.values[0].valueOf() / BIGINT_UNIT
}
