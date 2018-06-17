// @flow
import React, { type Node } from 'react'
import { observer, inject } from 'mobx-react'

import enforceSynced from '../../services/enforceSynced'
import confirmPasswordModal from '../../services/confirmPasswordModal'
import NetowrkState from '../../states/network-state'

type Props = {
  networkState: NetowrkState,
  requireSync?: boolean,
  children: Node,
  onClick: (string, ?Object) => {}
};

@inject('networkState')
@observer
class ProtectedButton extends React.Component<Props> {
  onClick = async (evt: Object) => {
    const { requireSync } = this.props
    evt.persist()
    if (requireSync && !isSynced) {
      const canContinue = await enforeSyncedModal() // TODO :: implement and import this
      if (!canContinue) {
        return
      }
    }
    const confirmedPassword = await confirmPasswordModal()
    if (!confirmedPassword) {
      return
    }
    this.props.onClick(confirmedPassword, evt)
  }

  render() {
    const {
      requireSync, children, ...remainingProps
    } = this.props
    return (
      <button {...remainingProps} onClick={this.onClick}>
        {children}
      </button>
    )
  }
}

export default ProtectedButton
