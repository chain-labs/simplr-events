import { useState } from 'react'
import DottedCrumb from '../components/DottedCrumb'
import RoundedStep from '../components/RoundedStep'
import { STEPS } from '../constants'
import { QueryProps } from '../types'
import VerifyDetailsSection from './VerifyDetailsSection'

const TicketClaimSection = ({ query }: { query: QueryProps }) => {
  const [step, setStep] = useState<number>(STEPS.VERIFY_URL)

  const getClaimComponent = (step) => {
    if (step === STEPS.VERIFY_URL) {
      return <VerifyDetailsSection query={query} setStep={setStep} />
    }
  }
  return (
    <div className="border-red container mt-4 border-l-4 border-l-emerald-400 bg-white pb-12 shadow-md ">
      <div className="mb-14 flex flex-row items-center justify-center bg-white pt-4 pb-12 shadow-md">
        <RoundedStep stepNumber={STEPS.VERIFY_URL} current={step} />
        <DottedCrumb active={step > STEPS.VERIFY_URL} />
        <RoundedStep stepNumber={STEPS.CONNECT_WALLET} current={step} />
        <DottedCrumb active={step > STEPS.CONNECT_WALLET} />
        <RoundedStep stepNumber={STEPS.ENCRYPT_DATA} current={step} />
        <DottedCrumb active={step > STEPS.ENCRYPT_DATA} />
        <RoundedStep stepNumber={STEPS.EXAMPLE} current={step} />
      </div>
      <div className="container mb-4 px-4">
        <h1
          className="border-b pb-4 text-5xl font-bold text-purple-400"
          style={{ WebkitTextStroke: '1px black' }}
        >
          {query.eventname}
        </h1>
      </div>
      <div className="container w-screen px-4 text-black ">
        {getClaimComponent(step)}
      </div>
    </div>
  )
}

export default TicketClaimSection
