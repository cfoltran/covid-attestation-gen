<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ nameSaver }}</h1>
      </v-col>
      <v-col>
        <v-btn
          small
          color="error"
          outlined
          @click="deleteBookmark"
        >
          Supprimer le Bookmark
        </v-btn>
      </v-col>
    </v-row>
    <v-card class="mx-auto" width="100%">
      <v-card-title>
        Memories
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col v-for="(save, id_saves) in saves" :key="id_saves" cols="4">
                <v-btn text :to="`${localePath('memorie')}/${save.id_memories}`">
                  {{ save.Memory.content }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContainerSaves',
  props: {
    saves: {
      type: Array,
      required: true
    },
    idBookmarks: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['me']),
    nameSaver () {
      return (this.saves.length > 0) ? this.saves[0].Bookmark.name : ''
    }
  },
  methods: {
    async deleteBookmark () {
      const payload = {
        idUsers: this.me.id_users,
        idBookmarks: +this.idBookmarks
      }
      await this.$axios.$delete(`/bookmark/delete/${payload.idUsers}/${payload.idBookmarks}`)
      this.$router.push(this.localePath('bookmarks'))
    }
  }
}
</script>
