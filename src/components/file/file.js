import { FolderTwoTone } from '@ant-design/icons';
import './file.css'
import img1 from '../../resource/朱利安.jpg';
import img2 from '../../resource/树壁纸.jpg';


/**
 * 图片组件
 * @param {*} ww 
 * @returns 
 */
function Image_div(ww) {
    return (
        <div className={ww.className}>
            <img src={ww.r} className='file_image_div'/>
        </div>)
}

/**
 * 文件组件
 * @param {} yy 
 * @returns 
 */
function File_div(yy) {
    return (
        <div>
            <FolderTwoTone style={
                {
                    fontSize: '7em'
                }
            } />
        </div>)
}

export default function File(props) {

    return (
        <div id='file'>
            <File_div className='file_all_div'/>
            <Image_div r={img1} className='file_all_div' />
            <Image_div r={img2} className='file_all_div' />
           
        </div>
       
    );
}