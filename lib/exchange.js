async function getExchangeData(coingeckoSymbol) {
    const getData = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${coingeckoSymbol}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    const OriginalCoin = await getData.json()
    const FilterOriginalCoin = OriginalCoin.filter(function(OriginalCoin) {
        return OriginalCoin.current_price !== 1;
    });
        return FilterOriginalCoin
}

export default getExchangeData