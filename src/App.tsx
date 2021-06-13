import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'

import Products from './views/Products/Products'
import Cart from './views/Cart/Cart'
import Checkout from './views/Checkout/Checkout'

import { ContextProvider } from './ContextProvider'

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar />
          <Switch>
            <Route exact path='/' component={Products} />
            <Route exact path='/cart' component={Cart} />
            <Route path='/checkout' exact component={Checkout}></Route>
          </Switch>
        </div>
      </ContextProvider>
    </Router>
  )
}

export default App
