/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-12-05 18:18:38
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-06 17:06:03
 */
import React,{Component} from 'react'
import { Drawer,Icon } from 'antd-mobile';
import Accordion from '../../components/Accordion/Accordion'
import './MainPage.css'
import GetDataManager from '../../GetDataManager'
import SettingManager from '../../SettingManager'
import Popup from '../../../Components/Popup/Popup'
import Slider from '../../../Components/Slider/Slider'
import Temp from '../../../Components/Temp/Temp'
import Recipe_img from '../../assets/img/recipe@2x.png'
import KeepTime_img from '../../assets/img/keeptemp@2x.png'
import Temp_img from '../../assets/img/temp@2x.png'
import Rotate_img from '../../assets/img/rotate_speed@2x.png'
import Mask_img from '../../assets/img/mask@1.5x.png'
import SetTimePage from '../SetTimePage/SetTimePage'

export default class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false,//保温时长设置弹窗
            visible1:false,//保温温度设置弹窗
            visible2:false,//手动转速弹窗
            set_keeptime:null,//设置保温时间
            set_temp:null,//设置保温温度
            set_rotate:null,//设置转速
            open:false,//预约页面打开
            isShowMask:false,//点击开始弹出mask
        }
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
        this.setTimeout_rotate&&clearTimeout(this.setTimeout_rotate)
        this.setTimeout_time&&clearTimeout(this.setTimeout_time)
        this.setTimeout_temp&&clearTimeout(this.setTimeout_temp)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.work_status===1||nextProps.work_status===2||nextProps.work_status===3||nextProps.work_status===4 ||nextProps.work_status===7){
            this.props.history.push({
                pathname:'/working'
            });
        }
        else if(nextProps.work_status===6){
           this.setState({isShowMask:true})
        }
        else if(nextProps.work_status===0){
            this.setState({isShowMask:false})
        }
    }  
    //获取视图
    getMainView(props){
        if(props === 7){//加热
            return this.HotTitleComponent()
        }
        else if(props === 4||props === 5){//冷饮
            return this.ColdTitleComponent()
        }
        else if(props === 8){//手动
            return this.ManualComponent()
        }
        else if(props === 12){//保温
            return this.KeepTempComponent()
        }
        else{//热模式
            return this.MianTitleComponent()
        }
    } 
    //热饮
    MianTitleComponent (){
        return  <div className='hotbackground'>
                    <div className='miantitle'>预计
                        <span className='bigTxt'>{parseInt(this.props.left_time/60)}</span>分钟
                    </div>
                    <p className='model' onClick={this.onModelClick.bind(this)}>{GetDataManager.nowModel(this.props.modelNum)}</p>    
                    <main className='content'>
                        <Accordion Recipe_img={Recipe_img} Recipe_Txt={'查看食谱'} type_icon={'right'} onClick={this.Recipe_Click.bind(this)}/>
                        <Accordion Recipe_img={KeepTime_img} Recipe_Txt={'保温时长'} type_icon={'right'} 
                        set_Txt={`${this.state.set_keeptime? this.state.set_keeptime:this.props.time_data}小时`}
                        onClick={this.KeepTime_Click.bind(this)}
                        />
                        <Accordion Recipe_img={Temp_img} Recipe_Txt={'保温温度'} type_icon={'right'} 
                        set_Txt={`${this.state.set_temp ? this.state.set_temp:this.props.temp_data}℃`}
                        onClick={this.Temp_Click.bind(this)}
                        />
                    </main>
                    {this.props.isShowError ?
                        <footer className='error_footer' onClick={this.ErrorClick.bind(this)}>
                            <span className='error_text' style={{width:'100%'}}>{`有${this.props.errorNum}个问题待处理`}</span>
                            <Icon type="right" className='icon_right' color='#29D3C5'/>
                        </footer>
                    :
                        <footer className='index_footer'>
                            <p className='index_cancle' onClick={this.onOpenChange.bind(this)}>预约</p>
                            <p className='index_sure' onClick={this.startClick.bind(this)}>开始</p>
                        </footer>
                    }
                </div>
    }
    //冷饮
    ColdTitleComponent (){
        return  <div className='coldbackground'>
                    <div className='miantitle'>预计
                        <span className='bigTxt'>{this.props.left_time}</span>秒
                    </div>
                    <p className='model' onClick={this.onModelClick.bind(this)}>{GetDataManager.nowModel(this.props.modelNum)}</p>    
                    <main className='content'>
                        <Accordion Recipe_img={Recipe_img} Recipe_Txt={'查看食谱'} type_icon={'right'} onClick={this.Recipe_Click.bind(this)}/>
                    </main>
                    {this.props.isShowError ?
                        <footer className='error_footer' onClick={this.ErrorClick.bind(this)}>
                            <span className='error_text' style={{width:'100%'}}>{`有${this.props.errorNum}个问题待处理`}</span>
                            <Icon type="right" className='icon_right' color='#29D3C5'/>
                        </footer>
                    :
                        <footer className='index_footer'>
                            <p className='index_sure' onClick={this.startClick.bind(this)} style={{width:'100%'}}>开始</p>
                        </footer>
                    }   
                </div>
    }
    //加热
    HotTitleComponent (){
        return  <div className='hotbackground'>
                    <div className='hottitle'>加热至沸腾
                        <p className='hotsubtitle'>并保持沸腾</p>
                    </div>
                    <p className='model' onClick={this.onModelClick.bind(this)}>{GetDataManager.nowModel(this.props.modelNum)}</p>    
                    <main className='content'></main>
                    {this.props.isShowError ?
                        <footer className='error_footer' onClick={this.ErrorClick.bind(this)}>
                            <span className='error_text' style={{width:'100%'}}>{`有${this.props.errorNum}个问题待处理`}</span>
                            <Icon type="right" className='icon_right' color='#29D3C5'/>
                        </footer>
                    :
                        <footer className='index_footer'>
                            <p className='index_sure' onClick={this.startClick.bind(this)} style={{width:'100%'}}>开始</p>
                        </footer>
                    }
                </div>
    }
    //手动
    ManualComponent (){
        return  <div className='coldbackground'>
                    <div className='miantitle'>预设
                        <span className='bigTxt'>{this.props.rev}</span>档
                    </div>
                    <p className='model' onClick={this.onModelClick.bind(this)}>{GetDataManager.nowModel(this.props.modelNum)}</p>   
                    <main className='content'>
                    <Accordion 
                    Recipe_img={Rotate_img}
                    Recipe_Txt={'转速'}
                    type_icon={'right'}
                    set_Txt={`${this.state.set_rotate ? this.state.set_rotate:this.props.rev}挡`}
                    onClick={this.Rotate_Click.bind(this)}
                    />
                    </main>
                    {this.props.isShowError ?
                        <footer className='error_footer' onClick={this.ErrorClick.bind(this)}>
                            <span className='error_text' style={{width:'100%'}}>{`有${this.props.errorNum}个问题待处理`}</span>
                            <Icon type="right" className='icon_right' color='#29D3C5'/>
                        </footer>
                    :
                        <footer className='index_footer'>
                            <p className='index_sure' onClick={this.startClick.bind(this)} style={{width:'100%'}}>开始</p>
                        </footer>
                    }
                </div>
    }
    //保温
    KeepTempComponent (){
        return  <div className='hotbackground'>
                    <div className='miantitle'>预计
                        <span className='bigTxt'>{this.props.time_data}</span>小时
                    </div>
                    <p className='model' onClick={this.onModelClick.bind(this)}>{GetDataManager.nowModel(this.props.modelNum)}</p>  
                    <main className='content'>
                    <Accordion Recipe_img={KeepTime_img} Recipe_Txt={'保温时长'} type_icon={'right'} 
                    set_Txt={`${this.state.set_keeptime ? this.state.set_keeptime:this.props.time_data}小时`}
                    onClick={this.KeepTime_Click.bind(this)}
                    />
                    <Accordion Recipe_img={Temp_img} Recipe_Txt={'保温温度'} type_icon={'right'} 
                    set_Txt={`${this.state.set_temp ? this.state.set_temp:this.props.temp_data}℃`}
                    onClick={this.Temp_Click.bind(this)}
                    />
                    </main>
                    {this.props.isShowError ?
                        <footer className='error_footer' onClick={this.ErrorClick.bind(this)}>
                            <span className='error_text' style={{width:'100%'}}>{`有${this.props.errorNum}个问题待处理`}</span>
                            <Icon type="right" className='icon_right' color='#29D3C5'/>
                        </footer>
                    :
                        <footer className='index_footer'>
                            <p className='index_sure' onClick={this.startClick.bind(this)} style={{width:'100%'}}>开始</p>
                        </footer>
                    }
                </div>
    }
    //显示故障数量
    ErrorClick(){
        this.props.history.push({
            pathname:'/error'
        }); 
    }    
    //切换模式
    onModelClick(){
        this.props.history.push({
            pathname:'/model'
        });
    }
    //查看食谱
    Recipe_Click(){
        this.props.history.push({
            pathname:'/recipe'
        }); 
    }
    //保温时长弹窗
    KeepTime_Click(){
        this.setState({
            visible:true
        })
    }
    //保温温度弹窗
    Temp_Click(){
        this.setState({
            visible1:true
        })
    }
    Rotate_Click(){
        this.setState({
            visible2:true
        }) 
    }
    //保温时长弹窗确定和取消
    keep_onPress(val){
        this.setState({
            visible:false
        })
        if(val === '确定'){
            let set_keeptime = this.state.set_keeptime ? this.state.set_keeptime*2:this.props.time_data*2//保温时长
            let set_temp = this.state.set_temp ? this.state.set_temp:Number(this.props.temp_data)//保温温度
            SettingManager.setStart_working(2,this.props.modelNum,set_temp,set_keeptime,(callback)=>{
                if(callback === 'ok'){
                    this.setTimeout_time = setTimeout(()=>{
                        this.setState({set_keeptime:null})
                    },2000)
                }
            })
        }else{
            this.setState({
                set_keeptime:null
            })
        }
    }
    //保温温度弹窗确定和取消
    temp_onPress(val){
        this.setState({
            visible1:false
        })
        if(val === '确定'){
            let set_keeptime = this.state.set_keeptime ? this.state.set_keeptime*2:this.props.time_data*2//保温时长
            let set_temp = this.state.set_temp ? this.state.set_temp:Number(this.props.temp_data)//保温温度
            SettingManager.setStart_working(2,this.props.modelNum,set_temp,set_keeptime,(callback)=>{
                if(callback === 'ok'){
                    this.setTimeout_temp = setTimeout(()=>{
                        this.setState({set_temp:null})
                    },2000)
                }
            })
        }else{
            this.setState({
                set_temp:null
            })
        }
    }
    //手动转速弹窗确定和取消
    rotate_onPress(val){
        this.setState({
            visible2:false
        })
        if(val === '确定'){
            SettingManager.setRotate_num(this.state.set_rotate,(callback)=>{
                if(callback === 'ok'){
                    this.setTimeout_rotate = setTimeout(()=>{
                        this.setState({set_rotate:null})
                    },2000) 
                }
            })       
        }else{
            this.setState({
                set_rotate:null
            }) 
        }
    }
    //设置保温时长
    setData_time(val){
        this.setState({
            set_keeptime:val
        })
    }
    //设置保温温度
    setData_temp(val){
        this.setState({
            set_temp:val
        })
    }
    //设置转速
    setData_rotate(val){
        this.setState({   
            set_rotate:val,
        })
    }
    //开始按钮
    startClick(){
        this.setState({isShowMask:true}) 
        SettingManager.setStart_working(1,this.props.modelNum,0,0,(callback)=>{})    
    }
    //预约按钮（显示）
    onOpenChange = () => {
        this.setState({ open: true});
    }
    //预约页面隐藏
    showSetPAge(val){
        this.setState({open: val})
    }
    //点击取消等待启动
    maskClick(){
        this.setState({isShowMask:false})
        SettingManager.CancelCook_time(this.props.modelNum)
    }
    render(){
        let _state = this.state
        let _props = this.props
        let set_keeptime = _state.set_keeptime ? _state.set_keeptime:_props.time_data*2//保温时长
        let set_temp = _state.set_temp ? _state.set_temp:Number(_props.temp_data)//保温温度
        return(   
            <div style={{height:'100%'}}>
                <Drawer
                open={this.state.open}
                sidebar={<SetTimePage work_status={_props.work_status} open={this.showSetPAge.bind(this)} promptlyWorkTime={_props.promptlyWorkTime} set_keeptime={set_keeptime} set_temp={set_temp} modelNum={_props.modelNum}/> }
                position={'right'}
                onOpenChange={this.onOpenChange}
                sidebarStyle={{width:'100%'}}
                >                    
                    <div style={{height:'100%'}}>{this.getMainView(this.props.modelNum)}</div>
                </Drawer>
                {this.state.isShowMask ? 
                    <div style={{height:'100%',width:'100%',position:'relative'}}>
                        <div className='mask' onClick={this.maskClick.bind(this)}></div>
                        <img className='mask_img' src={Mask_img} />
                        <div className='mask_text'>
                            <p className='mask_text1'>请于10分钟内</p>
                            <p className='mask_text2'>启动破壁机</p>
                        </div>
                    </div>
                    :null}
                <Popup 
                visible={this.state.visible}
                title={'设置保温时长'}
                popup_style={{margin: '.266667rem',width: '95%',height:'7.466667rem'}}
                main={
                    <div className='popup_mian'>
                        <div className='big_text'>{_state.set_keeptime ? _state.set_keeptime:_props.time_data}<span className='small_text'>小时</span><div className='advice_time'>{`（建议保温时长3小时）`}</div></div>
                        <Slider 
                        defaultValue={Number(_props.time_data)}
                        tempMin={0.5}
                        tempMax={6}
                        setData={this.setData_time.bind(this)}
                        step={0.5}
                        range_time={true}
                        trackStyle={GetDataManager.trackStyle()}
                        handleStyle={GetDataManager.handleStyle()}
                        railStyle={GetDataManager.railStyle()}
                        />
                    </div>  
                }
                buttonNum={2}
                onPress={this.keep_onPress.bind(this)}
                />
                <Popup 
                visible={this.state.visible1}
                title={'设置保温温度'}
                popup_style={{margin: '.266667rem',width: '95%',height:'7.466667rem'}}
                main={
                    <div className='popup_mian'>
                        <Temp defaultValue={this.state.set_temp ? this.state.set_temp:_props.temp_data}/>
                        <div className='advice_temp'>（建议保温温度55℃）</div>
                        <Slider 
                        defaultValue={Number(_props.temp_data)}
                        tempMin={50}
                        tempMax={80}
                        setData={this.setData_temp.bind(this)}
                        range={true}
                        trackStyle={GetDataManager.trackStyle()}
                        handleStyle={GetDataManager.handleStyle()}
                        railStyle={GetDataManager.railStyle()}
                        />
                    </div>   
                }
                buttonNum={2}
                onPress={this.temp_onPress.bind(this)}
                />
                <Popup 
                visible={this.state.visible2}
                title={'设置转速'}
                popup_style={{margin: '.266667rem',width: '95%',height:'7.466667rem'}}
                main={
                    <div className='popup_mian'>
                        <div className='set_rotate'>{this.state.set_rotate ? this.state.set_rotate:_props.rev}</div>
                        <Slider 
                        defaultValue={Number(_props.rev)}
                        tempMin={1}
                        tempMax={8}
                        setData={this.setData_rotate.bind(this)}
                        range_count={true}
                        trackStyle={GetDataManager.trackStyle()}
                        handleStyle={GetDataManager.handleStyle()}
                        railStyle={GetDataManager.railStyle()}
                        />
                    </div>   
                }
                buttonNum={2}
                onPress={this.rotate_onPress.bind(this)}
                />
            </div>
            
        )
    }
}
