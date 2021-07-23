import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home';
import AccountPage from './pages/account';
import ContactsPage from './pages/contacts';
import ContactFormPage from './pages/contactForm';
import HelpPage from './pages/help';
import SettingsPage from './pages/settings';

export default function Routes(){
    
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />              
                <Route path="/account" component={AccountPage} /> 
                <Route path="/contacts" exact component={ContactsPage} />
                <Route path="/contacts/add" exact component={ContactFormPage} />
                <Route path="/contacts/edit" exact component={ContactFormPage} />
                <Route path="/settings" component={SettingsPage} /> 
                <Route path="/help" component={HelpPage} /> 
            </Switch>
        </BrowserRouter>
    );
}