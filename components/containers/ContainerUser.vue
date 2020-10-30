<template>
  <v-container>
    <v-row class="mx-auto" align="center" justify="start">
      <v-col>
        <h1>{{ user.login }}</h1>
      </v-col>
      <v-col>
        <v-btn v-if="!isFollowing" small color="black" class="white--text" @click="follow">
          Suivre
        </v-btn>
        <v-btn v-else small color="white" @click="unfollow">
          Ne plus suivre
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>{{ memories.length }} Memories</p>
      </v-col>
      <v-col>
        <v-btn text :to="`${localePath('relations-following')}/${user.id_users}`">
          {{ user.following }} Abonnements
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
  name: 'ContainerUser',
  props: {
    user: {
      type: Object,
      required: true
    },
    memories: {
      type: Array,
      required: true
    },
    isFollowing: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters(['me']),
    payload () {
      return {
        idUsers: this.me.id_users,
        idUsersFollow: this.user.id_users
      }
    }
  },
  methods: {
    async follow () {
      try {
        await this.$axios.$post('/user/follow', this.payload)
        this.$emit('updateIsFollowing', true)
        this.$alerts.success('ok')
      } catch (error) {
        this.$alerts.error(error)
        console.error(error)
      }
    },
    async unfollow () {
      try {
        await this.$axios.$post('/user/unfollow', this.payload)
        this.$emit('updateIsFollowing', false)
        this.$alerts.success('ok')
      } catch (error) {
        this.$alerts.error(error)
        console.error(error)
      }
    }
  }
}
</script>
