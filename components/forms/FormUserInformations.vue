<template>
  <v-container>
    <input-text v-model="first_name" label="Prenom" :error-messages="firstNameErrors" />
    <input-text v-model="last_name" label="Nom" :error-messages="lastNameErrors" />
    <v-menu
      ref="menu"
      v-model="menu_date"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="birthdate"
          :error-messages="dateBornError"
          label="Date de naissance"
          prepend-icon="event"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        ref="picker"
        v-model="birthdate"
        :error-messages="dateBornError"
        @change="updateDatePicker"
      />
    </v-menu>
    <input-text v-model="birthplace" label="Lieu de naissance" :error-messages="cityBornError" />
    <input-text v-model="address" label="Adresse" :error-messages="addressError" />
    <input-text v-model="city" label="Ville" :error-messages="cityError" />
    <input-text v-model="zip" label="Code postal" :error-messages="zipError" />
    <v-row>
      <v-btn class="mx-auto" @click="save">
        Enregistrer
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import BaseApiFormValidation from '~/mixins/BaseApiFormValidation'
import InputText from '~/components/inputs/InputText'

export default {
  name: 'FormUserInformations',
  components: {
    InputText
  },
  mixins: [validationMixin, BaseApiFormValidation],
  validations () {
    return {
      birthdate: {
        goodDate () {
          return !!this.birthdate &&
            new Date(this.birthdate).getTime() <= new Date(2015, 11, 17).getTime() &&
            new Date(this.birthdate).getTime() >= new Date(1900, 11, 17).getTime()
        }
      },
      zip: {
        goodZip () {
          return (this.zip >= 971 && this.zip <= 978) ||
          (this.zip >= 986 && this.zip <= 989) ||
          !!this.zip.match(/\b\d{5}\b/g)
        }
      },
      first_name: { required },
      last_name: { required },
      birthplace: { required },
      address: { required },
      city: { required }
    }
  },
  watch: {
    menu_date (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  data () {
    return {
      dom_tom_arr: ['971', '972', '973', '974', '975', '976'],
      menu_date: '',
      first_name: '',
      last_name: '',
      birthdate: null,
      birthplace: '',
      address: '',
      city: '',
      zip: ''
    }
  },
  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.first_name.$dirty) { return errors }
      !this.$v.first_name.required && errors.push('Le prenom est requis')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.last_name.$dirty) { return errors }
      !this.$v.last_name.required && errors.push('Le nom est requis')
      return errors
    },
    dateBornError () {
      const errors = []
      if (!this.$v.birthdate.$dirty) { return errors }
      !this.$v.birthdate.goodDate && errors.push('La date de naissance n\'est pas valide')
      return errors
    },
    cityBornError () {
      const errors = []
      if (!this.$v.birthplace.$dirty) { return errors }
      !this.$v.birthplace.required && errors.push('La ville de naissance est renseigné')
      return errors
    },
    addressError () {
      const errors = []
      if (!this.$v.address.$dirty) { return errors }
      !this.$v.address.required && errors.push('L\'adresse est requis')
      return errors
    },
    cityError () {
      const errors = []
      if (!this.$v.city.$dirty) { return errors }
      !this.$v.city.required && errors.push('La ville est requise')
      return errors
    },
    zipError () {
      const errors = []
      if (!this.$v.zip.$dirty) { return errors }
      !this.$v.zip.goodZip && errors.push('Le code postal n\'est pas valide')
      return errors
    }
  },
  methods: {
    updateDatePicker (date) {
      this.$refs.menu.save(date)
    },
    save () {
      this.validate()
      if (this.valid) {
        const user = {
          first_name: this.first_name,
          last_name: this.last_name,
          birthdate: this.birthdate,
          birthplace: this.birthplace,
          address: this.address,
          city: this.city,
          zip: this.zip
        }
        this.$store.commit('setUser', user)
      }
    }
  }
}
</script>
