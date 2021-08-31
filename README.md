# zl-ver-menu

递归实现的一个垂直菜单

# 演示地址

https://zl-fire.github.io/code/zl-ver-menu.html

# 使用前提

在使用前需要引入 jQuery，如

```js
<script src="https://cdn.jsdelivr.net/npm/blogzl-indexjs@18.0.0/dist/jquery.min.js"></script>
```

# 使用方法

## 方式一：使用 script 标签引入进行使用

```html
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zl-ver-menu使用演示</title>
    <script src="https://cdn.jsdelivr.net/npm/blogzl-indexjs@18.0.0/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/zl-ver-menu@1.0.5/index.js"></script>
</head>

<body>
    <div class="your-menu"></div>
    <script>
        zl_ver_menu = window["zl-ver-menu"]; //从window上获取zl-ver-menu方法
        //准备cata数据
        let dataList = [
            {
                "id": 6,
                "parent_id": 0,
                "name": "李冰有限公司A",
                "children": [
                    {
                        "id": 7,
                        "parent_id": 6,
                        "name": "财务部",
                        "children": []
                    },
                    {
                        "id": 108,
                        "parent_id": 6,
                        "name": "第二个部门",
                        "children": []
                    }
                ]
            }
        ];
        //调用此方法生成垂直菜单（class名和上面html元素的class名一致即可，可以任取）
        zl_ver_menu({
            data:dataList, //菜单数据
            menuClassName: "your-menu", //菜单容器元素的class名
            callback: function (par) { console.log(par) }, //点击具体的菜单项后要执行的函数（par默认会传入点击的节点）
            show: true, //此垂直菜单默认为全部展开
            width: "230px" //此垂直菜单默认宽度为230px
        });
    </script>
</body>

</html>
```

## 方式二：使用 import 标签引入进行使用

```js
     import zl_ver_menu from "zl-ver-menu";
       //准备cata数据
       let dataList = [
            {
                "id": 6,
                "parent_id": 0,
                "name": "李冰有限公司A",
                "children": [
                    {
                        "id": 7,
                        "parent_id": 6,
                        "name": "财务部",
                        "children": []
                    },
                    {
                        "id": 108,
                        "parent_id": 6,
                        "name": "第二个部门",
                        "children": []
                    }
                ]
            }
        ];
        //调用此方法生成垂直菜单（class名和上面html元素的class名一致即可，可以任取）
        zl_ver_menu({
            data:dataList, //菜单数据
            menuClassName: "your-menu", //菜单容器元素的class名
            callback: function (par) { console.log(par) }, //点击具体的菜单项后要执行的函数（par默认会传入点击的节点）
            show: true,//此垂直菜单默认为全部展开
            width: "230px" //此垂直菜单默认宽度为230px

        });
```

# 参数详细说明
```js
/**
  * @description 作用与目的：调用creatVerMenu函数得到真正的菜单DOM
  * @param {object} parObj: 参数对象
  * @param {object[]} parObj.data  构建菜单的对象数组数据
  * @param {string} parObj.menuClassName  构建菜单的元素class
  * @param {string} parObj.width  菜单容器的宽度，默认230px（传参时传入字符串形式，如 400px）
  * @param {function} parObj.callback  点击具体的菜单项后要执行的函数（par默认会传入点击的节点）
  * @param {boolean} parObj.show {boolean} 默认全部展开还是全部收缩，默认为true.全部展开
  * @return {object|viod} 当在node端调用时，将返回一个对象{ styleStr, templateStr, jsStr }，表示菜单的html+css+js . 在浏览器调用时将会把菜单直接写入到页面上
  * */
```