// import React, { FC, useEffect, useRef, useState } from "react";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { FolderTwoTone } from "@ant-design/icons";
import styles from "./styles.module.css";
import img1 from "../../resource/朱利安.jpg";
import img2 from "../../resource/树壁纸.jpg";

// 触底分页加载
function LoadMore(props) {
  // 文件等级
  const { fileLevel, setFileLevel } = props;
  const limit = 10;
  const currentPage = useRef(1);
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchData();
  }, [isFetching]);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${currentPage.current}`
      );
      const result = await response.json();
      setData((PrevData) => [...PrevData, ...result]);
      setIsFetching(false);
      console.log(`current page: ${currentPage.current}`);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const handleScroll = useCallback(() => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight && !isFetching) {
      currentPage.current++;
      setIsFetching(true);
    }
  }, [isFetching]);

  const fileClick = (id) => {
    if (fileLevel === 1) {
      console.log("fileLevel=1, id=", id);
      setFileLevel(2);
    }
    console.log("fileLevel=2");
  };
  return (
    <>
      {data.map(({ id, title, body }, index) => (
        <div key={index} onClick={() => fileClick(id)}>
          {fileLevel === 1 && <FileBox key={id} title={title} />}
          {fileLevel === 2 && <img className={styles.img} src={img1} />}
        </div>
      ))}
      {isFetching && <div className={styles.loading}>Loading...</div>}
    </>
  );
}

/**
 * 图片组件
 * @param {*} ww
 * @returns
 */
function Image_div(ww) {
  return (
    <div className={ww.className}>
      <img src={ww.r} className="file_image_div" />
    </div>
  );
}

/**
 * 文件组件
 * @param {} title
 * @returns
 */
function FileBox(props) {
  return (
    <div className={styles["file-box"]} onClick={() => props.onClick}>
      <FolderTwoTone
        style={{
          fontSize: "7em",
        }}
      />
      {props.title.slice(0, 5)}
    </div>
  );
}

export default File = (props) => {
  // 文件级别: 1-文件夹 2-图片
  const [fileLevel, setFileLevel] = useState(1);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a onClick={()=>setFileLevel(1)}>文件</a>
        </Breadcrumb.Item>
        {fileLevel === 2 && <Breadcrumb.Item>test文件夹</Breadcrumb.Item>}
      </Breadcrumb>
      <div className={styles["file-wrapper"]}>
        <LoadMore fileLevel={fileLevel} setFileLevel={setFileLevel}></LoadMore>
      </div>
    </>
  );
};
