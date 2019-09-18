import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { useDispatch } from 'react-redux';
import './index.css';
import { getUserInfo } from 'store/modules/login.js';

function Login(props) {
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(getUserInfo({ accesstoken: values.username })).then((res) => {
          if (res.success) {
            props.history.push('/');
          } else {
            alert(`error${res.success}`);
          }
        });
      }
    });
  }
  return (
    <div className="loginBg">
      <Form onSubmit={(e) => handleSubmit(e)} className="loginWrap">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your accesstoken!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="https://cnodejs.org/" target="_blank" rel="noopener noreferrer">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or
          <a href="https://cnodejs.org/" target="_blank" rel="noopener noreferrer">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}
const WrappedLogin = Form.create()(Login); // ant design
export default WrappedLogin;
