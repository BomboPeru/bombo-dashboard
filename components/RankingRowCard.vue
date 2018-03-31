<template>
    <div id="ranking-row-card" class="elevation rounded">
      <table>
        <tbody>
          <tr>
            <td id="position">{{team.position}}</td>
            <td id="photo">
              <div class="">
                <img :src="`${BASE_URL}api/v2.0/storage/users/${team.creator}/profile-photo`" alt="" height="32px">
              </div>
            </td>
            <td id="team-name">
              <div class="username">{{team.creator}}</div>
              <div class="ellipsis teamname">
                Equipo: {{team.name}}
              </div>
            </td>

            <td id="earning">
              <div class="label-earnings">Premio</div>
              <div class="earnings">
                {{ Math.round(team.prize_b_coins * 100) / 100 }} <i class="fas fa-bold fa-xs"></i> /
                {{ Math.round(team.prize_money * 100)/100 }} <i class="fas fa-money-bill-alt fa-xs"></i>
              </div>
            </td>

            <td id="score">
              <div class="label-points">Puntos</div>
              <div class="points">
                {{Math.round(team.total_points * 100)/100}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  export default {
    name: 'ranking-row-card',
    props: {
      team: Object
    },
    computed: {
      BASE_URL () {
        return this.$store.state.BASE_URL
      }
    }
  }
</script>

<style scoped lang="stylus">
  .ellipsis
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  #ranking-row-card
    background #fafafa
    /*height 30px*/
    width 100%
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin-bottom 12px
    color: #4A4A4A;
    font-family 'Nunito Sans'
    /*font-weight bold*/
  #ranking-row-card > table
    width 100%

  #position
    // width 30px
    width 10%
    text-align center
    font-size: 24px;
    font-weight: bold;
    color #594eec
  #photo
    // width 36px
    width 10%
    font-size: 14px;
  #photo div
    display block
  #photo img
    overflow: hidden;
    border-radius: 30px;
    width 32px
    object-fit: cover;

  #team-name
    width 30%
    //width 132px
    font-size: 12px;
    text-transform uppercase
  #team-name div
    display block
    width 120px
  #earning
    width 30%
    // width 129px
    font-size: 12px;
  #score
    width 15%
    // width 60px
    font-weight bold
    font-size: 12px;
    text-align center

  .label-earnings
    text-align center
    font-size 10px
  .label-earnings
  .earnings
    color #594eec
    font-weight: bold;
    text-align: center;
  .earnings
    font-size 14px

  .username
    font-size 14px
    font-weight: bold;
  .teamname
    font-size 10px

  .label-points
    color #594eec
    font-size 10px
    font-weight: bold;
  .points
    color #594eec
    font-size 18px
    font-weight: bold;


</style>
