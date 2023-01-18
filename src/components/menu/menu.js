import { useMediaQuery } from "@mui/material";//判断界面的大小

//菜单组件

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
                    <TextField id="standard-basic" label="账号" variant="standard"  />
                </div>
                <div>
                    <TextField id="standard-basic" label="密码" variant="standard" type="password"  />
                </div>
                <Button variant="contained"  style={style} >     登录    </Button>
            </div>

        </div>
    );
}

export default Login;


