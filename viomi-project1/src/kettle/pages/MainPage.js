import React,{Component} from 'react'
import TempPopup from '../components/tempPopup/tempPopup'
import Temp from '../components/temp/temp'
import Slider from '../../Components/Slider/Slider'
export default class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,//常温弹出
            modal2: false,//温水弹出
            modal3: false,//热水弹出
            normalSetStartTemp:20,//常温初始值
            hotSetStartTemp:100,//热水初始值
            changeTemp: null,//温水时改变温度
            initTemp: false,//温水时初始温度
        };
    }
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }
    //常温
    normalWaterDialog (e) {
        e.preventDefault();
        this.setState({
            modal1: true,
            changeTemp:null 
        });
    }
    //点击常温确定
    normalClick(){
        this.setState({
            modal1: false
        });
        console.log(this.state.normalSetStartTemp);
    }

    //温水
    warnWaterDialog(e) {
        e.preventDefault();
        this.props.warnWaterOnclick()
    }
    //点击按钮
    warnClick(val) {
        this.props.warnClick(val)
    }
    //设定温度
    setTemp(val){
        this.setState({
            initTemp:true,
            changeTemp:val
        });  
        this.props.setTemp(this.state.changeTemp)  
    }
    //热水
    hotWaterDialog (e) {
        e.preventDefault();
        this.setState({
            modal3: true,
        });
    }
    //点击热水确定
    hotClick(){
        this.setState({
            modal3: false
        });
        console.log(this.state.hotSetStartTemp);
    }
    render(){
        return(
            <div className={'app'}>
                <header className={'title'}>TDS值：6 ppm</header>
                {this.props.isLoading ? (
                    <main className={'main'}>
                        <div className={'temp'}>加载中</div>
                    </main>
                ) : ''}
                {!this.props.isLoading && this.props.online ? (
                    <main className={'main'}>
                        <div className={'temp'}>当前出水温度</div>
                        <div className={'font88'}>
                            <span className={'font22'}>℃</span>
                        </div>
                    </main>
                ) : ''}
                {!this.props.isLoading && !this.props.online ? (
                    <main className={'main'}>
                        <div className={'temp'}>设备离线</div>
                    </main>
                ) : ''}
                <footer className={'foot'}>
                    <div className={'font26'}>查看温度</div>
                    <div className={'list'}>
                        <div className={'list1'} onClick={!this.props.isLoading && this.props.online ? this.normalWaterDialog.bind(this) : null}>常温</div>
                        {/* 常温弹窗 */}
                        <TempPopup 
                        height={'5.68rem'}
                        visible={this.state.modal1}
                        title={'常温键温度'}
                        main={
                            <Temp defaultValue={this.state.normalSetStartTemp}/>
                        }
                        onPress={this.normalClick.bind(this)}
                        />
                        <div className={'list1'} onClick={!this.props.isLoading && this.props.online ? this.warnWaterDialog.bind(this) : null}>温水</div>
                        {/* 温水弹窗 */}
                        <TempPopup 
                        height={'8.24rem'}
                        visible={this.props.modal2Popup}
                        title={'设定温水键温度'}
                        main={
                            <div>
                                <Temp defaultValue={this.state.initTemp ? this.state.changeTemp : 40}/>
                                <Slider 
                                defaultValue={this.state.initTemp ? this.state.changeTemp : 40}
                                tempMin={40}
                                tempMax={90}
                                setData={this.setTemp.bind(this)}
                                range={true}
                                trackStyle={{
                                    height: '1.066667rem',
                                    borderRadius: '1.066667rem',
                                    backgroundColor: '#29c7ca',
                                    paddingLeft: '.8rem',
                                }}
                                handleStyle={{
                                    width: '1.066667rem',
                                    height: '1.066667rem',
                                    marginTop: 0,
                                    marginLeft: 0,
                                    zIndex:1
                                }}
                                railStyle={{
                                    height: '1.066667rem',
                                    borderRadius: '1.066667rem',
                                    width: '7.466667rem',
                                  }}
                                />
                            </div>
                        }
                        buttonNum={2}
                        onPress={this.warnClick.bind(this)}
                        />
                        <div className={'list1'} onClick={!this.props.isLoading && this.props.online ? this.hotWaterDialog.bind(this) : null}>热水</div>
                        {/* 热水弹窗 */}
                        <TempPopup 
                        height={'5.68rem'}
                        visible={this.state.modal3}
                        title={'热水键温度'}
                        main={
                            <Temp defaultValue={this.state.hotSetStartTemp}/>
                        }
                        onPress={this.hotClick.bind(this)}
                        />
                    </div>
                </footer>
            </div>
        )
    }
}