/* eslint-disable vue/max-len */
export default {
  data () {
    return {
      valid: false,
      emailRegex: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
    }
  },
  methods: {
    validate () {
      this.$v.$touch()
      this.valid = this.$v.$invalid === false
    }
  }
}
