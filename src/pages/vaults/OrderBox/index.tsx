import { useState } from 'react'
import { Button, Divider, Row, Space } from 'antd'
import cs from 'classnames'
import { ReactComponent as AutoRefreshIcon } from '../../../assets/icons/auto-refresh.svg'
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow-down.svg'
import { ReactComponent as CheckboxUnchecked } from '../../../assets/icons/checkbox-unchecked.svg'
import { ReactComponent as CheckboxChecked } from '../../../assets/icons/checkbox-checked.svg'
import TokenHeadColorGray from '../../../assets/icons/token-head-gray.svg'
import SelectToken from '../../../components/SelectToken'
import InputToken from '../../../components/InputToken'
import PercentageBar from '../../../components/PercentageBar'
import styles from './index.module.scss'
import InputDuration from '../../../components/InputDuration'
import TagListDuration from '../../../components/TagListDuration'
import DisplayToken from '../../../components/DisplayToken'

const TAB_ITEMS = [
  {
    label: 'DEPOSIT',
    value: 'deposit',
  },
  {
    label: 'WITHDRAW',
    value: 'withdraw',
  },
  {
    label: 'UNLOCK',
    value: 'unlock',
  },
]

function OrderBox() {
  const [activeTab, setActiveTab] = useState('deposit')
  const [checked, setChecked] = useState(false)

  return (
    <>
      <div className={styles.actionContainer}>
        <div className={styles.tabContainer}>
          <div className={styles.leftTabs}>
            <Space size={24}>
              {TAB_ITEMS.map((item) => (
                <a
                  key={item.value}
                  className={cs(
                    styles.tab,
                    activeTab === item.value && styles.tabActive,
                  )}
                  onClick={() => setActiveTab(item.value)}
                >
                  {item.label}
                </a>
              ))}
            </Space>
          </div>
          <a className={styles.refreshButton}>
            <AutoRefreshIcon className={styles.refreshIcon} />
          </a>
        </div>

        <div className={styles.boxContainer}>
          <Row
            className={styles.inputBoxContainer}
            align="middle"
            justify="space-between"
          >
            <div className={styles.leftInputBox}>
              <div className={styles.boxTitle}>Deposit</div>
              <div className={styles.boxSubtitle}>
                <SelectToken />
              </div>
            </div>

            <div className={styles.rightInputBox}>
              <InputToken value="0" className={styles.select} />
              <div className={styles.balance}>
                <span className={styles.balanceLabel}>Balance: </span>
                <a className={styles.balanceValue}>23,341,931,341</a>
              </div>
            </div>
          </Row>

          <div className={styles.percentageContainer}>
            <PercentageBar />
          </div>

          <div
            className={cs(
              styles.checkboxContainer,
              checked && styles.checkboxContainerActive,
            )}
          >
            <a
              className={cs(styles.checkbox, checked && styles.checkboxActive)}
              onClick={() => setChecked((prevChecked) => !prevChecked)}
            >
              {checked ? (
                <CheckboxChecked className={styles.checkboxIcon} />
              ) : (
                <CheckboxUnchecked className={styles.checkboxIcon} />
              )}
              <span className={styles.checkboxText}>
                Lock & deposit to get discount
              </span>
            </a>
            {checked && <InputDuration value={123} />}
          </div>

          {checked && (
            <>
              <Row align="middle" justify="end">
                <div className={styles.discount}>
                  <span className={styles.discountValue}>20%</span>
                  <span className={styles.discountLabel}> discount</span>
                </div>
              </Row>

              <Divider style={{ margin: '16px 0 8px' }} />

              <div className={styles.durationListContainer}>
                <TagListDuration />
              </div>
            </>
          )}

          <Row
            className={styles.previewContainer}
            align="middle"
            justify="space-between"
          >
            <div className={styles.leftInputBox}>
              <div className={styles.boxTitle}>You receive</div>
              <div className={cs(styles.boxSubTitle, styles.receiveBoxTitle)}>
                <DisplayToken icon={TokenHeadColorGray} text="DAI" />
              </div>
            </div>

            <div className={styles.rightInputBox}>
              <div className={styles.previewResult}>0.0</div>
              <div className={styles.balanceLabel}>~$25.0</div>
            </div>
          </Row>

          <div className={styles.buttonContainer}>
            <Button className={styles.button}>DEPOSIT DAI</Button>
          </div>

          <div className={styles.tipContainer}>
            <Row
              className={styles.tipHeading}
              justify="space-between"
              align="middle"
            >
              <span className={styles.tipTitle}>Please Aware</span>
              <ArrowDownIcon className={styles.tipIcon} />
            </Row>

            <div className={styles.tipContent}>
              You can't immediately withdraw your assets. Withdraws follow an
              epoch ...
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailContainer}>
        <div className={styles.detailHeading}>Deposit details</div>
        <Divider style={{ margin: '16px 0' }} />
        <Row
          className={styles.detailRow}
          justify="space-between"
          align="middle"
        >
          <span className={styles.detailLabel}>DAI deposit</span>
          <span className={styles.detailValue}>27342.12 DAI</span>
        </Row>
        <Row
          className={styles.detailRow}
          justify="space-between"
          align="middle"
        >
          <span className={styles.detailLabel}>tvDAI reveice</span>
          <span className={cs(styles.detailValue, styles.detailValueActive)}>
            27342.12 tvDAI
          </span>
        </Row>
        <Row
          className={styles.detailRow}
          justify="space-between"
          align="middle"
        >
          <span className={styles.detailLabel}>Fees</span>
          <span className={styles.detailValue}>20 DAI</span>
        </Row>
      </div>
    </>
  )
}

export default OrderBox
