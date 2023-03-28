// import { useMediaQuery } from "@mui/material";//判断界面的大小
import './log.css';
// import Button from '@mui/material/Button';
// import { Login as log_in } from "@mui/icons-material";
// import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';
import { Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import { PassWord } from '@ant-design/icons';
import { Input } from 'antd';

//登录组件

const style = {
    width:"14em",
    marginTop:"1em",
    height:"2.5em"
  };
function Login() {
    // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <div className='log_con'>
            <div>
                <h1 className={'log_center'}>Easy Blog</h1>
                <div>
                    <Input size="large" placeholder="账号" style={style} />
                </div>
                <div>
                    <Input size="large" placeholder="密码" style={style}  />
                </div>
                <div className={'log_center'}>
                    <Button style={style} type="text">     登录    </Button>
                </div>

            </div>

        </div>
    );
}

export default Login;


