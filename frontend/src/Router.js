import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AddVocabulary from './pages/AddVocabulary'
import Error from './pages/ErrorPage'
import Landing from "./pages/Landing"
import Languages from './pages/Languages'
import Settings from './pages/Settings'
import VocabularyList from './pages/VocabularyList'
import VocabularyTraining from './pages/VocabularyTraining'



const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/Languages' component={Languages} />
            <Route path='/VocabularyList' component={VocabularyList} />
            <Route path='/AddVocabulary' component={AddVocabulary} />
            <Route path='/VocabularyTraining' component={VocabularyTraining} />
            <Route path='/Settings' component={Settings} />
            <Route path='/*' component={Error} />
        </Switch>
    </main>
)

export default Routes
