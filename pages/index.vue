<template>
  <v-container>
    <v-row>
      <p>Hello world</p>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  middleware: 'auth',
  nuxtI18n: {
    paths: {
      fr: '/',
      en: '/'
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  head () {
    return {
      title: this.$t('home')
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
    Roboto,
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
<i18n>
{
  "fr": {
    "home": "Accueil"
  },
  "en": {
    "home": "Home"
  }
}
</i18n>
