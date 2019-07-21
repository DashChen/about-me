<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clipped-left fixed app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <v-toolbar-title>
        <v-btn flat large nuxt to="/admin">{{ title }}</v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, i) in items" :key="i" :to="item.to" flat>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <div class="mx-auto">
        <span class="body-2 mr-2">Made: Nuxt + Vuetify + Firebase</span>
        <span>&copy; 2019</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'fas fa-home',
          title: '首頁',
          to: '/'
        },
        {
          icon: 'fas fa-address-card',
          title: '關於',
          to: '/about'
        },
        {
          icon: 'far fa-newspaper',
          title: '文章',
          to: '/blog'
        },
        {
          icon: 'fas fa-project-diagram',
          title: '專案',
          to: '/project'
        },
        {
          icon: 'fas fa-id-card',
          title: '聯絡我',
          to: '/contact'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dash Chen'
    }
  }
}
</script>
