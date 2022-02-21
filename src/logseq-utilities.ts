import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'
import { FEATURE_ENABLE_QUARTERLY_NOTES } from './constants'

export const defaultWeeklyDateFormat = `yyyy-'W'ww`
export const defaultMonthlyDateFormat = 'MM-yyyy'
export const defaultYearlyDateFormat = 'yyyy'
export const defaultQuarterlyDateFormat = `QQ-yyyy`
export const buildSettingsSchema = () => {
  const dateFormatDescription = `Please use a string format based on the \`date-fns\` library. Formatting rules can be found [here](https://date-fns.org/v2.28.0/docs/format)`

  const finalSettings: SettingSchemaDesc[] = [
    {
      key: 'weeklyDateFormat',
      type: 'string',
      default: defaultWeeklyDateFormat,
      title: 'Weekly Date Format',
      description: dateFormatDescription,
    },
    {
      key: 'monthlyDateFormat',
      type: 'string',
      default: defaultMonthlyDateFormat,
      title: 'Monthly Date Format',
      description: dateFormatDescription,
    },
    {
      key: 'yearlyDateFormat',
      type: 'string',
      default: defaultYearlyDateFormat,
      title: 'Yearly Date Format',
      description: dateFormatDescription,
    },
    {
      key: 'enableWeeklyNotes',
      type: 'boolean',
      default: false,
      title: 'Enable weekly notes?',
      description: 'Enable the weekly notes functionality',
    },
    {
      key: 'enableMonthlyNotes',
      type: 'boolean',
      default: false,
      title: 'Enable monthly notes?',
      description: 'Enable the monthly notes functionality',
    },
    {
      key: 'enableYearlyNotes',
      type: 'boolean',
      default: true,
      title: 'Enable yearly notes?',
      description: 'Enable the yearly notes functionality',
    },
  ]

  const quarterlyNotesSettingsTemplates: SettingSchemaDesc[] = [
    {
      key: 'quarterlyDateFormat',
      type: 'string',
      default: defaultQuarterlyDateFormat,
      title: 'Quarterly Date Format',
      description: dateFormatDescription,
    },
    {
      key: 'enableQuarterlyNotes',
      type: 'boolean',
      default: false,
      title: 'Enable quarterly notes?',
      description: 'Enable the yearly notes functionality',
    },
  ]

  if (FEATURE_ENABLE_QUARTERLY_NOTES) {
    finalSettings.push(...quarterlyNotesSettingsTemplates)
  }

  return finalSettings
}

type LogseqSettingsType = typeof logseq.settings
export type BaseSettingsType = LogseqSettingsType & {
  weeklyDateFormat: string
  monthlyDateFormat: string
  yearlyDateFormat: string
  enableWeeklyNotes: boolean
  enableMonthlyNotes: boolean
  enableYearlyNotes: boolean
  disabled: boolean
}

export type QuarterlySettingsType = {
  quarterlyDateFormat: string
  enableQuarterlyNotes: boolean
}

export type SettingsType =
  | BaseSettingsType
  | (BaseSettingsType & QuarterlySettingsType)

export const openPage = (name: string) => {
  logseq.App.pushState('page', {
    name: name,
  })
}
