<template lang="pug">
.container.mb-5
  .row
    .col
      .d-flex.span.pr-3.pt-3
        .d-flex.align-items-center.ml-auto
          gh-btns-star(slug="volentix/vdex-main-GUI" show-count)

          el-tooltip(content="Join us on Telegram!" placement="top" effect="light")
            a(href="https://t.me/Volentix" target="_blank")
              img(src="/telegram.png" height="40").ml-2
  .row
    .col-lg.m-auto
      .d-flex
        //nuxt-link(tag="span" :to="{name: 'index'}" style="cursor: pointer;") EOS Swap:
        nuxt-link(tag="span" :to="{name: 'index'}" style="cursor: pointer;")
          h1.display-3 {{ app_name }}
          img(src="~/assets/logo.png").logo
          


        h1.align-self-center.ml-5.lead.mt-2
          span EOS decentralized exchange.

        .d-flex.align-items-center.span.ml-auto.pr-3.pt-3
          span(v-if="user")
            a(:href="'https://eos.eosx.io/account/' + user.name" target="_blank") {{ $store.state.user.name }}
            el-button(v-if="user" size="small" type="info" plain @click="logout").ml-3 logout

          el-button(@click="login" type="primary" size="medium" v-if="!user").ml-auto Sign In via Scatter
          

      el-alert(title="Scatter is not connected:" :closable="false" show-icon type="info" v-if="!$store.state.chain.scatterConnected").mt-2
        span.ml-1 Unlock or install
        a(href="https://get-scatter.com/" target="_blank") Scatter
        i(@click="scatterConnect" size="mini").el-alert__closebtn Update

      el-alert(:closable="false" show-icon type="error" v-if="$store.state.chain.oldScatter").mt-4
        span.ml-1  You are using an old version of Scatter! So the app may not work correctly.

        a(href="https://get-scatter.com/" target="_blank")  Update Scatter

      el-alert(title="Node is not connected:" :closable="false"  show-icon type="error" v-if="netError").mt-2
        span.ml-1 Network is unreacheble please check your internet connection.

      nuxt

      //.row.mt-3
        .col.text-mutted
          small
            span.text-muted App version:
              a(href="https://github.com/Volentix/vDexNode-GUI" target="_blank").text-secondary {{ lastCommit.sha }}
                span(v-if="lastCommit.commit") ({{ lastCommit.commit.message }})

  footer
    .row
      .col.d-flex
        span.ml-auto Created by
          b
            a(href="https://volentix.io" target="_blank") 
</template>

<script>
import { captureException } from '@sentry/browser'
import { mapGetters } from 'vuex'
import axios from 'axios'

import config from '~/config'


export default {
  data() {
    return {
      netError: false,
      lastCommit: {},

      app_name: config.APP_NAME
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  async created() {
    this.getVersion()

    try {
      await this.$store.getters['chain/rpc'].get_info()
    } catch (e) {
      this.netError = true
      console.log('Net error', e)
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch('chain/logout')
    },

    async login() {
      if (this.$store.state.chain.scatterConnected) {
        const loading = this.$loading({
          lock: true,
          text: 'Wait for Scatter'
        })

        try {
          await this.$store.dispatch('chain/login')
        } catch (e) {
          captureException(e)
          this.$notify({ title: 'Scatter login error', message: e.message, type: 'error' })
        } finally {
          loading.close()
        }
      } else {
        this.$notify({ title: 'Scatter not found', message: 'Please install or unlock Scatter', type: 'info' })
      }
    },

    async scatterConnect() {
      try {
        await this.$store.dispatch('chain/scatterConnect')

        if (this.$store.state.chain.scatterConnected)
          this.$notify({ title: 'Scatter', message: 'Scatter connected', type: 'success' })
      } catch (e) {
        this.$notify({ title: 'Scatter error', message: e.message, type: 'error' })
      }
    },

    async getVersion() {
      this.lastCommit = (await axios.get('https://api.github.com/repos/volentix/vdex-main-GUI/commits/master')).data
    }
  }
}
</script>

<style>
.logo {
  width: 100%;
  max-width: 300px;
}

.container {
  margin-top: 10px;
}

footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding-right: 5px;
}
</style>
