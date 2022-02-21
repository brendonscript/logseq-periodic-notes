export const triggerIconName = 'logseq-periodic-notes-trigger-icon'
export const openIconName = 'open-periodic-notes'

// TODO: Move these to a place power users can enabble
//* Feature flags *//
const enableUnfinished = false
const enableTemplates = false
const enableAutoTemplates = false
const enableQuarterlyNotes = false

export const FEATURE_ENABLE_UNFINISHED_FEATURES = enableUnfinished

export const FEATURE_ENABLE_TEMPLATES = enableUnfinished && enableTemplates

export const FEATURE_ENABLE_AUTO_TEMPLATES =
  enableUnfinished && enableTemplates && enableAutoTemplates

export const FEATURE_ENABLE_QUARTERLY_NOTES =
  enableUnfinished && enableQuarterlyNotes
