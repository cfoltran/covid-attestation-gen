<template>
  <v-container class="mt-10">
    <v-snackbar
      :value="error"
      color="error"
      :timeout="5000"
      top
      right
    >
      <span>{{ error }}</span>
    </v-snackbar>
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
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
      >
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
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
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
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
        <template v-slot:label>
          <v-container>
            <v-row>
              Consultations, examens et soins ne pouvant être assurés
              à distance et l’achat de médicaments
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
        <template v-slot:label>
          <v-container>
            <v-row>
              Déplacements pour motif familial impérieux, pour l'assistance
              aux personnes vulnérables et précaires ou la garde d'enfants
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
        <template v-slot:label>
          <v-container>
            <v-row>
              Déplacement des personnes en situation de handicap et leur accompagnant
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
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
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
        <template v-slot:label>
          <v-container>
            <v-row>
              Convocation judiciaire ou administrative et pour se rendre dans un service public
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
        <template v-slot:label>
          <v-container>
            <v-row>
              Participation à des missions d'intérêt général sur demande de l'autorité administrative
            </v-row>
          </v-container>
        </template>
      </v-radio>
      <v-radio
        :off-icon="mdiRadioboxBlank"
        :on-icon="mdiRadioboxMarked"
        class="mt-3"
      >
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
      <p class="mx-auto mb-2">
        <b>Vous télétravaillez ?</b> Rejoignez le premier réseau social regroupant les télétravailleurs
        près de chez vous <a href="https://www.loawn.com" target="blank">loawn.com</a>
      </p>
    </v-row>
    <v-row>
      <v-btn class="mx-auto mb-5" :loading="is_loading" @click="generate">
        Générer mon attestation
        <template slot="loader">
          {{ loading_dot }}
        </template>
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import { v1 as uuidv1 } from 'uuid'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js'
import BaseApiFormValidation from '~/mixins/BaseApiFormValidation'

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
      mdiRadioboxBlank,
      mdiRadioboxMarked,
      interval_loading_dot: '',
      loading_dot: '',
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
    ...mapGetters(['user', 'signature']),
    payload () {
      return {
        hash: this.user.hash,
        firstname: this.user.first_name,
        lastname: this.user.last_name,
        birthdate: this.user.birthdate,
        birthplace: this.user.birthplace,
        address: this.user.address,
        city: this.user.city,
        zipcode: this.user.zip,
        signature: this.signature,
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
    changeDotLoading () {
      const vm = this
      this.interval_loading_dot = setInterval(() => {
        vm.loading_dot += '.'
      }, 700)
    },
    async generate () {
      this.validate()
      if (this.valid) {
        try {
          this.loading_dot = 'Chargement'
          this.changeDotLoading()
          this.is_loading = true
          const filledPdf = await this.$pdfBuilder.generate(this.payload)
          if (filledPdf) {
            const userAgent = window.navigator.userAgent
            if (window.navigator.msSaveOrOpenBlob) { // IE 11+
              window.navigator.msSaveOrOpenBlob(filledPdf, uuidv1())
            } else if (userAgent.match('FxiOS')) { // FF iOS
              const fileURL = window.URL.createObjectURL(filledPdf)
              window.open(fileURL)
            } else if (userAgent.match('CriOS')) { // Chrome iOS
              const url = window.webkitURL.createObjectURL(filledPdf)
              Object.assign(document.createElement('a'), {
                target: '_blank',
                href: url
              }).click()
            } else {
              const link = document.createElement('a')
              const url = URL.createObjectURL(filledPdf)
              link.href = url
              link.target = '_blank'
              link.download = uuidv1()
              document.body.appendChild(link)
              link.click()
            }
          }
          this.is_loading = false
          clearInterval(this.interval_loading_dot)
        } catch (error) {
          this.error = error
          this.is_loading = false
          clearInterval(this.interval_loading_dot)
          console.error(error)
        }
      }
    }
  }
}
</script>
