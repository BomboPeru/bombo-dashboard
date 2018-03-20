<template>
    <div id="cc-avatar" :class="['avatar-container', sm?'sm':'']">
      <span class="shadow" :style="{ borderRadius: square? '0px':'50%' }" @click="updatePhoto"></span>
      <img class="avatar-img" :src="src" :style="{ borderRadius: square? '0px':'50%' }" alt="">
    </div>
</template>

<script>
  export default {
    name: 'cc-avatar',
    props: {
      src: String,
      square: {
        type: Boolean,
        default: false
      },
      sm: Boolean
    },
    methods: {
      updatePhoto () {
        console.log('updatePhoto')

        // this.$axios.post('http://api.bombo.pe/api/v2.0/users/'+ this.user.id +'/update-profile',
        //   { user: this.user })
        //   .then(res => {
        //     console.log(res)
        //     // res.data.data
        //     this.$store.dispatch('updateUser', res.data.data)
        //     this.$store.dispatch('turnOnSnackbar', 'Perfil Actualizado')
        //   })
        //   .catch(e => {
        //     console.log(e)
        //     this.$store.dispatch('turnOnSnackbar', 'Ocurrio un error. Intentalo mas tarde.')
        //   })
      }
    },
    mounted () {

    }
  }
</script>

<style scoped lang="stylus">
  .avatar-img
    width 150px
    height 150px
    border-radius: 50%
  .shadow
    border-radius 50%
    position: absolute
    top 0
    left 0
    background-color rgba(0, 0, 0, 0)
    width: 100%
    height: 100%
  .shadow:hover
    background-color rgba(0, 0, 0, 0.27)
  .avatar-container
    position relative
    width 150px
    /*left 50%*/
    // transform translateX(-50%)
  .sm
    display inline-block
    width 100px
  .sm img
    width 100px
    height 100px
  .sm .shadow
    width 100px
    height 100px

</style>
