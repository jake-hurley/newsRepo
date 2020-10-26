import React from 'react'
import { Link } from 'react-router-dom'

import { getNewsById } from '../api'


class Article extends React.Component {

    state = {
        articleData: {},
        isLoaded: false
    }

    componentDidMount() {
        const articleId = this.props.match.params.id
        this.getArticleData(articleId)
    }

    convertDateToHoursAgo = () => {
        // Splits the articles date and time of publish and calculates how many hours ago the article was published.
        const currentDay = new Date().getDate()
        const currentHour = new Date().getHours()
        const splitArticleTime = this.state.articleData.publishedAt.split('T')
        const articleDate = Number(splitArticleTime[0][8] + splitArticleTime[0][9])
        const articleTime = Number(splitArticleTime[1][0] + splitArticleTime[1][1])
        if (currentDay === articleDate) {
            const hoursAgo = currentHour - articleTime
            this.setState({
                hoursAgo
            })
        } else {
            const hoursAgo =  (24 - articleTime) + currentHour
            this.setState({
                hoursAgo
            })
        }  
    }

    getArticleData = (articleId) => {
        // If data is not passed through props (refresh button was clicked) grab it from the API.
        if(this.props.location.state === undefined) {
            getNewsById(articleId)
            .then(articleData => {
                this.setState({
                    articleData,
                    isLoaded: true
                }, this.convertDateToHoursAgo)
            })
        } else {
            this.setState({
                articleData: this.props.location.state,
                isLoaded: true
            }, this.convertDateToHoursAgo)
        }
    }

    render () {
        const articleData = this.state.articleData
        console.log(this.state)
        if(this.state.isLoaded){
            return (
                <>
                    <h1 className='article-title'>{articleData.title}</h1>
                    <div className='article-container'>
                         <div className='article-image-div'>
                                <img src={articleData.urlToImage} className='article-image'></img>
                        </div>
                        <div className='article-text-div'>
                            <h3 className='article-source'>Source: {articleData.author}</h3>
                            <p className='article-date'>{this.state.hoursAgo} Hours Ago</p>
                            <p className='article-content'>
                                {articleData.content}
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                            </p>
                            <a href={articleData.url} target='_blank' className='article-link'>View Original Article</a>
                        </div>
                    </div> 
                </>
            )
    } else {
        return (
            <>
                <img src='loadingIcon.svg' className='loading'></img>
            </>
        )
    }
    }
}

export default Article