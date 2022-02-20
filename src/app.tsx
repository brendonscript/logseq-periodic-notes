import React, { useRef } from "react";
import { useAppVisible, useThemeMode } from './hooks'
const PeriodicNotes = React.lazy(() => import('./period-notes-container'))

export default function App() {
  const innerRef = useRef<HTMLDivElement>(null)
  const visible = useAppVisible()
  const themeMode = useThemeMode()
  const [started, setStarted] = React.useState(visible)
  React.useEffect(() => {
    if (visible) {
      setStarted(true)
    } else {
      const timer = setTimeout(() => {
        setStarted(false)
      }, 1 * 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [visible])
  if (started) {
    return (
      <React.Suspense fallback="loading...">
        <main
          className={`absolute inset-0 ${themeMode}`}
          onClick={(e) => {
            if (!innerRef.current?.contains(e.target as any)) {
              window.logseq.hideMainUI()
            }
          }}
        >
          <PeriodicNotes ref={innerRef} />
        </main>
      </React.Suspense>
    )
  }
  return null
}