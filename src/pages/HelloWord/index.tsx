import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { useTranslate } from '@/hooks/useTranslate';
import { changeLang } from '@/redux/actions/global';
import langMap from '@/config/lang';
import logo from './logo192.png';
import './index.less';

const HelloWorld: React.FC = () => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const { lang } = useSelector((state: any) => state.global);

  const handleLangChange = (key: string) => {
    dispatch(changeLang(key));
    window.location.reload();
  };

  const someInfo = {
    count: 1000,
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Hello React ! </p>
        <p>{translate('I love you xxx times', { count: someInfo?.count })}</p>
        <Select
          defaultValue={lang}
          onChange={handleLangChange}
        >
          {Object.keys(langMap).map((item) => (
            <Select.Option
              key={item}
              value={item}
            >
              {langMap[item]}
            </Select.Option>
          ))}
        </Select>
      </header>
    </div>
  );
};

export default HelloWorld;
