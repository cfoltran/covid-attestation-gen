<template>
  <div>
    <v-stepper
      v-model="current_step"
      vertical
      class="form-register__stepper mx-auto mt-10"
      style="padding: 20px; border: 1px; border-radius: 30px;"
    >
      <template>
        <v-stepper-step
          :complete="current_step > 1"
          editable
          step="1"
          color="black"
          class="white--text"
        >
          {{ $t('headers.step1') }}
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="current_step > 2"
          editable
          step="2"
          color="black"
          class="white--text"
        >
          {{ $t('headers.step2') }}
        </v-stepper-step>
      </template>
      <v-stepper-items>
        <v-stepper-content step="1">
          <input-text
            v-model="step1.login"
            :loading="login_validating"
            :label="$t('labels.step1.login')"
            :error-messages="loginErrors"
            @keyup.enter="validateStep1"
            @blur="validateLogin()"
          />
          <input-email
            id="username"
            v-model="step1.email"
            :loading="email_validating"
            :error-messages="(error_email)
              ? emailErrors.concat(error_email)
              : emailErrors"
            name="username"
            @keyup.enter="validateStep1"
            @blur="validateEmail()"
          />
          <input-text
            v-model="step1.first_name"
            :label="$t('labels.step1.first-name')"
            :error-messages="firstNameErrors"
            @keyup.enter="validateStep1"
          />
          <input-text
            v-model="step1.last_name"
            :label="$t('labels.step1.last-name')"
            :error-messages="lastNameErrors"
            @keyup.enter="validateStep1"
          />
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="step1.date"
                label="Birthday date"
                prepend-icon="event"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              ref="picker"
              v-model="step1.date"
              @change="save"
            />
          </v-menu>
          <v-btn
            id="next-1"
            class="mt-5 white--text"
            color="black"
            @click="validateStep1"
          >
            {{ $t('next') }}
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <input-password
            v-model="step2.password"
            :label="$t('labels.step2.password')"
            :error-messages="passwordErrors"
            @keyup.enter="validateStep2"
          />
          <input-password
            v-model="step2.password_confirmation"
            :label="$t('labels.step2.password-confirmation')"
            :error-messages="passwordConfirmationErrors"
            @keyup.enter="validateStep2"
          />
          <v-btn color="white" class="mt-5" @click="current_step = 1">
            {{ $t('previous') }}
          </v-btn>
          <v-btn
            color="black"
            class="mt-5 white--text"
            @click="submit"
          >
            <v-progress-circular
              v-if="is_loading"
              indeterminate
              color="white"
            />
            <span v-else>
              {{ $t('register') }}
            </span>
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
/* eslint-disable operator-linebreak */
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import InputEmail from '~/components/inputs/InputEmail'
import InputText from '~/components/inputs/InputText'
import InputPassword from '~/components/inputs/InputPassword'

export default {
  name: 'RegisterForm',
  components: {
    InputText,
    InputEmail,
    InputPassword
  },
  mixins: [validationMixin],
  nuxtI18n: {
    paths: {
      fr: '/inscription',
      en: '/register'
    }
  },
  data () {
    return {
      current_step: 1,
      error: false,
      is_loading: false,
      max_date: this.$moment().format('YYYY-MM-DD'),
      picker: new Date().toISOString().substr(0, 10),
      error_email: '',
      error_subdomain: '',
      menu: false,
      validate_recaptcha: false,
      email_validating: false,
      login_validating: false,
      step1: {
        login: '',
        email: '',
        first_name: '',
        last_name: '',
        date: null
      },
      step2: {
        password: '',
        password_confirmation: ''
      }
    }
  },

  validations: {
    step1: {
      login: { required },
      email: { required, email },
      first_name: { required },
      last_name: { required },
      date: {
        required,
        goodDate (date) {
          return (
            +date.substr(0, 4) > 2005
          )
        }
      }
    },
    step2: {
      password: {
        required,
        strongPassword (password) {
          return (
            /[a-zA-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            password.length >= 8
          )
        }
      },
      password_confirmation: {
        sameAs () {
          return this.step2.password === this.step2.password_confirmation
        }
      }
    }
  },
  computed: {
    dateErrors () {
      const errors = []
      if (!this.$v.step1.date.$dirty) {
        return errors
      }
      !this.$v.step1.date.goodDate && errors.push(this.$t('errors.date.valid'))
      !this.$v.step1.date.required && errors.push(
        this.$t('errors.date.required')
      )
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.step1.email.$dirty) {
        return errors
      }
      !this.$v.step1.email.email && errors.push(this.$t('errors.email.format'))
      !this.$v.step1.email.required && errors.push(
        this.$t('errors.email.required')
      )
      return errors
    },
    loginErrors () {
      const errors = []
      if (!this.$v.step1.login.$dirty) {
        return errors
      }
      !this.$v.step1.login.required && errors.push(
        this.$t('errors.login.required')
      )
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.step1.first_name.$dirty) {
        return errors
      }
      !this.$v.step1.first_name.required && errors.push(
        this.$t('errors.first-name.required')
      )
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.step1.last_name.$dirty) {
        return errors
      }
      !this.$v.step1.last_name.required && errors.push(
        this.$t('errors.last-name.required')
      )
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.step2.password.$dirty) {
        return errors
      }
      !this.$v.step2.password.required && errors.push(
        this.$t('errors.password.required')
      )
      !this.$v.step2.password.strongPassword && errors.push(
        this.$t('errors.password.strong')
      )
      return errors
    },
    passwordConfirmationErrors () {
      const errors = []
      if (!this.$v.step2.password_confirmation.$dirty) {
        return errors
      }
      !this.$v.step2.password_confirmation.sameAs && errors.push(
        this.$t('errors.password-confirmation.same-as')
      )
      return errors
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    'step1.email' () {
      this.error_email = ''
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    async validateEmail () {
      if (this.step1.email) {
        this.email_validating = true
        try {
          await this.$axios.get(`validate/email/${this.step1.email}`)
        } catch (error) {
          this.$alerts.error(error)
          this.error_email = error.response.message
          this.email_validating = false
        } finally {
          this.email_validating = false
        }
      }
    },
    async validateLogin () {
      if (this.step1.login) {
        this.login_validating = true
        try {
          await this.$axios.get(`validate/login/${this.step1.login}`)
        } catch (error) {
          this.$alerts.error(error)
          this.error_login = error.response.message
          this.login_validating = false
        } finally {
          this.login_validating = false
        }
      }
    },
    async validateStep1 () {
      this.$v.step1.$touch()
      const isValid = this.$v.step1.email.$invalid === false
                      && this.$v.step1.first_name.$invalid === false
                      && this.$v.step1.last_name.$invalid === false
                      && this.$v.step1.login.$invalid === false
      if (isValid) {
        await this.validateEmail()
        await this.validateLogin()
        if (!this.error_email && !this.error_login) {
          this.current_step = 2
        }
      }
    },
    validateStep2 () {
      this.$v.step2.$touch()
      return this.$v.step2.password.$invalid === false
              && this.$v.step2.password_confirmation.$invalid === false
    },
    onErrorRecaptcha (error) {
      console.error('Error happened:', error)
    },
    onSuccessRecaptcha () {
      this.validate_recaptcha = true
    },
    async submit (event) {
      event.preventDefault()
      if (this.is_loading) {
        return
      }
      if (this.validateStep2()) {
        this.is_loading = true
        const body = {
          email: this.step1.email,
          login: this.step1.login,
          firstName: this.step1.first_name,
          lastName: this.step1.last_name,
          password: this.step2.password,
          retypedPassword: this.step2.password_confirmation,
          dateOfBirth: this.step1.date,
          locale: this.$i18n.locale
        }
        try {
          const response = await this.$axios.post('/auth/register', body)
          this.is_loading = false
          this.$store.commit('setUser', response.data.user)
          this.$store.commit('setToken', response.data.token)
          this.$router.push('/')
        } catch (error) {
          this.is_loading = false
          console.error(error)
        }
      }
    }
  }
}
</script>

<i18n>
  {
    "fr": {
      "headers": {
        "step1": "Informations general",
        "step2": "Choisir un mot de passe"
      },
      "labels": {
        "step1": {
          "login": "Pseudo",
          "first-name": "Prénom",
          "last-name": "Nom de famille"
        },
        "step2": {
          "password": "Mot de passe",
          "password-confirmation": "Confirmer mot de passe"
        }
      },
      "errors": {
        "date": {
          "valid": "Vous devez avoir au minimum 15 ans",
          "required": "La date d'anniversaire est requis"
        },
        "login": {
          "required": "Le pseudo est requis"
        },
        "email": {
          "required": "Le courriel est requis",
          "format": "Le format du courriel n'est pas valide"
        },
        "first-name": {
          "required": "Le prénom est requis"
        },
        "last-name": {
          "required": "Le nom de famille est requis"
        },
        "password": {
          "required": "Le mot de passe est requis",
          "strong": "Le mot de passe doit être de 8 caractères ou plus et contenir au minimum une lettre et un chiffre."
        },
        "password-confirmation": {
          "same-as": "Le mot de passe doit être identique."
        },
        "shop-name": {
          "required": "Le nom de la boutique est requis"
        },
        "accept-terms": {
          "required": "Vous devez accepter les termes et conditions"
        }
      },
      "next": "Suivant",
      "previous": "Précédent",
      "register": "Valider",
      "and": "et",
      "new-window": "Nouvelle fenêtre",
      "terms-label": "termes & conditions",
      "policies-label": "politiques de confidentialité"
    },
    "en": {
      "headers": {
        "step1": "Basic information",
        "step2": "Choose a password"
      },
      "labels": {
        "step1": {
          "login": "Login",
          "first-name": "First name",
          "last-name": "Last name"
        },
        "step2": {
          "password": "New password",
          "password-confirmation": "Confirm password"
        }
      },
      "errors": {
        "login": {
          "required": "Login is required"
        },
        "email": {
          "required": "E-mail is required",
          "email": "Must be valid e-mail"
        },
        "first-name": {
          "required": "The first name is required"
        },
        "last-name": {
          "required": "The last name is required"
        },
        "password": {
          "required": "The password is required",
          "strong": "The password must contain 8 characters or more and must also contain at least one letter and one number."
        },
        "password-confirmation": {
          "same-as": "The password does not match"
        },
        "shop-name": {
          "required": "The shop name is required"
        },
        "accept-terms": {
          "required": "You need to accept the terms and conditions"
        }
      },
      "next": "Next",
      "previous": "Previous",
      "register": "Validate",
      "and": "and",
      "new-window": "New Window",
      "terms-label": "Terms and Conditions",
      "policies-label": "Privacy Policy"
    }
  }
</i18n>
