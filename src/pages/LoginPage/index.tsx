import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Button, Form, Select, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import loginPic from '@/assets/getStartedPlaceholder2.png';
import { login } from '@/api/account';
import { changeUserInfo, changeLang } from '@/redux/actions/global';
import langMap, { getLangOptions, getRegisterLink } from '@/config/lang';
import './index.less';

const { Option } = Select;

const jumpToRegist = () => window.open(getRegisterLink());

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { lang } = useSelector((state: any) => state.global);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(async (fieldsValue) => {
        const { userName, password } = fieldsValue;
        setLoading(true);
        try {
          const response = await login(userName, password);
          const {
            id: userID,
            merchant_id,
            role,
            is_gray_chat_user = false,
          } = response?.data;
          setLoading(false);
          console.log(111);

          message.success('Login success');
          history.push('/helloworld');

          const hasInitialized = response?.data?.merchant?.has_initialized;
          // if (!hasInitialized) {
          //   history.push('/onboard/welcome');
          // } else {
          //   history.push('/dashboard/myDashboard');
          // }
          // history.push('/onboard/welcome');

          dispatch(
            changeUserInfo({
              userName,
              isLogin: true,
              userID,
              merchant_id,
              role,
              hasInitialized,
              is_gray_chat_user,
            })
          );
        } catch (error) {
          console.log(111);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleLangChange = (key: string) => {
    dispatch(changeLang(key));
    window.location.reload();
  };

  React.useEffect(() => {
    console.log((window as any).__CID__);
  }, []);

    
  return (
    <div className="login login-content">
      <div className="login-header">
        <span
          onClick={() => {
            history.push('/');
          }}
        >
          Logo
        </span>
        <Select
          open={open}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
          className="global-language-select"
          defaultValue={lang}
          onChange={handleLangChange}
        >
          {getLangOptions().map((item: any) => (
            <Option
              key={item.value}
              className="global-language-select-item"
              value={item.value}
            >
              {langMap[item.value]}
            </Option>
          ))}
        </Select>
      </div>
      <div
        className="login-wrapper"
        onClick={() => {
          setOpen(false);
        }}
      >
        <div className="image-wrapper">
          <img src={loginPic} alt="" className="form-pic" />
        </div>
        <Form className="login-form" form={form}>
          <Form.Item>
            <div className="login-form-header">
              <div className="login">Log in</div>
              <div className="reminder">
                <span className="left">Dont have an account? </span>
                <span className="right link" onClick={jumpToRegist}>
                  sign up
                </span>
              </div>
            </div>
          </Form.Item>
          <Form.Item
            className="form-item"
            name="userName"
            rules={[
              {
                required: true,
                message: 'this_field_is_required',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="name"
            />
          </Form.Item>
          <Form.Item
            className="form-item"
            name="password"
            rules={[
              {
                required: true,
                message: 'this_field_is_required',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="link" className="forgot link" href="/resetPassword">
              forget password ?
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%' }}
              loading={loading}
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
