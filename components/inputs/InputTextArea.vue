<template>
  <v-textarea
    :value="value"
    v-bind="$attrs"
    v-on="this.$listeners"
  />
</template>

<script>
import BaseInput from '~/mixins/BaseInput'

export default {
  name: 'InputTextArea',
  mixins: [BaseInput]
}
</script>
