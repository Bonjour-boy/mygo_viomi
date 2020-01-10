import Image1 from '../../../assets/img/afreezer@2x.png'
import Image3 from '../../../assets/img/afrozen@2x.png'
let u16_Config = {
    twoNav(){//是否两个导航
        return true
    },
    isShowChangeAreaPopup(){//是否有变温区弹窗
        return false
    },
    isShowColdSetPopup(){//是否有冷藏室温度设置弹窗
        return true
    },
    isShowChangeRoomPopup(){//是否有变温室温度设置弹窗
        return false
    },
    isFrozenSetPopup(){//是否有冷冻室温度设置弹窗
        return true
    },
    topTwoRooms(){//冷藏室是否两室（变温区）
        return false
    },
    isColdRoom(){//是否有冷藏室
        return true
    },
    isChangeRoom(){//是否有变温室
        return false
    },
    isFrozenRoom(){//是否有冷冻室
        return true
    },
    textWidth(){//文字（温度）占比
        return '100%'
    },
    textMarginTop(){//文字（温度）占比
        return '13%' 
    },
    textMarginBottom(){//文字（温度）占比
        return '7%' 
    },
    //冷藏室
    isCSwitchBtn(){//冷藏室是否有开关
        return true
    },
    isCSetTempBtn(){//冷藏室是否有温度设置
        return true
    },
    isCChangeAreaBtn(){//冷藏室是否有变温区
        return false
    },
    isCSpeedCoolBtn(){//冷藏室是否有速冷按钮
        return true
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
        return false
    },
    isCCSetTempBtn(){//变温室是否有温度设置按钮
        return false
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
    modelData(){//u16初始数据
        return {
            ColdRoomImage:Image1,//冷藏室图片
            ChangeRoomImage:null,//变温室图片
            FrozenRoomImage:Image3,//冷冻室图片
            //冷藏室温度初始值
            setFreezerMin:2,
            setFreezerMax:8, 
            //冷冻室温度初始值
            setFrozenMin:-24,
            setFrozenMax:-16
        }
    }
}

export default u16_Config;