import '@logseq/libs'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { openIconName, triggerIconName } from './constants'
import { logseq as PL } from '../package.json'
import { css } from './utils'

const magicKey = `__${PL.id}__loaded__`

function main() {
  const pluginId = logseq.baseInfo.id
  console.info(`#${pluginId}: MAIN`)

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
  )

  const createModel = () => {
    return {
      show() {
        logseq.showMainUI()
      },
    }
  }

  logseq.provideModel(createModel())
  logseq.setMainUIInlineStyle({
    position: 'fixed',
    zIndex: 11,
  })

  if (process.env.NODE_ENV === 'development') {
    // @ts-expect-error
    top[magicKey] = true
  }

  logseq.provideStyle(css`
    div[data-injected-ui=${openIconName}-${pluginId}] {
      display: flex;
      align-items: center;
      font-weight: 500;
      position: relative;
    }
  `)

  logseq.App.registerUIItem('toolbar', {
    key: openIconName,
    template: `
    <a data-on-click="show" class="button" style="font-size: 20px;" id="${triggerIconName}">
      X
    </a>
  `,
  })
}

if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error
  if (top[magicKey]) {
    // logseq.ready(main).catch(console.error)
    location.reload()
  }
}

logseq.ready(main).catch(console.error)
