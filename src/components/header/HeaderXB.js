import './header.css'
import status from '../config/config.js'

/**
 * 登录状态组件
 * @param {} yy
 * @returns
 */
function Out(yy) {
    return (
        <div>
            <button>退出登录</button>
        </div>)
}

/**
 * 编辑器修改状态
 * @param {显示保存js or css or 文章} yy
 * @returns
 */
function Update(yy) {
    return (
        <div>
            <button>取消</button>
            <button>确定修改{yy.name}</button>
        </div>)
}

/**
 * 直接点击编辑
 * @param {}
 * @returns
 */
function Add() {
    return (
        <div>
            <button>取消</button>
            <button>保存为css插件</button>
            <button>保存为js插件</button>
            <button>保存为文章</button>
        </div>)
}

export default function HeaderXB(props) {
    let Ha;
    let header_type=props.header_type;
    if ( header_type === "index") {
        Ha = null;
    }
    else if(header_type === "update"){
        Ha = Update;
    }
    else if(header_type === "Add"){
        Ha = Add;
    }

    return (
        <div id='header'>

            <div className="header_flag">
                EASYORM
            </div>

            <div className="header_controll">
                {Ha !=null &&
                    <Ha  />
                }
            </div>

            <div className="header_controll">
                {status.if_login &&
                    <Out />
                }
            </div>

        </div>

    );
}