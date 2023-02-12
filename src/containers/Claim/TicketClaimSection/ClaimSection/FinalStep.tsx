import If from '@/components/If'
import { ChevronRight } from 'akar-icons'
import React from 'react'
import { STEPS } from '../../constants'
import ClaimStepItem from './components/ClaimStepItem'
import { CLAIM_STEPS } from './constants'

interface Props {
  currentStep: number
  setStep: (number) => void
  mintFailed: boolean
}

const FinalStep = ({ currentStep, mintFailed, setStep }: Props) => {
  return (
    <ClaimStepItem
      step={CLAIM_STEPS.CLAIM_TICKET}
      currentStep={currentStep}
      label="Claim Ticket"
      failed={mintFailed}
    >
      <If
        condition={currentStep === CLAIM_STEPS.CLAIM_TICKET}
        then={
          <div className="text-xs font-semibold">
            Please wait while we process your request...
          </div>
        }
        else={
          <If
            condition={currentStep === CLAIM_STEPS.FINISHED && !mintFailed}
            then={
              <button
                className="flex items-center gap-x-1 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={() => setStep(STEPS.FINISH)}
              >
                View your Ticket
                <div className="animate-bounce-right">
                  <ChevronRight size={18} />
                </div>
              </button>
            }
          />
        }
      />
    </ClaimStepItem>
  )
}

export default FinalStep
