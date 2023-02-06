import { FolderTwoTone } from '@ant-design/icons';
import './file.css'


function image_div() {
    return (
        <div>
            ss
            <img src='https://img9.doubanio.com/view/photo/albumcover/public/p2460567826.webp'/>
        </div>)
}
function file_div() {
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
        <image_div />
    );
}