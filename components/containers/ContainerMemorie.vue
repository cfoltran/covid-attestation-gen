<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="8">
        <v-card outlined width="100%" height="40vh">
          <v-card-title>
            <v-row>
              <v-col cols="10">
                <div v-if="Object.keys(memorie).includes('User') && memorie.User && memorie.User.id_users !== me.id_users">
                  <v-btn text :to="`${localePath('user')}/${memorie.User.id_users}`">
                    {{ memorie.User.login }}
                  </v-btn>
                </div>
                <div v-else-if="Object.keys(memorie).includes('User') && memorie.User">
                  <v-btn text :to="`${localePath('user')}`">
                    {{ memorie.User.login }}
                  </v-btn>
                </div>
              </v-col>
              <v-col>
                <modal-edit-memorie
                  v-if="Object.keys(memorie).includes('User') && memorie.User"
                  :is-my-memorie="memorie.User.id_users === me.id_users"
                  :endpoint-delete="`/memorie/delete/${me.id_users}/${memorie.id_memories}`"
                />
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                {{ memorie.content }}
              </v-row>
              <v-row justify="end">
                <span class="caption">{{ $moment(memorie.publication_date).fromNow() }}</span>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn icon @click="addToSaves(memorie.id_memories)">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card outlined max-height="40vh" class="overflow-y-auto overflow-x-hidden">
          <v-card-title>
            Comments
          </v-card-title>
          <v-card-text>
            <v-row v-for="comment in memorie.comments" :key="comment.id_comments">
              <p>
                <v-btn
                  v-if="comment.User.id_users !== me.id_users"
                  text
                  small
                  :to="`${localePath('user')}/${comment.User.id_users}`"
                  class="font-weight-black"
                >
                  {{ comment.User.login }}
                </v-btn>
                <v-btn
                  v-else
                  text
                  small
                  :to="`${localePath('user')}`"
                  class="font-weight-black"
                >
                  {{ comment.User.login }}
                </v-btn>
                : {{ comment.content }}
              </p>
            </v-row>
          </v-card-text>
          <v-card-actions />
        </v-card>
        <v-row justify="center">
          <v-text-field
            v-model="content"
            dense
            single-line
            label="Commentaire"
            class="shrink"
            :loading="is_loading"
            @keyup.enter="postComment(memorie.id_memories)"
          >
            <template slot="append">
              <v-btn
                :loading="is_loading"
                small
                text
                color="primary"
                @click="postComment(memorie.id_memories)"
              >
                Publier
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import ModalEditMemorie from '~/components/modals/ModalEditMemorie'

export default {
  name: 'ContainerMemorie',
  components: {
    ModalEditMemorie
  },
  props: {
    memorie: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      content: '',
      is_loading: false
    }
  },
  computed: {
    ...mapGetters(['me'])
  },
  methods: {
    dateFromNow (date) {
      return this.$moment(date).fromNow()
    },
    async postComment (idMemories) {
      this.is_loading = true
      const payload = {
        idMemories,
        idUsers: this.me.id_users,
        content: this.content,
        publishDate: new Date()
      }
      try {
        let res = await this.$axios.$post('/comment/post', payload)
        res = Object.assign(res,
          {
            User: {
              login: this.me.login,
              id_users: this.me.id_users
            }
          })
        this.$emit('updateMemories', res)
        this.content = ''
      } catch (error) {
        this.$alert.error(error)
        console.error(error)
      }
      this.is_loading = false
    }
  }
}
</script>
