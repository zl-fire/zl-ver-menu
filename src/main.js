import creatVerMenu from "./creatVerMenu";
import data from "./testData";

/**
  * 作用与目的：调用creatVerMenu函数得到正在的菜单DOM
  * @parObj: 参数对象
  *  parObj.data {Object[]} 构建菜单的对象数组数据
  *  parObj.menuClassName {String} 构建菜单的元素class
  *  parObj.callback {function} 点击具体的菜单项后要执行的函数（par默认会传入点击的节点）
  *  parObj.show {boolean} 默认全部展开还是全部收缩，默认我true.全部展开
  * */
export default function getRealDom(parObj = {
    data: data,
    menuClassName: "zl-ver-menu",
    callback: function (par) { console.log(par) },
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
        `)
    }
    // 允许用户不传递任何参数 或者 只传递部分参数属性进入
    if (!parObj.menuClassName) {
        parObj.menuClassName = "zl-ver-menu";
    }
    if (!parObj.callback) {
        parObj.callback = function (par) { console.log(par) };
    }
    if (!parObj.show) {
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
                }, 0)

            }
            $(this).on({
                mouseover: function () {
                    $(this).css({ "background-color": "#E9F2FF" });
                },
                mouseout: function () {
                    $(this).css({ "background-color": "transparent" });
                }
            })
        }
    })
    // 给菜单添加点击事件，实现选中效果
    $(`.${parObj.menuClassName} li`).each(function () {
        if (!$(this).children("ul")[0]) {
            $(this).click(function () {
                $(`.${parObj.menuClassName} li`).removeClass("summary-active ");
                $(this).addClass("summary-active ");
                parObj.callback(this);

            })
        }
    })
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
    })
    if (!parObj.show) {
        $(`.${parObj.menuClassName}> ul >li > ul`).hide();
    }
}