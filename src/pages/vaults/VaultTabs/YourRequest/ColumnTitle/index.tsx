import cs from 'classnames'
import styles from './index.module.scss'

export enum SortDirection {
  ASC = 'ascend',
  DESC = 'descend',
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
      <span className={cs(styles.titleText, sortDirection && styles.active)}>
        {text}
      </span>
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

export default ColumnTitle
