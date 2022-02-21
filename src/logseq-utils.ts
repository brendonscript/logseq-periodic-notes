export const openPage = (name: string) => {
  logseq.App.pushState('page', {
    name: name,
  })
}
