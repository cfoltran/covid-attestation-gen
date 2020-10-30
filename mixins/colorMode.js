export default {
  name: 'colorModeMixin',
  computed: {
    colorMode () {
      return this.$colorMode.value
    }
  },
  watch: {
    colorMode () {
      this.$vuetify.theme.dark = (this.$colorMode.value === 'dark')
    }
  }
}
