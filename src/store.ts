import create from 'zustand'

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
  currentView: ViewState
  previousView: ViewState
  noteTypes: PeriodicNoteType[]
  dispatchChangeView: (view: ViewState) => void
}

const useStore = create<PeriodicAppState>((set) => ({
  currentView: 'none',
  previousView: 'none',
  noteTypes: ['daily', 'weekly', 'monthly', 'yearly'],
  dailyDateFormat: 'MMM do, yyyy',

  dispatchChangeView: (view) =>
    set((state) => ({ currentView: view, previousView: state.currentView })),
}))

export default useStore
