import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Button, Form, Input, Alert } from "antd";
import styles from "./styles.module.css";

// 表单
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  style: { maxWidth: 600 },
  initialValues: { remember: true },
};

// 表单尾部-按钮
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// 获取账号数据(缓存)
const AccountData = async (setAccount) => {
  const acc = await AsyncStorage.getItem("EasyBlog_Account");
  setAccount(acc);
};

// 修改密码
const InputPwd = ({ setMode, setErrProps, setShowErrMsg, setShouldNext }) => {
   // mode 模式 1-显示账号 2-注册
  const [loading, setLoading] = useState(false); // 显示加载状态
  const [form] = Form.useForm(); // 表单

  // 提交表单
  const onFinish = async (formData) => {
    console.log("success:", formData);
    // async () => {
    setLoading(true);
    try {
      // TODO 正式代码，暂时注释
      // const res = await HandleFetch("/login", "POST", formData);

      // TODO 测试效果，调接口后删除【****** start *******】
      const res = { msg: 9 };
      setErrProps({ type: "success", msg: "修改成功！" });
      setShowErrMsg(true);
      // 【************* end ************】

      if (res.code >= 400) {
        // 异常
        throw new Error(res.msg);
      } else {
        // 登录成功提示
        setErrProps({ type: "success", msg: "修改成功！" });
        setShowErrMsg(true);
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
      // 开始去除提示
      setShouldNext(true);
      // 跳转组件
      setMode(1);
    }
    // };
  };
  // 提交表单失败
  const onFinishFailed = (err) => {
    console.log("fail:", err);
  };
  // 校验第二次输入的密码
  const validatePassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码不一致！");
    } else {
      callback();
    }
  };

  return (
    <>
      <Form
        {...layout}
        name="form"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="新密码"
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
        <Form.Item
          label="再次输入密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "请再次输入密码",
            },
            { validator: validatePassword },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            确定
          </Button>
          <Button className={styles.cancel} onClick={() => setMode(1)}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

// 默认
const Setting = (props) => {
  const [account, setAccount] = useState("");
  const [mode, setMode] = useState(1); // 模式: 1-展示账号 2-修改密码
  const [errProps, setErrProps] = useState({
    type: "error",
    msg: "请检查数据",
  }); // 提示信息
  const [showErrMsg, setShowErrMsg] = useState(false); // 显示提示
  const [shouldNext, setShouldNext] = useState(false); // 是否开始延迟跳转

  AccountData(setAccount); // 获取账号数据

  // 延迟去除提示
  const DelayNext = () => {
    useEffect(() => {
      const intervalId = setInterval(() => {
        setShowErrMsg(false);
      }, 1500);
      return () => clearInterval(intervalId);
    }, []);
    return <></>;
  };

  // 关闭警告提示
  const handleClose = () => {
    setShowErrMsg(false);
  };

  return (
    <div className={styles.setting}>
      {mode === 1 && (
        <>
          <div className={styles.info}>
            <span>当前账号</span>
            <span>{account}</span>
          </div>
          <Button type="primary" onClick={()=>setMode(2)}>
            修改密码
          </Button>
        </>
      )}
      {mode === 2 && (
        <InputPwd
          setMode={setMode}
          setErrProps={setErrProps}
          setShowErrMsg={setShowErrMsg}
          setShouldNext={setShouldNext}
        ></InputPwd>
      )}

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
        // 延迟跳转
      )}
      {shouldNext && <DelayNext />}
    </div>
  );
};
export default Setting;
