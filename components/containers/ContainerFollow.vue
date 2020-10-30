<template>
  <v-container>
    <v-row align="center" justify="center">
      <h3>{{ relations.follows.length }} {{ relations.type }}</h3>
    </v-row>
    <div
      v-for="(follow, id_follow) in relations.follows"
      :key="follow.id_relations"
      class="mx-auto"
      justify="center"
      align="center"
    >
      <v-row v-if="follow.User.id_users !== me.id_users">
        <v-btn text :to="`${localePath('user')}/${follow.User.id_users}`">
          {{ follow.User.login }}
        </v-btn>
      </v-row>
      <v-row v-else>
        <v-btn text :to="`${localePath('user')}`">
          {{ follow.User.login }}
        </v-btn>
      </v-row>
      <v-row>
        <v-divider v-if="relations.follows.length - 1 !== id_follow" />
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContainerFollow',
  props: {
    relations: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['me'])
  }
}
</script>
