/*
 * @Author: your name
 * @Date: 2019-11-08 09:29:34
 * @LastEditTime : 2019-12-24 16:18:10
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\cooker\index.js
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
