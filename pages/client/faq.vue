<template>
    <div id="faq">
      <div class="container">
        <div v-for="(section, key) in faq" :key="key+'-faq-section'">
          <p class="section-faq"> {{ key }} </p>
          <div v-for="(value, _key) in section" :key="_key+'-faq-item'">
            <p>
            <span class="link-question" @click="showAnswer(value)">
              {{ value.question }}
            </span>
            </p>
            <p v-if="value.show">
              {{ value.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    layout: 'dashboard',
    name: 'faq',
    components: {
    },
    data () {
      return {
        faq: {
          'Tema 1': [
            { question: 'Pregunta 1', answer: 'ABC...', show: false },
            { question: 'Pregunta 2', answer: 'ABC...', show: false },
            { question: 'Pregunta 3', answer: 'ABC...', show: false },
            { question: 'Pregunta 4', answer: 'ABC...', show: false },
            { question: 'Pregunta 5', answer: 'ABC...', show: false }
          ],
          'Tema 2': [
            { question: 'Pregunta 1', answer: 'ABC...', show: false },
            { question: 'Pregunta 2', answer: 'ABC...', show: false },
            { question: 'Pregunta 3', answer: 'ABC...', show: false },
            { question: 'Pregunta 4', answer: 'ABC...', show: false },
            { question: 'Pregunta 5', answer: 'ABC...', show: false }
          ]
        }
      }
    },
    methods: {
      showAnswer (value) {
        value.show = !value.show
      }
    }
  }
</script>

<style scoped lang="stylus">
  #faq
    display flex
    justify-content center
  .container
    margin-top 42px
    width 500px
  .link-question
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 18px;
    text-align: center;
    color: #445F69;
  .section-faq
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 18px;
    color: #000000;
  @media screen and (max-width: 500px)
    .container
      margin-top 42px
      width 100%
</style>
