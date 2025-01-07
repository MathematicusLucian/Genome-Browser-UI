import React, { useCallback, useEffect, useState } from 'react'
import { useGridFilter } from 'ag-grid-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const DataTypeFilter = ({ model, onModelChange, getValue }) => {
  const [closeFilter, setCloseFilter] = useState<any>()
  const [unappliedModel, setUnappliedModel] = useState(model)

  // `doesFilterPass` only gets called if the filter is active
  const doesFilterPass = useCallback(
    (params) => {
      const { node } = params
      const filterText = model
      const value = getValue(node).toString().toLowerCase()
      // Ensure each word passes separately, i.e.m search for firstname, lastname
      return filterText
        .toLowerCase()
        .split(' ')
        .every((filterWord) => value.indexOf(filterWord) >= 0)
    },
    [model],
  )

  const afterGuiAttached = useCallback((params) => {
    if (!params?.hidePopup) {
      setCloseFilter(() => params.hidePopup)
    }
  }, [])

  // Register filter handlers with the grid
  useGridFilter({
    doesFilterPass,
    afterGuiAttached,
  })

  useEffect(() => {
    setUnappliedModel(model)
  }, [model])

  const onSelectedTypeChange = ({ target: { value } }) => {
    setUnappliedModel(value === 'All' ? null : value)
  }

  const onClick = () => {
    onModelChange(unappliedModel)
    if (closeFilter) {
      closeFilter()
    }
  }

  const title = 'Select Data Type'

  return (
    <div className="bg-gray-900 dark:bg-gray-100 p-10">
      <div className="data-type-filter flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
          {title ? title : '404'}
        </h2>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <label className="text-gray-900 dark:text-white my-1">
          <input
            type="radio"
            name="dataType"
            value="All"
            checked={unappliedModel == null}
            onChange={onSelectedTypeChange}
          />{' '}
          All SNPs
        </label>
        <label className="text-gray-900 dark:text-white my-1">
          <input
            type="radio"
            name="dataType"
            value="True"
            checked={unappliedModel != null}
            onChange={onSelectedTypeChange}
          />{' '}
          SNPs matching ClinVar notes
        </label>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Button
          className="close-button rounded px-3 mt-2 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900"
          onClick={onClick}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

export default DataTypeFilter
