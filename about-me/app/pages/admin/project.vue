<template>
  <rich-text
    :original-content="$store.state.setting.about"
    menubar-class="elevation-0"
    content-class="grey lighten-5"
    image
    @change-content="project = $event"
  >
  </rich-text>
</template>

<script>
import RichText from '@/components/RichTextEditor'
export default {
  name: 'Project',
  layout: 'admin',
  components: {
    RichText
  },
  data() {
    return {
      project: ''
    }
  }
}
</script>

<style scoped></style>
