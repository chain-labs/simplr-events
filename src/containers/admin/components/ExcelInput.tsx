import {
  addBatch,
  addExcelData,
  addKey,
  batchSelector,
  CsvState,
  removeBatch,
} from '@/redux/batch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useState, useEffect, useRef } from 'react'
import { read, utils } from 'xlsx'
import ConfirmButton from './ConfirmButton'
import TableData from './TableData'

const HomeComponent = () => {
  const [parsedData, setParsedData] = useState<CsvState[]>([])
  const [file, setFile] = useState()
  const [inputKey, setInputKey] = useState('')
  const dispatch = useAppDispatch()
  const ref = useRef()
  const batch = useAppSelector(batchSelector)

  useEffect(() => {
    dispatch(addExcelData(parsedData))
    console.log(ref)
  }, [parsedData, ref])

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
    dispatch(addKey(Math.random().toString(36)))
    // setInputKey(num)
    dispatch(removeBatch())
  }

  const handleImport = async ($event) => {
    setFile($event.target.files.length ? $event.target.files[0] : '')
  }

  return (
    <div>
      <div className="m-5 flex-1 p-3">
        <div className="input-group">
          <div className="custom-file flex">
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-800 hover:file:bg-blue-100"
              name="file"
              id="inputGroupFile"
              key={batch.key}
              required
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <button onClick={() => handleRemoveFile()}>Remove</button>
          </div>
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <TableData />
          <ConfirmButton />
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
