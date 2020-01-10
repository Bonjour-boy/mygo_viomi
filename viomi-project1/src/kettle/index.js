import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import {Provider} from 'react-redux'
import App from './pages/App';
import 'lodash'
import 'lib-flexible'
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios'//放原型上使用
//移动端事件延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)
React.Component.prototype.axios = axios;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));