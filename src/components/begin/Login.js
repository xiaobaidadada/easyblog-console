// import { useMediaQuery } from "@mui/material";//判断界面的大小
// import Button from '@mui/material/Button';
// import { Login as log_in } from "@mui/icons-material";
// import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert, Input } from "antd";
import styles from "./styles.module.css";
import { HandleFetch } from "../../utils/fetch";

// 登录组件
function Login(props) {
  const navigate = useNavigate();
  const [errProps, setErrProps] = useState({
    type: "error",
    msg: "请检查数据",
  }); // 提示信息
  const [showErrMsg, setShowErrMsg] = useState(false); // 显示提示
  const [loading, setLoading] = useState(false); // 显示加载状态
  const [shouldRedirect, setShouldRedirect] = useState(false); // 是否开始延迟跳转

  // 延迟跳转
  const DelayRedirect = () => {
    useEffect(() => {
      const intervalId = setInterval(() => {
        navigate("essay");
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
    return <></>;
  };

  // 关闭警告提示
  const handleClose = () => {
    setShowErrMsg(false);
  };

  // 提交登录
  const onFinish = async (formData) => {
    setLoading(true);
    try {
      // // TODO 正式代码，暂时注释
      // // @params {object} formData { username: "aaa", password: "222222" };
      // const res = await HandleFetch("/login", "POST", formData);


      // TODO 测试效果，调接口后删除【*** start ****】
      const res = { msg: "999", token: "dddddddd", account: formData.username };
      AsyncStorage.setItem("EasyBlog_Token", res && res.token);
      AsyncStorage.setItem("EasyBlog_Account", res && res.account);
      setErrProps({ type: "success", msg: "登录成功！" });
      setShouldRedirect(true);
      // 【************ end *********】

      
      if (res.code >= 400) {
        // 异常
        throw new Error(res.msg);
      } else {
        // 本地缓存token和账号account
        AsyncStorage.setItem("EasyBlog_Token", res && res.token);
        AsyncStorage.setItem("EasyBlog_Account", res && res.account);
        // 登录成功提示
        setErrProps({ type: "success", msg: "登录成功！" });
        setShowErrMsg(true);
        // 跳转页面
        setShouldRedirect(true);
      }
    } catch (err) {
      setErrProps({
        type: "error",
        msg: (err && err.toString()) || "请检查数据",
      });
      setShowErrMsg(true);
    } finally {
      // 加载
      setLoading(false);
    }
  };

  // 提交登录失败
  const onFinishFailed = (err) => {
    setErrProps({ type: "error", msg: "请检查数据" });
    setShowErrMsg(true);
  };

  return (
    <div className={styles["login-wrapper"]}>
      {shouldRedirect && <DelayRedirect />}
      <Form
        name="searchForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
            {
              min: 6,
              message: "请输入不少于6位的密码",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className={styles["btn-box"]}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>

      {showErrMsg && (
        <Alert
          style={{
            minWidth: "180px",
            position: "absolute",
            top: "20px",
          }}
          message={errProps.msg}
          type={errProps.type}
          afterClose={handleClose}
          banner
          closable
        />
      )}
    </div>
  );
}

export default Login;
