// import { useMediaQuery } from "@mui/material";//判断界面的大小
import './log.css';
// import Button from '@mui/material/Button';
// import { Login as log_in } from "@mui/icons-material";
// import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';
import {Button, message, Space} from 'antd';
import {UserOutlined} from '@ant-design/icons';
// import { PassWord } from '@ant-design/icons';
import {Input} from 'antd';
import {asy_post_by_json} from "../config/requests";
import {useNavigate} from "react-router-dom";

//登录组件

const style = {
    width: "14em",
    marginTop: "1em",
    height: "2.5em"
};

function Login() {
    // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    let username="", password="";

    /**
     * 登录函数
     */
    function login() {

        asy_post_by_json('admin/login', '', {
            username: username,
            password: password
        }, (data) => {
            if(data.code == '成功'){
                localStorage.setItem("Token",data.data)
                navigate("/")
                console.log('成功')
            }

        }, navigate)
    }


    function username_change(new_value) {
        username = new_value.target.value;
        // console.log(username)
    }

    function username_password(new_value) {
        password = new_value.target.value;
    }

    return (
        <div className='log_con'>
            <div>
                <h1 className={'log_center'}>Easy Blog</h1>
                <div>
                    <Input size="large" placeholder="账号" style={style} onChange={username_change}/>
                </div>
                <div>
                    <Input size="large" placeholder="密码" style={style} onChange={username_password}/>
                </div>
                <div className={'log_center'}>
                    <Button style={style} type="text" onClick={() => {
                        login();
                    }}> 登录 </Button>
                </div>

            </div>

        </div>
    );
}

export default Login;


