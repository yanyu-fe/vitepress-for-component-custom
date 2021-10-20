import DefaultTheme from 'vitepress/dist/client/theme-default'
import 'icpx-ui/dist/icons.js'

console.log('Sdsds')
export default {
  ...DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
}
