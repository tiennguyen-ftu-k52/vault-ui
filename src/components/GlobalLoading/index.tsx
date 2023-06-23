import { Spin } from 'antd'
import { useLoading } from '../../hooks/useLoading'
import styles from './index.module.scss'

function GlobalLoading() {
  const { loading } = useLoading()

  return (
    loading && (
      <div className={styles.loadingContainer}>
        <Spin spinning />
      </div>
    )
  )
}

export default GlobalLoading
