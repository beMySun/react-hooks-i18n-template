import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslate } from '@/hooks/useTranslate';
import { changeLang } from '@/redux/actions/global';
import langMap from '@/config/lang';
import logo from './logo192.png';
import './index.less';

const HelloWorld: React.FC = () => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const { lang } = useSelector((state: any) => state.global);
  const history = useHistory();

  const handleLangChange = (key: string) => {
    dispatch(changeLang(key));
    window.location.reload();
  };

  const someInfo = {
    count: 100123,
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> React + Vite</p>
        <p>{translate('I love you xxx times', { count: someInfo?.count })}</p>
        <Select
          style={{ width: 150 }}
          defaultValue={lang}
          onChange={handleLangChange}
        >
          {Object.keys(langMap).map((item) => (
            <Select.Option key={item} value={item}>
              {langMap[item]}
            </Select.Option>
          ))}
        </Select>
        <Button
          style={{ marginTop: 200, textDecoration: 'underline' }}
          type="link"
          onClick={() => {
            history.push('/');
          }}
        >
          Back to Login Page
        </Button>
      </div>
    </div>
  );
};

export default HelloWorld;
