async function getCandleChartData(PeriodicDataUpdate, coingeckoSymbol,cryptoCompareTsym){

    const fetchUrl = `${process.env.NEXT_PUBLIC_CRYPTOCOMPARE_URL}/histo${PeriodicDataUpdate}?fsym=${coingeckoSymbol}&tsym=${cryptoCompareTsym}&limit=2000&${process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY}`
    const getData = await fetch( fetchUrl );
    const CandleData = await getData.json().then((data) => {return data.Data.Data}).catch((err)=>{return err})
    return CandleData
}

export default getCandleChartData;