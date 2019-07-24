<template>
  <v-card>
    <v-img src="/coding.svg">
      <v-container fill-height fluid>
        <v-layout justify-center align-center column fill-height>
          <v-flex class="display-2 my-4">
            {{ $store.state.setting.motto }}
          </v-flex>
          <v-avatar size="137" color="grey lighten-4">
            <v-img src="/dash.jpg" alt="avatar" />
          </v-avatar>
          <v-flex class="headline">
            {{
              [
                $store.state.setting.name,
                $store.state.setting.englishName
              ].join('/')
            }}
          </v-flex>
          <v-flex>
            <a class="mx-2" :href="$store.state.setting.facebook">
              <v-icon dark>fab fa-facebook-square</v-icon>
            </a>
            <a class="mx-2" :href="$store.state.setting.linkedin">
              <v-icon dark>fab fa-linkedin</v-icon>
            </a>
            <a class="mx-2" :href="$store.state.setting.line">
              <v-icon dark>fab fa-line</v-icon>
            </a>
            <a class="mx-2" :href="$store.state.setting.github">
              <v-icon dark>fab fa-github-square</v-icon>
            </a>
          </v-flex>
          <v-flex>
            <span>{{ $store.state.setting.email }}</span>
            <span class="mx-2">⊙ {{ $store.state.setting.country }} ⊙</span>
            <span>{{ $store.state.setting.cellphone }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style scoped></style>
