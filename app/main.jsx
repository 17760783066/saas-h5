import React from 'react';
import ReactDOM from 'react-dom';
import routers from './routes';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN'
import 'assets/css/common.scss';

if (module.hot)
    module.hot.accept();

ReactDOM.render(
    <ConfigProvider locale={zhCN}>{routers}</ConfigProvider>, document.getElementById('root'));
