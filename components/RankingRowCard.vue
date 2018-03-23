<template>
    <div id="ranking-row-card" class="elevation rounded">
      <table>
        <tbody>
          <tr>
            <td id="position">{{team.position}}</td>
            <td id="photo">
              <div class="">
                <img src="../assets/icons/avatar.png" alt="" height="36px">
              </div>
            </td>
            <td id="team-name">
              <div class="username">{{team.creator}}</div>
              <div class="ellipsis teamname">
                Equipo: {{team.name}}
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
    width 30px
    text-align center
    font-size: 24px;
    font-weight: bold;
    color #594eec
  #photo
    width 36px
    font-size: 14px;
  #photo div
    display block
    width 36px
  #team-name
    width 132px
    font-size: 12px;
    text-transform uppercase
  #team-name div
    display block
    width 120px
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


  #score
    width 60px
    font-weight bold
    font-size: 12px;
    text-align center
</style>
