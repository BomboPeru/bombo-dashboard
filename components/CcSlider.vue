<template>
  <div id="cc-slider" :style="{ width: width }">
    <no-ssr>
      <vue-slider ref="inputSlider"
                  :min="min"
                  :max="max"
                  tooltip="always"
                  :tooltipDir="['top', 'top']"
                  :sliderStyle="[{ 'backgroundColor': '#243337'}, { 'backgroundColor': '#243337'}]"
                  :processStyle="{'backgroundColor': '#243337'}"
                  :tooltipStyle="[{'backgroundColor': '#fafafa',
                  'borderColor': '#243337',
                  'border': '2px solid',
                  'font-family': 'Titillium Web',
                  'color': '#243337',
                  },
                  { 'backgroundColor': '#fafafa',
                    'borderColor': '#243337',
                    'border': '2px solid',
                    'font-family': 'Titillium Web',
                    'color': '#243337'
                  }]"
                  v-model="localValue"/>
    </no-ssr>
  </div>
</template>

<script>
  let _components = {}
  if (process.browser) {
    let VueSlider = require('vue-slider-component')
    _components['vue-slider'] = VueSlider
  }

  export default {
    name: 'cc-slider',
    components: _components,
    props: {
      step: Number,
      max: Number,
      min: Number,
      width: {
        type: String,
        Default: '150px'
      },
      value: Array
    },
    computed: {
      localValue: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">
  sliderBorder = #243337
  sliderFill = #243337 // #fafafa
  pickerFill = #fafafa // #243337
  borderIndicator = #243337 // #fafafa

  #cc-slider
    color grade
    position relative
    margin-top 42px
  .indicator
    font-weight bold
    font-family Titillium Web
    line-height 14px
    position absolute
    top -14px
    /*left 0*/
    display inline-block
    padding 0px 3px
    height 22px
    text-align center
    border 3px solid borderIndicator
    border-radius 4px
    background white
  .slider
    outline none
    width 100%
  .slider[type=range] {
    -webkit-appearance: none;
    margin: 13.2px 0;
  }
  .slider[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    /*box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;*/
    background: sliderFill;
    border-radius: 4px;
    border: 2px solid sliderBorder;
  }
  .slider[type=range]::-webkit-slider-thumb {
    /*box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;*/
    border: 3px solid #000000;
    height: 18px;
    width: 18px;
    border-radius: 18px;
    background: pickerFill;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }
  .slider[type=range]:focus::-webkit-slider-runnable-track {
    background: sliderFill;
  }
  /*

  .slider[type=range]::-moz-range-track {
    width: 100%;
    height: 12.6px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #928483;
    border-radius: 6.2px;
    border: 0.7px solid #562425;
  }
  .slider[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
    border: 2.2px solid #000000;
    height: 39px;
    width: 19px;
    border-radius: 2px;
    background: #6b1817;
    cursor: pointer;
  }
  .slider[type=range]::-ms-track {
    width: 100%;
    height: 12.6px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  .slider[type=range]::-ms-fill-lower {
    background: #867776;
    border: 0.7px solid #562425;
    border-radius: 12.4px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  .slider[type=range]::-ms-fill-upper {
    background: #928483;
    border: 0.7px solid #562425;
    border-radius: 12.4px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  .slider[type=range]::-ms-thumb {
    box-shadow: 1px 1px 1px #050000, 0px 0px 1px #1f0000;
    border: 2.2px solid #000000;
    height: 39px;
    width: 19px;
    border-radius: 2px;
    background: #6b1817;
    cursor: pointer;
    height: 12.6px;
  }
  .slider[type=range]:focus::-ms-fill-lower {
    background: #928483;
  }
  .slider[type=range]:focus::-ms-fill-upper {
    background: #9e9191;
  }
   */
</style>
