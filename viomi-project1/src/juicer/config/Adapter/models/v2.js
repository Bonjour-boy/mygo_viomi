/*
 * @Author: your name
 * @Date: 2019-12-05 18:18:38
 * @LastEditTime : 2019-12-26 11:20:29
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\juicer\config\Adapter\models\v1.js
 */
import doujiang from '../../../assets/img/doujiang@2x.png'
import yingerhu from '../../../assets/img/yingerhu@2x.png'
import nongtang from '../../../assets/img/nongtang@2x.png'
import guoshu from '../../../assets/img/guoshu@2x.png'
import bingsha from '../../../assets/img/bingsha@2x.png'
import yumizhi from '../../../assets/img/yumizhi@2x.png'
import jiare from '../../../assets/img/jiare@2x.png'
import shoudong from '../../../assets/img/shoudong@2x.png'
import luosongtang from '../../../assets/img/luosongtang@2x.png'
import mianzhou from '../../../assets/img/mianzhou@2x.png'
import zhimahu from '../../../assets/img/zhimahu@2x.png'
import baowen from '../../../assets/img/baowen@2x.png'

let v2_Config = {
    model_data(){
        return [
            {   
                sortNum:1,
                img:doujiang,
                text:'浓豆浆', 
                workTime: 21,
                baseTime: 31,
                type: 'doujiang',
            },
            {   
                sortNum:2,
                img:yingerhu,
                text:'婴儿糊',
                workTime: 30,
                baseTime: 34, 
                type: 'yingerhu',
            },
            {   
                sortNum:3,
                img:nongtang,
                text:'浓汤', 
                workTime: 50,
                baseTime: 60,
                type: 'nongtang',
            },
            {   
                sortNum:4,
                img:guoshu,
                text:'果蔬汁', // 单位为秒
                workTime: 120,
                type: 'guoshuzhi',
            },
            {   
                sortNum:5,
                img:bingsha,
                text:'冰沙',
                workTime: 56, // 单位为秒
                type: 'shabing',
            },
            {   
                sortNum:6,
                img:yumizhi,
                text:'玉米汁', 
                workTime: 19,
                baseTime: 31,
                type: 'yumizhi',
            },
            {   
                sortNum:7,
                img:jiare,
                text:'加热', 
            },
            {   
                sortNum:8,
                img:shoudong,
                text:'手动', 
            },
            {   
                sortNum:9,
                img:luosongtang,
                text:'罗宋汤',
                workTime: 32,
                baseTime: 40,
                type: 'luosongtang',
            },
            {   
                sortNum:10,
                img:mianzhou,
                text:'绵粥', 
                workTime: 26,
                baseTime: 41,
                type: 'mianzhou',
            },
            {   
                sortNum:11,
                img:zhimahu,
                text:'芝麻糊', 
                workTime: 29,
                baseTime: 35,
                type: 'zhimahu',
            },
            {   
                sortNum:12,
                img:baowen,
                text:'保温', 
            },
        ]
    },
    Recipe_data(){
        return {
            guoshuzhi : {
                title : '果蔬汁',
                des : '果蔬汁是用生的蔬菜和新鲜水果榨在一起的汁，它能有效为人体补充维生素以及钙、磷、钾、镁等矿物质，可以调整人体功能协调，增强细胞活力以及肠胃功能，促进消化液分泌、消除疲劳。',
                food : [
                  {name : '奇异果',num : '1个'},{name : '苹果',num : '1个'},{name : '凉开水',num : '250ml'},
                  {name : '冰块',num : '3块'}
                ],
                steps : [
                  {text : '奇异果去皮切块，苹果去皮切块'},
                  {text : '将食材放入杯内，并放入250ml凉开水和冰块'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“果蔬汁”功能，进入工作并制作完成'}
                ]
              },
              doujiang : {
                title : '豆浆',
                des : '豆浆是深受大家喜爱的一种饮品，又是一种老少皆宜的营养食品，在欧美享有“植物奶”的美誉。豆浆含有丰富的植物蛋白和磷脂，还含有维生素B1.B2和烟酸。此外，豆浆还含有铁、钙等矿物质，尤其是其所含的钙，非常适合于各种人群，包括老人、成年人、青少年、儿童等等。',
                food : [
                  {name : '黄豆',num : '50克'},
                  {name : '红枣',num : '3粒'},
                  {name : '枸杞',num : '10粒'},
                  {name : '清水',num : '800ml'}
                ],
                steps : [
                  {text : '把黄豆，红枣，枸杞洗净待用'},
                  {text : '洗净食材放入杯内，并放入800ml清水'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“豆浆”功能，进入工作并制作完成'}
                ]
              },
              yingerhu : {
                title : '婴儿糊',
                des : '婴儿糊是将各类谷物、薯类、蔬果经粉碎和水煮糊化后得到的具有一定粘度和稠度的半固态物质；因其容易消化吸收，可以用于制作各种婴儿辅食。',
                food : [
                  {name : '大米',num : '100克'},
                  {name : '清水',num : '1000ml'}
                ],
                steps : [
                  {text : '把大米洗净待用'},
                  {text : '洗净食材放入杯内，并放入1000ml清水'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“婴儿糊”功能，进入工作并制作完成'}
                ]
              },
              nongtang : {
                title : '浓汤',  
                des : '汤是人们所吃的各种食物中最富营养、最易消化的品种之一。以鲫鱼浓汤为例，它是用鲫鱼制作的一道家常菜，鲜美浓香。鲫鱼汤含有丰富的蛋白质，对肌肤的弹力纤维构成能起到很好的强化作用。',
                food : [
                  {name : '鲫鱼',num : '200g'},
                  {name : '葱',num : '2段'},
                  {name : '姜',num : '2片'},
                  {name : '黑胡椒粉',num : '少许'},
                  {name : '麻油',num : '少许'},
                  {name : '盐',num : '适量'},
                  {name : '水',num : '1000ml'}
                ],
                steps : [
                  {text : '把鲫鱼和黑胡椒清洗干净,姜、葱切成片'},
                  {text : '把食材放入杯内，并放入1000ml清水'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“浓汤”功能，后加入少许盐，进入工作并制作完成'}
                ]
              },
              yumizhi : {
                title : '玉米汁',
                des : '玉米汁是一种以玉米为主要原料的营养保健型饮料，风味清香可口，适合于男女老少饮用，玉米汁富含人体必须的、而自身又不易合成的30余种营养物质，如铁、钙、硒、锌、钾、镁、锰、磷、谷胱甘肽、葡萄糖、氨基酸等。',
                food : [
                  {name : '玉米粒',num : '200克'},
                  {name : '水',num : '750ml'}
                ],
                steps : [
                  {text : '把食材洗净待用'},
                  {text : '洗净食材放入杯内，并放入750ml清水'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“玉米汁”功能，进入工作并制作完成'}
                ]
              },
              luosongtang : {
                title : '罗宋汤',
                des : '罗宋汤是在俄国和波兰等东欧国家随处可见的一种羹汤，罗宋汤含有胡萝卜素、维生素A、钾、磷、钠、钙等多钟营养成分，具有促消化、降血压、降血脂、防癌抗癌、养血补虚等作用。',
                food : [
                  {name : '牛肉',num : '50克'},
                  {name : '胡萝卜',num : '100克'},
                  {name : '洋葱',num : '50克'},
                  {name : '黄油',num : '5克'},
                  {name : '料酒',num : '10克'},
                  {name : '番茄酱',num : '5克'},
                  {name : '白砂糖',num : '15克'},
                  {name : '黑胡椒',num : '1克'},
                  {name : '植物油',num : '5克'},
                  {name : '清水',num : '450ml'}
                ],
                steps : [
                  {text : '把食材洗净待用'},
                  {text : '洗净食材放入杯内，并放入450ml清水'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“罗宋汤”功能，进入工作并制作完成'}
                ]
              },
              mianzhou : {
                title : '绵粥',
                des : '绵粥具有滋补元气，止泻功效，生津液，畅胃气的功效。绵粥有清理胃肠、润泽肝腑、平肝散火的效果；吃绵粥的时候可以配合一些生菜，效力更好，选购新鲜鲜嫩的生菜切成丝状，将生菜丝放入碗底，冲入刚制好的白粥中，即可食用。',
                food : [
                  {name : '米',num : '100克'},
                  {name : '清水',num : '700ml'}
                ],
                steps : [
                  {text : '把食材洗净待用'},
                  {text : '洗净食材放入杯内，并放入700ml清水'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“绵粥”功能，进入工作并制作完成'}
                ]
              },
              zhimahu : {
                title : '芝麻糊',
                des : '芝麻糊是以黑芝麻为主要原料，加入其它五谷杂粮制作而成的一种食品。它营养丰富，清甜麻香，可以解馋，余味无穷；黑芝麻有养颜保健和使白发变黑的功效；黑芝麻中的维生素E非常丰富，可延缓衰老，并有润五脏、强筋骨、益气力等作用。',
                food : [
                  {name : '芝麻',num : '150克'},
                  {name : '粘米',num : '60克'},
                  {name : '砂糖',num : '适量'},
                  {name : '清水',num : '750ml'}
                ],
                steps : [
                  {text : '把食材洗净待用'},
                  {text : '洗净食材放入杯内，并放入750ml清水'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“芝麻糊”功能，进入工作并制作完成'}
                ]
              },
              shabing : {
                title : '沙冰',
                des : '沙冰，顾名思义是将冰块加工成沙粒一样细腻，入口即化。根据个人的喜好，可以将各种口味的水果泥或其它糖浆与沙冰混合在一起，是炎炎夏季消暑必备之物，健康又美味！',
                food : [
                  {name : '冰块',num : '12块'}
                ],
                steps : [
                  {text : '取12块冰，冰块不能大于12*12mm'},
                  {text : '将食材放入杯内'},
                  {text : '盖紧杯盖，破壁机插上电源，并选择“沙冰”功能，进入工作并制作完成'}
                ]
            }
        }
    }     
}

export default v2_Config;