import dashboard from './dashboard'

const payment = {
  namespaced: true,
  state: {
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
  },
  getters: {},
  mutations: {}
}


export default payment
