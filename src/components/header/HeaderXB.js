import './header.css'
import status, {edit_type} from '../config/config.js'
import { Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import { asy_post_by_json } from '../config/requests'
import {useNavigate} from "react-router-dom";

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

//保存发送按钮
function update_data(navigate){
    console.log(1)
    let edit = localStorage.getItem('edit');
    let data = localStorage.getItem("data");
    data = JSON.parse(data)
    edit = JSON.parse(edit);
    if(edit.type === "essay"){
       asy_post_by_json('essay/save','',{
           id:data.id,
           title:edit.input,
           context:edit.context
       },(data)=>{

       },navigate)
    }
    else if(edit.type === edit_type.css_index.type || edit.type === edit_type.css_blog.type ){
        asy_post_by_json('plug/css/save','',{
            id:data.id,
            name:edit.input,
            context:edit.context,
            on_off:data.on_off,
            type:data.type
        },(data)=>{

        },navigate)
    }
    else if(edit.type === edit_type.js_blog.type || edit.type === edit_type.js_index.type){
        asy_post_by_json('plug/js/save','',{
            id:data.id,
            name:edit.input,
            context:edit.context,
            on_off:data.on_off,
            type:data.type
        },(data)=>{

        },navigate)
    }
    else if(edit.type === edit_type.comment.type){
        asy_post_by_json('comment/update','',{
            id:data.id,
            context:edit.context,
        },(data)=>{

        },navigate)
    }

}

/**
 * 编辑器修改状态组件
 * @param {显示保存js or css or 文章} yy
 * @returns
 */
function Update(yy) {
    const navigate = useNavigate();
    return (
        <div>
            <Button>取消</Button>
            <Button onClick={update_data(navigate)}>确定修改</Button>
        </div>)
}



//保存发送更新函数
function send_update() {

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


    //判断标识 //1是文章 2：js首页插件 3：js博客插件 4：css首页插件 5：css博客插件
    const [mm, setMm] = useState(1);

    //保存发送函数
    function send_new() {
                
    }

    //点击模式
    const add_f = ({ key }) => {
        // console.log(key)
        //设置发送状态
        setMm(key)

        if (key == 1) {
            //md_f是父组件给的函数
            props.md_f({
                mode: "markdown",
                input: "输入文章标题",
                type:'essay'
            })
            let edit = localStorage.getItem('edit')
            edit = JSON.parse(edit);
            localStorage.setItem('edit', JSON.stringify({
                type: 'essay',
                mode: "markdown",
                input: edit.name,
                context: edit.context
            }));

           
        } else if (key == 2 || key == 4) {
            props.md_f({
                mode: "javascript",
                input: "输入JS插件名字",
                type:key==2?'js_index':'js_blog'
            })

            let edit = localStorage.getItem('edit')
            edit = JSON.parse(edit);
            localStorage.setItem('edit', JSON.stringify({
                type: key==2?'js_index':'js_blog',
                mode: "javascript",
                input: edit.name,
                context: edit.context
            }));
        }
        else if (key == 3 || key == 5) {
            props.md_f({
                mode: "css",
                input: "输入CSS插件名字",
                type:key==3?'css_index':'css_blog'
            })

            let edit = localStorage.getItem('edit')
            edit = JSON.parse(edit);
            localStorage.setItem('edit', JSON.stringify({
                type: key==3?'css_index':'css_blog',
                mode: "javascript",
                input: edit.name,
                context: edit.context
            }));
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