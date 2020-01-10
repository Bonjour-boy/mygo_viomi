/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-10-31 16:34:09
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-31 10:48:23
 */
const DataManager = {

    //桥接用的调用native方法返回给js
    setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        } else {
            document.addEventListener(
                "WebViewJavascriptBridgeReady",
                function () {
                    callback(window.WebViewJavascriptBridge);
                },
                false
            );
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement("iframe");
        WVJBIframe.style.display = "none";
        WVJBIframe.src = "https://__bridge_loaded__";
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    },
    getSignData(data,cb) {//加密、解密
        let s = JSON.stringify(data);
        //获取属性、加密数据、解密数据的三个方法(s需要加密，返回数据需要解密)
        window.bridge.callHandler("getYunMiSignData", s, function(res) {
          typeof cb == "function" && cb(res);//eslint-disable-line
        });
    },
    getDecodeData(data,that,cb) {//加密、解密
        //获取属性、加密数据、解密数据的三个方法(data需要加密，返回数据需要解密)
        window.bridge.callHandler("getYunMiDecodeData", data, function(result) {
          typeof cb == "function" && cb(that, result);//eslint-disable-line
        });
    }

}

export default DataManager;