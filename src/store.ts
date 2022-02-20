import create from 'zustand'

type ViewState =
  | 'none'
  | 'main'
  | 'weekly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'quarterly'

type PeriodicAppState = {
  currentView: ViewState
  previousView: ViewState
  change: (view: ViewState) => void
}

const useStore = create<PeriodicAppState>((set) => ({
  currentView: 'none',
  previousView: 'none',
  change: (view) => set((state) => ({ currentView: view })),
}))
