import React from 'react'

import ArticleList from './ArticleList'

class Home extends React.Component {

  formatTodaysDate = (date) => {
    const getDate = Date(date * 1000)
    const splitDate = getDate.split(" ")
    const newDate = splitDate[0] + " " + splitDate[1] + " " + splitDate[2] + " " + splitDate[3]
    return newDate
  }

  render () {
    const todaysDate = this.formatTodaysDate(Date.now())
    return (
      <>
        <h1 className='todays-top-news'>Todays top News</h1>
        <h3 className='todays-date'>{todaysDate}</h3>
        <ArticleList />
      </>
    )
  }
}

export default Home
