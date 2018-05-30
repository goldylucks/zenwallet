import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { normalizeTokens, isZenAsset, getAssetName } from '../../utils/helpers'
import CopyableTableCell from '../UI/CopyableTableCell'

class SingleTxDelta extends Component {
  render() {
    const { asset, amount } = this.props.tx
    const amountClass = (amount > 0 ? 'amount align-right green' : 'amount align-right red')
    const finalAmount = normalizeTokens(amount, isZenAsset(asset))
    const assetName = getAssetName(asset)

    return (
      <React.Fragment>
        <CopyableTableCell string={asset} />
        <td>{assetName}</td>
        <td className={amountClass}>{finalAmount}</td>
      </React.Fragment>

    )
  }
}

export default SingleTxDelta
