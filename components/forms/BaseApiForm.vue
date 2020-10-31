 <!-- eslint-disable operator-linebreak -->
<template>
  <v-form class="base-api-form" @submit="submit">
    <slot name="body" />
    <div class="base-api-form__action-container">
      <action-submit
        v-if="!hasNoButton"
        class="test--submit mt-3"
        :label="actionLabel"
        :is-saving="isSaving"
        :disabled="buttonDisabled"
        @click="submit"
      />
    </div>
  </v-form>
</template>

<script>
import ActionSubmit from '~/components/actions/ActionSubmit'

export default {
  name: 'BaseApiForm',
  inherit: true,
  components: {
    ActionSubmit
  },
  props: {
    endpoint: {
      type: String,
      required: true
    },
    actionLabel: {
      type: String,
      default: '',
      required: false
    },
    headers: {
      type: Object,
      default: () => {},
      required: false
    },
    method: {
      type: String,
      required: false,
      default: 'post'
    },
    payload: {
      type: Object,
      required: true
    },
    valid: {
      type: Boolean,
      required: false
    },
    noValidation: {
      type: Boolean,
      required: false,
      default: false
    },
    beforeSubmit: {
      type: Function,
      required: false,
      default: null
    },
    successInfiniteLoad: {
      type: Boolean,
      required: false,
      default: false
    },
    hasNoButton: {
      type: Boolean,
      required: false,
      default: false
    },
    forceUpload: {
      type: Boolean,
      required: false,
      default: false
    },
    buttonBorder: {
      type: Boolean,
      required: false
    },
    buttonDisabled: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      isSaving: false,
      error: false,
      is_submiting: false
    }
  },
  mounted () {
    this.$bus.$on('savePage', event => this.submit(event))
  },
  beforeDestroy () {
    this.$bus.$off('savePage')
  },
  methods: {
    submit (event) {
      if (this.is_submiting) {
        return
      }
      this.is_submiting = true
      event.preventDefault()

      if (this.noValidation === false) {
        this.$emit('validate')
      }
      this.$nextTick(async () => {
        if (this.valid || this.noValidation === true) {
          this.isSaving = true
          this.error = false
          this.$bus.$emit('baseApiSaving')
          if (this.beforeSubmit !== null) {
            try {
              await this.beforeSubmit()
            } catch (error) {
              this.handleError(error)
              this.isSaving = false
              this.$bus.$emit('baseApiDoneSaving')
              return
            }
          }
          if (typeof this.endpoint === 'undefined') {
            this.save_files()
          } else {
            try {
              const config = {
                method: this.method,
                url: this.endpoint,
                data: this.payload
              }
              if (this.headers) {
                config.headers = this.headers
              }
              const response = await this.$axios.$request(config)
              if (Array.isArray(this.files) && this.files.length > 0) {
                this.save_files(response)
              } else {
                this.handleSuccess(response)
              }
            } catch (error) {
              this.handleError(error)
            }
          }
        }
      })
      this.is_submiting = false
    },
    handleSuccess (response) {
      this.isSaving = false
      this.$emit('success', response)
      this.$bus.$emit('baseApiDoneSaving')
    },
    handleError (error) {
      console.error(error)
      this.$emit('error', error)
      this.isSaving = false
      this.$bus.$emit('baseApiDoneSaving')
    }
  }
}
</script>

<i18n>
  {
    "fr": {
      "unhandled-exception":  "Une erreur inattendue est survenue."
    },
    "en": {
      "unhandled-exception":  "Woops! An unhandled error occured."
    },
    "es": {
    }
  }
</i18n>
