import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import AppContainer from './AppContainer';

import Login from './Login';
import Signup from './Signup';
import Deck from './Deck';
import 'antd/dist/antd.css';

import PrivateRoute from './PrivateRoute';
import MyDecks from './MyDecks';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <PrivateRoute path="/">
          <AppContainer>
            <Switch>
              <Route path="/decks" component={MyDecks} exact />
              <Route path="/deck/:id" component={Deck} exact />
              <Route path="*" exact>
                <Redirect to="/decks" />
              </Route>
            </Switch>
          </AppContainer>

        </PrivateRoute>
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
