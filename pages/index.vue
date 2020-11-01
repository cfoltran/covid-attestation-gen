<template>
  <v-container>
    <v-row>
      <img class="mx-auto" src="../assets/logo.png" alt="logo" height="80px">
    </v-row>
    <v-row class="mx-auto">
      <h2>Générez votre attestation une bonne fois pour toute</h2>
    </v-row>
    <v-row class="mx-auto">
      <p>
        Cococertif sauvegarde et crypte vos données personnelles dans le cache de votre ordinateurs,
        elles restent avec vous bien au chaud.
      </p>
    </v-row>
    <!-- if user is log -->
    <v-row v-if="!isAuthenticated">
      <form-user-informations />
    </v-row>
    <!-- if is not log -->
    <div v-else>
      <v-row>
        <v-btn
          class="mx-auto"
          :loading="is_loading"
          @click="deleteInformations"
        >
          Supprimer mes infos
        </v-btn>
      </v-row>
      <v-row>
        <form-generate-certificates />
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    FormUserInformations: () => import('~/components/forms/FormUserInformations'),
    FormGenerateCertificates: () => import('~/components/forms/FormGenerateCertificates')
  },
  data () {
    return {
      is_loading: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  methods: {
    async deleteInformations () {
      try {
        this.is_loading = true
        await this.$store.dispatch('logout')
        this.is_loading = false
      } catch (error) {
        console.error(error)
        this.is_loading = false
      }
    }
  },
  head () {
    return {
      title: 'Cococertif'
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Open Sans',
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
