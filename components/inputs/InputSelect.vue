<template>
  <v-select
    :value="value"
    :items="items"
    :label="label"
    :hide-details="hideDetails"
    v-bind="$attrs"
    @input="onInput"
  />
</template>

<script>
import BaseInput from '~/mixins/BaseInput'

export default {
  name: 'InputSelect',
  mixins: [BaseInput],
  props: {
    itemDisabled: {
      required: false,
      type: Array,
      default: () => []
    },
    label: {
      required: false,
      type: String,
      default: ''
    },
    items: {
      required: true,
      type: Array
    },
    hideDetails: {
      type: [Boolean, String],
      required: false,
      default: false
    }
  }
}
</script>
