import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Select } from 'antd';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { count } from 'service/index';
import logo from './logo.svg';
import header from './index.module.less';


function Header(props) {
  const { t, i18n } = useTranslation(['common']);
  const { Option } = Select;
  const userinfo = useSelector(state => state.login)
  const accesstoken = localStorage.getItem('accesstoken')
  const [num, setNum] = useState(0)
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const c = await count({ accesstoken })
      setNum(c.data)
    }
    fetchData()
  }, [accesstoken])

  const logout = () => {
    localStorage.removeItem('accesstoken')
    props.history.push('/login')
  }
  return (
    <header className={header['App-header']}>
      <div className={header.headerWrap}>
        <Link to="/" >
          <img src={logo} className={header['App-logo']} alt="logo" />
        </Link>
        <div>
          <Link to="/" className={header['App-link']}>
            {t('home')}
          </Link>
          <Link to="/message" className={header['App-link']}>{t('message')}{num > 0 ? num : ''}</Link>
          {
            (userinfo.success) ? (
              <span className={header['App-link']} onClick={logout}>{t('logout')}</span>
            ) : (
                <Link to="/login" className={header['App-link']} >{t('login')}</Link>
              )
          }
          <Select defaultValue="zh_CN" className={header.language} onChange={handleChange} size="small">
            <Option value="zh_TW">繁体中文</Option>
            <Option value="zh_CN">简体中文</Option>
          </Select>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
