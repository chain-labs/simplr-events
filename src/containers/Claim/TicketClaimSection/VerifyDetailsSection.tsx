import If from '@/components/If'
import { ArrowCycle, ChevronRight } from 'akar-icons'
import React from 'react'

import { useEffect, useState } from 'react'
import { STEPS } from '../constants'
import { QueryProps } from '../types'
import { FETCH_TREE_CID, verifyQueryDetails } from '../utils'
import UserInfoInput from './UserInfoInput'

const VerifyDetailsSection = ({
  query,
  setStep,
}: {
  query: QueryProps
  setStep: (arg0: number) => void
}) => {
  const [verified, setVerified] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (query?.batchid) {
      FETCH_TREE_CID(query?.batchid).then((data) => {
        const hashCID = data.batches[0].cid
        verifyQueryDetails(query, hashCID).then((data) => {
          setVerified(data)
        })
        setTimeout(() => {
          setChecked(true)
        }, 3000)
      })
    }
  }, [query])

  return (
    <div>
      <div className="mb-4">
        <p>
          Verify your details before moving ahead. It is important that the
          following details are correct.
        </p>
      </div>
      <div className="mb-2 flex items-center">
        <If
          condition={!checked}
          then={
            <div className="mr-2 animate-spin-slow">
              <ArrowCycle strokeWidth={2} size={20} />
            </div>
          }
          else={
            <If
              condition={verified}
              then={<h2 className="mr-2 text-xl font-medium">🎉</h2>}
              else={<h2 className="mr-2 text-xl font-medium">🔴</h2>}
            />
          }
        />
        <If
          condition={!checked}
          then={
            <h2 className="text-xl font-medium">Verifying your Information</h2>
          }
          else={
            <If
              condition={verified}
              then={
                <h2 className="mr-2 text-lg font-medium text-green-400">
                  Yohoo! Your Information is valid!
                </h2>
              }
              else={
                <h2 className="mr-2 text-sm font-medium text-red-500">
                  Oops! We could not verify your Information!
                </h2>
              }
            />
          }
        />
      </div>
      <If
        condition={checked && !verified}
        then={
          <div className="mb-2 rounded-sm border border-slate-400 bg-yellow-100 px-2 py-2 text-slate-900">
            💡 Check if the URL is correct.
          </div>
        }
      />
      <div
        className={`flex w-5/6 flex-col gap-y-4  border-l-2 px-4 pb-4 ${
          !checked
            ? 'border-gray-400'
            : verified
            ? 'border-green-400'
            : 'border-red-400'
        }`}
      >
        <UserInfoInput data={query.firstname} label="First Name" />
        <UserInfoInput data={query.lastname} label="Last Name" />
        <UserInfoInput data={query.emailid} label="E-mail ID" />
      </div>
      <button
        className="mt-4 flex items-center gap-x-1 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 disabled:bg-gray-400"
        disabled={!checked || (checked && !verified)}
        onClick={() => setStep(STEPS.CONNECT_WALLET)}
      >
        Verify & Proceed
        <div className={checked && verified ? 'animate-bounce-right' : ''}>
          <ChevronRight size={18} />
        </div>
      </button>
    </div>
  )
}

export default VerifyDetailsSection
