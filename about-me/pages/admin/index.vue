<template>
  <v-layout align-start justify-center row fill-height>
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
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-0"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <tr @click="transMD(props)">
                <td v-for="(val, key) in props.item" :key="key">{{ val }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editItem(props.item)">
                    edit
                  </v-icon>
                  <v-icon small @click="deleteItem(props.item)">
                    delete
                  </v-icon>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat>
                <div v-html="html"></div>
              </v-card>
            </template>
          </v-data-table>
          <div v-show="pages > 0" class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              :length="pages"
            ></v-pagination>
          </div>
        </div>
      </v-window-item>
      <v-window-item :value="2">
        <v-card class="elevation-0">
          <v-card-title>
            <v-flex
              v-for="(item, index) in headers"
              :key="index"
              :class="[item.colClass]"
            >
              <v-text-field
                v-if="item.type == 'text'"
                v-model="editedItem[item.value]"
                :label="item.text"
                :solo="item.option.solo"
                :box="item.option.box"
                :outline="item.option.outline"
                :rules="
                  item.value == 'url'
                    ? [checkUrl]
                    : item.option.rules
                    ? item.option.rules
                    : Array()
                "
                :disabled="item.value == 'url' && editedIndex != -1"
                clearable
              ></v-text-field>
              <v-combobox
                v-if="item.type == 'combobox'"
                v-model="editedItem[item.value]"
                :label="item.text"
                :items="getComboboxItems(item.namespaced, item.stateKey)"
                :chips="item.option.chips"
                :multiple="item.option.multiple"
                :placeholder="item.option.placeholder"
                :type="item.option.type ? item.option.type : 'text'"
                :rules="item.option.rules ? item.option.rules : Array()"
              ></v-combobox>
              <v-select
                v-if="item.type == 'select'"
                v-model="editedItem[item.value]"
                :label="item.text"
                :items="item.option.items"
                :chips="item.option.chips"
                :multiple="item.option.multiple"
                :placeholder="item.option.placeholder"
                :solo="item.option.solo"
                :box="item.option.box"
                :outline="item.option.outline"
                :type="item.option.type ? item.option.type : 'text'"
                :rules="item.option.rules ? item.option.rules : Array()"
                clearable
              ></v-select>
              <v-checkbox
                v-if="item.type == 'checkbox'"
                v-model="editedItem[item.value]"
                :label="item.text"
              ></v-checkbox>
              <v-radio-group
                v-if="item.type == 'radio'"
                v-model="editedItem[item.value]"
              >
                <v-radio
                  v-for="n in item.option.items"
                  :key="n.text"
                  :label="n.text"
                  :value="n.value"
                ></v-radio>
              </v-radio-group>
              <v-switch
                v-if="item.type == 'switch'"
                v-model="editedItem[item.value]"
                :label="item.text"
              ></v-switch>
              <v-slider
                v-if="item.type == 'slider'"
                v-model="editedItem[item.value]"
                :label="item.text"
                :inverse-label="item.option.inverseLabel"
                :rules="item.option.rules ? item.option.rules : Array()"
              ></v-slider>
              <v-textarea
                v-if="item.type == 'textarea'"
                v-model="editedItem[item.value]"
                :name="item.text"
                :label="item.text"
                :hint="item.option.hint"
                :solo="item.option.solo"
                :box="item.option.box"
                :outline="item.option.outline"
                :type="item.option.type ? item.option.type : 'text'"
                :rules="item.option.rules ? item.option.rules : Array()"
              ></v-textarea>
              <v-menu
                v-if="item.type == 'date'"
                v-model="item.menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="editedItem[item.value]"
                    :label="item.text"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem[item.value]"
                  @input="item.menu = false"
                ></v-date-picker>
              </v-menu>
              <v-layout v-if="item.type == 'markdown'" row fill-height>
                <v-flex xs12 sm6 class="px-1">
                  <v-textarea
                    v-model="editedItem[item.value]"
                    :name="item.text"
                    :label="item.text"
                    :rows="item.rows ? item.rows : 5"
                    box
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 class="px-1">
                  <div class="subheading text-xs-center grey darken-1">
                    預覽
                  </div>
                  <div v-html="render(editedItem[item.value])"></div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card-title>
          <v-card-actions>
            <v-btn color="success" class="white--text" @click="save"
              >保存</v-btn
            >
            <v-btn color="info" class="white--text" @click="close">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-layout>
</template>

<script>
export default {
  name: 'Admin',
  layout: 'admin',
  asyncData({ store }) {
    return store.state.articles
  },
  data() {
    return {
      window: 1,
      search: '',
      pagination: {},
      selected: [],
      headers: [
        {
          text: '連線path',
          value: 'url',
          sortable: false,
          align: 'left',
          type: 'text',
          colClass: 'xs12 sm6 px-2',
          option: {
            solo: false,
            box: false,
            outline: false
          }
        },
        {
          text: '主題',
          value: 'subject',
          sortable: false,
          align: 'left',
          type: 'text',
          colClass: 'xs12 sm6 px-2',
          option: {
            solo: false,
            box: false,
            outline: false
          }
        },
        {
          text: '概述',
          value: 'summary',
          sortable: false,
          align: 'left',
          type: 'textarea',
          colClass: 'xs12 px-2',
          option: {
            solo: false,
            box: false,
            outline: false,
            hint: ''
          }
        },
        {
          text: '類型',
          value: 'type',
          sortable: false,
          align: 'left',
          type: 'combobox',
          namespaced: 'articles',
          stateKey: 'typeList',
          colClass: 'xs12 sm4 pl-2 pr-1',
          option: {
            solo: false,
            box: false,
            outline: false,
            multiple: false
          }
        },
        {
          text: '標籤',
          value: 'tag',
          sortable: false,
          align: 'left',
          type: 'combobox',
          namespaced: 'articles',
          stateKey: 'tagList',
          colClass: 'xs12 sm4 px-1',
          option: {
            solo: false,
            box: false,
            outline: false,
            multiple: true
          }
        },
        {
          text: '語系',
          value: 'locale',
          sortable: false,
          align: 'left',
          type: 'select',
          colClass: 'xs12 sm4 pl-1 pr-2',
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
            ],
            solo: false,
            box: false,
            outline: false,
            chips: false,
            multiple: false,
            placeholder: ''
          }
        },
        {
          text: '建立時間',
          value: 'created_at',
          sortable: false,
          align: 'left',
          type: 'date',
          colClass: 'xs12 sm6 px-2',
          menu: false
        },
        {
          text: '更新時間',
          value: 'updated_at',
          sortable: false,
          align: 'left',
          type: 'date',
          colClass: 'xs12 sm6 px-2',
          menu: false
        },
        {
          text: 'MD內容',
          value: 'content',
          sortable: false,
          align: 'left',
          type: 'markdown',
          rows: 30
        }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        url: '',
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
        url: '',
        subject: '',
        summary: '',
        type: '',
        tag: '',
        locale: '',
        created_at: '',
        updated_at: '',
        content: ''
      },
      html: ''
    }
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  mounted() {
    this.items = this.$_.map(this.articles, this.$_clone)
  },
  methods: {
    checkUrl(value) {
      // 檢查是否有不合法字元
      if (
        value
          .toString()
          .split('')
          .some(char => !char.match(/[a-z0-9-_.~]/g))
      ) {
        return `${value} has Illegal character`
      }
      if (this.$store.state.articles.urlList.includes(value)) {
        return `${value} has used`
      }
      return true
    },
    getComboboxItems(namespaced, key) {
      return this.$store.state[namespaced][key]
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
      let data
      if (this.editedIndex > -1) {
        data = Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        data = this.editedItem
        this.items.push(this.editedItem)
      }
      this.$store.dispatch('articles/updateList', {
        index: this.editedIndex,
        data: data,
        vm: this
      })
      this.close()
    },
    transMD(props) {
      props.expanded = !props.expanded
      this.editedIndex = this.items.indexOf(props.item)
      this.html = this.$md.render(this.items[this.editedIndex].content)
    },
    render(md) {
      return this.$md.render(md)
    }
  }
}
</script>

<style scoped></style>
