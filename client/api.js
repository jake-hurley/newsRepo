
const APIURL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=`
const APIKEY = '3055f8f90fa44bbe8bda05385a20690a'


export function getAllNews () {
    // console.log(APIURL + APIKEY)
    return fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3055f8f90fa44bbe8bda05385a20690a')
    .then(response => {
        return response.json()
    })
}