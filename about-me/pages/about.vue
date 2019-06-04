<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'About',
  asyncData(context) {
    return {
      name: '民凰',
      motto: '為明日科技獻一份力',
      introduction: `
        \n2016年12月從海軍司令部少校退伍，期間經歷學習過投資匯市、自寫過交易程式(MT4)，直到2017年10月才正式踏入軟體業大門。
        \n透過自學完成C#、PHP、Python等語言，使用過Unity寫Hololens;Visual studio 2017 寫 WPF、Service、WCF、Opencv 人臉偵測;
        \nPhp-laravel、yii2，javascript Vue framework，npm package 等，都有相關專案作品可以呈現。
        \n我會去主動與團隊溝通、持續學習新知並持續貢獻所學的人，因為我希望團隊是不斷進步的。
        \n我相信在每天有限的時間內，團隊的合作與共享，才能讓企業持續發展與強大。
        \n腳踏實地的踏出每一步，每天都是全新的自己，學習是讓自己更大，才能跟上世界齒輪的轉動，我持續的勉勵自己，我能為科技獻一份力。
      `,
      md: ''
    }
  },
  created() {
    this.md = this.$md.render(this.introduction)
  },
  mounted() {}
}
</script>
