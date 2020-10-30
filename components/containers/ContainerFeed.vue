<template>
  <v-container>
    <div v-for="(memorie, index) in memories" :key="memorie.id_memories">
      <v-row justify="center" class="mt-10">
        <v-card width="70%">
          <v-card-title>
            <v-row>
              <v-col cols="10">
                <div v-if="memorie.User.id_users !== me.id_users">
                  <v-btn text :to="`${localePath('user')}/${memorie.User.id_users}`">
                    {{ memorie.User.login }}
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn text :to="`${localePath('user')}`">
                    {{ memorie.User.login }}
                  </v-btn>
                </div>
              </v-col>
              <v-col>
                <modal-edit-memorie
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
                <span class="caption">{{ dateFromNow(memorie.publication_date) }}</span>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <h3>Commentaires</h3>
              </v-row>
              <v-row>
                <v-divider />
              </v-row>
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
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <modal-save-memorie
              :id-memories="memorie.id_memories"
              :id-users="me.id_users"
            />
          </v-card-actions>
          <v-row justify="center">
            <v-text-field
              v-model="comments[memorie.id_memories]"
              width="70%"
              dense
              label="Commentaire"
              class="shrink"
              :loading="is_loading[memorie.id_memories]"
              @keyup.enter="postComment(memorie.id_memories, index)"
            >
              <template slot="append">
                <v-btn
                  :loading="is_loading[memorie.id_memories]"
                  small
                  text
                  color="primary"
                  @click="postComment(memorie.id_memories, index)"
                >
                  Publier
                </v-btn>
              </template>
            </v-text-field>
          </v-row>
        </v-card>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import ModalEditMemorie from '~/components/modals/ModalEditMemorie'

export default {
  name: 'ContainerFeed',
  components: {
    ModalEditMemorie
  },
  props: {
    memories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      comments: [],
      is_loading: {}
    }
  },
  computed: {
    ...mapGetters(['me'])
  },
  methods: {
    dateFromNow (date) {
      return this.$moment(date).fromNow()
    },
    async postComment (idMemories, index) {
      const tmpIsLoad = _.cloneDeep(this.is_loading)
      tmpIsLoad[idMemories] = true
      this.is_loading = _.cloneDeep(tmpIsLoad)
      const payload = {
        idMemories,
        idUsers: this.me.id_users,
        content: this.comments[idMemories],
        publishDate: new Date()
      }
      try {
        let res = await this.$axios.$post('/comment/post', payload)
        res = Object.assign(res,
          {
            index,
            User: {
              login: this.me.login,
              id_users: this.me.id_users
            }
          })
        this.$emit('updateMemories', res)
        const tmpComment = _.cloneDeep(this.comments)
        tmpComment[idMemories] = null
        this.comments = _.cloneDeep(tmpComment)
      } catch (error) {
        this.$alert.error(error)
        console.error(error)
      }
      this.is_loading[idMemories] = false
    }
  }
}
</script>
<style scoped>
.v-text-field{
    width: 70%;
}
</style>
