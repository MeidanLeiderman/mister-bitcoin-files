import axios from 'axios';
import { storageService } from "./StorageService";


async function getRate(){
    const lastValue = storageService.load('coinRate')
    if (lastValue) {
        if (Date.now() - lastValue.timestamp<(1000*60*2)) return Promise.resolve(lastValue.rate)
    }
    const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
    let newRate = {rate: res.data, timestamp: Date.now()}
    storageService.store('coinRate', newRate)
    return Promise.resolve(newRate.rate)
}

async function getAveragePrice() {
    const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=60days&format=json&cors=true')
    return Promise.resolve(res.data.values)
}



export default {
    getRate,
    getAveragePrice
}

