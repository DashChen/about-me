<template>
  <div class="editor">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="menubar pa-3" :class="menubarClass">
        <v-layout px-2 pb-2 justify-spance-between wrap>
          <v-btn-toggle v-model="formatting" multiple>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
            >
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <v-icon>mdi-format-underline</v-icon>
            </v-btn>
          </v-btn-toggle>

          <v-btn-toggle v-model="line">
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph"
            >
              <v-icon>fas fa-paragraph</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
            >
              H1
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
            >
              H2
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >
              H3
            </v-btn>
          </v-btn-toggle>

          <v-btn-toggle v-model="list">
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <v-icon>fas fa-list-ul</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <v-icon>fas fa-list-ol</v-icon>
            </v-btn>
            <v-btn
              v-if="image"
              color="white"
              class="menubar__button"
              @click="showImagePrompt(commands.image)"
            >
              <v-icon>fas fa-image</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <v-icon>fas fa-quote-right</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              :class="{ 'is-active': isActive.code_block() }"
              @click="commands.code_block"
            >
              <v-icon>fas fa-code</v-icon>
            </v-btn>
            <v-btn
              color="white"
              class="menubar__button"
              @click="commands.horizontal_rule"
            >
              —
            </v-btn>
          </v-btn-toggle>

          <v-btn-toggle v-model="reset">
            <v-btn color="white" class="menubar__button" @click="commands.undo">
              <v-icon>fas fa-undo</v-icon>
            </v-btn>
            <v-btn color="white" class="menubar__button" @click="commands.redo">
              <v-icon>fas fa-redo</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-layout>
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor__content pa-3"
      :class="contentClass"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from 'tiptap-extensions'
export default {
  name: 'RichTextEditor',
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    originalContent: {
      type: String,
      default: ''
    },
    menubarClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    },
    image: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      line: -1,
      list: -1,
      reset: -1,
      formatting: []
    }
  },
  watch: {
    content(val) {
      this.$emit('chang-content', this.content)
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Image(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: this.originalContent
    })
    this.$emit('chang-content', this.originalContent)
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    }
  }
}
</script>

<style scoped>
.v-icon {
  width: 14.39px;
  height: 14.39px;
}
</style>
