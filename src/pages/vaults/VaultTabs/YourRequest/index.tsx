// import { useQuery } from 'react-query'
import { Table } from 'antd'
import { ReactComponent as ArrowDownIcon } from '../../../../assets/icons/arrow-down.svg'
import { ReactComponent as SortDownIcon } from '../../../../assets/icons/sort-down.svg'
import styles from './index.module.scss'
// import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
// import { getWithdrawRequests } from '../../../../api/vaultContract'

const { Column } = Table

interface DataType {
  key: React.Key
  time: string
  type: string
  amount: string
  epoch: number
  status: string
}

const data: DataType[] = [
  {
    key: '1',
    time: '21:05 24/12/2022',
    type: 'Withdraw',
    amount: '32,493.94 tvDAI',
    epoch: 452,
    status: 'Waiting',
  },
  {
    key: '2',
    time: '21:05 24/12/2022',
    type: 'Unlock',
    amount: '32,493.94 tvDAI',
    epoch: 0,
    status: 'Executed',
  },
  {
    key: '3',
    time: '21:05 24/12/2022',
    type: 'Withdrew',
    amount: '32,493.94 tvDAI',
    epoch: 452,
    status: 'Executed',
  },
]

function ColumnTitle({ text, icon }: { text: string; icon?: React.ReactNode }) {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.titleText}>{text}</span>
      {icon && <span className={styles.titleIcon}>{icon}</span>}
    </div>
  )
}

function YourRequest() {
  // const { address } = useGetAccountInfo()
  // const { data: withdrawRequests } = useQuery<any[]>({
  //   queryKey: ['withdrawRequests'],
  //   queryFn: () => getWithdrawRequests(address),
  //   enabled: !!address,
  // })

  // console.log('withdrawRequests', withdrawRequests)

  return (
    <Table className={styles.table} dataSource={data}>
      <Column
        title={
          <ColumnTitle
            text="Time"
            icon={<SortDownIcon width={20} height={20} />}
          />
        }
        dataIndex="time"
        key="time"
      />
      <Column
        title={
          <ColumnTitle
            text="Type"
            icon={<ArrowDownIcon width={20} height={20} />}
          />
        }
        dataIndex="type"
        key="type"
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
      />
    </Table>
  )
}

export default YourRequest
