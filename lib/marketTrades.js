export async function getMarketTradeHuobi(marketTradeSymbol){
    try {
        const getData = await fetch(`https://api.huobi.pro/market/trade?symbol=${marketTradeSymbol}`)
        const marketTrade = await getData.json();
        return marketTrade;
    } catch (error) {
        return error;
    }
}