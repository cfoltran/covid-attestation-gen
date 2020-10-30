<template>
  <v-text-field
    type="password"
    autocomplete="new-password"
    :value="value"
    :label="label || $t('labels.value')"
    :error-messages="confirmationErrors"
    v-bind="$attrs"
    required
    @input="onInput"
    v-on="this.$listeners"
  />
</template>

<script>
import BaseInput from '~/mixins/BaseInput'

export default {
  name: 'InputPassword',
  mixins: [BaseInput],
  props: {
    label: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      confirmation: ''
    }
  },
  validations: {
    confirmation: {
      confirm () {
        if (this.confirm === false) {
          return true
        }
        return this.value === this.confirmation
      }
    }
  },
  computed: {
    errors () {
      const errors = []
      if (!this.$v.value.$dirty) {
        return errors
      }
      !this.$v.value.strongPassword && errors.push(this.$t('errors.strong'))
      !this.$v.value.required && errors.push(this.$t('errors.required'))
      return errors
    },
    confirmationErrors () {
      const errors = []
      if (this.confirm) {
        if (!this.$v.confirmation.$dirty) {
          return errors
        }
        !this.$v.confirmation.confirm && errors.push(this.$t('errors.confirm'))
      }
      return errors
    }
  }
}
</script>

<i18n>
  {
    "fr": {
      "labels": {
        "value": "Mot de passe",
        "confirm": "Confirmer mot de passe"
      },
      "errors": {
        "required": "Le mot de passe est obligatoire",
        "strong": "Le mot de passe doit contenir au minimum une lettre, un chiffre et contenir au minimum 8 charactères.",
        "confirm": "Le mot de passe doit être identique."
      }
    },
    "en": {
      "labels": {
        "value": "Password",
        "confirm": "Confirm password"
      },
      "errors": {
        "required": "The password is required",
        "strong": "The password should contain at least a letter, a number and a minimum of 8 characters.",
        "confirm": "The password must be the same."
      }
    },
    "es": {
      "labels": {
        "value": "Contraseña",
        "confirm": "Confirmar contraseña"
      },
      "errors": {
        "required": "La contraseña es obligatoria",
        "strong": "La contraseña debe contener al menos una letra, un número y un mínimo de 8 caracteres.",
        "confirm": "La contraseña debe ser la misma."
      }
    }
  }
</i18n>
