import {
  Alert, Row, Form, Input, Button, Checkbox,
} from 'antd';
import { Redirect, useHistory } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  login, selectToken, selectError, selectMessage,
} from '../reducers/authSlice';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {
  const token = useSelector(selectToken);
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const history = useHistory();

  function onFinish(formData) {
    dispatch(login(formData.username, formData.password));
  }

  if (token) {
    return (<Redirect to="/decks" />);
  }

  let flashComponent;
  if (error) {
    flashComponent = <Alert message={error.message} type="error" />;
  } else if (message) {
    flashComponent = <Alert message={message} type="success" />;
  }
  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={(err) => console.log(err)}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="link" htmlType="button" onClick={() => history.push('/signup')}>
            Sign Up
          </Button>
        </Form.Item>
        {flashComponent}
      </Form>

    </Row>
  );
}

export default Login;
