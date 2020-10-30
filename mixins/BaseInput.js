import { validationMixin } from 'vuelidate'

export default {
  name: 'BaseInput',
  mixins: [validationMixin],
  props: {
    value: {
      required: true
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event)
    }
  }
}
