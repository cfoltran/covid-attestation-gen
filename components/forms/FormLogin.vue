<template>
  <base-api-form
    endpoint="/auth/login"
    action-color="primary"
    success-infinite-load
    :payload="payload"
    :valid="valid"
    :button-disabled="!validate_recaptcha"
    has-no-button
    @success="onSuccessLogin"
    @validate="validate"
    @error="onErrorLogin"
  >
    <template v-slot:body>
      <v-card
        elevation-24
        width="35vw"
        style="padding: 20px; border: 1px; border-radius: 50px;"
      >
        <v-card-title>
          Login
        </v-card-title>
        <v-card-text>
          <input-email
            v-model="email"
            hide-details="auto"
            :error-messages="emailErrors"
            flat
          />
          <input-password
            v-model="password"
            hide-details="auto"
            :error-messages="passwordErrors"
            flat
          />
        </v-card-text>
        <v-card-actions>
          <v-row class="mx-auto">
            <action-save-page class="mx-auto" :label="$t('login')" rounded />
          </v-row>
        </v-card-actions>
      </v-card>
    </template>
  </base-api-form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import BaseApiForm from '~/components/forms/BaseApiForm'
import BaseApiFormValidation from '~/mixins/BaseApiFormValidation'
import InputEmail from '~/components/inputs/InputEmail'
import InputPassword from '~/components/inputs/InputPassword'
import ActionSavePage from '~/components/actions/ActionSavePage'

export default {
  name: 'FormLogin',
  components: {
    BaseApiForm,
    InputEmail,
    InputPassword,
    ActionSavePage
  },
  mixins: [validationMixin, BaseApiFormValidation],
  data () {
    return {
      email: '',
      password: '',
      remember_me: false,
      validate_recaptcha: false
    }
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  computed: {
    inDev () {
      return process.env.name === 'development'
    },
    payload () {
      return {
        email: this.email,
        password: this.password
      }
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push(this.$t('errors.email.format'))
      !this.$v.email.required && errors.push(this.$t('errors.email.required'))
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push(
        this.$t('errors.password.required')
      )
      return errors
    }
  },
  methods: {
    onErrorRecaptcha (error) {
      console.error('Error happened:', error)
    },
    onSuccessRecaptcha () {
      this.validate_recaptcha = true
    },
    onErrorLogin () {
      try {
        window.grecaptcha.reset()
        this.validate_recaptcha = false
      } catch (error) {
        console.error(error)
      }
    },
    onSuccessLogin (response) {
      this.is_loading = false
      this.$store.commit('setUser', response.user)
      this.$store.commit('setToken', response.token)
      this.$colorManager.initColor()
      this.$router.push('/')
    }
  }
}
</script>
