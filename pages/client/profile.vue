<template>
  <div id="profile">
    <div class="container">
      <div class="profile-section">
        <div class="card-profile elevation rounded">
          <cc-avatar src="/profile_photo.png"/>
          <div class="info-section">
            <p class="username">m@xlr2005 </p>
            <p class="coins">45B</p>

            <p class="name">Max Landeo</p>
            <p class="email">maxlr2005@gmail.com</p>
            <p class="dni">DNI 74697172</p>
            <div class="btn-container center">
              <div class="add-phone-btn">
                Agregar un numero telefonico
              </div>
            </div>
            <!--<p class="phone-btn">DNI 74697172</p>-->
            <p class="country"><span><img src="/peru_flag.png" alt=""></span> Peru</p>
          </div>
          <div class="btn-container right">
            <div class="edit-btn elevation">
              <span class="icon-edit"><img src="../../assets/icons/pencil.png" alt=""></span>
              Editar
            </div>
          </div>
        </div>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
  import IconButton from '../../components/IconButton'
  import CcAvatar from '../../components/CcAvatar'

  export default {
    layout: 'dashboard',
    name: 'profile',
    components: {
      IconButton, CcAvatar
    }
  }
</script>

<style scoped lang="stylus">
  /*#matches*/
  #profile
    height calc(100vh - 128px)
  .container
    display flex
  .profile-section
    width 250px
    padding 24px 12px 4px 15px
  .card-profile
    background #fafafa
    padding-top 12px
  .info-section
    padding 12px 24px 12px 24px
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    color: #445F69;
  .info-section p
    margin-bottom 6px
  .username
  .coins
    text-align center
  .coins
    color #25BF89
  .coins
    margin-bottom 46px !important
  .btn-container
    margin-top 12px
    margin-bottom  12px
    margin-right 12px
    margin-left 12px
  .center
    text-align center
  .right
    text-align right
  .add-phone-btn
    display inline-block
    background #25BF89
    color white
    border-radius: 10px;
    padding 1px 10px 1px 10px
    font-weight: normal
    height 24px
    cursor pointer
  .country span
    margin-right 10px
  .edit-btn
    display inline-block
    background #445F69
    color white
    border-radius: 10px;
    padding 1px 10px 1px 10px
    font-weight: normal
    height 24px
    cursor pointer
    font-family: Titillium Web;
    font-size: 14px;
    margin-bottom  12px
  .icon-edit
    position: relative;
    top: 3px;

  @media screen and (max-width: 1023px)
    .container
      display block
    .profile-section
      width 100%
</style>
