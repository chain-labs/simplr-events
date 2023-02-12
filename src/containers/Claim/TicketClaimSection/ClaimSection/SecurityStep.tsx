import React from 'react'
import ClaimStepItem from './components/ClaimStepItem'
import { CLAIM_STEPS } from './constants'

interface Props {
  currentStep: number
}

const SecurityStep = ({ currentStep }: Props) => {
  return (
    <ClaimStepItem
      step={CLAIM_STEPS.ENCRYPTING}
      currentStep={currentStep}
      label="Encrypting Data and Pinning to IPFS"
    ></ClaimStepItem>
  )
}

export default SecurityStep
