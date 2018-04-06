import axios from 'axios'

export const state = () => ({
  isLoading: false,
  payButtonEnabled: true,
  payButtonText: 'COMPRAR AHORA',
  creditInfo: {
    card_number:'',
    cvv: '',
    expiration_year: '',
    expiration_month: '',
    email: ''
  },
  CULQI_KEY: 'pk_live_Sabys0p2rhn2D4ZM',
  planSelected: 0,
  plans: [
    { price: 'S/ 20', amount: 20, name: 'BOMBO PACK 1',
      color: 'linear-gradient(-114deg, rgb(210, 105, 202) 0%, rgb(222, 127, 71) 105%)',
      backgroundColor: '#FEB54B', cardSrc: '/payment/b_card_copy_4.png' },
    { price: 'S/ 30', amount: 30, name: 'BOMBO PACK 2',
      color: 'linear-gradient(-114deg, rgb(66, 158, 129) 0%, rgb(71, 138, 222) 105%)',
      backgroundColor: '#FE63A2', cardSrc: '/payment/b_card_copy_3.png' },
    { price: 'S/ 50', amount: 50, name: 'BOMBO PACK 3',
      color: 'linear-gradient(-114deg, rgb(93, 66, 158) 0%, rgb(222, 71, 189) 105%)',
      backgroundColor: '#4A48D2', cardSrc: '/payment/b_card_copy_2.png' },
    { price: 'S/ 100', amount: 100, name: 'BOMBO PACK 4',
      color: 'linear-gradient(-114deg, rgb(93, 66, 158) 0%, rgb(222, 71, 189) 105%)',
      backgroundColor: '#FE5567', cardSrc: '/payment/b_card.png' }
  ]
})

const mutations = {
  nextPlan (state) {
    if (state.planSelected !== state.plans.length - 1) {
      state.planSelected += 1
    } else {
      state.planSelected = 0
    }
  },
  prevPlan (state) {
    if (state.planSelected !== 0) {
      state.planSelected -= 1
    } else {
      state.planSelected = state.plans.length - 1
    }
  }
}

const actions = {
  async pay ({state, commit, dispatch, rootState, rootGetters}) {

    if (!state.payButtonEnabled) {
      return null
    }

    if (state.creditInfo.card_number.length !== 16 ||
      state.creditInfo.cvv.length !== 3 ||
      !(state.creditInfo.expiration_month.length === 2 || state.creditInfo.expiration_month.length === 1) ||
      state.creditInfo.expiration_year.length !== 4
    ) {
      dispatch('turnOnSnackbar', 'Datos inválidos. Revisa el formato al ingresar tus datos', { root: true })
      return null
    }

    if ( parseInt(state.creditInfo.expiration_month) > 12 || parseInt(state.creditInfo.expiration_month) === 0) {
      dispatch('turnOnSnackbar', 'Datos inválidos. Mes inválido. (formato: MM)', { root: true })
      return null
    }

    state.payButtonEnabled = false
    state.payButtonText = 'Espere...'

    const user = rootState.user
    state.creditInfo.email = user.email

    const creditCard = state.creditInfo.card_number

    let request = {
      card_number: creditCard,
      cvv: state.creditInfo.cvv,
      expiration_year: state.creditInfo.expiration_year,
      expiration_month: state.creditInfo.expiration_month,
      email: state.creditInfo.email
    }

    // console.log('request',request)

    const token = rootGetters['auth/getToken']
    const publicKey = state.CULQI_KEY

    // console.log('token', token)
    // console.log('publicKey', publicKey)

    rootState.isShortLoading = true

    try {

      {
        // --- STEP 1 ---
        const response = await axios.post('https://api.culqi.com/v2/tokens', request,
          { headers: { Authorization: 'Bearer ' + publicKey } })

        let request2 = {
          card_number: request.card_number,
          token_card: response.data.id
        }
        console.log('request2', request2)

        // --- STEP 2 ---
        const response2 = await axios.post(`${rootState.BASE_URL}api/v2.0/users/${user.id}/set-card`, request2,
          { headers: { Authorization: 'Bearer ' + token} })

        console.log('response2', response2)

        const amount = state.plans[state.planSelected].amount
        let finalRequest = {
          how: amount
        }

        // --- STEP 3 ---
        const finalResponse = await axios.post(`${rootState.BASE_URL}api/v2.0/users/${user.id}/charge`, finalRequest,
          { headers: { Authorization: 'Bearer ' + token} })


        state.payButtonText = 'COMPRAR AHORA'
        state.payButtonEnabled = true

        console.log('finalResponse', finalResponse.data)
        dispatch('updateUser', finalResponse.data.data, { root: true })

        rootState.isShortLoading = false
        dispatch('turnOnSnackbar', 'Felicidades! tu compra ha sido realizada con exito.', { root: true })

        if (rootState.bomboPayments === true) {
          rootState.bomboPayments = false
        }
      }
    } catch (e) {
      rootState.isShortLoading = false
      console.log('e bombo pa',e.toString())
      dispatch('turnOnSnackbar', e.response.data.user_message, { root: true })

      state.payButtonEnabled = true
      state.payButtonText = 'COMPRAR AHORA'
    }
  }
}

const payment = {
  namespaced: true,
  state,
  mutations,
  actions
}


export default payment
