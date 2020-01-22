import React from 'react';
import HomePage from './modules/users/pages/HomePage/HomePage'
import Header from './modules/common/cmps/Header/Header'
import ContactPage from './modules/contacts/pages/ContactsPage/ContactPage'
import ContactDetails from "./modules/contacts/pages/ContactDetails/ContactDetailsPage";
import ContactEdit from "./modules/contacts/pages/ContactEdit/ContactEditPage";
import RegisterPage from './modules/users/pages/RegisterPage/RegisterPage'

import { Route, Switch } from 'react-router-dom'
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlusCircle, faHome, faAddressBook, faChartBar, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faPlusCircle, faHome, faAddressBook, faChartBar, faUserPlus, faSignOutAlt)

function App() {
  return (
    <>
      <Header />
      
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/contact" component={ContactPage}/>
        <Route exact path="/contact/edit/:id?" component={ContactEdit}/>
        <Route exact path="/contact/:id" component={ContactDetails}/>
        <Route exact path="/register" component = {RegisterPage}/>
      </Switch>
    </>
  );
}

export default App;
