<template>
  <div v-show="isOpen">
    <div id="menu-sidebar" @click="close">

      <div class="close-btn">
        <span class="close-i" @click="close">&times;</span>
      </div>

      <transition name="sidebar">
        <div v-if="isOpen" class="sidebar">
          <div class="header">
            <cc-avatar :src="urlImage" sm class="avatar"/>
            <p class="name header-title">Name</p>
            <p class="header-title coins">
              <span class="coin-txt green">{{ credit_coin }}</span> <span> <i class="fas fa-bold green"></i> </span> &nbsp;&nbsp;/&nbsp;&nbsp;
              <span class="coin-txt yellow">{{ bombo_coin }}</span> <span><i class="far fa-money-bill-alt yellow"></i></span>
            </p>
          </div>
          <div class="items">
            <ul>
              <li v-for="(el, i) in items"
                  :key="i+'-el-sidebar'">
                <template v-if="el.url !== undefined">
                  <nuxt-link :to="el.url" class="link">
                    <i :class="['fas', 'item-icon', el.icon]" ></i>
                    {{ el.label }}
                  </nuxt-link>
                </template>
                <template v-else>
                  <p @click="el.action()">
                    <i :class="['fas', 'item-icon', el.icon]" ></i>
                    {{ el.label }}
                  </p>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import CcAvatar from './CcAvatar'

  export default {
    name: 'menu-sidebar',
    components: {
      CcAvatar
    },
    computed: {
      isOpen () {
        return this.$store.state.menuSidebar
      }
    },
    data () {
      return {
        urlImage: '',
        isOpen2: false,
        credit_coin: 0,
        bombo_coin: 0,
        items: [
          { label: 'Mi Perfil', icon: 'fa-user-circle', action: () => {
              this.close()
              this.$router.push('/client/profile')
            }
          },
          { label: 'Crear Equipo', icon: 'fa-futbol', action: () => {
              this.close()
              this.$store.state.team.selectLeagueDialog = true
            }
          },
          { label: 'Recargar Credito', icon: 'fa-credit-card', action: () => {
              this.close()
              this.$store.state.bomboPayments = !this.$store.state.bomboPayments
            }
          },
          { label: 'FAQ', icon: 'fa-question-circle', action: () => {
              this.close()
              this.$router.push('/client/faq')
            }
          }
        ]
      }
    },
    methods: {
      close () {
        this.$store.state.menuSidebar = false
      }
    },
    mounted () {

      const user = this.$store.getters['user']
      // console.log('profile', this.user)
      this.credit_coin = user.current_credit
      this.bombo_coin = user.current_bombo_coins

      const userId = this.$store.getters['auth/getUserId']
      const url = 'http://api.bombo.pe/api/v2.0/storage/users/' + userId + '/profile-photo'
      this.urlImage = url
    }
  }
</script>

<style scoped lang="stylus">
  colorPrimary = #0F202D

  #menu-sidebar
    position fixed
    top 0
    left 0
    bottom 0
    width 100%
    background rgba(0, 0, 0, 0.8)
    z-index 990
  .sidebar
    position fixed
    z-index 991
    background colorPrimary
    top 0
    left 0
    height 100%
    width 80%

  .close-btn
    position absolute
    top 4px
    right 10px
  .close-i
    cursor pointer
    color white
    font-size 36px
  .header
    text-align center
    background colorPrimary
    height 200px
    padding-top 20px
    margin-bottom 18px
  .avatar
    margin-bottom 4px
  .header-title
    color white
    font-family Titillium Web
    font-size 32px
  .coins
    font-size 14px !important
  .coin-txt
    font-weight bold
    font-size 22px
    padding-right 8px
  .items ul
    list-style-type none
    padding-left 18px
    margin-top 50px
  .items li
    text-align left
    margin-bottom 28px
    margin-left 15%
    font-size 28px
    color white
    font-family Titillium Web
  .item-icon
    padding-left 2px
    padding-right 12px
  .link
    color white
    text-decoration none
  .green
    color #25BF89
  .yellow
    color #FFC400
  .sidebar-hidden
    top 0
    left -80% !important
  .sidebar-showed
    top 0
    left 0 !important

  .sidebar-enter-active, .sidebar-leave-active {
    transition: all .2s;
  }
  .sidebar-enter, .sidebar-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform translateX(-80%)
  }

  @media screen and (max-width: 600px)
    .header-title
      color white
      font-family Titillium Web
      font-size 18px
    .items li
      text-align left
      margin-bottom 18px
      margin-left 0px
      font-size 18px
    .items ul
      margin-top 20px
</style>
