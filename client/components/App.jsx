import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import Article from './Article'

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path='/article/:id' component={Article} />
      </Router>
    </>
  )
}

export default App
