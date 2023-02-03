// import { useMediaQuery } from "@mui/material";//判断界面的大小
import './log.css';
// import Button from '@mui/material/Button';
// import { Login as log_in } from "@mui/icons-material";
// import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';

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
                <h1>Easy Blog</h1>
                <div>
                    账号:<input />
                </div>
                <div>
                密码:<input />
                </div>
                <button style={style} >     登录    </button>
            </div>

        </div>
    );
}

export default Login;


