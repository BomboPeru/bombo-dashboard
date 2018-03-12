<template>
    <div id="position-tag" class="rounded-short elevation" :style="{background: tag.enabled?tag.color: '#71747A'}" @click="toggleTag">
      {{ tag.name }}
    </div>
</template>

<script>
  export default {
    name: 'posicion-tag',
    props: {
      tag: Object
    },
    methods: {
      toggleTag () {
        this.$emit('toggleTag', null)
      }
    }
  }
</script>

<style scoped lang="stylus">
  #position-tag
    cursor pointer
    background #dbe1ec
    font-weight bold
    font-family Titillium Web
    color white
    min-width 20px
    height 30px
    padding 2px 10px

</style>
