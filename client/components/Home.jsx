import React from 'react'
import { Link } from 'react-router-dom'

import ArticleList from './ArticleList'

class Home extends React.Component {
  render () {
    return (
      <>
        <h1>News</h1>
        <ArticleList />
      </>
    )
  }
}

export default Home
