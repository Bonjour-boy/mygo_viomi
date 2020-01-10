import React,{Component} from 'react'
import { PickerView,Toast } from 'antd-mobile';
import ModelAdapter from '../../config/Adapter/ModelAdapter'
import './ModelPage.css'
import ControlModel from '../../../Components/Controlmodel/Controlmodel'
import Popup from '../../../Components/Popup/Popup'
import Light from '../../assets/img/light@2x.png'
import OpenLight from '../../assets/img/openlight@2x.png'
import Model from '../../assets/img/model@2x.png'
import High from '../../assets/img/high-dang@2x.png'
import Low from '../../assets/img/low-dang@2x.png'
import LowPressure from '../../assets/img/low-ya@2x.png'

const data =[ {
    label: '高档排烟',
    value: '高档排烟',
  },
  {
    label: '低档排烟',
    value: '低档排烟',
  }, {
    label: '低压排烟',
    value: '低压排烟',
  },
  {
    label: '关机',
    value: '关机',
  },]

export default class ModelPage extends Component{
    constructor(props) {
        super(props);
        this.value = null;//模式值
        this.state={
            showPopup:false,//是否弹窗
            openLight:false,//是否打开照明灯
            selectModel:null,//选择的模式
        }
    } 
    componentDidMount(){
    }
    //照明灯是否打开
    LightClick(){
        let json = {}
        if(this.state.openLight === false){
            json.openLight = true
            console.log('照明打开');
        }else{
            json.openLight = false
            console.log('照明关闭');
        }
        this.setState(json)
    }
    //模式弹窗
    modelClick(){
        this.setState({
            showPopup:true
        })
    }
    //弹窗确定与取消按钮
    modelPopupClick(val){
        let json = {}
        json.showPopup = false
        if(val === '确定'){
            json.selectModel = this.value
            Toast.success('操作成功', 3);
            this.props.SetModel(this.value)
           console.log(this.value);
        }
        this.setState(json)
    }
    //模式选中
    onChange(val){
        this.value = val[0]
    }

    render(){
        return(
            <div>
                <footer className={'footer'} style={{opacity:this.props.isOnline ? null : 0.4}}>
                    {ModelAdapter.isLightControl() ?
                        <ControlModel 
                        onClick={this.props.isOnline ? this.LightClick.bind(this) : null}
                        image={this.state.openLight ? OpenLight : Light}
                        Txt={'照明'}
                        />
                    :null}
                    {ModelAdapter.isModelControl() ?
                        <ControlModel 
                        image={this.state.selectModel ? 
                            (this.state.selectModel === '高档排烟' ? High : null ||
                            this.state.selectModel === '低档排烟' ? Low : null ||
                            this.state.selectModel === '低压排烟' ? LowPressure : null||
                            this.state.selectModel === '关机' ? Model : null) 
                            : Model}
                        Txt={this.state.selectModel ? 
                            (this.state.selectModel === '高档排烟' ? '高档排烟' : null ||
                            this.state.selectModel === '低档排烟' ? '低档排烟' : null ||
                            this.state.selectModel === '低压排烟' ? '低压排烟' : null||
                            this.state.selectModel === '关机' ? '模式' : null) 
                            : '模式'}
                        onClick={this.props.isOnline ? this.modelClick.bind(this) : null}
                        />
                    :null}
                </footer>
                {ModelAdapter.isModelPopup() ?
                    <Popup 
                    visible={this.state.showPopup}
                    height={'8.32rem'}
                    title={'模式选择'}
                    main={
                        <PickerView
                        data={data}
                        itemStyle={{height:'1.306667rem',lineHeight:'1.306667rem'}}
                        value={[this.state.selectModel]}
                        onChange={this.onChange.bind(this)}
                        cols={1}
                    />
                    }
                    buttonNum={2}
                    onPress={this.modelPopupClick.bind(this)}
                    />
                :null}
            </div>
        )
    }
}