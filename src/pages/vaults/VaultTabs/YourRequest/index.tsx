import { useMemo, useState } from 'react'
import { Space, Table } from 'antd'
import cs from 'classnames'
// import { ReactComponent as ArrowDownIcon } from '@assets/icons/arrow-down.svg'
import { ReactComponent as SortDownIcon } from '@assets/icons/sort-down.svg'
import { ReactComponent as SortDownActiveIcon } from '@assets/icons/sort-down-active.svg'
import styles from './index.module.scss'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import { WithdrawRequest } from '@interfaces/withdraw'
import { dateFormatter } from '@utils/dateTime'
import { DATETIME_FORMAT } from '@constants/dateTime'
import { formatNumber } from '@utils/number'
import { WITHDRAW_STATUS } from '@constants/withdraw'
import WithdrawButton from './WithdrawButton'
import CancelButton from './CancelButton'
import { UseWithdrawRequests } from '@hooks/useWithdrawRequests'

const { Column } = Table

enum SortDirection {
  ASC = 'ascend',
  DESC = 'descend',
}

interface DataType extends WithdrawRequest {
  key: React.Key
}

interface ColumnTitleProps {
  text: string
  icon?: React.ReactNode
  sortDirection?: SortDirection
  setSortDirection?: (direction: SortDirection | undefined) => void
}

function ColumnTitle({
  text,
  icon,
  sortDirection,
  setSortDirection,
}: ColumnTitleProps) {
  return (
    <div
      className={cs(
        styles.titleContainer,
        setSortDirection && styles.clickable,
      )}
      onClick={() => {
        if (setSortDirection) {
          if (sortDirection === undefined) {
            setSortDirection(SortDirection.DESC)
          } else if (sortDirection === SortDirection.DESC) {
            setSortDirection(SortDirection.ASC)
          } else {
            setSortDirection(undefined)
          }
        }
      }}
    >
      <span className={styles.titleText}>{text}</span>
      {icon && (
        <span
          className={cs(
            styles.titleIcon,
            sortDirection && styles.active,
            sortDirection === SortDirection.ASC && styles.asc,
          )}
        >
          {icon}
        </span>
      )}
    </div>
  )
}

function formatRequest(req: WithdrawRequest) {
  return {
    ...req,
    key: req.ts,
  }
}

interface YourRequestProps {
  withdrawRequestsData: UseWithdrawRequests
}

function YourRequest({ withdrawRequestsData }: YourRequestProps) {
  const [sortedByTs, setSortedByTs] = useState<SortDirection | undefined>(
    undefined,
  )
  const [sortedByAmount, setSortedByAmount] = useState<
    SortDirection | undefined
  >(undefined)

  const { address } = useGetAccountInfo()
  const { withdrawRequests } = withdrawRequestsData

  const tableData: DataType[] | undefined = useMemo(() => {
    if (!withdrawRequests) return undefined

    if (sortedByTs) {
      return withdrawRequests
        .slice()
        .sort((a, b) =>
          sortedByTs === SortDirection.ASC ? a.ts - b.ts : b.ts - a.ts,
        )
        .map(formatRequest)
    }

    if (sortedByAmount) {
      return withdrawRequests
        .slice()
        .sort((a, b) =>
          sortedByAmount === SortDirection.ASC
            ? a.amount - b.amount
            : b.amount - a.amount,
        )
        .map(formatRequest)
    }

    return withdrawRequests.map(formatRequest)
  }, [withdrawRequests, sortedByTs, sortedByAmount])

  return (
    <Table className={styles.table} dataSource={tableData || []}>
      <Column
        title={
          <ColumnTitle
            text="Time"
            icon={sortedByTs ? <SortDownActiveIcon /> : <SortDownIcon />}
            sortDirection={sortedByTs}
            setSortDirection={setSortedByTs}
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
            // icon={<ArrowDownIcon width={20} height={20} />}
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
            icon={sortedByAmount ? <SortDownActiveIcon /> : <SortDownIcon />}
            sortDirection={sortedByAmount}
            setSortDirection={setSortedByAmount}
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
            // icon={<ArrowDownIcon width={20} height={20} />}
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
              {[WITHDRAW_STATUS.WAITING, WITHDRAW_STATUS.EXPIRED].includes(
                status,
              ) && (
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
