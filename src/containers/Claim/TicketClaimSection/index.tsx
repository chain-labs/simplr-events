import { useState } from 'react'
import DottedCrumb from '../components/DottedCrumb'
import RoundedStep from '../components/RoundedStep'
import ConnectArcana from '../ConnectArcana.tsx'
import { STEPS } from '../constants'
import { QueryProps } from '../types'
import VerifyDetailsSection from './VerifyDetailsSection'

const TicketClaimSection = ({ query }: { query: QueryProps }) => {
  const [step, setStep] = useState<number>(STEPS.VERIFY_URL)

  const getClaimComponent = (step) => {
    if (step === STEPS.VERIFY_URL) {
      return <VerifyDetailsSection query={query} setStep={setStep} />
    } else if (step === STEPS.CONNECT_WALLET) {
      return <ConnectArcana setStep={setStep} />
    }
  }
  return (
    <div className="border-red container mt-4 border-l-4 border-l-emerald-400 bg-white pb-12 shadow-md ">
      <div className="container mb-4 px-4 py-6 shadow-md">
        <h1
          className="text-center text-5xl font-bold text-green-300"
          style={{ WebkitTextStroke: '1px black' }}
        >
          {query.eventname}
        </h1>
      </div>
      <div className="mb-4 flex flex-row items-center justify-center bg-white pt-2 pb-6">
        <RoundedStep stepNumber={STEPS.VERIFY_URL} current={step} />
        <DottedCrumb active={step > STEPS.VERIFY_URL} />
        <RoundedStep stepNumber={STEPS.CONNECT_WALLET} current={step} />
        <DottedCrumb active={step > STEPS.CONNECT_WALLET} />
        <RoundedStep stepNumber={STEPS.ENCRYPT_DATA} current={step} />
        <DottedCrumb active={step > STEPS.ENCRYPT_DATA} />
        <RoundedStep stepNumber={STEPS.EXAMPLE} current={step} />
      </div>
      <div className="container w-screen px-4 text-black ">
        {getClaimComponent(step)}
      </div>
    </div>
  )
}

export default TicketClaimSection
