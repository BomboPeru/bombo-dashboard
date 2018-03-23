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

            <p v-if="value.show" class="question">
              {{ value.answer }}
            </p>
            <div v-if="value.table === true && value.show" class="table-container">
              <table>
                <thead>
                <tr>
                  <th v-for="(item, i) in tables[value.tableNames[0]].header" :key="i+'-header'">{{ item }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in tables[value.tableNames[0]].body" :key="i+'-body'">
                  <td v-for="(subItem, j) in item" :key="j+'-subitem'">{{ subItem }}</td>
                </tr>
                </tbody>
              </table>

              <table v-if="value.tableNames.length > 1">
                <thead>
                <tr>
                  <th v-for="(item, i) in tables[value.tableNames[1]].header" :key="i+'-header'">{{ item }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in tables[value.tableNames[1]].body" :key="i+'-body'">
                  <td v-for="(subItem, j) in item" :key="j+'-subitem'">{{ subItem }}</td>
                </tr>
                </tbody>
              </table>

            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    layout: 'default',
    name: 'faq',
    components: {
    },
    data () {
      return {
        tables: {
          premios: {
            header: ['PUESTO','PREMIO'],
            body: [['1', 'S/ 200.00'], ['2', 'S/ 125.00'], ['3', 'S/ 75.00'],
              ['4', 'S/ 55.00'], ['5', 'S/ 45.00'], ['6 a 10', 'S/ 30.00'], ['11 a 20', 'S/ 20.00'], ['21 a 35', '10 BOMBO COINS'],
              ['36 a 50', '5 BOMBO COINS']]
          },
          puntaje: {
            header: ['PUNTAJE DE CADA JUGADOR'],
            body: [['Gol (ARQ o DEF)', '8'], ['Gol (MED)', '7'], ['Gol (DEL)', '6'],
              ['Asistencia', '4'], ['Jugó el partido', '1'],
              ['Jugó todo el partido', '2'], ['Amarilla', '-1'], ['Roja', '-2'],
              ['Autogol', '-3'], ['Arco en 0 (DEF)', '3'], ['Arco en 0 (ARQ)', '6'], ['Penal fallado', '-3'],
              ['Penal tapado', '4']]
          },
          multiplicador: {
            header: ['MULTIPLICADOR'],
            body: [['Ganó', '1.1'], ['Empató', '1.0'], ['Perdió', '0.9']]
          }
        },
        faq: {
          'Tema General': [
            { question: '¿Quiénes somos?', answer: 'Somos Bombo. La primera plataforma online peruana que ofrece la oportunidad al usuario de competir contra otros usuarios en un Daily Fantasy  de fútbol y ganar dinero por esto.', show: false },
            { question: '¿Qué es un Daily Fantasy?',
              answer: 'El Daily Fantasy es un sistema en que la plataforma les brinda a los usuarios el mismo presupuesto de monedas, para que así, estos puedan armar su once ideal de la liga en que la persona decida competir. \n' +
              'El puntaje del usuario se determina en base al rendimiento en vida real de los once jugadores que la persona escogió. \n' +
              'Al final de cada fecha, la persona que cuente con más puntaje será el que gane más dinero.', show: false },
            { question: '¿Cuántas personas ganan?',
              answer: 'Ganan las personas que al final de cada fecha, estén ubicados en las primeras 50 posiciones. ', show: false },
            { question: '¿Cuánto es lo mínimo para entrar?',
              answer: 'Lo mínimo para habilitar la cuenta del usuario es de S/.20, pero lo mínimo para poder competir con un equipo es de S/.10. Con esos S/.20 de entrada inicial, el usuario tendrá derecho a armar dos equipos. ', show: false },
            { question: '¿Cuánto puede ganar cada persona?',
              answer: 'Estos son los premios con los que comenzaremos, pero luego los seguiremos subiendo.', show: false, table: true, tableNames: ['premios'] },
            { question: '¿Cómo cobro mi ganancia y en cuantos días Bombo le da el dinero al usuario?',
              answer: 'Nos brindas tu cuenta bancaria y notros reaizamos en depósito dentro de los 5 días hábiles.',
              show: false },
            { question: '¿Qué ligas profesionales ofrece la plataforma Bombo, para que los usuarios compitan entre ellos?',
              answer: 'Por el momento, la plataforma Bombo, solo ofrece la Premier League, pero más adelante se piensa implementar el mundial de fútbol y otras ligas profesionales de fútbol, como la liga española, fútbol peruano, etc. ', show: false },
            { question: '¿Cuánto puntaje se le atribuye a un jugador?',
              answer: 'El puntaje del jugador se define por sus estadísticas reales bajo la siguiente ecuación: Puntaje de cada jugador x Multiplicador.',
              show: false, table: true, tableNames: ['puntaje', 'multiplicador'] },
            { question: '¿Puedo armar más de un equipo por fecha? ¿Se puede entrar más de una vez a una misma fecha con un mismo equipo?',
              answer: 'Sí se puede armar un equipo y competir más de una vez con el mismo. También se puede entrar más de una vez por fecha.', show: false },
            { question: '¿Cuándo y cómo se publican los resultados oficiales de una fecha?',
              answer: 'Una vez que acaba el último partido de la fecha. Se validan los cálculos y se revelarán dentro del mismo día.', show: false },
            { question: '¿Qué son Bombo Coins y para qué sirven?',
              answer: 'Son modenas virtuales las cuales se pueden canjear por jugadas dentro del sistema. Se entra con 10 soles o 10 Bombo coins.', show: false },
            { question: '¿A qué bancos se les puede depositar a los usuarios?',
              answer: 'Sugerimos al usuario a brindarnos cuenta BCP, pero aceptamos igual BBVA, Banbif, Interbank y Scotiabank.', show: false },
            { question: '¿Hasta qué hora es el límite para apostar en una fecha?',
              answer: 'Hasta una hora antes del primer partido de una fecha.', show: false }
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
    font-family: 'Nunito Sans';
  .container
    margin-top 42px
    width 500px
  .link-question
    cursor pointer
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 18px;
    text-align: center;
    color: #445F69;

  .question
    margin-top 20px
    margin-bottom 20px
  .table-container
    margin-top 10px
    margin-bottom 10px
    display flex
    justify-content space-around
  table
    text-align center
    font-family: Titillium Web;
  table thead
  table tbody
    color #4a4a4a
  table td
    padding 2px 10px

  .section-faq
    font-family: 'Nunito Sans';
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
