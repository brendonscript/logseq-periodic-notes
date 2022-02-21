import { format, parse } from 'date-fns'

// #region Date Utilities
export async function getDisplayDateFormat() {
  let format =
    (await logseq.App.getUserConfigs())?.preferredDateFormat ?? 'MMM do, yyyy'

  return format
}

export const toDate = (d: Date | string) => {
  if (typeof d !== 'string') {
    return d
  }
  return new Date(d)
}

export const formatAsDashed = (d: Date | string) => {
  return format(toDate(d), 'yyyy-MM-dd')
}

export const formatAsParam = (d: Date | string) => {
  return format(toDate(d), 'yyyyMMdd')
}

export const formatAsLocale = (d: Date | string, f: string) => {
  return format(toDate(d), f)
}

export const parseJournalDate = (d: number) => {
  return parse(`${d}`, 'yyyyMMdd', new Date())
}
//#endregion

// @ts-expect-error
export const css = (t, ...args) => String.raw(t, ...args)