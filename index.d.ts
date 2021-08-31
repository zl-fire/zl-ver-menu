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
 export default function getRealDom(parObj: {
  data: object[];
  menuClassName: string;
  width: string;
  callback: Function;
  show: boolean;
}): object | any;
