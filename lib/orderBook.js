export async function getPairSymbolHuobi(){
    try {
        const getData = await fetch('https://api.huobi.pro/v1/common/symbols');
        const pairSymbol = await getData.json();
        return pairSymbol;
    } catch (error) {
        return error
    }
}