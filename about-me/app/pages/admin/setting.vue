<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-title>設定個人資訊</v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex xs8 class="px-2">
              <v-text-field
                ref="name"
                v-model="name"
                :rules="[() => !!name || 'This field is required']"
                label="姓名"
                placeholder="陳民凰"
                required
              ></v-text-field>
              <v-text-field
                ref="englishName"
                v-model="englishName"
                :rules="[() => !!englishName || 'This field is required']"
                label="英文名"
                placeholder="Dash Chen"
                required
              ></v-text-field>
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="請選擇..."
                required
              ></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              <v-img
                :src="photo.src"
                aspect-ratio="1"
                class="grey lighten-2"
                @click.stop.prevent="openUpload"
              ></v-img>
              <input
                type="file"
                accept="image/*"
                class="d-none upload"
                @change="upload($event, 'photo', -1)"
              />
            </v-flex>
          </v-layout>
          <v-text-field
            ref="motto"
            v-model="motto"
            label="座右銘"
            placeholder="生命不是要超越別人，而是要超越自己"
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="信箱"
            placeholder="zacxd7405@gmail.com"
            required
          ></v-text-field>
          <v-text-field
            ref="cellphone"
            v-model="cellphone"
            label="電話"
            mask="phone"
            placeholder="(886)9XX-XXXXXX"
            required
          ></v-text-field>
          <rich-text
            :original-content="$store.state.setting.about"
            menubar-class="elevation-0"
            content-class="grey lighten-5"
            @change-content="about = $event"
          >
          </rich-text>
          <v-card class="elevation-0">
            <v-card-title class="pa-0">
              <span class="headline">社群媒體</span>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-layout
                v-for="(item, index) in communities"
                :key="index"
                row
                class="px-2"
              >
                <v-flex xs2 class="px-1 ma-auto">
                  <v-icon v-text="item.icon"></v-icon>
                </v-flex>
                <v-flex xs10 class="px-1">
                  <v-text-field
                    v-model="communities[index].href"
                    label="網址"
                    clearable
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card class="elevation-0">
            <v-card-title class="pa-0">
              <span class="headline">能力</span>
            </v-card-title>
            <v-card-text class="pa-2">
              <v-layout v-for="(skill, index) in skills" :key="index" row>
                <v-flex xs12 class="px-1">
                  <v-text-field
                    v-model="skills[index].title"
                    label="標題"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="px-1">
                  <v-text-field
                    v-for="(content, ci) in skills[index].content"
                    :key="ci"
                    v-model="skills[index].content[ci]"
                    label="內容"
                    clearable
                    :append-outer-icon="
                      ci + 1 == skills[index].content.length ? 'add' : 'delete'
                    "
                    @click:append-outer="addOrDel(index, ci)"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-show="skills.length > 1"
                fab
                dark
                small
                color="red"
                class="ml-auto"
                @click="del('skills')"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="primary"
                :class="{ 'ml-auto': skills.length < 2 }"
                @click="add('skills')"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="elevation-0">
            <v-card-title class="pa-0">
              <span class="headline">重要經歷</span>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-layout
                v-for="(experience, index) in experiences"
                :key="index"
                row
              >
                <v-flex xs12 sm10 class="px-1">
                  <v-layout column>
                    <v-flex xs12>
                      <v-text-field
                        v-model="experiences[index].title"
                        label="標題"
                        clearable
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        v-model="experiences[index].content"
                        label="內容"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm2 class="px-1 my-auto">
                  <v-img
                    :src="experiences[index].img.src"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    @click.stop.prevent="openUpload"
                  ></v-img>
                  <input
                    type="file"
                    accept="image/*"
                    class="d-none upload"
                    @change="upload($event, 'experiences', index)"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-show="experiences.length > 1"
                fab
                dark
                small
                color="red"
                class="ml-auto"
                @click="del('experiences')"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="primary"
                :class="{ 'ml-auto': experiences.length < 2 }"
                @click="add('experiences')"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="elevation-0">
            <v-card-title class="pa-0">
              <span class="headline">競賽</span>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-layout v-for="(contest, index) in contests" :key="index" row>
                <v-flex xs12 sm6 class="px-1">
                  <v-text-field
                    v-model="contests[index].title"
                    label="標題(含時間)"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-1">
                  <v-text-field
                    v-model="contests[index].content"
                    label="內容"
                    clearable
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-show="contests.length > 1"
                fab
                dark
                small
                color="red"
                class="ml-auto"
                @click="del('contests')"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="primary"
                :class="{ 'ml-auto': contests.length < 2 }"
                @click="add('contests')"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="elevation-0">
            <v-card-title class="pa-0">
              <span class="headline">活動</span>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-layout
                v-for="(activity, index) in activities"
                :key="index"
                row
              >
                <v-flex xs12 sm6 class="px-1">
                  <v-text-field
                    v-model="activities[index].title"
                    label="標題"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-1">
                  <v-text-field
                    v-model="activities[index].content"
                    label="內容"
                    clearable
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-show="activities.length > 1"
                fab
                dark
                small
                color="red"
                class="ml-auto"
                @click="del('activities')"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="primary"
                :class="{ 'ml-auto': activities.length < 2 }"
                @click="add('activities')"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="elevation-0">
            <v-card-title class="pa-0">
              <span class="headline">相關證明</span>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-layout
                v-for="(certification, index) in certifications"
                :key="index"
                column
              >
                <v-flex xs12>
                  <v-text-field
                    v-model="certifications[index].title"
                    label="標題"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="certifications[index].content"
                    label="內容"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="px-1 my-auto">
                  <v-btn
                    color="blue-grey"
                    class="white--text ml-auto"
                    small
                    @click.stop.prevent="openUpload"
                  >
                    上傳多張照片
                    <v-icon right dark>cloud_upload</v-icon>
                  </v-btn>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    class="d-none upload"
                    @change="upload($event, 'certifications', index, true)"
                  />
                  <v-layout row>
                    <v-flex
                      v-for="(img, i) in certifications[index].img"
                      :key="i"
                      xs4
                    >
                      <v-img
                        :src="img"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      ></v-img>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-show="certifications.length > 1"
                fab
                dark
                small
                color="red"
                class="ml-auto"
                @click="del('certifications')"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="primary"
                :class="{ 'ml-auto': certifications.length < 2 }"
                @click="add('certifications')"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn nuxt to="/admin">取消</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on }">
                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
              <span>還原</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-overlay :value="showUpload" opacity="0.8" z-index="100">
      <v-layout row justify-center aligen-center fill-height>
        <v-card v-for="(img, index) in uploadImgs" :key="index">
          <v-card-text>
            <v-img :src="img.src" class="upload-img"></v-img>
          </v-card-text>
          <v-card-actions>
            <span v-if="img.progress < 100" class="red--text">
              上傳中: {{ img.progress + '%' }}
            </span>
            <span v-else>上傳完畢</span>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-overlay>
  </v-layout>
</template>

<script>
import RichText from '@/components/RichTextEditor'
export default {
  name: 'Setting',
  layout: 'admin',
  components: {
    RichText
  },
  data: () => {
    return {
      countries: [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antigua &amp; Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia &amp; Herzegovina',
        'Botswana',
        'Brazil',
        'British Virgin Islands',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Cape Verde',
        'Cayman Islands',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Congo',
        'Cook Islands',
        'Costa Rica',
        'Cote D Ivoire',
        'Croatia',
        'Cruise Ship',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Estonia',
        'Ethiopia',
        'Falkland Islands',
        'Faroe Islands',
        'Fiji',
        'Finland',
        'France',
        'French Polynesia',
        'French West Indies',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kuwait',
        'Kyrgyz Republic',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macau',
        'Macedonia',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Namibia',
        'Nepal',
        'Netherlands',
        'Netherlands Antilles',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Norway',
        'Oman',
        'Pakistan',
        'Palestine',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Reunion',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Pierre &amp; Miquelon',
        'Samoa',
        'San Marino',
        'Satellite',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'South Africa',
        'South Korea',
        'Spain',
        'Sri Lanka',
        'St Kitts &amp; Nevis',
        'St Lucia',
        'St Vincent',
        'St. Lucia',
        'Sudan',
        'Suriname',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        "Timor L'Este",
        'Togo',
        'Tonga',
        'Trinidad &amp; Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks &amp; Caicos',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'Uruguay',
        'Uzbekistan',
        'Venezuela',
        'Vietnam',
        'Virgin Islands (US)',
        'Yemen',
        'Zambia',
        'Zimbabwe'
      ],
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      formHasErrors: false,
      showUpload: false,
      uploadImgs: []
    }
  },
  asyncData({ store }) {
    return JSON.parse(JSON.stringify(store.state.setting))
  },
  methods: {
    add(key) {
      const item = this.$_.cloneDeep(this.$data[key][0])
      const self = this
      this.$_.forOwn(item, function(v, k) {
        item[k] = self.$_.isArray(v) ? [] : ''
      })
      this.$data[key].push(item)
    },
    del(key) {
      this.$data[key].splice(-1, 1)
    },
    addOrDel(index, ci) {
      if (ci + 1 === this.skills[index].content.length) {
        this.skills[index].content.push('??')
      } else {
        this.$delete(this.skills[index].content, ci)
      }
    },
    openUpload(e) {
      this.$_.forEach(e.target.parentElement.parentElement.children, function(
        children
      ) {
        if (children.tagName === 'INPUT') {
          children.click()
        }
      })
    },
    upload(e, key, index, mulit) {
      const self = this
      const imgs = []
      if (mulit) {
        this.$_.forEach(e.target.files, function(file, index) {
          // eslint-disable-next-line
          let fr = new FileReader()
          fr.onload = function() {
            imgs.push({
              src: fr.result,
              name: file.name
            })
            if (index === e.target.files.length - 1) {
              self.$data[key][index].img = imgs
            }
          }
          fr.readAsDataURL(file)
        })
      } else if (index === -1) {
        const fr = new FileReader()
        fr.onload = function() {
          imgs.push({
            src: fr.result,
            name: e.target.files[0].name
          })
          self.$data[key] = {
            src: fr.result,
            name: e.target.files[0].name
          }
          e.target.value = null
        }
        fr.readAsDataURL(e.target.files[0])
      } else {
        const fr = new FileReader()
        fr.onload = function() {
          imgs.push({
            src: fr.result,
            name: e.target.files[0].name
          })
          self.$data[key][index].img = {
            src: fr.result,
            name: e.target.files[0].name
          }
          e.target.value = null
        }
        fr.readAsDataURL(e.target.files[0])
      }
    },
    resetForm() {
      this.formHasErrors = false
      const form = this.$_.cloneDeep(this.$data)
      this.$_.omit(form, ['countries', 'rules', 'formHasErrors'])
      Object.keys(form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    save: function() {
      this.formHasErrors = false
      const form = this.$_.omit(this.$data, [
        'countries',
        'rules',
        'formHasErrors',
        'uploadImgs'
      ])
      Object.keys(form).forEach(f => {
        if (this.$refs[f] && !this.$refs[f].validate(true)) {
          this.formHasErrors = true
        }
      })
      if (this.formHasErrors) return
      // 逐一比對不同處，因為圖片要上傳到雲端空間，要先將圖片上傳後取回 url
      // 有變更圖片要重新上傳，顯示上傳畫面
      // 需要比對的有 photo 、experiences 多筆單張、certifications 多筆多張
      const storageRef = this.$storage.ref()
      const uploadImgsPromises = []
      if (this.$store.state.setting.photo.src !== this.photo.src) {
        this.showUpload = true
        if (this.photo.src.includes('data:image/')) {
          const img = {
            src: this.photo.src,
            name: this.photo.name,
            progress: 0
          }
          this.uploadImgs.push(img)
          const self = this
          const photoRef = storageRef
            .child(`images/${this.photo.name}`)
            .putString(this.photo.src, 'data_url')

          uploadImgsPromises.push(
            new Promise((resolve, reject) => {
              photoRef.on(
                'state_changed',
                function(snapshot) {
                  img.progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                },
                function(error) {
                  console.log(error)
                },
                function() {
                  photoRef.snapshot.ref
                    .getDownloadURL()
                    .then(function(downloadURL) {
                      self.photo.src = downloadURL
                      resolve(downloadURL)
                    })
                }
              )
            })
          )
        }
      }
      const self = this
      if (
        JSON.stringify(this.$store.state.setting.experiences) !==
        JSON.stringify(this.experiences)
      ) {
        this.$_.forEach(this.experiences, function(e, index) {
          if (e.img instanceof Blob) {
            self.showUpload = true
            const experienceRef = storageRef
              .child(`setting/imgs/experiences/${e.img.name}`)
              .put(e.img.src)
            // eslint-disable-next-line
            let img = {
              src: e.img.src,
              name: e.img.name,
              progress: 0
            }
            self.uploadImgs.push(img)

            uploadImgsPromises.push(
              new Promise((resolve, reject) => {
                experienceRef.on(
                  'state_change',
                  function(snapshot) {
                    img.progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  },
                  function(error) {
                    console.log('experience', index, error)
                  },
                  function() {
                    experienceRef.snapshot
                      .ref()
                      .getDownloadURL()
                      .then(function(downloadURL) {
                        self.experiences[index].img.src = downloadURL
                        resolve(downloadURL)
                      })
                  }
                )
              })
            )
          }
        })
      }
      if (
        JSON.stringify(this.$store.state.setting.certifications) !==
        JSON.stringify(this.certifications)
      ) {
        this.$_.forEach(this.certifications, function(c, index) {
          // eslint-disable-next-line no-unused-vars
          const i = 1
          self.$_.forEach(c, function(img, i) {
            if (!(img.src instanceof Blob)) {
              return
            }
            self.showUpload = true
            const certificationRef = storageRef
              .child(`setting/imgs/certifications/${i}-${img.name}`)
              .put(img.src)
            // eslint-disable-next-line
            let cimg = {
              src: img.src,
              name: img.name,
              progress: 0
            }
            self.uploadImgs.push(cimg)
            uploadImgsPromises.push(
              new Promise((resolve, reject) => {
                certificationRef.on(
                  'state_change',
                  function(snapshot) {
                    cimg.progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  },
                  function(error) {
                    console.log('certifications', index, i, error)
                  },
                  function() {
                    certificationRef.snapshot
                      .ref()
                      .getDownloadURL()
                      .then(function(downloadURL) {
                        self.certifications[index].img[i].src = downloadURL
                        resolve(downloadURL)
                      })
                  }
                )
              })
            )
            i++
          })
        })
      }
      Promise.all(uploadImgsPromises).then(values => {
        self.$store.dispatch('setting/setData', {
          data: form,
          vm: self
        })
        setTimeout(function() {
          self.showUpload = false
          self.$router.push('/admin')
        }, 500)
      })
    }
  }
}
</script>

<style scoped>
.upload-img {
  max-width: 200px;
  max-height: 200px;
}
</style>
