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
          return `<li data-menu-id="${item.id}" data-id="${item.eleId}" data-parent-id="${item.parent_id}" ><div class="tit-menu" style="padding-left: ${padding}px" >${icon} <span>${item.name}</span></div>${creatVerMenu(item.children, padding + 20)}</li>`
      }
      //没有孩子节点了
      if (typeof item === "object" && item.children.length === 0) {
          let icon = "";
          if (item.icon) {
              icon = `<i class="${item.icon}"></i>`;
          }
          else {
              icon = `<i class="default"></i>`;
          }
          return `<li data-menu-id="${item.id}" data-id="${item.eleId}" data-parent-id="${item.parent_id}" style="padding-left: ${padding}px"> ${icon} <span>${item.name}</span> </li>`;
      }
  }

  let data=[
      {
          "id": 6,
          "parent_id": 0,
          "name": "李冰有限公司A",
          "eleId":123,
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
          "id": 61,
          "parent_id": 0,
          "name": "好未来科技",
          "eleId":123,
          "children": []
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
    * @description 作用与目的：调用creatVerMenu函数得到真正的菜单DOM
    * @param {object} parObj: 参数对象
    * @param {object[]} parObj.data  构建菜单的对象数组数据
    * @param {string} parObj.menuClassName  构建菜单的元素class
    * @param {string} parObj.width  菜单容器的宽度，默认230px（传参时传入字符串形式，如 400px）
    * @param {function} parObj.callback  点击具体的菜单项后要执行的函数（par默认会传入点击的节点）
    * @param {boolean} parObj.show {boolean} 默认全部展开还是全部收缩，默认为true.全部展开
    * @param {boolean} parObj.defaultSelect {boolean} 默认全部展开全部时（show=true），是否默认选中第一个菜单,默认为true，即选择第一个菜单
    * @return {object|viod} 当在node端调用时，将返回一个对象{ styleStr, templateStr, jsStr }，表示菜单的html+css+js . 在浏览器调用时将会把菜单直接写入到页面上
    * */
  function getRealDom(parObj) {
      let {
          data: data$1 = data,
          menuClassName = "zl-ver-menu",
          callback = function (par) { console.log(par); },
          show = true,
          defaultSelect=true,
          width = "230px"
      } = parObj;
      //如果是在浏览器
      try {
          window;
          // 先写入全局样式
          if (!$("style." + menuClassName + "-style")[0]) {
              $("head").append(createDefaultStyle(menuClassName, width));
          }
          document.querySelector("." + menuClassName).innerHTML = creatVerMenu(data$1);
          //设置垂直菜单的鼠标事件
          var i = 0;
          $("." + menuClassName + " li").each(function () {
              var _this = this;

              if (!$(this).children("ul")[0]) {

                  if (show && defaultSelect) {
                      // 当没有给定任何锚点时，打开就选中第一个
                      if (i == 0 && location.hash == "") {
                          i++;
                          setTimeout(function () {
                              $(_this).click();
                              $(_this).addClass("summary-active ");
                          }, 0);
                      }
                  }

                  $(this).on({
                      mouseover: function mouseover() {
                          $(this).css({ "background-color": "#E9F2FF" });
                      },
                      mouseout: function mouseout() {
                          $(this).css({ "background-color": "transparent" });
                      }
                  });
              }
          });
          // 给菜单添加点击事件，实现选中效果
          $("." + menuClassName + " li").each(function () {
              if (!$(this).children("ul")[0]) {
                  $(this).click(function () {
                      $("." + menuClassName + " li").removeClass("summary-active ");
                      $(this).addClass("summary-active ");
                      callback(this);
                  });
              }
          });
          // 当点击了菜单标题时，展开和搜索图标
          $("." + menuClassName + " .tit-menu").click(function () {
              $(this).parent().children("ul").slideToggle();
              var classv = $(this).find("i").attr("class");
              //这里因为字符串triangle_open包含了字符串triangle，所有顺序要注意下
              if (classv.includes("triangle_open")) {
                  $(this).find("i").removeClass("triangle_open").addClass("triangle"); //关闭
              } else {
                  $(this).find("i").removeClass("triangle").addClass("triangle_open"); //打开
              }
          });
          if (!show) {
              $("." + menuClassName + "> ul >li ul").hide();
              $(".tit-menu i").removeClass("triangle").addClass("triangle_open");
          }
      } catch {
          //模板字符串
          let templateStr = "<section class='" + menuClassName + "'>" + creatVerMenu(data$1) + "</section>";
          //样式字符串
          let styleStr = createDefaultStyle(menuClassName, width);
          //逻辑字符串
          let jsStr = bindScript({menuClassName, show, defaultSelect,callback});
          return { styleStr, templateStr, jsStr };
      }
  }

  // 获取样式字符串
  function createDefaultStyle(menuClassName, width) {
      return `
    <style class="${menuClassName}-style" >
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
    /* 当没有后代菜单时，默认的充填位置样式 */
    .default{
        display: inline-block;
        border: 5px solid transparent;
        border-left: 5px solid #ede4e4;
    }

    /* 菜单选中时的颜色控制 */
    .summary-active {
        background-color: #E9F2FF !important;
        color: #4285f4 !important;
        border-right: 5px solid #4285F4;
    }

    .${menuClassName} {
       /* width: 230px; */
        width: ${width};
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

    .${menuClassName} li {
       /* font-size: 12px; */
         font-size: 14px; 
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #70707a;
        padding-top: 10px;
        padding-bottom: 10px;
        cursor: pointer;
    }

    .${menuClassName} .tit-menu {
        padding-bottom: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
       /* color: #191f25; */
    }

    .${menuClassName} ul {
        padding-left: 0;
    }

    .${menuClassName} ul,
    .${menuClassName} li {
        list-style: none;
    }
</style>
    `;
  }

  // 获取样逻辑符串
  function bindScript({menuClassName, show, defaultSelect,callback}) {
      menuClassName = "'" + menuClassName + "'";
      return `
<script>
var callback=${callback};
//设置垂直菜单的鼠标事件
var i = 0;
$("." + ${menuClassName} + " li").each(function () {
    var _this = this;

    if (!$(this).children("ul")[0]) {
        if (${show} && ${defaultSelect}) {
            // 当没有给定任何锚点时，打开就选中第一个
            if (i == 0 && location.hash == "") {
                i++;
                setTimeout(function () {
                    $(_this).click();
                    $(_this).addClass("summary-active ");
                }, 0);
            }
        }
        $(this).on({
            mouseover: function mouseover() {
                $(this).css({ "background-color": "#E9F2FF" });
            },
            mouseout: function mouseout() {
                $(this).css({ "background-color": "transparent" });
            }
        });
    }
});
// 给菜单添加点击事件，实现选中效果
$("." + ${menuClassName}  + " li").each(function () {
    if (!$(this).children("ul")[0]) {
        $(this).click(function () {
            $("." + ${menuClassName}  + " li").removeClass("summary-active ");
            $(this).addClass("summary-active ");
            callback(this);
        });
    }
});
// 当点击了菜单标题时，展开和搜索图标
$("." + ${menuClassName}  + " .tit-menu").click(function () {
    $(this).parent().children("ul").slideToggle();
    var classv = $(this).find("i").attr("class");
    //这里因为字符串triangle_open包含了字符串triangle，所有顺序要注意下
    if (classv.includes("triangle_open")) {
        $(this).find("i").removeClass("triangle_open").addClass("triangle"); //关闭
    } else {
        $(this).find("i").removeClass("triangle").addClass("triangle_open"); //打开
    }
});
if (!${show}) {
    $("." + ${menuClassName}  + "> ul >li ul").hide();
    $(".tit-menu i").removeClass("triangle").addClass("triangle_open");
}
</script>
`;
  }

  return getRealDom;

})));
