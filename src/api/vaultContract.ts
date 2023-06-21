import {
  AbiRegistry,
  Address,
  ResultsParser,
  SmartContract,
} from '@multiversx/sdk-core'
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions'
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers'
import abiJson from '../assets/vault.abi.json'
import { CONTRACT_ADDRESS, GAS_LIMIT, NETWORK_ENV } from '../constants/network'
import { BIGINT_UNIT } from '../constants/contract'

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

function createNetworkProvider() {
  return new ProxyNetworkProvider(
    `https://${NETWORK_ENV}-gateway.multiversx.com`,
  )
}

export async function deposit() {
  const transaction = vaultContract.methods
    .deposit([])
    .withSender(
      new Address(
        'erd1suc25swsqv5mtrg4st8xmrv4z39mfqfa7cj3svww3kwl6dqs9m8s9c68lt',
      ),
    )
    .withGasLimit(GAS_LIMIT)
    .withValue(2)
    .withChainID('D')
    .buildTransaction()

  const result = await sendTransactions({
    transactions: [transaction],
  })

  console.log(result)
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
