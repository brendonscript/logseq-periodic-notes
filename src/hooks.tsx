import { PageEntity, BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useMountedState, useWindowSize } from 'react-use'
import { getDisplayDateFormat, parseJournalDate } from './utils'
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
  }, [windowSize])

  console.info(windowRect)
  return windowRect
}

export const useAppVisible = () => {
  const [visible, setVisible] = useState(logseq.isMainUIVisible)
  const isMounted = useMountedState()
  React.useEffect(() => {
    const eventName = 'ui:visible:changed'
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
    logseq.App.onThemeModeChanged((s: any) => {
      console.log(s)
      if (isMounted()) {
        setMode(s.mode)
      }
    })
  }, [isMounted])

  return mode
}

export const useDateFormat = () => {
  const isMounted = useMountedState()
  const [dailyDateFormat, setDailyDateFormat] = useState('MMM do, yyyy')

  const [weeklyDateFormat, setWeeklyDateFormat] = useState('YYYY-[W]ww')

  const [monthlyDateFormat, setMonthlyDateFormat] = useState('MM-YYYY')

  const [yearlyDateFormat, setYearlyDateFormat] = useState('YYYY')

  const getFormat = React.useCallback(async () => {
    setDailyDateFormat(await getDisplayDateFormat())
  }, [isMounted])

  React.useEffect(() => {
    getFormat()
  }, [getFormat])

  return {
    dailyDateFormat,
    weeklyDateFormat,
    monthlyDateFormat,
    yearlyDateFormat,
  }
}
