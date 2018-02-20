<template>
    <div id="ranking-row-card" class="elevation rounded">
      <table>
        <tbody>
          <tr>
            <td id="position">{{user.position}}</td>
            <td id="username" >
              <div class="ellipsis">
                {{user.username}}
              </div>
            </td>
            <td id="team-name">
              <div class="ellipsis">
                {{user.teamName}}
              </div>
            </td>
            <td id="score">{{user.score}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  export default {
    name: 'ranking-row-card',
    props: {
      user: Object
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
    height 30px
    width 100%
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin-bottom 12px
    color: #4A4A4A;
    font-family Titillium Web
    /*font-weight bold*/
  #ranking-row-card > table
    width 100%
  #position
    width 55px
    text-align center
    font-size: 14px;
  #username
    width 76px
    font-size: 10px;
  #username div
    display block
    width 60px
  #team-name
    width 132px
    font-size: 8px;
    text-transform uppercase
  #team-name div
    display block
    width 120px
  #score
    width 60px
    font-size: 10px;
    text-align center
</style>
