---
markdown:
  image_dir: /images
  path: README.md
  ignore_from_front_matter: true
  absolute_image_path: false

export_on_save:
  markdown: true
---

[toc]

## 数字工具-NumberUnit

数字工具是使用第三方numeral.js封装的，为了统一工具命名，**numeral**在本sdk中的别名为**NumberUnit**，详情参考文档 http://numeraljs.com/

## 构建方法

### number参数

```
const numberObj = NumberUnit(1000);
```

### 字符串参数

```
const numberObj_1 = NumberUnit("10,000.12");//10000.12
const numberObj_2 = NumberUnit("$10,000.00");//10000
const numberObj_3 = NumberUnit("-76%");//-0.76
```

## 取值

### value()

```
const numberObj = NumberUnit(1000);
console.log(numberObj);
//打印 [object]

console.log(numberObj.value());
//打印 1000
```

## 显示

### format()

```
//金额格式
NumberUnit(10000.23).format('0,0'); // '10,000'

//小数后几位
NumberUnit(10000.1234).format('0.000'); // '10000.123'

//金额格式 + 小数后几位
NumberUnit(1000.234).format('$0,0.00'); // '$1,000.23'

//前缀填充0
NumberUnit(100.1234).format('00000'); // '00100'

//数字转化为单位千(k)、百万(m)
NumberUnit(1230974).format('0.0a'); // '1.2m'

//字节转换
NumberUnit(7884486213).format('0.00b'); // '7.88GB'

//百分比
NumberUnit(0.974878234).format('0.000%'); // '97.488%'

//转换成 时:分:秒
NumberUnit(238).format('00:00:00'); // '00:03:58'

//转换成 时:分
NumberUnit(238).format('00:00'); // '00:03'

//转换成时间 秒数未满一分钟的向上取整
NumberUnit(3580).format('00:00:00'); // '00:59:40'
NumberUnit(3580).format('00:00:00 ceil'); // '01:00:00'
```

## 自定义转译格式

如果是常用的，建议联系沟通，新增到sdk组件库。如果是非常特殊的，或者由于其他原因希望自定义的

### 自定义方法

```
import 格式文件 from 来源;

NumberUnit.register('format', 格式名称, 格式文件);
```

### 格式文件

```
//假设NumberUtil(238).format(00:00);
{
  //匹配的标识符，这里是“:”
  regexps: {
      //当匹配到字符串里面含有“:”时，进行此格式编译
      format: /(:)/,
      //当匹配到字符串里面含有“:”时，进行此格式反编译
      unformat: /(:)/
  },
  //格式化，目标是将数字238转换成字符串00:03
  format: function (value, format, roundingFunction) {
      //value = 238
      //format = "00:00"

      let output;

      逻辑处理....

      return output;
  },
  //反编译格式化，目标是将字符串00:03转换成数字238
  unformat: function (string) {
      let output;

      逻辑处理....

      //原则上是要反编译成数字，因为这个是数字处理工具
      return Number(output);
  }
}
```

注意：格式名称不能定义已经存在的名称，详细配置方法参考本目录/formats/*.js
