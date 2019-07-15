<template>
  <v-container>
    <v-window v-model="window" class="elevation-0">
      <v-window-item :value="1">
        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>文章列表</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="window = 2"
              >新增文章</v-btn
            >
          </v-toolbar>
          <v-data-table :headers="headers" :items="items" class="elevation-0">
            <template v-slot:items="props">
              <td v-for="(val, key) in props.item" :key="key">{{ val }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">
                  edit
                </v-icon>
                <v-icon small @click="deleteItem(props.item)">
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </div>
      </v-window-item>
      <v-window-item :value="2"> </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
  name: 'Admin',
  data() {
    return {
      db: null,
      window: 1,
      headers: [
        {
          text: '連線path',
          value: 'url',
          sortable: false,
          align: 'left',
          type: 'text'
        },
        {
          text: '主題',
          value: 'subject',
          sortable: false,
          align: 'left',
          type: 'text'
        },
        {
          text: '概述',
          value: 'summary',
          sortable: false,
          align: 'left',
          type: 'text'
        },
        {
          text: '類型',
          value: 'type',
          sortable: false,
          align: 'left',
          type: 'text'
        },
        {
          text: '標籤',
          value: 'tag',
          sortable: false,
          align: 'left',
          type: 'text'
        },
        {
          text: '語系',
          value: 'locale',
          sortable: false,
          align: 'left',
          type: 'select',
          option: {
            items: [
              {
                text: '繁中',
                value: 'zh-TW'
              },
              {
                text: '英文',
                value: 'en-US'
              }
            ]
          }
        },
        {
          text: '建立時間',
          value: 'created_at',
          sortable: false,
          align: 'left',
          type: 'date'
        },
        {
          text: '更新時間',
          value: 'updated_at',
          sortable: false,
          align: 'left',
          type: 'date'
        },
        {
          text: 'MD內容',
          value: 'content',
          sortable: false,
          align: 'left',
          type: 'markdown'
        }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        subject: '',
        summary: '',
        type: '',
        tag: '',
        locale: '',
        created_at: '',
        updated_at: '',
        content: ''
      },
      defaultItem: {
        subject: '',
        summary: '',
        type: '',
        tag: '',
        locale: '',
        created_at: '',
        updated_at: '',
        content: ''
      }
    }
  },
  created() {
    const setting = { timestampsInSnapshets: true }
    this.db = firebase.firestore()
    this.db.settings(setting)
  },
  methods: {
    getFromFirestore(collection) {
      return this.db
        .collection(collection)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc)
          })
        })
    },
    addItemToFirestore(collection, content) {
      return this.db
        .collection(collection)
        .add({
          ...content,
          createdAt: new Date()
        })
        .then(res => {
          console.log('Add Document with ID:', res.id)
          return res.id
        })
        .catch(err => {
          console.error('Error: Add Document', err)
          throw err
        })
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.window = 2
    },
    deleteItem(item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.items.splice(index, 1)
    },
    close() {
      this.window = 1
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped></style>
