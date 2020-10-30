<template>
  <v-btn class="white--text" type="submit" :color="color" :rounded="rounded" @click="handleClick">
    <v-progress-circular
      v-if="isSaving"
      indeterminate
      color="white"
      size="24"
      width="3"
    />
    <span v-else>{{ localLabel }}</span>
  </v-btn>
</template>

<script>
export default {
  name: 'ActionSavePage',
  props: {
    rounded: {
      type: Boolean,
      default: false,
      required: true
    },
    label: {
      type: String,
      default: null,
      required: false
    },
    color: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      localLabel: this.label ? this.label : this.$t('save'),
      isSaving: false
    }
  },
  mounted () {
    this.$bus.$on('baseApiSaving', () => { this.isSaving = true })
    this.$bus.$on('baseApiDoneSaving', () => { this.isSaving = false })
  },
  methods: {
    handleClick (event) {
      if (this.isSaving === false) {
        this.$emit('click', event)
        this.$bus.$emit('savePage', event)
      }
    }
  }
}
</script>

<i18n>
  {
    "fr": {
      "save": "Enregistrer"
    },
    "en": {
      "save": "Save"
    },
    "es": {
    }
  }
</i18n>
