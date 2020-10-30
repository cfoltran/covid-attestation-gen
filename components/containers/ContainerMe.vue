<template>
  <v-container>
    <v-row class="mx-auto" align="center" justify="start">
      <v-col>
        <h1>{{ me.login }}</h1>
      </v-col>
      <v-col>
        <v-btn small color="black" class="white--text" :to="localePath('settings')">
          Modifier profil
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>{{ memories.length }} Memories</p>
      </v-col>
      <v-col v-if="relations && Object.keys(relations).includes('followers')">
        <v-btn text :to="`${localePath('relations-followers')}/${me.id_users}`">
          {{ relations.followers }} Abonnés
        </v-btn>
      </v-col>
      <v-col v-if="relations && Object.keys(relations).includes('followers')">
        <v-btn text :to="`${localePath('relations-following')}/${me.id_users}`">
          {{ relations.following }} Abonnements
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="mx-auto" width="100%">
        <v-card-title>
          Memories
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col v-for="memorie in memories" :key="memorie.id" cols="4">
                  {{ memorie.content }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContainerMe',
  props: {
    memories: {
      type: Array,
      required: true
    },
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
