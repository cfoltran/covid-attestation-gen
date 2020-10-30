<template>
  <v-btn type="submit" class="white--text" :disabled="disabled" :color="color" @click="handleClick">
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
  name: 'ActionSubmit',
  props: {
    label: {
      type: String,
      default: '',
      required: false
    },
    color: {
      type: String,
      default: 'black'
    },
    isSaving: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localLabel: this.label ? this.label : this.$t('save')
    }
  },
  methods: {
    handleClick (event) {
      if (this.isSaving === false) {
        this.$emit('click', event)
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
