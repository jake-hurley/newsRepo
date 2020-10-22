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
                    <h1>Articles</h1>

                    <h3>Sort by Topic</h3>
                    <select name='currentTopic' onChange={this.changeHandler}>
                        <option value=''>All News</option>
                        <option value='world'>World</option>
                        <option value='business'>Business</option>
                        <option value='world-us'>United States</option>
                        <option value='world-europe'>Europe</option>
                        <option value='world-asia'>Asia</option>
                    </select>

                    {this.state.articles.map(article => {
                        if(article.url.includes(this.state.currentTopic)) {
                            return (
                                <Link to={{pathname:`/article/${article.id}`, state: article}} key={article.id}>
                                    <div>
                                        <h1>{article.title}</h1>
                                        <p>{article.description}</p>
                                        <h4>{article.author}</h4>
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