(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['zl-ver-menu'] = factory());
}(this, (function () { 'use strict';

  /**
    * 作用与目的：通过递归创建垂直菜单
    * @item {Oject/Array} 要遍历递归的对象或者数组
    * @padding {Number} 每个垂直菜单的左padding值
    * @return {HTMLElement} 返回的html的菜单节点
    * */
  function creatVerMenu(item, padding = 20) {
      //如果是对象数组，就调用自身，处理每个元素
      if (item instanceof Array) {
          let flag = true;
          item.forEach((ele) => {
              if (typeof ele !== "object") {
                  flag = false;//说明不是对象数组
              }
          });
          if (flag) { //如果是对象数组，就遍历每一个对象
              let str = "<ul class='index-ver-nav'>";
              item.forEach((ele) => {
                  str += creatVerMenu(ele, padding);
              });
              str = str + "</ul>";
              return str;
          }
      }

      //如果item是对象且具有孩子节点
      if (typeof item === "object" && item.children.length > 0) {
          let icon = "";
          if (item.icon) {
              icon = `<i class="${item.icon}"></i>`;
          } else {
              icon = `<i class="triangle"></i>`;
          }
          return `<li data-menu-id="${item.id}" data-parent-id="${item.parent_id}" ><div class="tit-menu" style="padding-left: ${padding}px" >${icon} <span>${item.name}</span></div>${creatVerMenu(item.children, padding + 20)}</li>`
      }
      //没有孩子节点了
      if (typeof item === "object" && item.children.length === 0) {
          let icon = "";
          if (item.icon) {
              icon = `<i class="${item.icon}"></i>`;
          }
          return `<li sto_id="${item.id}" style="padding-left: ${padding}px"> ${icon} <span>${item.name}</span> </li>`;
      }
  }

  let data=[
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
      },
      {
          "id": 6,
          "parent_id": 0,
          "name": "李冰有限公司B",
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
      },
      {
          "id": 13,
          "parent_id": 0,
          "name": "李冰有限公司C",
          "children": [
              {
                  "id": 7,
                  "parent_id": 6,
                  "name": "财务部",
                  "children": [
                      {
                          "id": 92,
                          "parent_id": 92,
                          "name": "U城天街店",
                          "children": []
                      }
                  ]
              },
              {
                  "id": 108,
                  "parent_id": 6,
                  "name": "第二个部门",
                  "children": []
              }
          ]
      },
      {
          "id": 92,
          "parent_id": 47,
          "name": "海豹战区",
          "children": [
              {
                  "id": 93,
                  "parent_id": 92,
                  "name": "U城天街店",
                  "children": []
              }
          ]
      }
  ];

  /**
    * 作用与目的：调用creatVerMenu函数得到正在的菜单DOM
    * @parObj: 参数对象
    *  parObj.data {Object[]} 构建菜单的对象数组数据
    *  parObj.menuClassName {String} 构建菜单的元素class
    *  parObj.callback {function} 点击具体的菜单项后要执行的函数（par默认会传入点击的节点）
    *  parObj.show {boolean} 默认全部展开还是全部收缩，默认我true.全部展开
    * */
  function getRealDom(parObj = {
      data: data,
      menuClassName: "zl-ver-menu",
      callback: function (par) { console.log(par); },
      show: true
  }) {
      // 先写入全局样式
      if (!$(`style.${parObj.menuClassName}-style`)[0]) {
          $("head").append(`
        <style class="${parObj.menuClassName}-style" >
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        /* 菜单收缩的三角形(默认) */
        .triangle {
            display: inline-block;
            border: 5px solid transparent;
            border-top: 5px solid #191F25;
        }

        /* 菜单展开的三角形 */
        .triangle_open {
            display: inline-block;
            border: 5px solid transparent;
            border-left: 5px solid #191F25;
        }

        /* 菜单选中时的颜色控制 */
        .summary-active {
            background-color: #E9F2FF !important;
            color: #4285f4 !important;
            border-right: 5px solid #4285F4;
        }

        .${parObj.menuClassName} {
            width: 230px;
            background: #fff;
            border: 1px solid #e7e7e9;
            border-top-width: 0px;
            border-bottom-width: 0px;
            overflow-y: auto;
            overflow-x: hidden;
            font-size: 16px;
            display: inline-block;
            height: 100%;
            vertical-align: top;
        }

        .${parObj.menuClassName} li {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #70707a;
            padding-top: 10px;
            padding-bottom: 10px;
            cursor: pointer;
        }

        .${parObj.menuClassName} .tit-menu {
            padding-bottom: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #191f25;
        }

        .${parObj.menuClassName} ul {
            padding-left: 0;
        }

        .${parObj.menuClassName} ul,
        .${parObj.menuClassName} li {
            list-style: none;
        }
    </style>
        `);
      }
      // 允许用户不传递任何参数 或者 只传递部分参数属性进入
      if (!parObj.menuClassName) {
          parObj.menuClassName = "zl-ver-menu";
      }
      if (!parObj.callback) {
          parObj.callback = function (par) { console.log(par); };
      }
      if (parObj.show==undefined) {
          parObj.show = true;
      }
      if (!parObj.data) {
          parObj.data = data;
      }
      document.querySelector(`.${parObj.menuClassName}`).innerHTML = creatVerMenu(parObj.data);
      //设置垂直菜单的鼠标事件
      let i = 0;
      $(`.${parObj.menuClassName} li`).each(function () {
          if (!$(this).children("ul")[0]) {
              if (i == 0) {
                  i++;
                  setTimeout(() => {
                      $(this).click();
                      $(this).addClass("summary-active ");
                  }, 0);

              }
              $(this).on({
                  mouseover: function () {
                      $(this).css({ "background-color": "#E9F2FF" });
                  },
                  mouseout: function () {
                      $(this).css({ "background-color": "transparent" });
                  }
              });
          }
      });
      // 给菜单添加点击事件，实现选中效果
      $(`.${parObj.menuClassName} li`).each(function () {
          if (!$(this).children("ul")[0]) {
              $(this).click(function () {
                  $(`.${parObj.menuClassName} li`).removeClass("summary-active ");
                  $(this).addClass("summary-active ");
                  parObj.callback(this);

              });
          }
      });
      // 当点击了菜单标题时，展开和搜索图标
      $(`.${parObj.menuClassName} .tit-menu`).click(function () {
          $(this).parent().children("ul").slideToggle();
          let classv = $(this).find("i").attr("class");
          //这里因为字符串triangle_open包含了字符串triangle，所有顺序要注意下
          if (classv.includes("triangle_open")) {
              $(this).find("i").removeClass("triangle_open").addClass("triangle");
          } else {
              $(this).find("i").removeClass("triangle").addClass("triangle_open");
          }
      });
      if (!parObj.show) {
          $(`.${parObj.menuClassName}> ul >li > ul`).hide();
      }
  }

  return getRealDom;

})));
