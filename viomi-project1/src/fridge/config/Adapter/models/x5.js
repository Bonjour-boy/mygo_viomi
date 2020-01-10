import Image1 from '../../../assets/img/changeArea@2x.png'
import Image2 from '../../../assets/img/changetemp@2x.png'
import Image3 from '../../../assets/img/frozen@2x.png'
let x5_Config = {
    twoNav(){//是否两个导航
        return false
    },
    isShowChangeAreaPopup(){//是否有变温区弹窗
        return true
    },
    isShowColdSetPopup(){//是否有冷藏室温度设置弹窗
        return true
    },
    isShowChangeRoomPopup(){//是否有变温室温度设置弹窗
        return true
    },
    isFrozenSetPopup(){//是否有冷冻室温度设置弹窗
        return true
    },
    topTwoRooms(){//冷藏室是否两室（变温区）
        return true
    },
    isColdRoom(){//是否有冷藏室
        return true
    },
    isChangeRoom(){//是否有变温室
        return true
    },
    isFrozenRoom(){//是否有冷冻室
        return true
    },
    textWidth(){//文字（温度）占比
        return '50%'
    },
    textMarginTop(){//文字（温度）占比
        return '25%' 
    },
    textMarginBottom(){//文字（温度）占比
        return '7%' 
    },
    //冷藏室
    isCSwitchBtn(){//冷藏室是否有开关按钮
        return true
    },
    isCSetTempBtn(){//冷藏室是否有温度设置按钮
        return true
    },
    isCChangeAreaBtn(){//冷藏室是否有变温区按钮
         return true
    },
    isCSpeedCoolBtn(){//冷藏室是否有速冷按钮
        return false
    },
    isCSpeedDongBtn(){//冷藏室是否有速冻按钮
        return false
    },
    //冷冻室
    isFSwitchBtn(){//冷冻室是否有开关按钮
        return false
    },
    isFSetTempBtn(){//冷冻室是否有温度设置按钮
        return true
    },
    isFChangeAreaBtn(){//冷冻室是否有变温区按钮
         return false
    },
    isFSpeedCoolBtn(){//冷冻室是否有速冷按钮
        return false
    },
    isFSpeedDongBtn(){//冷冻室是否有速冻按钮
        return true
    },
    //变温室
    isCCSwitchBtn(){//变温室是否有开关按钮
        return true
    },
    isCCSetTempBtn(){//变温室是否有温度设置按钮
        return true
    },
    isCCChangeAreaBtn(){//变温室是否有变温区按钮
         return false
    },
    isCCSpeedCoolBtn(){//变温室是否有速冷按钮
        return false
    },
    isCCSpeedDongBtn(){//变温室是否有速冻按钮
        return false
    },
    //模式切换
    isSmartModel(){//是否有智能模式
        return true
    },
    isHolidayModel(){//是否有假日模式
        return true
    },
    modelData(){//x5初始数据
        return {
            ColdRoomImage:Image1,//冷藏室图片
            ChangeRoomImage:Image2,//变温室图片
            FrozenRoomImage:Image3,//冷冻室图片
            //冷藏室温度初始值
            setFreezerMin:2,
            setFreezerMax:8, 
            //变温室温度初始值
            setChangeMin:-18,
            setChangeMax:5,
            //冷冻室温度初始值
            setFrozenMin:-24,
            setFrozenMax:-16
        }
    }
}

export default x5_Config;