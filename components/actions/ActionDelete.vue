<template>
  <div>
    <v-btn
      text
      color="error"
      outlined
      :loading="is_loading"
      dark
      @click="confirm"
    >
      <slot>
        {{ $t('delete') }}
      </slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ActionDelete',
  props: {
    endpoint: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      is_loading: false,
      dialog: false
    }
  },
  methods: {
    async confirm () {
      if (this.is_loading) { return }
      this.is_loading = true
      try {
        await this.$axios.$delete(this.endpoint)
        this.$emit('delete')
        this.is_loading = false
        this.dialog = false
      } catch (error) {
        this.$alerts.error(error)
        this.is_loading = false
        this.dialog = false
        console.error(error)
      }
    }
  }
}
</script>

<i18n>
  {
    "fr": {
      "delete": "Supprimer",
      "header": "Attention!",
      "body": "Cette action est irréversible. Voulez-vous continuer?",
      "cancel": "Annuler",
      "confirm": "Confirmer"
    },
    "en": {
      "delete": "Delete",
      "header": "Caution",
      "body": "This action cannot be undone. Are you sure you want to proceed?",
      "cancel": "Cancel",
      "confirm": "Confirm"
    },
    "es": {
    }
  }
</i18n>
