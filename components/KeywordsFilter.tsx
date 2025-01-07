import React, { useCallback, useRef } from 'react'
import { useGridFilter } from 'ag-grid-react'
import { Separator } from '@/components/ui/separator'

const KeywordsFilter = ({ model, onModelChange, getValue }) => {
  const refInput = useRef(null)

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
    // Focus the input element for keyboard navigation.
    if (!params?.suppressFocus) {
      // Can't do this in an effect, as the component is not recreated when hidden and then shown again
      refInput.current.focus()
    }
  }, [])

  // Register filter handlers with the grid
  useGridFilter({
    doesFilterPass,
    afterGuiAttached,
  })

  const title = 'Keyword search'
  const description = `Multiple word partial search enabled, e.g. "bow canc" would return results featuring "bowel cancer".`

  return (
    <div className="bg-gray-900 dark:bg-gray-100 p-10">
      <div className="keyword-filter flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
          {title ? title : '404'}
        </h2>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div>
          <input
            ref={refInput}
            type="text"
            value={model || ''}
            onChange={({ target: { value } }) => onModelChange(value === '' ? null : value)}
            placeholder="Enter a keyword..."
          />
        </div>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div className="text-xs text-gray-900 dark:text-white leading-snug">{description}</div>
      </div>
    </div>
  )
}

export default KeywordsFilter
