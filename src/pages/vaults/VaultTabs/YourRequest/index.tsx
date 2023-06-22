import { useQuery } from 'react-query'
import { Space, Table } from 'antd'
import { ReactComponent as ArrowDownIcon } from '../../../../assets/icons/arrow-down.svg'
import { ReactComponent as SortDownIcon } from '../../../../assets/icons/sort-down.svg'
import styles from './index.module.scss'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import { getWithdrawRequests } from '../../../../api/vaultContract'
import { WithdrawRequest } from '../../../../interfaces/withdraw'
import { dateFormatter } from '../../../../utils/dateTime'
import { DATETIME_FORMAT } from '../../../../constants/dateTime'
import { formatNumber } from '../../../../utils/number'
import { WITHDRAW_STATUS } from '../../../../constants/withdraw'
import WithdrawButton from './WithdrawButton'
import CancelButton from './CancelButton'

const { Column } = Table

interface DataType extends WithdrawRequest {
  key: React.Key
}

function getTypeFromStatus(status: string) {
  console.log('status', status)
  return 'Withdraw'
}

function ColumnTitle({ text, icon }: { text: string; icon?: React.ReactNode }) {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.titleText}>{text}</span>
      {icon && <span className={styles.titleIcon}>{icon}</span>}
    </div>
  )
}

function YourRequest() {
  const { address } = useGetAccountInfo()
  const { data: withdrawRequests, isFetching } = useQuery<WithdrawRequest[]>({
    queryKey: ['withdrawRequests'],
    queryFn: () => getWithdrawRequests(address),
    enabled: !!address,
  })

  const tableData: DataType[] | undefined = withdrawRequests?.map((req) => ({
    key: req.ts,
    ts: req.ts,
    amount: req.amount,
    status: req.status,
    epoch: req.epoch,
  }))

  return (
    <Table
      className={styles.table}
      dataSource={tableData || []}
      loading={isFetching}
    >
      <Column
        title={
          <ColumnTitle
            text="Time"
            icon={<SortDownIcon width={20} height={20} />}
          />
        }
        dataIndex="ts"
        key="ts"
        render={(ts) => {
          const date = dateFormatter(ts * 1000)
          return (
            <div>
              <div className={styles.time}>
                {date.format(DATETIME_FORMAT.TIME)}
              </div>
              <div className={styles.date}>
                {date.format(DATETIME_FORMAT.SHORT_DATE)}
              </div>
            </div>
          )
        }}
      />
      <Column
        title={
          <ColumnTitle
            text="Type"
            icon={<ArrowDownIcon width={20} height={20} />}
          />
        }
        dataIndex="status"
        key="type"
        render={(status) => {
          return (
            <span className={styles.type}>{getTypeFromStatus(status)}</span>
          )
        }}
      />
      <Column
        title={
          <ColumnTitle
            text="Amount"
            icon={<SortDownIcon width={20} height={20} />}
          />
        }
        dataIndex="amount"
        key="amount"
        render={(amount) => (
          <Space size={4} className={styles.amount}>
            <span className={styles.amountValue}>{formatNumber(amount)}</span>
            <span className={styles.amountLabel}>tvDAI</span>
          </Space>
        )}
      />
      <Column
        title={<ColumnTitle text="Epoch" />}
        dataIndex="epoch"
        key="epoch"
      />
      <Column
        title={
          <ColumnTitle
            text="Status"
            icon={<ArrowDownIcon width={20} height={20} />}
          />
        }
        dataIndex="status"
        key="status"
        render={(status) => <div className={styles.status}>{status}</div>}
      />
      <Column
        title={<ColumnTitle text="Action" />}
        dataIndex="status"
        key="action"
        render={(status, req: WithdrawRequest) => {
          return (
            <div className={styles.action}>
              {status === WITHDRAW_STATUS.EXECUTABLE && (
                <WithdrawButton
                  address={address}
                  amount={req.amount}
                  ts={req.ts}
                />
              )}
              {[WITHDRAW_STATUS.WAITING, WITHDRAW_STATUS.EXPIRED] && (
                <CancelButton
                  address={address}
                  amount={req.amount}
                  ts={req.ts}
                />
              )}
            </div>
          )
        }}
      />
    </Table>
  )
}

export default YourRequest
