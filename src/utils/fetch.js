// import qs from 'qs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "./api";


async function fetchExample(url = "", method = "GET", data = {}) {
  // Default options are marked with *
  const config = {
    method,
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
  if (method === "POST") {
    config.body = JSON.stringify(data);
  }
  if (method === "GET") {
    let dataStr = "";
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });
    if (dataStr !== "") {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
  }
  const response = await fetch(BaseUrl + url, config);
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function HandleFetch(
  url = "",
  method = "GET",
  data = {},
  resType = "JSON"
) {
  const userToken = await AsyncStorage.getItem("EasyBlog_Token");
  const auth = userToken ? { Authorization: `Bearer ${userToken}` } : {};
  method = method.toUpperCase();
  resType = method.toUpperCase();

  let requestConfig = {
    method,
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      ...auth,
    },
    mode: "cors",
    cache: "default",
  };

  if (method == "GET") {
    let dataStr = "";
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });
    if (dataStr !== "") {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
  }

  if (method == "POST") {
    Object.defineProperty(requestConfig, "body", {
      value: JSON.stringify(data),
    });
  }

  // 请求
  let responseJson;
  try {
    const response = await fetch(BaseUrl + url, requestConfig);

    // 认证失败：登录超时，或账号被禁用
    if (response.status == "401") {
      throw new Error("unauthorized");
    }

    if (resType === "TEXT") {
      responseJson = await response.text();
    } else {
      responseJson = await response.json();
    }
  } catch (err) {
    console.log("获取http数据失败", err);
    throw new Error(err);
  }

  return responseJson;
}
