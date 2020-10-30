<template>
  <v-text-field
    type="email"
    :value="value"
    :label="$t('label')"
    required
    autocomplete="email"
    v-bind="$attrs"
    v-on="this.$listeners"
    @input="onInput"
  />
</template>
<script>
import BaseInput from '~/mixins/BaseInput'
export default {
  name: 'InputEmail',
  mixins: [BaseInput]
}
</script>
<i18n>
    {
    "fr": {
      "label": "Adresse courriel"
    },
    "en": {
      "label": "Email address"
    },
    "es": {
      "label": "El correo electrónico"
    }
  }
</i18n>
