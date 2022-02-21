import { PageEntity, BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useMountedState, useWindowSize } from 'react-use'
import { parseJournalDate } from './utils'
import { triggerIconName } from './constants'

export const useIconPosition = () => {
  const windowSize = useWindowSize()
  const [windowRect, setWindowRect] = useState({
    top: 0,
    bottom: 20,
    right: windowSize.width - 10,
    left: 0,
  })
  useMemo(() => {
    if (top?.document) {
      const iconRect = top?.document
        .querySelector(`#${triggerIconName}`)
        ?.getBoundingClientRect()
      if (iconRect) {
        const { top, bottom, left, right } = iconRect
        setWindowRect({ top, bottom, left, right })
      }
    }
  }, [])

  console.info(windowRect)
  return windowRect
}

export const useAppVisible = () => {
  const [visible, setVisible] = useState(logseq.isMainUIVisible)
  const isMounted = useMountedState()
  React.useEffect(() => {
    const eventName = 'ui:visible:changed'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = async ({ visible }: any) => {
      if (isMounted()) {
        setVisible(visible)
      }
    }
    console.log(logseq)
    logseq.on(eventName, handler)
    return () => {
      logseq.off(eventName, handler)
    }
  }, [isMounted])
  return visible
}

export const useSidebarVisible = () => {
  const [visible, setVisible] = useState(false)
  const isMounted = useMountedState()
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logseq.App.onSidebarVisibleChanged(({ visible }: any) => {
      if (isMounted()) {
        setVisible(visible)
      }
    })
  }, [isMounted])
  return visible
}

export const useCurrentPage = () => {
  const [page, setPage] = React.useState<null | PageEntity | BlockEntity>(null)
  const setActivePage = React.useCallback(async () => {
    const p = await logseq.Editor.getCurrentPage()
    setPage(p)
  }, [])
  React.useEffect(() => {
    setActivePage()
    return logseq.App.onRouteChanged(setActivePage)
  }, [setActivePage])
  return page
}

export const useCurrentJournalDate = () => {
  const page = useCurrentPage()
  return React.useMemo(() => {
    if (page && page['journal?'] && page.journalDay) {
      return parseJournalDate(page.journalDay)
    }
    return null
  }, [page])
}

export const useThemeMode = () => {
  const isMounted = useMountedState()
  const [mode, setMode] = React.useState<'dark' | 'light'>('light')
  React.useEffect(() => {
    setMode(
      (top?.document
        .querySelector('html')
        ?.getAttribute('data-theme') as typeof mode) ??
        (matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light')
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logseq.App.onThemeModeChanged((s: any) => {
      console.log(s)
      if (isMounted()) {
        setMode(s.mode)
      }
    })
  }, [isMounted])

  return mode
}