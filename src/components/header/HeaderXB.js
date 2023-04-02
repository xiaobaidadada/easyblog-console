import './header.css'
import status, {edit_type} from '../config/config.js'
import { Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import { asy_post_by_json ,asy_post_by_formData} from '../config/requests'
import {useNavigate} from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

/**
 * 登录状态组件
 * @param {} yy
 * @returns
 */
function Out(yy) {

    const navigate = useNavigate();

    function logout(){
        asy_post_by_json('admin/logout', '', {
        }, (data) => {
            if(data.code == '成功'){
                //token置空
                localStorage.setItem("Token","")
                navigate("/login")
                message.success('upload successfully.');
                // console.log('成功')
            }

        }, navigate)
    }

    return (
        <div>
            <Button  onClick={()=>{logout();}}>退出登录</Button>
        </div>)
}

//保存发送按钮
function update_data(navigate){
    console.log('触发')
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
           if(data.code == '成功'){
               message.success('upload successfully.');
               // console.log('成功')
           }
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
            if(data.code == '成功'){
                message.success('upload successfully.');
                // console.log('成功')
            }
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
            if(data.code == '成功'){
                message.success('upload successfully.');
                // console.log('成功')
            }
        },navigate)
    }
    else if(edit.type === edit_type.comment.type){
        asy_post_by_json('comment/update','',{
            id:data.id,
            context:edit.context,
        },(data)=>{
            if(data.code == '成功'){
                message.success('upload successfully.');
                // console.log('成功')
            }
        },navigate)
    }

}

/**
 * 新建保存函数
 * @param navigate
 */
function new_data(navigate){
    let edit = localStorage.getItem('edit');
    edit = JSON.parse(edit);
    if(edit.type === "essay"){
        asy_post_by_json('essay/save','',{
            id:-1,
            title:edit.input,
            context:edit.context
        },(data)=>{
            if(data.code == '成功'){
                message.success('upload successfully.');
                // console.log('成功')
            }
        },navigate)
    }
    else if(edit.type === edit_type.css_index.type || edit.type === edit_type.css_blog.type ){
        asy_post_by_json('plug/css/save','',{
            id:-1,
            name:edit.input,
            context:edit.context,
            on_off:1,
            type:edit.type === edit_type.css_index.type?1:2
        },(data)=>{
            if(data.code == '成功'){
                message.success('upload successfully.');
                // console.log('成功')
            }
        },navigate)
    }
    else if(edit.type === edit_type.js_blog.type || edit.type === edit_type.js_index.type){
        asy_post_by_json('plug/js/save','',{
            id:-1,
            name:edit.input,
            context:edit.context,
            on_off:1,//1是默认关闭
            type:edit.type === edit_type.js_blog.type?2:1
        },(data)=>{
            if(data.code == '成功'){
                message.success('upload successfully.');
                // console.log('成功')
            }
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
            <Button onClick={()=>{update_data(navigate)}}>确定修改</Button>
        </div>)
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
    const navigate = useNavigate();

    //判断标识 //1是文章 2：js首页插件 3：js博客插件 4：css首页插件 5：css博客插件
    const [mm, setMm] = useState(1);



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

            <Button  onClick={()=>{new_data(navigate)}}>保存</Button>
        </div>)
}

/**
 * 登录状态组件
 * @param {} yy
 * @returns
 */
function File(yy) {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    //上传文件函数
    function handleUpload  ()  {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files', file);
        });
        setUploading(true);
        asy_post_by_formData('file/upload_images','',{
            body: formData,
        },(data)=>{
            setFileList([]);

            // message.error('upload failed.');
            setUploading(false);
            if(data.code == '成功'){
                message.success('upload successfully.');
                // console.log('成功')
            }
        },navigate)

    };
    const props = {
        onRemove: (file) => {
            //点击删除文件，移除文件中的列表
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            //选择的文件进行添加到这个文件列表
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    return (
        <div className="header_controll">
            {/*{三个点在这里是正常把对象进行解析吧提取元素逐个赋值}*/}
            <Upload {...props}>
                <Button icon={<UploadOutlined />} >选择本地文件</Button>
            </Upload>
            <Button  onClick={handleUpload}>上传</Button>
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
    else if (header_type === "file") {
        Ha = File;
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