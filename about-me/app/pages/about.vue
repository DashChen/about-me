<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 md8>
      <v-card style="height: 100%;">
        <v-card-title primary-title>
          <h3 class="display-2 mb-3 mx-auto">{{ motto }}</h3>
          <div
            class="title"
            style="line-height: 34px !important;"
            v-html="introduction"
          ></div>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12 md4>
      <v-card>
        <v-img src="/dash.jpg">
          <v-container fill-height fluid pa-2>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline white--text" v-text="name"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-card>
    </v-flex>
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
        <br/>我會去主動與團隊溝通、持續學習新知並持續貢獻所學的人，因為我希望團隊是不斷進步的。
        <br/>我相信在每天有限的時間內，團隊的合作與共享，才能讓企業持續發展與強大。
        <br/>『踏實向前一步，勝過空話百千』，每天都是全新的自己，學習是讓自己更大，才能跟上世界齒輪的轉動，我持續的勉勵自己，我能為科技獻一份力。
      `
    }
  }
}
</script>
