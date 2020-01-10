/*
 * @Author: your name
 * @Date: 2019-12-05 18:18:38
 * @LastEditTime : 2019-12-24 16:18:20
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\juicer\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'lib-flexible'
import 'antd-mobile/dist/antd-mobile.css';
import 'lodash'//是否更新组件
import Routes from './router';
import {hashHistory,HashRouter} from 'react-router-dom';

ReactDOM.render(
    <HashRouter history={hashHistory}>
        <Routes />
    </HashRouter>,
    document.getElementById('root')
);
