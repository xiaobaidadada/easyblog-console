import './header.css'
import status, {edit_type} from '../config/config.js'
import { Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import asy_get, { asy_post_by_json ,asy_post_by_formData} from '../config/requests'
import {useNavigate} from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload,Select } from 'antd';

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
           context:edit.context,
           type_id:edit.type_id
       },(data)=>{
           if(data.code == '成功'){
               message.success('successfully.');
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
                message.success(' successfully.');
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
                message.success(' successfully.');
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
                message.success(' successfully.');
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
    const [essay_status, setEssayStatus] = useState(false);
    const [essay_type,setEssaytype]=useState([
        {
            value: 0,
            label: 'Jack',
        },
        // {
        //     value: 'lucy',
        //     label: 'Lucy',
        // },
        // {
        //     value: 'Yiminghe',
        //     label: 'yiminghe',
        // },
        // {
        //     value: 'disabled',
        //     label: 'Disabled',
        //     disabled: true,
        // },
    ])
    //全部类型，用这个做实时改变
    let essay_type_0 = 0;

    //获取全部文章类型
    function get_essay_type(){
        asy_get("essay/type", "", data => {

            if (data.code == "未知") alert("请求出错")
            else {
                let rein = data.data;
                let list = []
                // console.log(rein)
                for(let v in rein){
                    // console.log(v)
                    list.push({
                        value: rein[v].id,
                        label: rein[v].type_name,
                    })
                }
                setEssaytype(list);
                //设置一下默认值
                essay_type_0 = 0;
            }
        },navigate);
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
            //获取一下全部的文章
            get_essay_type()
           setEssayStatus(true)
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
            //取消多余文章类型显示
            setEssayStatus(false)
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

            //取消多余文章类型显示
            setEssayStatus(false)
        }
    };


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
                context:edit.context,
                type:essay_type_0
            },(data)=>{
                if(data.code == '成功'){
                    message.success(' successfully.');
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
                    message.success(' successfully.');
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
                    message.success(' successfully.');
                    // console.log('成功')
                }
            },navigate)
        }

    }

    //文章类型选择
    const essay_type_change = (value) => {
        essay_type_0 = value;
        // console.log(`selected ${value}`);
    };


    return (
        <div>
            {/* <button>取消</button> */}
            {/*符号显示条件才会显示*/}
            { essay_status &&
                <Select
                    defaultValue="lucy"
                    style={{
                        width: 120,
                    }}
                    onChange={essay_type_change}
                    options={essay_type}
                />
            }


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

        let file_path = localStorage.getItem("file_path");
        asy_post_by_formData('file/upload_images',`path=${file_path}`,
            formData
        ,(data)=>{
            setFileList([]);

            // message.error('upload failed.');
            setUploading(false);
            if(data.code == '成功'){
                message.success(' successfully.');
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



//保存发送按钮
function add_blog_type(navigate){
    console.log('触发')
    let edit = localStorage.getItem('edit');
    edit = JSON.parse(edit);

        asy_post_by_json('essay/add_type','',{
            // id:data.id,
            // title:edit.input,
            type_name:edit.context,
            // type_id:edit.type_id
        },(data)=>{
            if(data.code == '成功'){
                message.success('successfully.');
                // console.log('成功')
            }
        },navigate)


}





/**
 * 添加文章类型
 * @param
 * @returns
 */
function Add_blog_type(yy) {
    const navigate = useNavigate();
    return (
        <div>
            <Button>取消</Button>
            <Button onClick={()=>{add_blog_type(navigate)}}>确认添加</Button>
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
    else if(header_type === "add_blog_type"){
        Ha = Add_blog_type;
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