import React, { useState } from 'react'
import { read, utils, writeFile } from 'xlsx'

const HomeComponent = () => {
  const [parsedData, setParsedData] = useState([])

  const handleImport = ($event) => {
    const files = $event.target.files
    if (files.length) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const wb = read(event.target.result)
        const sheets = wb.SheetNames

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
          setParsedData(rows)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleExport = () => {
    const headings = [['Email', 'Name', 'Number']]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    utils.sheet_add_json(ws, parsedData, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Report')
    writeFile(wb, 'Movie Report.xlsx')
  }

  return (
    <div>
      <div className="flex-1 p-3">
        <div className="col-md-6">
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                name="file"
                id="inputGroupFile"
                required
                onChange={handleImport}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row"> */}
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
              {parsedData.length
                ? parsedData.map((data, index) => (
                    <tr
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {data.Name}
                      </th>
                      <td className="px-6 py-4"> {data.Name}</td>
                      <td className="px-6 py-4"> {data.Email}</td>
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
        </div>
      </div>
      {/* </div> */}
      {/* <div onClick={handleRemove}>remove</div> */}
    </div>
  )
}

export default HomeComponent
