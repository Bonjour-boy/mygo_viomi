import React, { Component } from 'react';
import './App.css'
import { connect } from 'react-redux'
import common from "../config/main";//兼容
import store from '../redux/store'
import MainPage from './MainPage'
import DataManager from './DataManager'
let interval;
let seft;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal2: false,//温水弹出
            changeTemp: null,//温水时改变温度
            isLoading: false,//加载中
            online: true,//在线
            urlParam: {
                did: "",
                token: "",
                // did: "84829471",
                // token: "V3_81wopngEMwxfH2GIA5_tCES9t0U-2eJjwT-1W4Dy8Yr_fwEJ011TfxlUVLpPZgcOUa_L1DctAMgod_VtPK5edjIOTVnP906Lvt9DJcPnCH_w4yFc6IlKns2azfrUq6Uf"
              },
              deviceProp: [],
              str: "",
              decoderesult: "",
        };
    }
    componentDidMount() {
        seft = this;
        this.setState({urlParam:common.getUrlParam()}); 
        //接口桥接
        DataManager.setupWebViewJavascriptBridge(function (bridge) {
          console.log(66)
            window.bridge = bridge;
            store.dispatch({
                type:'setBridgeReady',//使用store里setBridgeReady的方法（自定义的方法）
            })
            store.dispatch({
                type:'executeFunctionsInQueue',
            })
        });
        store.dispatch({
            type:'onConfReady',
            fn: this.bridgeReadyFn
        })


        // let str = {
        //   method: "get_prop",
        //   did: this.state.urlParam.did,
        //   id: "1",
        //   params: ["tds", "setup_tempe", "custom_tempe1"]
        // };
        // let s = JSON.stringify(str);
        // window.bridge.callHandler('getYunMiSignData',s,function(response) {
        //   console.log(response)
        // });
    }
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
      if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
          return true
       } else {
          return false
      }
    }
    componentWillUnmount(){
        clearInterval(interval)
    }
    
    bridgeReadyFn() {//开始定时器
        interval = setInterval(function() {
        seft.getProp();
        }, 2000);
    }
    getProp() {//判断系统并执行相应代码
        let str = {
          method: "get_prop",
          did: this.state.urlParam.did,
          id: "1",
          params: ["tds", "setup_tempe", "custom_tempe1"]
        };
        if (common.isAndroid) {
            DataManager.getSignData(str, this.propGetAndroid);
        } else {
          this.propGetIOS(str);
        }
    }
    propGetAndroid(blockedData){//安卓系统
        let json = {}
        const that = this;
        //post请求序列化
        let form = new FormData();
        form.append("clientId", common.clientId);
        form.append("accessToken", that.urlParam.token);
        form.append("data", blockedData);
        this.axios
          .post(
            "https://ms.viomi.com.cn/gateway/openapp/device/rpc/" +
              that.state.urlParam.did,
            form,
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then(res => {
            //成功，安卓返回加密的data
            if (typeof res.data === "string") {
              let cb = function(that, result) {
                json.isLoading = false
                let decoderesult = JSON.parse(result);
                if (decoderesult.code === -2) {
                  json.online = false
                  return;
                }
                json.deviceProp = decoderesult.result
                // eslint-disable-next-line 
                that.state.modal2 ? '' : json.changeTemp = that.state.deviceProp[2]
              };
              that.getDecodeData(res.data, that, cb);
            } else {
              json.isLoading = false
            }
          })
          .catch(error => {
           json.isLoading = false
          });
        this.setState(json)
      }
    propGetIOS(str){//IOS系统
        let json = {}
        const that = this;
        window.bridge.callHandler("getYunMiDate", str, function(result) {
          let res = JSON.parse(result).result[0];
          json.isLoading = false
          if (res.code === 0) {
            json.deviceProp = res.result
            // eslint-disable-next-line 
            that.state.modal2 ? '' : json.changeTemp = that.state.deviceProp[2]
          } else if (res.code === -2) {
            json.online = false
          }
        });
        this.setState(json)
    }
    setWarnWater(){//温水设置（判断系统并执行相应代码）
        let data = {
          method: "set_tempe_setup",
          did: this.state.urlParam.did,
          id: "1",
          params: [1, this.state.changeTemp]
        };
        if (common.isAndroid) {
          DataManager.getSignData(data, this.warnWaterSetAndroid);//加密与解密
        } else {
          this.warnWaterSetIOS(data);
        }
    }
    warnWaterSetAndroid(blockedData){//安卓系统温水设置
        let json = {}
        const that = this;
        //post请求序列化
        let form = new FormData();
        form.append("clientId", common.clientId);
        form.append("accessToken", that.state.urlParam.token);
        form.append("data", blockedData);
        that.axios
          .post(
            "https://ms.viomi.com.cn/gateway/openapp/device/rpc/" +
              that.state.urlParam.did,
            form,//传参，序列化后的数据
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then(res => {
            if (typeof res.data === "string") {
              let cb = function(that, result) {
                that.getProp();
              };
              that.getDecodeData(res.data, that, cb);
            } else {
            }
            json.modal2 = false
          })
          .catch(error => {
            json.modal2 = false
          });
        this.setState(json)
    }
    warnWaterSetIOS(data){//IOS系统温水设置
        const that = this;
        window.bridge.callHandler("getYunMiDate", data, function(result) {
          that.getProp();
        });
    }
    
    warnClick(val) {
        this.setState({
            modal2: false
        });
        if(val === '确定'){
            console.log(this.state.changeTemp); 
            this.setWarnWater() 
        }  
    }
    //温水
    warnWaterDialog() {
        this.setState({
            modal2: true,  
        });
    }
     //设定温度
     setTemp(val){
        this.setState({
            changeTemp:val
        });     
    }
    render() {
        return (
            <MainPage 
            warnClick ={this.warnClick.bind(this)} 
            modal2Popup ={this.state.modal2} 
            warnWaterOnclick = {this.warnWaterDialog.bind(this)}
            setTemp ={this.setTemp.bind(this)}
            isLoading = {this.state.isLoading}
            online = {this.state.online}
            />
        )
    }
}
export default connect((store)=>{
    return store
})(Home)
