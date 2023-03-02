import { FC, useEffect, useRef, useState } from "react";
import { FolderTwoTone } from "@ant-design/icons";
import styles from "./styles.module.css";
import img1 from "../../resource/朱利安.jpg";
import img2 from "../../resource/树壁纸.jpg";

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
 * @param {} yy
 * @returns
 */
function File_div(yy) {
  return (
    <div>
      <FolderTwoTone
        style={{
          fontSize: "7em",
        }}
      />
    </div>
  );
}

export default File = (props) => {
  const fileList = [""];
  const getData = () => {
    for (let i = 0; i < 30; i++) {
        fileList.push("");
    }
  };
  getData();
  const onScroll = (e) => {
      // 网页滚动高度
      const scrollTopHeight =
        document.body.scrollTop || document.documentElement.scrollTop;
      const showHeight = window.innerHeight;  // 文档显示区域的高度
      const allHeight = document.body.scrollHeight;  // 所有内容的高度
      // 判断内容盒子的高度+滚动条的scrollTop = 盒子内容的高度即为触底
      if (allHeight - 66 < scrollTopHeight + showHeight) {
        console.log("触底:");
        // getData();
      }
  };
  // 全局监听滚动事件
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      // 销毁监听
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className={styles["file-wrapper"]}>
      {fileList.map((item, index) => {
        return <File_div className="file_div" key={index} />;
      })}
      {/* <File_div className='file_all_div'/> */}
      {/* <Image_div r={img1} className='file_all_div' /> */}
      {/* <Image_div r={img2} className='file_all_div' /> */}
    </div>
  );
};
