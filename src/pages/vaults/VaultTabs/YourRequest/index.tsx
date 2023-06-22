import { Space, Table } from 'antd'
import { ReactComponent as ArrowDownIcon } from '../../../../assets/icons/arrow-down.svg'
import { ReactComponent as SortDownIcon } from '../../../../assets/icons/sort-down.svg'
import styles from './index.module.scss'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import { WithdrawRequest } from '../../../../interfaces/withdraw'
import { dateFormatter } from '../../../../utils/dateTime'
import { DATETIME_FORMAT } from '../../../../constants/dateTime'
import { formatNumber } from '../../../../utils/number'
import { WITHDRAW_STATUS } from '../../../../constants/withdraw'
import WithdrawButton from './WithdrawButton'
import CancelButton from './CancelButton'
import { UseWithdrawRequests } from '../../../../hooks/useWithdrawRequests'

const { Column } = Table

interface DataType extends WithdrawRequest {
  key: React.Key
}

function ColumnTitle({ text, icon }: { text: string; icon?: React.ReactNode }) {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.titleText}>{text}</span>
      {icon && <span className={styles.titleIcon}>{icon}</span>}
    </div>
  )
}

interface Props {
  withdrawRequestsData: UseWithdrawRequests
}

function YourRequest({ withdrawRequestsData }: Props) {
  const { address } = useGetAccountInfo()
  const { withdrawRequests, fetchingWithdrawRequests } = withdrawRequestsData

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
      loading={fetchingWithdrawRequests}
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
        render={() => {
          return <span className={styles.type}>Withdraw</span>
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
