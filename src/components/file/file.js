import {FolderTwoTone, FileTwoTone, FolderOpenTwoTone} from '@ant-design/icons';
import './file.css'
import img1 from '../../resource/朱利安.jpg';
import img2 from '../../resource/树壁纸.jpg';
import asy_get from "../config/requests";
import {useEffect, useState} from "react";
import status from "../config/config";
import {useNavigate} from "react-router-dom";


/**
 * 图片组件
 * @param {*} ww
 * @returns
 */
function Image_div(ww) {
    return (
        <div className={ww.className}>

            <img src={status.host+ww.item.url} className='file_image_div'/>

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
            <FolderOpenTwoTone style={
                {
                    fontSize: '7em'
                }
            } onClick={() => {
                yy.getinfo(yy.item.url)
            }}/>
            <div style={{
                overflow: "hidden"
            }}>
                {yy.item.name}
            </div>

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
            <FileTwoTone style={
                {
                    fontSize: '7em'
                }
            } onClick={() => {
                yy.getinfo(yy.item.url)
            }}/>
            <div style={{
                overflow: "hidden"
            }}>
                {yy.item.name}
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


    //获取信息
    function getinfo(url) {

        asy_get(url != undefined && url != null ? url : "file/get_file_info",
            null, data => {

                if (data.code == "未知") alert("请求出错")
                else {

                    let rein = data.data;
                    setFile_info(rein)
                    // console.log(file_info)

                }
            },navigate);
    }


    //组件挂载加载
    useEffect(() => {
        getinfo();

    }, []);// 仅在 []内变量  发生变化时，重新订阅


    function for_xr(data) {
        // console.log(data)
        return data.map((item) => {
            if (item.file_type === 1) {
                let name_type = item.name.split('.').slice(-1);
                console.log(name_type)
                if (name_type == 'jpg' ||
                    name_type == 'png' ||
                    name_type == 'webp' ||
                    name_type == 'svg' ||
                    name_type == 'PNG'
                ) {
                    return <Image_div item={item} className='file_all_div'/>;
                } else {
                    return <File_div style={
                        {
                            fontSize: '7em'
                        }
                    }  item={item} />;
                }


            } else if (item.file_type === 2)
                return <Folder_div item={item} getinfo={getinfo} className='file_all_div'/>;

        })
    }

    return (
        <div id='file'>
            {for_xr(file_info)}
        </div>

    );
}