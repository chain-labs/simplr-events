import If from '@/components/If'
import ConnectWallet from '@/components/Navbar/ConnectWallet'
import {
  addBatch,
  addBatchId,
  addExcelData,
  addKey,
  batchSelector,
  CsvState,
  removeBatch,
} from '@/redux/batch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { userSelector } from '@/redux/user'
import { userAgent } from 'next/server'
import React, { useState, useEffect, useRef } from 'react'
import { read, utils } from 'xlsx'
import { GET_CURRENT_BATCH_ID } from '../utils'
import ConfirmButton from './ConfirmButton'
import TableData from './TableData'

const HomeComponent = () => {
  const [parsedData, setParsedData] = useState<CsvState[]>([])
  const [file, setFile] = useState()
  const dispatch = useAppDispatch()
  const ref = useRef()
  const batch = useAppSelector(batchSelector)

  useEffect(() => {
    dispatch(addExcelData(parsedData))
    console.log(ref)
  }, [parsedData, ref])

  useEffect(() => {
    let num
    GET_CURRENT_BATCH_ID().then((data) => {
      if (data.batches.length < 1) {
        num = 1
      } else {
        num = parseInt(data.batches?.[0]?.batchId) + 1 || 1
      }
      console.log({ num })

      dispatch(addBatchId(num))
    })
  }, [])

  useEffect(() => {
    if (file) {
      readFile()
    }
  }, [file])

  const readFile = () => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const wb = read(event.target.result)
      const sheets = wb.SheetNames
      console.log(sheets, event.target.result)

      if (sheets.length) {
        const rows: CsvState[] = utils.sheet_to_json(wb.Sheets[sheets[0]])
        setParsedData(rows)
      }
    }
    reader.readAsArrayBuffer(file)
  }
  const handleRemoveFile = () => {
    dispatch(addKey())
    // setInputKey(num)
    dispatch(removeBatch())
  }

  const handleImport = async ($event) => {
    setFile($event.target.files.length ? $event.target.files[0] : '')
  }

  return (
    <div className="rounded-2xl bg-gray-100 px-10 py-16 shadow-xl">
      <h1 className="w-128 text-4xl font-bold">Add Invite Batches</h1>
      <div className="my-4 flex-1 py-4">
        <div className="input-group">
          <div className="custom-file flex">
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-violet-200 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-800 hover:file:bg-violet-600 hover:file:text-white"
              name="file"
              id="inputGroupFile"
              key={batch.key}
              required
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <If
              condition={!!file}
              then={
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveFile()}
                >
                  Remove
                </button>
              }
            />
          </div>
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto bg-white shadow-md sm:rounded-lg">
          <TableData />
          <div className="m-3 flex justify-end p-1">
            <ConfirmButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent

// const handleExport = () => {
//   const headings = [['Email', 'Name', 'Number']]
//   const wb = utils.book_new()
//   const ws = utils.json_to_sheet([])
//   utils.sheet_add_aoa(ws, headings)
//   utils.sheet_add_json(ws, parsedData, { origin: 'A2', skipHeader: true })
//   utils.book_append_sheet(wb, ws, 'Report')
//   writeFile(wb, 'Movie Report.xlsx')
// }
