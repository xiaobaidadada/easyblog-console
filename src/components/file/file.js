import {FolderTwoTone, FileTwoTone, FolderOpenTwoTone, RightOutlined, HomeOutlined} from '@ant-design/icons';
import './file.css'
import asy_get from "../config/requests";
import {useEffect, useState} from "react";
import status from "../config/config";
import {useNavigate} from "react-router-dom";
import {Image} from 'antd';

/**
 * 基础块组件
 * @param propos
 * @constructor
 */
function Base_file(propos) {

    return (
        <div id={"file_base"}>
            <div id={"file_base_left"}>
                {/*<Image*/}

                {/*    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"*/}
                {/*/>*/}
                {propos.Left}
            </div>

            <div id={"file_base_right"}>
                {propos.name}
            </div>
        </div>
    )
}

/**
 * 图片组件
 * @param {*} ww
 * @returns
 */
function Image_div(ww) {
    return (
        <div>

            <Image

                src={status.host + ww.url}
            />
            {/*<img src= className='file_image_div'/>*/}

        </div>)
}

/**
 * 文件夹组件
 * @param {} yy
 * @returns
 */
function Folder_div(yy) {
    return (
        <div>
            <FolderOpenTwoTone onClick={() => {
                yy.getinfo(yy.name, yy.url, yy.set_bread)
            }}
                               style={
                                   {
                                       fontSize: '3em'
                                   }
                               }
            />

        </div>)
}


/**
 * 普通文件组件
 * @param {} yy
 * @returns
 */
function File_div(yy) {
    return (
        <div>
            <FileTwoTone onClick={() => {
                yy.getinfo(yy.url)
            }} style={
                {
                    fontSize: '3em'
                }
            }/>
            <div style={{
                overflow: "hidden"
            }}>
            </div>

        </div>)
}


export default function File(props) {
    const navigate = useNavigate();

    const [file_info, setFile_info] = useState(
        [
            {
                file_type: 1,//1 是文件 2是文件夹
                name: "复数2.jpg", //文件或者文件夹的名字
                url: "http://localhost:666/file_public/show?file_name=复数2.jpg" //访问文件或者文件夹信息的地址
            }
        ]
    );
    const [bread_items, setBread_hand] = useState(
        [
            // {url:"1",
            //     name:"kk"},
            // {url:"2",
            //     name:"ll"},
            // {url:"2",
            //     name:"ll"}
        ]
    )

    //面包屑处理函数
    function bread_hand(url) {


        getinfo(null,url,null);


        //删除元素
        let linshi = null;
        do { linshi = bread_items.pop();}
        while (linshi.url !==url);
        bread_items.push(linshi);

        //设置本地上传数据的的地址todo 点击新的文件夹不会触发
        let file_name="";
        console.log(bread_items)
        for(let i in bread_items){
            console.log(i)
            if(i!=0){
                file_name+=bread_items[i].name;
            }
        }
        console.log(file_name)
        localStorage.setItem("file_path",file_name);

        setBread_hand(bread_items)
    }

    //设置面包屑回调函数
    function set_bread(dict) {
        let linshi = bread_items;
        linshi.push(dict)
        setBread_hand(linshi)

    }


    //获取信息
    function getinfo(name, url, set_bread) {

        asy_get(url != undefined && url != null ? url : "file/get_file_info",
            null, data => {

                if (data.code == "未知") alert("请求出错")
                else {

                    //设置当前列表的内容
                    let rein = data.data;
                    setFile_info(rein)
                    // console.log(file_info)


                    if(set_bread !=null && set_bread!=undefined){
                        //设置面包屑
                        set_bread({
                            url: url,
                            name: name
                        })
                    }



                }
            }, navigate);
    }


    //组件挂载加载
    useEffect(() => {
        getinfo();
        //加载面包屑
        setBread_hand([{
            url:  "file/get_file_info",
            name:""
        }])

        //初始化本地上传地址
        localStorage.setItem("file_path","")

    }, []);// 仅在 []内变量  发生变化时，重新订阅


    function for_xr(data) {
        // console.log(data)
        return data.map((item) => {
            let left = <File_div item={{url: "", name: "wu"}}/>;

            if (item.file_type === 1) {
                let name_type = item.name.split('.').slice(-1);
                // console.log(name_type)


                if (name_type == 'jpg' ||
                    name_type == 'png' ||
                    name_type == 'webp' ||
                    name_type == 'svg' ||
                    name_type == 'PNG'
                ) {
                    left = <Image_div url={item.url}/>

                } else {
                    left = <File_div style={
                        {
                            fontSize: '7em'
                        }
                    } url={item.url}/>;

                }

            } else if (item.file_type === 2) {
                left = <Folder_div set_bread={set_bread} name={item.name} url={item.url} getinfo={getinfo}/>;
            }
            //最终返回
            return <Base_file Left={left} name={item.name}/>;

        })
    }

    return (
        <div>

            <div>
                <Breadcrumb items={bread_items} hand={bread_hand}/>
            </div>
            <div id='file'>
                {for_xr(file_info)}
            </div>

        </div>

    );
}


/**
 * 面包屑
 * @constructor
 */
function Breadcrumb(props) {


    //显示列表
    let items = props.items;

    //渲染出了一个元素外元素
    function get_other_list() {
        //删除第一个元素
        let linshi_list = [];

        for(let i = 1 ;i<items.length;i++){
            linshi_list.push(items[i])
        }
        return linshi_list.map((linshi_list) => {
            return (<span className={"bread_member"}
                          onClick={() => hand(linshi_list.url)}> <RightOutlined/> {linshi_list.name} </span>)
        });
     }

     //处理函数
    function hand(url){

        //处理另外的事件
      props.hand(url);

    }

    return (
        <div id={"bread"}>
            {(items != null && items != undefined && items.length > 0) &&
                <span className={"bread_member"} onClick={() => hand(items[0].url)}> <HomeOutlined/> </span>}
            {
                (items != null && items != undefined && items.length > 1) &&
                get_other_list()
            }

        </div>
    );
}
