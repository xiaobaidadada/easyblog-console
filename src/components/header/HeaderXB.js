import './header.css'
import status from '../config/config.js'
import { Button, Dropdown } from 'antd';
import {asy_post_by_json}  from '../config/requests'

/**
 * 登录状态组件
 * @param {} yy
 * @returns
 */
function Out(yy) {
    return (
        <div>
            <Button>退出登录</Button>
        </div>)
}

/**
 * 编辑器修改状态组件
 * @param {显示保存js or css or 文章} yy
 * @returns
 */
function Update(yy) {
    return (
        <div>
            <Button>取消</Button>
            <Button>确定修改</Button>
        </div>)
}

//保存发送函数
function send_new(){

}

//功能菜单
const items = [
    {
        key: '1',
        label: (
            <div>
                文章
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div>
                JS插件（首页）
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div>
                CSS插件（首页）
            </div>
        ),
    },
    {
        key: '4',
        label: (
            <div>
                JS插件（文章）
            </div>
        ),
    },
    {
        key: '5',
        label: (
            <div>
                CSS插件（文章）
            </div>
        ),
    },
]

/**
 * 直接点击编辑组件
 * @param {}
 * @returns
 */

function Add(props) {

    //点击模式
    const add_f = ({ key }) => {
        // console.log(key)

        if (key == 1) {
            //md_f是父组件给的函数
            props.md_f({
                mode: "markdown",
                input: "输入文章标题"
            })
        } else if (key == 2 || key == 4) {
            props.md_f({
                mode: "javascript",
                input: "输入JS插件名字"
            })
        }
        else if (key == 3 || key == 5) {
            props.md_f({
                mode: "css",
                input: "输入CSS插件名字"
            })
        }
    };

    return (
        <div>
            {/* <button>取消</button> */}
            <Dropdown
                menu={{
                    items,
                    onClick: add_f
                }}
                placement="bottom"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <Button  >模式</Button>
            </Dropdown>

            <Button>保存</Button>
        </div>)
}



export default function HeaderXB(props) {
    let Ha;
    let header_type = props.header_type;
    if (header_type === "index") {
        Ha = null;
    }
    else if (header_type === "update") {
        Ha = Update;
    }
    else if (header_type === "eaitor") {
        Ha = Add;
    }

    return (
        <div id='header'>
            {/*props.header_type*/}
            <div className="header_flag">
                EASYORM
            </div>

            <div className="header_controll">
                {Ha != null &&
                    <Ha md_f={props.md_f} />
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