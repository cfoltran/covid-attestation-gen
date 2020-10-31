<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="computedDateFormatted"
        v-bind="$attrs"
        readonly
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      no-title
      v-bind="$attrs"
      v-on="this.$listeners"
    />
  </v-menu>
</template>
<script>
import BaseInput from '~/mixins/BaseInput'

export default {
  name: 'InputDate',
  mixins: [BaseInput],
  data () {
    return {
      date: '',
      menu: false,
      dateFormatted: ''
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
      this.$emit('input', this.dateFormatted)
    }
  },
  mounted () {
    if (this.$props.value) {
      const innerDate = this.$moment(this.$props.value)
      this.date = innerDate.format('YYYY-MM-DD')
      this.dateFormatted = this.formatDate(this.date)
      this.$emit('input', this.dateFormatted)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) { return null }
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
