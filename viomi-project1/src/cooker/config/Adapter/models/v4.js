import Jingzhufan from '../../../assets/img/cooktype/jingzhufan@2x.png'
import kuaizhufan from '../../../assets/img/cooktype/kuaizhufan@2x.png'
import Baozifan from '../../../assets/img/cooktype/baozifan@2x.png'
import Jiangtang from '../../../assets/img/cooktype/jiangtang@2x.png'
import Refan from '../../../assets/img/cooktype/refan@2x.png'
import Baowen from '../../../assets/img/cooktype/baowen@2x.png'
import Fanqiefan from '../../../assets/img/cooktype/fanqiefan.jpg'

import Zhoutang from '../../../assets/img/cooktype/zhoutang@2x.png'
import Babaozhou from '../../../assets/img/cooktype/babaozhou.jpg'
import Yinertang from '../../../assets/img/cooktype/yinertang.jpg'
import Yimizhou from '../../../assets/img/cooktype/yimizhou.jpg'
import Hongzaozhou from '../../../assets/img/cooktype/hongzaozhou.jpg'
import Lvdouzhou from '../../../assets/img/cooktype/lvdouzhou.jpg'
import Guiyuan from '../../../assets/img/cooktype/guiyuan.jpg'
import Hongzaoyiner from '../../../assets/img/cooktype/hongzaoyiner.jpg'

import Jichi from '../../../assets/img/cooktype/jichi.jpg'
import Zhujiao from '../../../assets/img/cooktype/zhujiao.jpg'
import Paigu from '../../../assets/img/cooktype/paigu.jpg'
import Dongporou from '../../../assets/img/cooktype/dongporou.jpg'
import Hongmenji from '../../../assets/img/cooktype/hongmenji.jpg'
import Dangao from '../../../assets/img/cooktype/dangao.jpg'

let v4_Config = {
    isSetTimerBtn(){//首页是否有预约按钮和弹窗
        return true
    },
    isSetTimerPopup(){//首页是否有预约模式弹窗
        return true
    },
    isOnlyOneBtn(){//首页是否只有一个按钮（只有开始按钮，没有预约按钮）
        return false
    },
    showMi_choice(){//显示米种选择
        return true
    },
    showPalate_choice(){//显示口感选择
        return true
    },
    isSmall_img(){//食谱总页头部是否显示小图片
        return true
    },
    
    //食谱总页数据
    recipeData(){
        return [
            {
                type:'特色米饭',
                item:[
                    {   
                        key:0,
                        img:Jingzhufan,
                        title:'精煮饭',
                        isSet:0,
                        cookerTime:'45',
                        Steps:'',
                        parameter:'0'
                    },
                    {   
                        key:1,
                        img:kuaizhufan,
                        title:'超快煮',
                        isSet:0,
                        cookerTime:'40',
                        Steps:'',
                        parameter:'0'
                    },
                    {   
                        key:2,
                        img:Baozifan,
                        title:'煲仔饭',
                        isSet:0,
                        cookerTime:'60',
                        Steps:'',
                        parameter:'0'
                    },
                    {   
                        key:3,
                        img:Jiangtang,
                        title:'杂粮饭',
                        isSet:0,
                        cookerTime:'60',
                        Steps:'',
                        parameter:'0'
                    },
                    {   
                        key:5,
                        img:Refan,
                        title:'热饭',
                        isSet:0,
                        cookerTime:'25',
                        Steps:'',
                        parameter:'0'
                    },
                    {   
                        key:6,
                        img:Baowen,
                        title:'保温',
                        isSet:0,
                        cookerTime:'720',
                        Steps:'',
                        parameter:'0'
                    },
                    {   
                        key:18,
                        img:Fanqiefan,
                        title:'番茄饭',
                        isSet:0,
                        cookerTime:'45',
                        parameter:'9706002=08001?02260258203>02260258001=038405=<602>03>803842052000?09602033000=038410',
                        Steps:'步骤1：将胡萝卜、土豆、香菇、腊肠等切成丁，分别放入锅中煸炒片刻，取出放入盘中备用&步骤2：将大米淘洗干净放入内锅，加入少许盐、胡椒粉、香油、耗油调味；加入米量对应刻度水，再将胡萝卜、土豆、香菇、腊肠、青豆、玉米粒分别摆放在内锅周围围成一圈，然后在中间位置放置一个划十字的西红柿&步骤3：在APP上选择番茄焖饭模式点“开始”&步骤4：米饭煮好后，开盖将西红柿剥皮再放入；同时打入一个生鸡蛋，继续焖饭10分钟；然后再打开盖加入咸鸭蛋搅拌均匀，就可以食用了'     
                    },
                ]
            },
            {
                type:'滋补汤粥',
                item:[
                    {   
                        key:4,
                        img:Zhoutang,
                        title:'粥/汤',
                        isSet:0,
                        cookerTime:'120',
                        Steps:'',
                        parameter:'0'
                    },
                    {   
                        key:7,
                        img:Babaozhou,
                        title:'八宝粥',
                        isSet:1,
                        min:2,
                        max:4,
                        cookerTime:'150',
                        parameter:'3<0300783:001?035204;0602>03>804;020410000384000',
                        Steps:'步骤1：将淘洗干净的八宝粥放入内锅，并加水至煮粥水位线1刻度位置&步骤2：在APP上选择击八宝粥模式点“开始”，等烹饪结束就可以食用了'     
                    },
                    {   
                        key:8,
                        img:Yinertang,
                        title:'银耳莲子汤',
                        isSet:1,
                        min:2,
                        max:4,
                        cookerTime:'150',
                        parameter:'3<0300783:001?035204;0602>03>804;020410000384000',
                        Steps:'步骤1：将准备好的食材放入内锅，加水至煮粥水位线1刻度位置&步骤2：在APP上选择击银耳莲子汤模式点“开始”，等烹饪结束就可以食用了&注：可根据个人口感，适当调整水量'     
                    },
                    {   
                        key:9,
                        img:Yimizhou,
                        title:'薏米红豆粥',
                        isSet:1,
                        min:2,
                        max:4,
                        cookerTime:'150',
                        parameter:'3<0300783:001?035204;0602>03>804;020410000384000',
                        Steps:'步骤1：将淘洗干净食材加入内锅，加水至煮粥水位线0.5刻度位置&步骤2：在APP上选择薏米红豆粥模式点“开始”，等烹饪结束就可以食用了&注：可根据个人口感，适当调整水量'     
                    },
                    {   
                        key:10,
                        img:Hongzaozhou,
                        title:'红枣莲子小米粥',
                        isSet:1,
                        min:1,
                        max:4,
                        cookerTime:'90',
                        parameter:'3:03003<38001?035204;0602>03>804;020410000384000',
                        Steps:'步骤1：将淘洗干净的食材加入内锅，加水至煮粥水位线1刻度位置&步骤2：在APP上选择红枣莲子薏米粥模式点“开始”，等烹饪结束就可以食用了&注：可根据个人口感，适当调整水量'     
                    },
                    {   
                        key:11,
                        img:Lvdouzhou,
                        title:'绿豆粥',
                        isSet:1,
                        min:1,
                        max:4,
                        cookerTime:'90',
                        parameter:'3<03003<3:001?035204;0602>03>804;020410000384000',
                        Steps:'步骤1：将淘洗干净食材加入内锅，加水至煮粥水位线1刻度位置&步骤2：在APP上选择红枣莲子薏米粥模式点“开始”，等烹饪结束就可以食用了&注：可根据个人口感，适当调整水量'     
                    },
                    {   
                        key:19,
                        img:Guiyuan,
                        title:'桂圆红枣养生粥',
                        isSet:1,
                        min:2,
                        max:4,
                        cookerTime:'150',
                        parameter:'3<0300783:001?035204;0602>03>804;020410000384000',
                        Steps:'步骤1：将食材淘洗干净，放入内锅&步骤2：加水至煮粥0.5刻度（根据个人口感，适量调整水量）&步骤3：启动桂圆红枣养生粥自定义菜单，烹饪结束即可食用'     
                    },
                    {   
                        key:20,
                        img:Hongzaoyiner,
                        title:'红枣银耳胶原汤',
                        isSet:1,
                        min:2,
                        max:4,
                        cookerTime:'150',
                        parameter:'3<0300783:001?035204;0602>03>804;020410000384000',
                        Steps:'步骤1：将食材淘洗干净，放入内锅&步骤2：加水至煮粥0.5刻度（根据个人口感，适量调整水量）&步骤3：启动红枣银耳胶原汤自定义菜单，烹饪结束即可食用'     
                    },
                ]
            },
            {
                type:'好味菜品',
                item:[
                    {   
                        key:12,
                        img:Jichi,
                        title:'可乐鸡翅',
                        isSet:0,
                        cookerTime:'40',
                        parameter:'=804002868001:035205=<602>03>805=<205500080;;82038000<038420',
                        Steps:'步骤1：将鸡翅、配料等全部放入内锅铺平，倒入可乐淹没至鸡翅约2/3位置处，再加入少量老抽调色&步骤2：在APP上选择红可乐鸡翅模式点“开始”，等烹饪结束就可以食用了'     
                    },
                    {   
                        key:13,
                        img:Zhujiao,
                        title:'红焖猪脚',
                        isSet:0,
                        cookerTime:'60',
                        parameter:'==04003<68001:035205=<602>03>805=<205500080;;82038000<038420',
                        Steps:'步骤1：将猪脚淖水沥干待用&步骤2：生姜切片、蒜粒，平铺锅底，将猪蹄加入内锅，将其余配料、调料等加入内锅，然后加水至淹没猪蹄3/4位置&步骤3：在APP上选择红烧猪蹄模式点“开始”，等烹饪结束就可以食用了用'     
                    },
                    {   
                        key:14,
                        img:Paigu,
                        title:'红焖排骨',
                        isSet:0,
                        cookerTime:'45',
                        parameter:'==04002=68001:035205=<602>03>805=<205500080;;82038000<038420',
                        Steps:'步骤1：生姜切片、葱切断、蒜粒，平铺锅底&步骤2：将排骨淖水沥干后放入内锅铺开，加入剩余配料与调料，加水至淹没排骨1/2位置&步骤3：在APP上选择红烧排骨模式点“开始”，等烹饪结束就可以食用了'     
                    },
                    {   
                        key:15,
                        img:Dongporou,
                        title:'东坡肉',
                        isSet:0,
                        cookerTime:'60',
                        parameter:'==04003<68001:035205=<602>03>805=<205500080;;82038000<038420',
                        Steps:'步骤1：生姜切片、葱切断、蒜粒，平铺锅底&步骤2：将花肉淖水沥干后，切成丁状铺开锅底，加入剩余配料与调料，然后加水淹没花肉1/2位置&步骤3：在APP上选择东坡肉模式点“开始”，等烹饪结束就可以食用了'     
                    },
                    {   
                        key:16,
                        img:Hongmenji,
                        title:'红焖鸡',
                        isSet:0,
                        cookerTime:'45',
                        parameter:'==04002=68001:035205=<602>03>805=<205500080;;82038000<038420',
                        Steps:'步骤1：姜、蒜切末放入大碗中，倒入调料拌均匀&步骤2：去尾仔鸡放入大碗中，用打结的小葱蘸料涂抹仔鸡内腔与全身，并将葱塞入仔鸡内腔中，用拌匀的调料给仔鸡再按摩2-3分钟，让调料入味，然后密封腌制1-2小时&步骤3：然后将仔鸡放入内锅，调料一并倒入内锅，在APP上选择红焖鸡模式点“开始”，等烹饪结束就可以食用了'     
                    },
                    {   
                        key:17,
                        img:Dangao,
                        title:'蛋糕',
                        isSet:0,
                        cookerTime:'45',
                        parameter:'??02002=680013033>05=<203>035<08?<00',
                        Steps:'步骤1：蛋黄和蛋白分开，蛋白打发，并将2/3白砂糖分三次加入，打发成奶油状&步骤2：将蛋黄打散、剩余白砂糖、面粉(最好过筛，避免成团)倒入和面机容器内，进行搅拌均匀成面糊，打发的蛋清分两次加入面糊内；并搅好的面糊倒入内锅&步骤3：在APP上选择蛋糕模式点“开始”，等烹饪结束就可以食用了'     
                    },
                   
                ]
            },
            
        ]
    },
    //食谱总页头部显示小图片数据
    recipeData1(){
        return [{
            item:[
                {   
                    key:0,
                    img:Jingzhufan,
                    title:'精煮饭',
                    isSet:0,
                    cookerTime:'45',
                    Steps:'',
                    parameter:'0'
                },
                {   
                    key:1,
                    img:kuaizhufan,
                    title:'超快煮',
                    isSet:0,
                    cookerTime:'40',
                    Steps:'',
                    parameter:'0'
                },
                {   
                    key:2,
                    img:Baozifan,
                    title:'煲仔饭',
                    isSet:0,
                    cookerTime:'60',
                    Steps:'',
                    parameter:'0'
                },
                {   
                    key:3,
                    img:Jiangtang,
                    title:'杂粮饭',
                    isSet:0,
                    cookerTime:'60',
                    Steps:'',
                    parameter:'0'
                },
                {   
                    key:5,
                    img:Refan,
                    title:'热饭',
                    isSet:0,
                    cookerTime:'25',
                    Steps:'',
                    parameter:'0'
                },
                {   
                    key:6,
                    img:Baowen,
                    title:'保温',
                    isSet:0,
                    cookerTime:'720',
                    Steps:'',
                    parameter:'0'
                },
                {   
                    key:18,
                    img:Fanqiefan,
                    title:'番茄饭',
                    isSet:0,
                    cookerTime:'45',
                    parameter:'9706002=08001?02260258203>02260258001=038405=<602>03>803842052000?09602033000=038410',
                    Steps:'步骤1：将胡萝卜、土豆、香菇、腊肠等切成丁，分别放入锅中煸炒片刻，取出放入盘中备用&步骤2：将大米淘洗干净放入内锅，加入少许盐、胡椒粉、香油、耗油调味；加入米量对应刻度水，再将胡萝卜、土豆、香菇、腊肠、青豆、玉米粒分别摆放在内锅周围围成一圈，然后在中间位置放置一个划十字的西红柿&步骤3：在APP上选择番茄焖饭模式点“开始”&步骤4：米饭煮好后，开盖将西红柿剥皮再放入；同时打入一个生鸡蛋，继续焖饭10分钟；然后再打开盖加入咸鸭蛋搅拌均匀，就可以食用了'     
                },
            ]
        }]
    }
}

export default v4_Config;