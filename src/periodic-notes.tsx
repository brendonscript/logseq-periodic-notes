import * as React from 'react'
import { formatAsLocale } from './utils'
import { useSettings } from './hooks'
import { openPage } from './logseq-utilities'

const PeriodicNotes = () => {
  const settings = useSettings()
  const buttons = [
    {
      format: settings.weeklyDateFormat,
      label: 'Open Weekly Note',
    },
    {
      format: settings.monthlyDateFormat,
      label: 'Open Monthly Note',
    },
    {
      format: settings.yearlyDateFormat,
      label: 'Open Yearly Note',
    },
  ]

  const openSettings = () => {
    logseq.showSettingsUI()
  }

  return (
    <div id="periodic-notes-inner">
      <button onClick={() => openSettings()}>Settings</button>
      {buttons.map((b) => {
        return (
          <CurrentNoteButton key={b.label} format={b.format} label={b.label} />
        )
      })}
    </div>
  )
}

type CurrentNoteButtonProps = {
  format: string
  label: string
}
const CurrentNoteButton = ({ format, label }: CurrentNoteButtonProps) => {
  const open = () => openPage(formatAsLocale(new Date(), format))
  return (
    <div>
      <button onClick={() => open()}>{label}</button>
    </div>
  )
}

export default PeriodicNotes
