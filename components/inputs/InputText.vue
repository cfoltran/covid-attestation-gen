<template>
  <v-text-field
    :value="value"
    v-bind="$attrs"
    v-on="this.$listeners"
  />
</template>

<script>
import BaseInput from '~/mixins/BaseInput'

export default {
  name: 'InputText',
  mixins: [BaseInput]
}
</script>
