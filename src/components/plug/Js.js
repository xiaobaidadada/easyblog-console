
import {Descriptions, message} from 'antd';
import { Divider } from 'antd';
import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
  Space,
  Table, Tag
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import asy_get, {asy_post_by_json} from '../config/requests'
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";



const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;



function Css(props) {

  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [md, header_f] = useOutletContext();
  /**
   * 分页变量 
   */
  const [page, setPage] = useState(1);//默认是第一页的前面
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(100);
  let type=1;//1是插件首页，2是博客界面
  const navigate = useNavigate();

  //数据源
  const [dataSource, setDataSource] = useState([
    {
      id: '1',
      name: '关于正则表达式',
      time: '2021-01-03',
      action: '哈哈',
      on_off: true,
    },
    {
      id: '2',
      name: 'TCP协议',
      time: '2023-01-03',
      action: '看看',
      on_off: false,
    },
  ]);
  //头部信息
  const [info, setInfo] = useState({
    plug_total: 100,
    using_name: "无",
  });


  //编辑跳转
  function to_edit(record) {

    asy_get("plug/js/get", `id=${record.id}`, data => {

        if (data.code == "未知") alert("请求出错")
        else {
            let rein = data.data;

            let name = rein.name;
            let context = rein.context;


            localStorage.setItem('edit',JSON.stringify( {
                type: type === 1?'js_index':'js_blog',
                mode:'javascript',
                input: name,
                context: context,
                data_id:record.id
            }));
            //用于修改的时候用
            localStorage.setItem("data",JSON.stringify({
                id:record.id,
                on_off:record.on_off?0:1,
                type:record.type
            }))
            header_f('update')
            navigate("/eaitor")//路由跳转
        }
    });


}
  //请求数据
  function to_get(e_size, e_page, type, name, id, time_begin, time_end) {
    //todo 参数需要改
    asy_get("plug/js/getP", `size=${e_size}&page=${e_page}
${name != undefined && name != "" && name != null ? "&name=" + name : ""}
${id != undefined && id != "" && id != null ? "&id=" + id : ""}
${type != undefined && type != "" && type != null ? "&type=" + type : ""}`, data => {

      if (data.code == "未知") alert("请求出错")
      else {
        //设置信息
        let list = []
        let re_list = data.data.list;
        // todo 补充符合的代码
        for (let i = 0; i < re_list.length; i++) {
          let v = re_list[i];
          let on_off = v.on_off == 1 ? true : false;
          list.push({
            id: v.id,
            name: v.name,
            time: v.time,
            on_off: on_off
          })
        }
        setDataSource(list)

        //设置分页
        let p = data.data;
        console.log(p)
        setPage(p.page);
        setSize(p.size);
        setTotal(p.total);

      }
    },navigate)
  }

  //获取信息
 function getinfo(){
  asy_get("plug/js/get_static", `type=${type}`, data => {

    if (data.code == "未知") alert("请求出错")
    else {
      let rein = data.data;
      setInfo({

        using_name: rein.using_name,
        plug_total: rein.plug_total,
      })

    }
  });
  }

  //组件挂载加载
  useEffect(() => {
    getinfo();

    // 首次请求列表数据
    to_get(size, page, type);

  }, []);// 仅在 []内变量  发生变化时，重新订阅

  //搜索
  function search() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    to_get(size, page, type, name, id);
  }

  //下一页
  const onChange = (pageNumber) => {
    setPage(pageNumber)
    search();
  };


    //删除
    function to_del(id){
        asy_post_by_json("js/del", `id=${id}`, null,data => {

            if (data.code == "未知") alert("请求出错")
            else {
                if(data.code == '成功'){
                    let list = [];
                    for(let index in dataSource){

                        if(dataSource[index].id != id){
                            list.push(dataSource[index])
                        }
                    }
                    setDataSource(list)
                    message.success('设置成功');
                }
            }
        });
    }

  //首页和博客切换
  const on_switch = (checked) => {
    //checked true是首页 false 是博客
    console.log(type+"开始"+checked)
    if (checked) {
      type=1;//首页
    }
    else {
      type=2;//博客
    }
      console.log(type+"结束")

    setPage(1);
    setSize(5);
    search();
    getinfo();

  };

  return (
    <div>
      <Descriptions
        title="JS插件"
        bordered
        column={{
          xxl: 4,
          xl: 3,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
      >
        <Descriptions.Item label="插件数量">{info.plug_total}</Descriptions.Item>
        <Descriptions.Item label="正在使用">{info.using_name}</Descriptions.Item>


      </Descriptions>
      <Divider>*</Divider>
      <div>
        <Row gutter={26}>
          <Col span={2}>
            <Input placeholder="id" id="id" />
          </Col>
          <Col span={6}>
            <Input placeholder="名称" id='name' />
          </Col>
          <Col span={6}>
            <RangePicker picker="month" />
          </Col>
          <Col span={3}>
            <Button icon={<SearchOutlined />} onClick={search} >搜索</Button>

          </Col>
          <Col span={3}>
            <Switch defaultChecked={true} checkedChildren="首页" unCheckedChildren="博客" onChange={(v)=>on_switch(v)} />
          </Col>
          <Col span={2}>
            <Button icon={<PlusOutlined />}>导入JS</Button>

          </Col>
        </Row>
        {/* columns={columns}  */}
        <Table dataSource={dataSource} pagination={false} >
          <Column title="id" dataIndex="id" key="id" />
          <Column title="插件名称" dataIndex="name" key="name" />
          <Column title="更新时间" dataIndex="time" key="time" />
          <Column
            title="开启状态"
            render={(record) => (
              <Space size="middle">
                {record.on_off}
                <Switch defaultChecked={record.on_off} />
              </Space>
            )}
          />
          <Column
            title="Action"
            render={(record) => (
              <Space size="middle">
                <a  onClick={(v)=>{to_edit(record)} }>编辑 </a>
                <a  onClick={(v)=>{to_del(record.id)} } >删除</a>
              </Space>
            )}
          />
        </Table>
        <Pagination defaultCurrent={page} total={total} onChange={onChange} />
      </div>

    </div>
  );
}

export default Css;


