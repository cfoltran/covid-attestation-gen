<template>
  <v-container>
    <v-row class="mx-auto" align="center" justify="start">
      <v-col>
        <h1>{{ bookmarks.length }} Bookmarks</h1>
      </v-col>
      <v-col>
        <modal-create-bookmark @update="handleUpdate" />
      </v-col>
    </v-row>
    <v-row>
      <v-card class="mx-auto" width="100%">
        <v-card-title>
          Bookmarks
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col v-for="(bookmark, id_bookmarks) in bookmarks" :key="id_bookmarks" cols="4">
                  <v-btn text :to="`${localePath('bookmarks')}/${bookmark.id_bookmarks}`">
                    {{ bookmark.name }}
                  </v-btn>
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
import ModalCreateBookmark from '~/components/modals/ModalCreateBookmark'

export default {
  name: 'ContainerBookmarks',
  components: {
    ModalCreateBookmark
  },
  props: {
    bookmarks: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleUpdate (newElmt) {
      this.bookmarks.push(newElmt)
    }
  }
}
</script>
