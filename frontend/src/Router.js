import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from "./pages/Landing"
import Languages from './pages/Languages'
import VocabularyList from './pages/VocabularyList'
import AddVocabulary from './pages/AddVocabulary'
import VocabularyTraining from './pages/VocabularyTraining'
import Settings from './pages/Settings'



const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/Languages' component={Languages} />
            <Route path='/VocabularyList' component={VocabularyList} />
            <Route path='/AddVocabulary' component={AddVocabulary} />
            <Route path='/VocabularyTraining' component={VocabularyTraining} />
            <Route path='/Settings' component={Settings} />

        </Switch>
    </main>
)

export default Routes
