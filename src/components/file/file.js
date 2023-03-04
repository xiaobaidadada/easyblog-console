import { useInView } from "react-intersection-observer";
import { useRef, useCallback, useState, useEffect } from "react";
import { Breadcrumb, Spin, Image } from "antd";
import { FolderTwoTone } from "@ant-design/icons";
import styles from "./styles.module.css";
import img1 from "../../resource/朱利安.jpg";

// 触底分页加载
let current = 0;
let hasMore = true;
function LoadMore(props) {
  // 文件等级
  const { fileLevel, setFileLevel } = props;
  const [data, setData] = useState([]); // 要渲染的数据
  const limit = 10;
  const [isFetching, setIsFetching] = useState(false);
  // 触发监听
  const observerOptions = {
    rootMargin: "0px",
    threshold: [0.75],
  };
  const [ref, inView] = useInView(observerOptions);

  // 获取数据
  const fetchData = async () => {
    hasMore = data.length < 100 && current < 11 && inView;
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    current++;
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${current}`
      );
      const result = await response.json();
      setData((PrevData) => [...PrevData, ...result]);
      console.log(`current page: ${current}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  fetchData();

  // 进入文件夹
  const fileClick = (id) => {
    if (fileLevel === 1) {
      setFileLevel(2);
    }
  };
  return (
    <div
      className={styles["file-wrapper"]}
      onScroll={fetchData}
      style={{ overflowY: "scroll" }}
    >
      {data.map(({ id, title, body }, index) => (
        <div key={index} onClick={() => fileClick(id)}>
          {fileLevel === 1 && <FileBox key={id} title={title} />}
          {fileLevel === 2 && <Image className={styles.img} src={img1} />}
        </div>
      ))}
      {!isFetching && (
        <div className={styles.loading} ref={ref}>
          <Spin size="large" />
        </div>
      )}
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
          <a onClick={() => setFileLevel(1)}>文件</a>
        </Breadcrumb.Item>
        {fileLevel === 2 && <Breadcrumb.Item>test文件夹</Breadcrumb.Item>}
      </Breadcrumb>
      <LoadMore fileLevel={fileLevel} setFileLevel={setFileLevel}></LoadMore>
    </>
  );
};
