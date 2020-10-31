<template>
  <v-container class="mt-10">
    <v-alert
      v-if="error"
      type="error"
    >
      {{ error }}
    </v-alert>
    <h1>Choisissez un motif de déplacement</h1>
    <p>
      Certifie que mon déplacement est lié au motif suivant (cocher la case)
      autorisé par le décret n°2020-1310
      du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à
      l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire
      <a @click="hint_1 = !hint_1">[1]</a> :
    </p>
    <p v-if="hint_1" class="caption">
      [1] Les personnes souhaitant bénéficier de l'une de ces exceptions doivent se munir s'il y a lieu,
      lors de leurs déplacements hors de leur domicile, d'un document leur permettant de justifier
      que le déplacement considéré entre dans le champ de l'une de ces exceptions.
    </p>
    <v-radio-group
      v-model="reason"
      class="mt-10"
      :error-messages="reasonErrors"
    >
      <v-radio>
        <template v-slot:label>
          <v-container>
            <v-row>
              <p>
                Déplacements entre le domicile et le lieu d’exercice de l’activité
                professionnelle ou un établissement d’enseignement ou de formation,
                déplacements professionnels ne pouvant être différés
                <a @click="hint_2 = !hint_2">[2]</a>, déplacements pour un concours ou un examen.
              </p>
            </v-row>
            <v-row v-if="hint_2">
              <p class="caption">
                [2] A utiliser par les travailleurs non salariés, lorsqu'ils ne peuvent
                disposer d'un justificatif de déplacement établi par leur employeur.
              </p>
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              <p>
                Déplacements pour effectuer des achats de fournitures nécessaires
                à l'activité professionnelle, des achats de première nécessité
                <a @click="hint_3 = !hint_3">[3]</a>
                dans des établissements dont les activités demeurent autorisées, le retrait
                de commande et les livraisons à domicile;
              </p>
            </v-row>
            <v-row v-if="hint_3">
              <p class="caption">
                [3] Y compris les acquisitions à titre gratuit (distribution de denrées alimentaires...)
                et les déplacements liés à la perception de prestations sociales et au retrait d'espèces.
              </p>
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              Consultations, examens et soins ne pouvant être assurés
              à distance et l’achat de médicaments
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              Déplacements pour motif familial impérieux, pour l'assistance
              aux personnes vulnérables et précaires ou la garde d\'enfants
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              Déplacement des personnes en situation de handicap et leur accompagnant
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              Déplacements brefs, dans la limite d'une heure quotidienne
              et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à
              l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive
              collective et de toute proximité avec d'autres personnes, soit à la promenade
              avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              Convocation judiciaire ou administrative et pour se rendre dans un service public
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              Participation à des missions d\'intérêt général sur demande de l\'autorité administrative
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio class="mt-3">
        <template v-slot:label>
          <v-container>
            <v-row>
              Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires
            </v-row>
          </v-container>
        </template>
      </v-radio>
    </v-radio-group>
    <v-row>
      <v-btn class="mx-auto" :loading="is_loading" @click="generate">
        Générer mon attestation
      </v-btn>
    </v-row>
    <v-row>
      <v-btn v-if="pdf_link" :href="pdf_link" target="_blank" download="toto">
        Voir mon attestation
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import BaseApiFormValidation from '~/mixins/BaseApiFormValidation'

/* eslint-disable no-multi-str */
export default {
  name: 'FormGenerateCertificates',
  mixins: [validationMixin, BaseApiFormValidation],
  validations () {
    return {
      reason: { required }
    }
  },
  data () {
    return {
      hour: new Date().getHours(),
      minutes: new Date().getMinutes(),
      pdf_link: '',
      is_loading: false,
      error: null,
      reason: null,
      hint_1: false,
      hint_2: false,
      hint_3: false,
      radio_check: [
        'travail',
        'achats',
        'sante',
        'famille',
        'handicap',
        'sport_animaux',
        'convocation',
        'missions',
        'enfants'
      ]
    }
  },
  computed: {
    ...mapGetters(['user']),
    payload () {
      return {
        hash: this.user.hash,
        firstname: this.user.first_name,
        lastname: this.user.last_name,
        birthdate: this.user.birthdate,
        birthplace: this.user.birthdate,
        address: this.user.address,
        city: this.user.city,
        zipcode: this.user.zip,
        hour: `${(this.hour < 10 ? '0' : '') + this.hour}${(this.minutes < 10 ? '0' : '') + this.minutes}`,
        reason: this.radio_check[this.reason]
      }
    },
    reasonErrors () {
      const errors = []
      if (!this.$v.reason.$dirty) { return errors }
      !this.$v.reason.required && errors.push('Vous devez renseigner une raison')
      return errors
    }
  },
  methods: {
    b64toBlob (b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data)
      const byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }

      const blob = new Blob(byteArrays, { type: contentType })
      return blob
    },
    async generate () {
      this.validate()
      if (this.valid) {
        try {
          this.is_loading = true
          const link = await this.$axios.post('/certificate', this.payload)
          console.log(link)
          const blob = this.b64toBlob(link.data.fileData, 'application/pdf')
          if (blob) {
            const fileURL = window.URL.createObjectURL(blob)
            window.open(fileURL)
          }
          this.pdf_link = link.fileData
          this.is_loading = false
        } catch (error) {
          this.error = error
          console.error(error)
        }
      }
    }
  }
}
</script>
