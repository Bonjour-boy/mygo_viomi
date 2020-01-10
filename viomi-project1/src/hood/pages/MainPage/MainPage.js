import React,{Component} from 'react'
import './MainPage.css'
import ModelPage from '../ModelPage/ModelPage'


export default class Hood extends Component{
    constructor(props) {
        super(props);
        this.state={
            isOnline:true,//设备是否在线
            kitchenSwitch:true,//灶具是否打开
            SetModelValue:null, //设置模式
        }
    } 
    SetModel(val){
        let json = {}
        if(val === '关机'){
            json.SetModelValue = '油烟机已关闭'
        }else{
            json.SetModelValue = val
        }
        this.setState(json)
    }
    render(){
        return(
            <div className={'app'}>
                <main className={'main'}>
                    <div className={'mianImg'}>
                        <p className={'modelState'}>{this.state.isOnline ? (this.state.SetModelValue ? this.state.SetModelValue : '烟机空闲中') : '设备离线'}</p>
                        <p className={'kitchen'}>{this.state.kitchenSwitch ? '左灶开丨右灶关' : '灶具关闭'}</p>
                    </div>
                    {this.state.kitchenSwitch ? <div className={'power'}>灶具电量50%</div> : null}
                </main>
                <ModelPage 
                isOnline = {this.state.isOnline}
                SetModel={this.SetModel.bind(this)}
                />
            </div>
        )
    }
}