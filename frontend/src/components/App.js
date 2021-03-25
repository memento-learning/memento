import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import {
  Button,
} from 'antd';

import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authSlice';
import DeckList from './DeckList';
import Login from './Login';
import Signup from './Signup';
import 'antd/dist/antd.css';

import PrivateRoute from './PrivateRoute';

function App() {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <PrivateRoute path="/">
          <div style={{ float: 'right', padding: '20px' }}>
            <Button danger onClick={() => dispatch(logout())}>Logout</Button>
          </div>

          <Route path="/decks" component={DeckList} exact />
          <Redirect to="/decks" />
        </PrivateRoute>
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
