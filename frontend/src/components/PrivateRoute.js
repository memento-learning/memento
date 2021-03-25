import {
  Route, Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { selectToken, logout } from '../reducers/authSlice';

function PrivateRoute({ children, ...rest }) {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  let valid = false;
  try {
    const { exp } = jwtDecode(token);
    const now = Math.round(Date.now() / 1000);
    console.log(exp);
    console.log(now);
    if (exp - now > 60) {
      valid = true;
    } else {
      throw Error('Token has expired');
    }
  } catch (err) {
    dispatch(logout());
  }
  return (
    <Route
      {...rest}
      render={({ location }) => (token && valid ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}
export default PrivateRoute;
