<template>
  <div>
    <v-app>
      <v-main>
        <nuxt />
      </v-main>
      <v-footer
        class="mt-10"
        app
        fixed
      >
        <v-btn icon href="https://github.com/cfoltran/covid-attestation-gen" target="_blank">
          <v-icon>{{ mdiGithub }}</v-icon>
        </v-btn>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { mdiGithub } from '@mdi/js'
import colorModeMixin from '~/mixins/colorMode'

export default {
  mixins: [colorModeMixin],
  data () {
    return {
      mdiGithub
    }
  },
  computed: {
    ...mapGetters(['token', 'isAuthenticated'])
  }
}
</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Open Sans',
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

</style>
