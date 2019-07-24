<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="hidden-md-and-up"
      clipped
      dark
      temporary
    >
      <v-list dense nav dark>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          nuxt
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.Icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense dark app clipped-left fixed hide-on-scroll>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn text large nuxt to="/admin">{{ title }}</v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        text
        class="hidden-sm-and-down"
      >
        {{ item.title }}
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" dark app>
      <div class="mx-auto">
        <span class="body-2 mr-2"
          >Made: Nuxt + Vuetify + Firebase + Serverless</span
        >
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
