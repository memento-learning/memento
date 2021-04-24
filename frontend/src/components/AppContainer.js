import { Layout, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/authSlice';

const {
  Header, Content,
} = Layout;

function AppContainer({ children }) {
  const dispatch = useDispatch();
  return (
    <Layout>
      <Header>
        <div style={{ float: 'left', color: 'white', fontSize: 26 }}>
          <Link to="/" style={{ color: 'white' }}><b>Memento</b></Link>
        </div>
        <div style={{ float: 'right' }}>
          <Button type="primary" danger onClick={() => dispatch(logout())}>Logout</Button>
        </div>
      </Header>
      <Content style={{ height: '100vh' }}>{children}</Content>
    </Layout>
  );
}
export default AppContainer;
