/**
  * 作用与目的：通过递归创建垂直菜单
  * @item {Oject/Array} 要遍历递归的对象或者数组
  * @padding {Number} 每个垂直菜单的左padding值
  * @return {HTMLElement} 返回的html的菜单节点
  * */
export default function creatVerMenu(item, padding = 20) {
    //如果是对象数组，就调用自身，处理每个元素
    if (item instanceof Array) {
        let flag = true;
        item.forEach((ele) => {
            if (typeof ele !== "object") {
                flag = false;//说明不是对象数组
            }
        })
        if (flag) { //如果是对象数组，就遍历每一个对象
            let str = `
            <ul class='index-ver-nav'>
            `;
            item.forEach((ele) => {
                str += creatVerMenu(ele, padding);
            })
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
            icon = `<i class="${item.icon}"></i>`
        }
        else{
            icon = `<i class="default"></i>`
        }
        return `<li data-menu-id="${item.id}" data-id="${item.eleId}" data-parent-id="${item.parent_id}" style="padding-left: ${padding}px"> ${icon} <span>${item.name}</span> </li>`;
    }
}