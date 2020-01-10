import DataAdapter from './DataAdapter';

export default class CommonPropsManager {
    //MARK: 获取设备属性
    /**
     * 轮询获取设备属性
     * @param {*} params json格式参数
     * @var {array} props 需要获取的属性名称列表
     * @var {number} interval 轮询间隔时间(单位秒，不是毫秒)，默认3秒
     * @var {function} callback 获取属性成功后的回调函数
     * @var {bool} toObject 输出获取的属性结果由列表数据转换成对象数据
     * @var {bool} log 是否打开属性轮询的日志
     */
    static startPropsLoop({ props, interval, callback, toObject = false, log = false }) {
        //轮询只能有一个，防止两个轮询同时访问
        if (CommonPropsManager.PropsLoop.interval) {
            return;
        }

        //获取属性方法的参数
        let params = {
            props: props,
            callback: callback,
            toObject: toObject
        }

        //设置开始轮询的参数
        CommonPropsManager.PropsLoop.startParams = params;
        //设置是否打开日志
        CommonPropsManager.PropsLoop.log = log;

        CommonPropsManager.logPropsLoop('轮询属性', props);

        //启动时先执行一次获取属性
        CommonPropsManager.getProps();

        let _interval = interval ? interval : 3;

        CommonPropsManager.PropsLoop.interval = setInterval(() => {
            let _isPause = false;

            if (CommonPropsManager.PropsLoop.pause) {
                _isPause = true;
            }

            //判断需要暂停获取属性时，清空循环秒数计数
            if (_isPause || CommonPropsManager.isGettingProps) {
                CommonPropsManager.PropsLoop.count = 0;
            }
            else {
                if (CommonPropsManager.PropsLoop.count >= _interval) {

                    CommonPropsManager.PropsLoop.count = 0;

                    CommonPropsManager.getProps();
                }
                else {
                    CommonPropsManager.PropsLoop.count++;
                }
            }
        }, 1000);
    }

    /**
     * 暂停属性轮询
     */
    static stopPropsLoop() {
        CommonPropsManager.logPropsLoop('暂停轮询', '');
        CommonPropsManager.PropsLoop.pause = true;
        CommonPropsManager.PropsLoop.count = 0;
    }

    /**
     * 恢复属性轮询
     * @param {*} params
     * @var {bool} updateProps 恢复轮询后，是否马上获取一次属性
     * @var {int} delay 恢复轮询后，延迟多少毫秒获取一次数据，仅当updateProps为true时有效
     */
    static resumePropsLoop(params) {
        //尚未开始轮询
        if (!CommonPropsManager.PropsLoop.interval) {
            CommonPropsManager.logPropsLoop('尚未开始轮询', '不执行');
            return;
        }

        CommonPropsManager.logPropsLoop('恢复轮询', '');

        CommonPropsManager.PropsLoop.pause = false;

        if (params) {
            const { updateProps, delay } = params;
            //如果updateProps没有设置，默认为true
            if (updateProps !== undefined && updateProps === true) {
                //如果有延时属性delay
                if (delay !== undefined) {
                    setTimeout(() => {
                        CommonPropsManager.getProps();
                    }, delay)
                }
                else {
                    CommonPropsManager.getProps();
                }
            }
        }
    }

    /**
     * 移除轮询获取设备属性
     */
    static clearPropsLoop() {
        CommonPropsManager.logPropsLoop('移除轮询', '');
        CommonPropsManager.PropsLoop.interval && clearInterval(CommonPropsManager.PropsLoop.interval);
    }

    /**
     * 打印属性轮询的日志
     * @param {string} title 标题
     * @param {string} msg 数据
     */
    static logPropsLoop(title, msg) {
        if (CommonPropsManager.PropsLoop.log) {
            // console.log(title + '=========');
            // console.log(msg);
        }
    }

    /**
     * 获取设备属性
     * @param {*} params json格式参数(不输入则默认使用开始轮询时的参数)
     * @var {array} props 需要获取的属性名称列表
     * @var {function} callback 获取属性成功后的回调函数
     * @var {bool} toObject 是否输出属性结果的对象
     * @returns {object} result 返回结果对象
     */
    static getProps(params) {
        //防止多次访问属性
        if (CommonPropsManager.isGettingProps) {
            return;
        }
        CommonPropsManager.isGettingProps = true;
        CommonPropsManager.PropsLoop.count = 0;

        let _params = params;
        //如果不输入参数
        //如果没有开始轮询，没有轮询参数
        if (!params && !CommonPropsManager.PropsLoop.startParams) {
            CommonPropsManager.logPropsLoop('错误', 'getProps方法需要设置参数');
            return;
        }
        //不输入参数，默认取开始轮询时的参数
        else if (!params) {
            _params = CommonPropsManager.PropsLoop.startParams;
        }

        const { props, callback, toObject = false } = _params;

        //返回结果
        let result = {
            //与上次获取属性相比是否更新了
            isUpdated: false,
            //访问的状态码
            status: null,
            //访问的结果
            datas: null,
            //访问的报错
            error: null
        };

        CommonPropsManager.logPropsLoop('开始访问属性', props.toString());

        DataAdapter.fetchProp(
            props,
            (status, datas) => {
                result.status = status;
                result.datas = datas;

                if (status == 0) {
                    if (CommonPropsManager.PropsLoop.preDatas === null) {
                        result.isUpdated = true;
                    }
                    else {
                        if (CommonPropsManager.PropsLoop.preDatas.toString() !== datas.toString()) {
                            result.isUpdated = true;
                        }
                    }

                    CommonPropsManager.PropsLoop.preDatas = datas;

                    //输出对象作为result
                    if (toObject) {
                        let r = {};
                        for (let i = 0; i < props.length; i++) {
                            const key = props[i];
                            r[key] = datas[i];
                        }

                        result.datas = r;
                    }
                }

                CommonPropsManager.logPropsLoop('属性是否更新', result.isUpdated);
                CommonPropsManager.logPropsLoop('返回属性', result.datas);

                callback && callback(result);

                CommonPropsManager.isGettingProps = false;
            },
            (err) => {
                result.status = -777;
                result.error = err;

                CommonPropsManager.logPropsLoop('返回结果', result.error);

                callback && callback(result);

                CommonPropsManager.isGettingProps = false;
            }
        );
    }
}

//是否正在获取属性
CommonPropsManager.isGettingProps = false;
//属性轮询
CommonPropsManager.PropsLoop = {
    //当前间隔定时器
    interval: null,
    //当前计数
    count: 0,
    //前一次访问属性的结果
    preDatas: null,
    //是否暂停轮询
    pause: false,
    //保存开始轮询属性的各种参数
    startParams: null,
    //是否打开日志
    log: false
}

CommonPropsManager.Enum = {
    propsParams: {
        //属性
        props: [],
        //回调 
        callback: null,
        //属性是否返回对象 
        toObject: false
    }
}