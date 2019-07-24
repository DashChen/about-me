<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      temporary
      app
    >
      <v-list dense nav dark>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          nuxt
          exact
          dark
        >
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">編輯</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.title"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="(child, ci) in item.children"
              :key="ci"
              link
              @click="go(child.to)"
            >
              <v-list-item-title v-text="child.title"></v-list-item-title>
              <v-list-item-icon v-if="child.icon">
                <v-icon v-text="child.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-layout v-else :key="item.title" @click="go(item.to)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-layout>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dense
      dark
      app
      clipped-left
      fixed
      hide-on-scroll
      color="blue darken-3"
    >
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      {{ header }}
      <v-spacer />
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        text
        class="hidden-sm-and-down ml-2"
      >
        {{ item.title }}
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Admin',
  data: function() {
    return {
      header: '後台管理',
      drawer: false,
      items: [
        { icon: 'table_chart', title: '文章', to: '/admin/list' },
        { icon: 'settings', title: '設定', to: '/admin/setting' },
        { icon: 'assignment', title: '專案', to: '/admin/project' },
        { icon: 'home', title: '回首頁', to: '/' },
        { icon: 'exit_to_app', title: '登出', to: '/logout' }
      ]
    }
  },
  methods: {
    go(url) {
      if (url === '/logout') {
        this.dispatch('auth/logout')
      }
      this.$router.push(url)
    }
  }
}
</script>

<style scoped></style>
