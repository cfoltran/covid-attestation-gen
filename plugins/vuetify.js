import Vue from 'vue'
import Vuetify, {
  VDatePicker,
  VRow,
  VTextField,
  VMenu,
  VRadio,
  VApp,
  VMain,
  VFooter,
  VSnackbar,
  VBtn,
  VRadioGroup
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VDatePicker,
    VRow,
    VTextField,
    VMenu,
    VRadio,
    VApp,
    VMain,
    VFooter,
    VSnackbar,
    VBtn,
    VRadioGroup
  },
  options: {
    minifyTheme (css) {
      return css.replace(/[\s|\r\n|\r|\n]/g, '')
    }
  },
  iconfont: ['mdi']
})
