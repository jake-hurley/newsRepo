import React from 'react'
import { Link } from 'react-router-dom'

import { getAllNews } from '../api'

class ArticleList extends React.Component {

    state = {
        articles: [],
        isLoaded: false,
        currentTopic: ''
      }

    componentDidMount () {
        this.loadNewData()
    }

    loadNewData = () => {
        getAllNews()
        .then(articleData => {
          this.setState({
            articles: articleData.articles,
            isLoaded: true
          })
      })
    }

    changeHandler = (evt) => {
        const { name, value } = evt.target
        this.setState({
            [name]: value
        })
    }

    render () {
        if(this.state.isLoaded){
            return (
                <div>
                    <h3>Sort by Topic</h3>
                    <select name='currentTopic' className='dropdown' onChange={this.changeHandler}>
                        <option value='' className='dropdown-option'>All News</option>
                        <option value='world' className='dropdown-option'>World</option>
                        <option value='business' className='dropdown-option'>Business</option>
                        <option value='world-us' className='dropdown-option'>United States</option>
                        <option value='world-europe' className='dropdown-option'>Europe</option>
                        <option value='world-asia' className='dropdown-option'>Asia</option>
                    </select>

                    {this.state.articles.map(article => {
                        if(article.url.includes(this.state.currentTopic)) {
                            return (
                                <Link to={{pathname:`/article/${article.id}`, state: article}} className='article-list-link' key={article.id}>
                                    <div className='article-list-div'>
                                        <img className='article-list-image' src={article.urlToImage} alt='article-image'></img>
                                        <h1 className='article-list-title'>{article.title}</h1>
                                        <p className='article-list-description'>{article.description}</p>
                                        <h2 className='article-list-read-more'>Read More</h2>
                                    </div>
                                </Link>
                            )
                        }
                    })}
                </div>
            )
        } else {
            return(
                <h1>loading</h1>
            )
        }
    }

}

export default ArticleList