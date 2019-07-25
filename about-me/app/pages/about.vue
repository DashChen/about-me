<template>
  <v-container fluid>
    <v-layout row fill-height>
      <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
        <v-card class="mb-3">
          <v-card-title>
            <h3 class="display-2 mb-3 mx-auto">{{ motto }}</h3>
            <v-tooltip bottom style="float: right;">
              <template v-slot:activator="{ on }">
                <v-avatar size="100" v-on="on">
                  <v-img :src="photo"></v-img>
                </v-avatar>
              </template>
              <span class="headline white--text" v-text="name"></span>
            </v-tooltip>
          </v-card-title>
          <v-layout>
            <v-card-text primary-title>
              <div
                class="title"
                style="line-height: 34px !important;"
                v-html="about"
              ></div>
            </v-card-text>
          </v-layout>
        </v-card>
        <v-card v-for="info in infos" :key="info.title" class="mb-3">
          <v-card-title class="teal--text text--darken-1 headline">
            {{ info.title }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row fill-height>
              <v-flex v-if="info.type == 'list'" xs6 md4 lg3>
                <v-card v-for="(item, key) in info.items" :key="key">
                  <v-subheader>{{ item.title }}</v-subheader>
                  <v-list>
                    <v-list-item
                      v-for="(content, ci) in item.content"
                      :key="ci"
                    >
                      <v-list-item-content
                        v-text="content"
                      ></v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-flex>
              <v-flex v-else-if="info.type == 'timeline'" xs12>
                <v-timeline dense align-top>
                  <v-slide-x-reverse-transition group hide-on-leave>
                    <v-timeline-item
                      v-for="(item, i) in info.items"
                      :key="item.title"
                      small
                      fill-dot
                    >
                      <template v-slot:icon>
                        <span>{{ i }}</span>
                      </template>
                      <v-card>
                        <v-layout row>
                          <v-flex xs10>
                            <v-subheader>{{ item.title }}</v-subheader>
                            <span>{{ item.content }}</span>
                          </v-flex>
                          <v-flex v-show="item.img" xs2>
                            <v-img :src="item.img"></v-img>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-timeline-item>
                  </v-slide-x-reverse-transition>
                </v-timeline>
              </v-flex>
              <v-flex v-else xs12>
                <v-layout row>
                  <v-flex v-for="(item, i) in info.items" :key="i" xs6>
                    <div v-if="i % 2 == 0">
                      <v-carousel>
                        <v-carousel-item
                          v-for="(img, ii) in item.img"
                          :key="ii"
                          :src="img"
                          reverse-transition="fade-transition"
                          transition="fade-transition"
                        ></v-carousel-item>
                      </v-carousel>
                    </div>
                    <div v-else>
                      <v-subheader>{{ item.title }}</v-subheader>
                      <span>{{ item.content }}</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  computed: {
    infos() {
      const items = [
        {
          title: '能力 Skills',
          items: this.checkVal(this.skills),
          type: 'list'
        },
        {
          title: '重要經歷 Experience',
          items: this.checkVal(this.experiences),
          type: 'timeline'
        },
        {
          title: '競賽 Contests',
          items: this.checkVal(this.contests),
          type: 'timeline'
        },
        {
          title: '活動 Activities',
          items: this.checkVal(this.activities),
          type: 'timeline'
        },
        {
          title: '相關證明 Certifications',
          items: this.checkVal(this.certifications),
          type: 'other'
        }
      ]
      return this.$_.remove(items, function(n) {
        return n.items.length !== 0
      })
    }
  },
  asyncData({ store }) {
    console.log(store.state.setting)
    return JSON.parse(JSON.stringify(store.state.setting))
  },
  methods: {
    checkVal(items) {
      if (this.$_.isArray(items) && !this.$_.isEmpty(items[0].title)) {
        return items
      }
      return []
    }
  }
}
</script>
