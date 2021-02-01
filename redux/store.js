import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const reducer = (state = 
  {
    themeName: 'cloud',
    themeType: 'light',
    Exchange: null,
    coingeckoSymbol: "usd",
    cryptoCompareTsym: 'btc',
    PeriodicDataUpdate: 'day',
    TraidingView: false,
    candleChartData: null,
    pairSymbol: null,
    marketTradeSymbol: 'btcusdt',
    marketTradeSymbolTitle: 'BTC-USDT',
    marketTrade: null,
    isLoading: 0,
  },
   action) =>{
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.payload};
    case 'themeName':
      return {...state, themeName: action.payload};
    case 'themeType':
      return {...state, themeType: action.payload};
    case 'Exchange':
      return {...state, Exchange: action.payload};
    case 'coingeckoSymbol':
      return {...state, coingeckoSymbol: action.payload};
    case 'cryptoCompareTsym':
      return {...state, cryptoCompareTsym: action.payload};
    case 'PeriodicDataUpdate':
      return {...state, PeriodicDataUpdate: action.payload};
    case 'TraidingView':
      return {...state, TraidingView: action.payload};
    case 'candleChartData':
      return {...state, candleChartData: action.payload};
    case 'pairSymbol':
      return {...state, pairSymbol: action.payload};
    case 'marketTradeSymbol':
      return {...state, marketTradeSymbol: action.payload};
    case 'marketTrade':
      return {...state, marketTrade: action.payload};
    case 'marketTradeSymbolTitle':
      return {...state, marketTradeSymbolTitle: action.payload};
    case 'isLoading':
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

const makeStore = context => createStore(reducer);

export const wrapper = createWrapper(makeStore, {debug: false});