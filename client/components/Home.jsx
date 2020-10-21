import React from 'react'
import { Link } from 'react-router-dom'

import { getAllNews } from '../api'

class Home extends React.Component {

  state = {
    articles: [],
    isLoaded: false
  }

  componentDidMount () {
    getAllNews()
    .then(data => {
      console.log(data.articles)
    })
  }

  render () {
  return (
    <>
      <h1>News</h1>
    </>
  )
}
}

export default Home
