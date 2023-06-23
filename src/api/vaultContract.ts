import {
  AbiRegistry,
  Address,
  ResultsParser,
  SmartContract,
  TokenTransfer,
} from '@multiversx/sdk-core'
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions'
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers'
import abiJson from '@assets/vault.abi.json'
import { CONTRACT_ADDRESS, GAS_LIMIT, NETWORK_ENV } from '@constants/network'
import { ASSET_TOKEN, BIGINT_UNIT, SHARE_TOKEN } from '@constants/contract'

const vaultContract = createVaultContract(CONTRACT_ADDRESS)
const networkProvider = createNetworkProvider()

export async function getCollatRatio() {
  const value = await executeQuery('getCollateralizationP', [])
  return value / Math.pow(10, 12)
}

export async function getTotalSupply() {
  const value = await executeQuery('getTotalSupply', [])
  return value / BIGINT_UNIT
}

export async function getShareToAssetsPrice() {
  const value = await executeQuery('getShareToAssetsPrice', [])
  return value / BIGINT_UNIT
}

export async function getMaxAccPnlPerToken() {
  const value = await executeQuery('getMaxAccPnlPerToken', [])
  return value / BIGINT_UNIT
}

export async function getWithdrawRequest({
  address,
  ts,
}: {
  address: string
  ts: number
}) {
  const value = await executeQuery('getWithdrawRequest', [
    new Address(address) as never,
    ts as never,
  ])
  return value?.field1?.name || ''
}

export async function getWithdrawRequests(address: string) {
  const values = await executeQuery('getWithdrawRequests', [
    new Address(address) as never,
  ])

  const results = await Promise.all(
    values.map(async (val: number[]) => {
      const ts = Number(val[0].valueOf())
      const amount = val[1] / BIGINT_UNIT
      const status = await getWithdrawRequest({ address, ts })
      return { ts, amount, status, epoch: 0 }
    }),
  )

  return results
}

interface Params {
  amount: number
  address: string
}

export async function deposit({ amount, address }: Params) {
  const transfer = TokenTransfer.fungibleFromAmount(ASSET_TOKEN, amount, 18)
  const transaction = vaultContract.methods
    .deposit([])
    .withSingleESDTTransfer(transfer)
    .withSender(new Address(address))
    .withGasLimit(GAS_LIMIT)
    .withChainID('D')
    .buildTransaction()

  try {
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
    })
    return sessionId
  } catch (error) {
    return ''
  }
}

export async function requestWithdraw({ amount, address }: Params) {
  const transfer = TokenTransfer.fungibleFromAmount(SHARE_TOKEN, amount, 18)
  const transaction = vaultContract.methods
    .requestWithdraw([])
    .withSingleESDTTransfer(transfer)
    .withSender(new Address(address))
    .withGasLimit(GAS_LIMIT)
    .withChainID('D')
    .buildTransaction()

  try {
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
    })
    return sessionId
  } catch (error) {
    return ''
  }
}

interface WithdrawParams extends Params {
  ts: number
}

export async function withdraw({ address, amount, ts }: WithdrawParams) {
  const transaction = vaultContract.methods
    .withdraw([amount * BIGINT_UNIT, ts])
    .withSender(new Address(address))
    .withGasLimit(GAS_LIMIT)
    .withChainID('D')
    .buildTransaction()

  try {
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
    })
    return sessionId
  } catch (error) {
    return ''
  }
}

export async function cancelWithdraw({ address, amount, ts }: WithdrawParams) {
  const transaction = vaultContract.methods
    .cancelWithdraw([amount * BIGINT_UNIT, ts])
    .withSender(new Address(address))
    .withGasLimit(GAS_LIMIT)
    .withChainID('D')
    .buildTransaction()

  try {
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
    })
    return sessionId
  } catch (error) {
    return ''
  }
}

function createNetworkProvider() {
  return new ProxyNetworkProvider(
    `https://${NETWORK_ENV}-gateway.multiversx.com`,
  )
}

function createVaultContract(contractAddress: string) {
  const vaultAbi = AbiRegistry.create(abiJson)

  return new SmartContract({
    address: new Address(contractAddress),
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
  return typedBundle.values[0].valueOf()
}
