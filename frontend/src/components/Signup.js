import {
  Alert, Row, Form, Input, Button,
} from 'antd';
import { Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authApi from '../api/auth';
import { selectToken, actions } from '../reducers/authSlice';

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

function Signup() {
  const [flash, setFlash] = useState(null);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  async function onFinish(formData) {
    try {
      await authApi.signup(formData.username, formData.password);

      dispatch(actions.clearError());
      dispatch(actions.clearMessage());
      dispatch(actions.message('Signup success!'));
      setRedirectLogin(true);
    } catch (err) {
      setFlash({ message: 'Signup failed!' });
    }
  }

  if (token) {
    return (<Redirect to="/decks" />);
  }

  if (redirectLogin) {
    return (<Redirect to="/login" />);
  }

  let flashComponent;
  if (flash) {
    flashComponent = <Alert message={flash.message} type="error" />;
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up!
          </Button>
        </Form.Item>
        {flashComponent}
      </Form>

    </Row>
  );
}

export default Signup;
