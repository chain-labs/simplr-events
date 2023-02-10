import {
  addBatch,
  addExcelData,
  batchSelector,
  CsvState,
  removeBatch,
} from '@/redux/batch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useState, useEffect, useRef } from 'react'
import { read, utils } from 'xlsx'
import ConfirmButton from './ConfirmButton'

const HomeComponent = () => {
  const [parsedData, setParsedData] = useState<CsvState[]>([])
  const [file, setFile] = useState()
  const [inputKey, setInputKey] = useState()
  const dispatch = useAppDispatch()
  const batch = useAppSelector(batchSelector)
  const ref = useRef()

  useEffect(() => {
    dispatch(addExcelData(parsedData))
  }, [parsedData])

  useEffect(() => {
    if (file) {
      readFile()
    }
  }, [file])

  const readFile = () => {
    // setInputKey('')
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
    ref.current.value = ''
    dispatch(removeBatch())
    // setInputKey(Date.now().toString())
  }

  const handleImport = async ($event) => {
    setFile($event.target.files.length ? $event.target.files[0] : '')
    // const files = $event.target.files
    // if (files.length) {
    //   await setFile(files[0])
    // }
  }

  return (
    <div>
      <div className="flex-1 p-3">
        <div className="col-md-6">
          <div className="input-group">
            <div className="custom-file flex">
              <input
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-800 hover:file:bg-blue-100"
                name="file"
                id="inputGroupFile"
                key={inputKey}
                ref={ref}
                required
                onChange={handleImport}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              <button onClick={handleRemoveFile}>Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {batch?.inputParams.length
                ? batch.inputParams.map((data, index) => (
                    <tr
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {data.firstName}
                      </th>
                      <td className="px-6 py-4"> {data.lastName}</td>
                      <td className="px-6 py-4"> {data.email}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </table>
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
