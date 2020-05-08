import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from "./pages/Landing"
import Languages from './pages/Languages'
import Main from './pages/Main'


const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/languages' component={Languages}/>
      <Route path='/main' component={Main}/>
    </Switch>
  </main>
)

export default Routes
