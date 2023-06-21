import { useQuery } from 'react-query'
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks'
import { Col, Row } from 'antd'
import vaultGraph from '../../../../../assets/images/vault-graph.svg'
import ButtonPrimary from '../../../../../components/ButtonPrimary'
import { getEconomics } from '../../../../../api/network'
import { Economics } from '../../../../../interfaces/network'
import { formatNumber } from '../../../../../utils/number'
import { renderFallback } from '../../../../../utils/common'
import styles from './index.module.scss'

function VaultFlow() {
  const {
    network: { apiAddress },
  } = useGetNetworkConfig()
  const { data: economics } = useQuery<Economics>({
    queryKey: ['economics', apiAddress],
    queryFn: () => getEconomics(apiAddress),
    enabled: !!apiAddress,
  })

  const apr = economics ? formatNumber(economics.apr * 100) : renderFallback()

  return (
    <Row justify="center" align="middle">
      <Col xs={24} md={12}>
        <div className={styles.title}>
          {`${apr}%`}
          <br />
          APR
        </div>
        <ButtonPrimary className={styles.button}>DEPOSIT</ButtonPrimary>
      </Col>
      <Col xs={24} md={12}>
        <img src={vaultGraph} alt="vault graph" />
      </Col>
    </Row>
  )
}

export default VaultFlow
