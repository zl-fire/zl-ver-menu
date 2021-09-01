import creatVerMenu from "./creatVerMenu";
import datalist from "./testData";

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
export default function getRealDom(parObj) {
    let {
        data = datalist,
        menuClassName = "zl-ver-menu",
        callback = function (par) { console.log(par) },
        show = true,
        width="230px"
    } = parObj;
    //如果是在浏览器
    try {
        window;
        // 先写入全局样式
        if (!$("style." + menuClassName + "-style")[0]) {
            $("head").append(createDefaultStyle(menuClassName,width));
        }
        document.querySelector("." + menuClassName).innerHTML = creatVerMenu(data);
        //设置垂直菜单的鼠标事件
        var i = 0;
        $("." + menuClassName + " li").each(function () {
            var _this = this;

            if (!$(this).children("ul")[0]) {
                // 当没有给定任何锚点时，打开就选中第一个
                if (i == 0 && location.hash == "") {
                    i++;
                    setTimeout(function () {
                        $(_this).click();
                        $(_this).addClass("summary-active ");
                    }, 0);
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
        let templateStr = "<section class='" + menuClassName + "'>" + creatVerMenu(data) + "</section>";
        //样式字符串
        let styleStr = createDefaultStyle(menuClassName,width);
        //逻辑字符串
        let jsStr = bindScript(menuClassName, show, callback);
        return { styleStr, templateStr, jsStr };
    }
}

// 获取样式字符串
function createDefaultStyle(menuClassName,width) {
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
        font-size: 12px;
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
        color: #191f25;
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
function bindScript(menuClassName, show, callback) {
    menuClassName = "'" + menuClassName + "'";
    return `
<script>
let callback=${callback};
//设置垂直菜单的鼠标事件
var i = 0;
$("." + ${menuClassName} + " li").each(function () {
    var _this = this;

    if (!$(this).children("ul")[0]) {
        // 当没有给定任何锚点时，打开就选中第一个
        if (i == 0 && location.hash == "") {
            i++;
            setTimeout(function () {
                $(_this).click();
                $(_this).addClass("summary-active ");
            }, 0);
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