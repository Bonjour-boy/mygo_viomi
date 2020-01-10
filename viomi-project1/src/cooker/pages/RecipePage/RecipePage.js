/*
 * @Author: your name
 * @Date: 2019-11-08 09:29:34
 * @LastEditTime: 2019-12-04 13:40:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\cooker\pages\RecipePage\RecipePage.js
 */
import React,{Component} from 'react'
import './RecipePage.css'
import TypeItem from '../../../Components/TypeItem/TypeItem'
import Title from '../../../Components/Title/Title'
import ModelAdapter from '../../config/Adapter/ModelAdapter'

export default class RecipePage extends Component{
    constructor(props) {
        super(props);
        let arr = this.props.match.params[0].split('&')
        let arr1 = []
        let json = {}
        arr.map((item)=>{
            arr1.push(item.split('=')) 
        })
        arr1.map((k)=>{
            json[k[0]] = k[1]
        }) 
        this.key = Number(json.id)
        this.DataTimer = json.cook_time
        this.KeepTimer = Number(json.keepTemp_time)
    } 
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }
    //返回主页
    BackClick_MainPage(){
        if(this.DataTimer === undefined){
            history.back()
        }else{
            this.props.history.push({
                pathname:'/cooking' + 'id=' + this.key + '&' + 'cook_time=' + this.DataTimer + '&' + 'keepTemp_time=' + this.KeepTimer 
            })
        } 
    }
    //点击每一项
    ItemClick(index,item){
        this.props.history.push({
            pathname:'/detail' + 'id=' + item.key
            });
    }
    render(){
        return(
            <div style={{height:'100%'}}>
                    <div className={'recipe_app'}>
                        <Title 
                        BackClick={this.BackClick_MainPage.bind(this)}
                        TitleTxt={'食谱'}
                        />
                        {ModelAdapter.isSmall_img() ? 
                        <TypeItem 
                        data={ModelAdapter.recipeData1()}
                        ItemClick={this.ItemClick.bind(this)}
                        item_img_style={{width: '1.493333rem',height:'1.493333rem',borderRadius: '50%',}}
                        />
                        :null
                        }
                        <TypeItem 
                        data={ModelAdapter.recipeData()}
                        ItemClick={this.ItemClick.bind(this)}
                        item_img_style={{width: '3.2rem',height:'3.2rem'}}
                        />
                    </div>
            </div>
        )
    }
}