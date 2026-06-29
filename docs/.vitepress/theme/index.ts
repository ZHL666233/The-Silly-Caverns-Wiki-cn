import DefaultTheme from 'vitepress/theme'
import './colors.css'
import Tabber from './components/Tabber.vue'
import Infobox from './components/Infobox.vue'
import TierBadge from './components/TierBadge.vue'
import HomePage from './components/HomePage.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Tabber', Tabber)
    app.component('Infobox', Infobox)
    app.component('TierBadge', TierBadge)
    app.component('HomePage', HomePage)
  }
}
