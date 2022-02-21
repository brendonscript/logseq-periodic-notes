import create from 'zustand'
import { getDisplayDateFormat } from './utils'
import { logseq as config } from '../package.json'

export type ViewState =
  | 'none'
  | 'main'
  | 'weekly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export type PeriodicNoteType = 'daily' | 'weekly' | 'monthly' | 'yearly'

export type PeriodicAppState = {
  settings: DefaultSettingsType
  currentView: ViewState
  previousView: ViewState
  noteTypes: PeriodicNoteType[]
  dailyDateFormat: string
  dispatchChangeView: (view: ViewState) => void
  dispatchGetUserDateFormat: () => void
  dispatchRefreshSettings: () => void
}

const settingsVersion = config.settingsVersion
const defaultSettings = {
  disabled: false,
  settingsVersion,
  weeklyDateFormat: `yyyy-'W'ww`,
  monthlyDateFormat: 'MM-yyyy',
  yearlyDateFormat: 'yyyy',
}
export type DefaultSettingsType = typeof defaultSettings

export const initSettings = () => {
  const settings = logseq.settings

  const shouldUpdateSettings =
    !settings || settings.settingsVersion != defaultSettings.settingsVersion

  if (shouldUpdateSettings) {
    const newSettings = { ...defaultSettings, ...logseq.settings }
    logseq.updateSettings(newSettings)
  }
  return { ...defaultSettings, ...logseq.settings }
}

const useStore = create<PeriodicAppState>((set) => ({
  settings: initSettings(),
  currentView: 'none',
  previousView: 'none',
  noteTypes: ['daily', 'weekly', 'monthly', 'yearly'],
  dailyDateFormat: 'MMM do, yyyy',

  dispatchChangeView: (view) =>
    set((state) => ({ currentView: view, previousView: state.currentView })),

  dispatchGetUserDateFormat: async () => {
    const format = await getDisplayDateFormat()
    set({ dailyDateFormat: format })
  },

  dispatchRefreshSettings: () =>
    set((state) => ({
      settings: { ...state.settings, ...logseq.settings },
    })),
}))

export default useStore