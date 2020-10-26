const APIURL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=`
const APIKEY = '3055f8f90fa44bbe8bda05385a20690a'

export function getAllNews () {
    return fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3055f8f90fa44bbe8bda05385a20690a')
    .then(response => {
        return response.json()
    })
    .then(data => {
        return assignArticleIds(data)
    })
}

export function getNewsById(id) {
    return getAllNews()
    .then(response => {
        return response.articles.find(article => article.id === id)
    })
}

// ASSIGN AN ID FOR EACH ARTICLE BASED ON URL ID PROVIDED AT THE END OF ARTICLE.URL 
function assignArticleIds (articles) {
    articles.articles.map(article => {
        // CHECKS FOR BBC SPORT URL
        if (article.url.includes('sport')) {
            const getIdFromUrl = article.url.split('/')
            const newId = getIdFromUrl[getIdFromUrl.length - 1]
            article.id = newId
        } else {
            const getIdFromUrl = article.url.split('-')
            const newId = getIdFromUrl[getIdFromUrl.length - 1]
            article.id = newId
        }
    })
    return articles
}