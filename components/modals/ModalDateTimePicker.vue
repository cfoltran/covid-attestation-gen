<template>
  <v-dialog v-model="display" max-width="340">
    <template v-slot:activator="{ on }">
      <input-text
        :ref="refError"
        class="test---input-date-time"
        v-bind="textFieldProps"
        :disabled="disabled"
        :loading="loading"
        :label="label"
        :value="selectedDatetime"
        readonly
        outlined
        :error-messages="errorMessages"
        v-on="on"
      >
        <template v-slot:progress>
          <slot name="progress">
            <v-progress-linear color="primary" indeterminate absolute height="2" />
          </slot>
        </template>
      </input-text>
    </template>
    <v-card>
      <v-card-text class="px-0 py-0">
        <v-tabs v-model="activeTab" fixed-tabs>
          <v-tab key="calendar">
            {{ $t('labels.date') }}
          </v-tab>
          <v-tab key="timer" :disabled="dateSelected">
            {{ $t('labels.time') }}
          </v-tab>
          <v-tab-item key="calendar">
            <v-date-picker
              v-model="date"
              v-bind="datePickerProps"
              :locale="$i18n.locale"
              full-width
              @input="showTimePicker"
            />
          </v-tab-item>
          <v-tab-item key="timer">
            <v-time-picker
              ref="timer"
              v-model="time"
              class="v-time-picker-custom"
              :locale="$i18n.locale"
              v-bind="timePickerProps"
              full-width
            />
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <slot name="actions" :parent="this">
          <v-btn color="grey lighten-1" text @click.native="clearHandler">
            {{ $t('labels.clear') }}
          </v-btn>
          <v-btn color="green darken-1" class="test--ok-modal-date-time" text @click="okHandler">
            {{ $t('labels.ok') }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import InputText from '~/components/inputs/InputText'
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DIALOG_WIDTH = 340

export default {
  name: 'ModalDateTimePicker',
  components: {
    InputText
  },
  model: {
    prop: 'datetime',
    event: 'input'
  },
  props: {
    refError: {
      type: String,
      required: false,
      default: ''
    },
    errorMessages: {
      type: Array,
      required: false,
      default: () => []
    },
    datetime: {
      type: [Date, String],
      default: null
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    },
    dialogWidth: {
      type: Number,
      default: DEFAULT_DIALOG_WIDTH
    },
    timeFormat: {
      type: String,
      default: 'HH:mm'
    },
    textFieldProps: {
      type: Object,
      required: false,
      default: () => {}
    },
    datePickerProps: {
      type: Object,
      required: false,
      default: () => {}
    },
    timePickerProps: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      display: false,
      activeTab: 0,
      date: '',
      time: ''
    }
  },
  computed: {
    selectedDatetime () {
      return (this.date && this.time)
        ? this.$moment(`${this.date} ${this.time}`).locale(this.$i18n.locale).format('LLL')
        : this.$t('labels.default')
    },
    dateSelected () {
      return !this.date
    }
  },
  watch: {
    datetime () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (!this.datetime) { return }
      this.date = this.$moment(this.datetime).format('YYYY-MM-DD')
      this.time = this.$moment(this.datetime).format('hh:mm:ss')
    },
    okHandler () {
      this.resetPicker()
      const datetime = this.$moment(`${this.date} ${this.time}`).format()
      this.$emit('input', datetime)
    },
    clearHandler () {
      this.resetPicker()
      this.date = ''
      this.time = DEFAULT_TIME
      this.$emit('input', null)
    },
    resetPicker () {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) { this.$refs.timer.selectingHour = true }
    },
    showTimePicker () {
      this.activeTab = 1
    }
  }
}
</script>
<i18n>
  {
    "fr": {
      "success": "Vos paramètres généraux ont été sauvegardés.",
      "labels": {
        "ok": "Ok",
        "clear": "Retour",
        "date": "Date",
        "time": "Horaire",
        "default": "Date de publication"
      },
      "titles": {
       "blog": "Article",
       "optimization": "Optimisation SEO (optionnel)",
       "subtitle-optimization": "Optimisez cet article pour les moteurs de recherche en remplissant ces champs.",
       "option-blog": "Options de l'article",
       "subtitle-option-blog": "Categorie d'articles."
      }
    },
    "en": {
      "success": "Your general settings were saved successfully",
      "labels": {
        "ok": "Ok",
        "clear": "Clear",
        "date": "Date",
        "time": "Time",
        "default": "Publication date"
      },
      "titles": {
       "blog": "Blog",
       "optimization": "Optimization SEO (optionnal)",
       "subtitle-optimization": "Optimize this article information for search engines by filling these fields.",
       "option-blog": "Blog options.",
       "subtitle-option-blog": "Category of articles."
      }
    },
    "es": {
    }
  }
</i18n>
