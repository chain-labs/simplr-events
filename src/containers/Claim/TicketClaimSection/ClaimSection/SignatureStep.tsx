import If from '@/components/If'
import { useAuth } from '@arcana/auth-react'
import { ChevronRight } from 'akar-icons'
import React from 'react'
import { getSignature } from '../../utils'
import ClaimStepItem from './components/ClaimStepItem'
import { CLAIM_STEPS } from './constants'

interface Props {
  currentStep: number
  signature: any
  setCurrentStep: (number) => void
  setSignature: (any) => void
}

const SignatureStep = ({
  currentStep,
  setCurrentStep,
  signature,
  setSignature,
}: Props) => {
  const auth = useAuth()

  const handleSignature = async (e) => {
    e.preventDefault()
    setCurrentStep(CLAIM_STEPS.GET_SIGNATURE)
    const signature = await getSignature(auth)
    setSignature(signature)
    setCurrentStep(CLAIM_STEPS.ENCRYPTING)
  }

  return (
    <ClaimStepItem
      step={CLAIM_STEPS.GET_SIGNATURE}
      currentStep={currentStep}
      label="Sign Message from Lit Protocol"
    >
      <If
        condition={!signature}
        then={
          <button
            className="flex items-center gap-x-1 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={handleSignature}
          >
            Sign Message
            <div className="animate-bounce-right">
              <ChevronRight size={18} />
            </div>
          </button>
        }
      />
    </ClaimStepItem>
  )
}

export default SignatureStep
