import { Descriptions } from 'antd';
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
import React, { useState, useEffect } from 'react';
import asy_get from '../config/requests'
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;





function Essay(props) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);//默认是第一页的前面
    const [size, setSize] = useState(5);
    const [total, setTotal] = useState(100);
    const [dataSource, setDataSource] = useState([
        // {
        //   id: '1',
        //   title: '关于正则表达式',
        //   time: '2021-01-03',
        // },
        // {
        //   id: '2',
        //   title: 'TCP协议',
        //   time: '2023-01-03',
        // },
    ]);
    const [info, setInfo] = useState({
        essay_total: 100,
        max_click: "无",
        essay_look_click: 1000
    });

    //编辑跳转
    function to_edit(id) {

        asy_get("essay/get", `id=${id}`, data => {

            if (data.code == "未知") alert("请求出错")
            else {
                let rein = data.data;

                let title = rein.title;
                let context = rein.context;


                localStorage.setItem('edit',JSON.stringify( {
                    type: 'essay',
                    mode: 'markdown',
                    input: title,
                    context: context
                }));
                props.header_f('eaitor')
                navigate("/eaitor")//路由跳转
            }
        });


    }


    //请求数据
    function to_get(e_size, e_page, title, id, time_begin, time_end) {

        asy_get("essay/getP", `size=${e_size}&page=${e_page}
  ${title != undefined && title != "" && title != null ? "&title=" + title : ""}
  ${id != undefined && id != "" && id != null ? "&id=" + id : ""}`, data => {

            if (data.code == "未知") alert("请求出错")
            else {
                //设置信息
                let list = []
                let re_list = data.data.list;
                for (let i = 0; i < re_list.length; i++) {
                    let v = re_list[i];
                    console.log(v)
                    list.push({
                        id: v.id,
                        title: v.title,
                        time: "00",
                        type: v.type_id
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
        })
    }

    //组件挂载加载
    useEffect(() => {
        asy_get("essay/get_static", "", data => {

            if (data.code == "未知") alert("请求出错")
            else {
                let rein = data.data;
                setInfo({
                    essay_total: rein.文章总数量,
                    max_click: rein.最高浏览文章,
                    essay_look_click: rein.文章浏览总量
                })

            }
        });

        to_get(size, page);

    }, []);// 仅在 []内变量  发生变化时，重新订阅


    //搜索
    function search() {
        let id = document.getElementById("essay_id").value;
        let title = document.getElementById("essay_title").value;
        to_get(5, 1, title, id);
    }


    //下一页
    const onChange = (pageNumber) => {
        setPage(pageNumber)
        let id = document.getElementById("essay_id").value;
        let title = document.getElementById("essay_title").value;
        to_get(size, page, title, id);
    };
    return (
        <div>
            <Descriptions
                title="文章概要"
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
                <Descriptions.Item label="文章总数量">{info.essay_total}</Descriptions.Item>
                <Descriptions.Item label="文章浏览总量">{info.max_click}</Descriptions.Item>
                <Descriptions.Item label="最高浏览量文章">{info.essay_look_click}</Descriptions.Item>

            </Descriptions>
            <Divider>*</Divider>

            <div>
                <Row gutter={26}>
                    <Col span={5}>
                        <Input placeholder="id" id="essay_id" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="标题" id="essay_title" />
                    </Col>
                    <Col span={6}>
                        <RangePicker picker="month" />
                    </Col>
                    <Col span={3}>
                        <Button icon={<SearchOutlined />} onClick={search}>搜索</Button>

                    </Col>
                    <Col span={2}>
                        <Button icon={<PlusOutlined />}>导入md</Button>

                    </Col>
                </Row>


                {/* columns={columns} pagination={false}分尼玛的页啊 */}
                <Table dataSource={dataSource} pagination={false}>
                    <Column title="id" dataIndex="id" key="id" />
                    <Column title="标题" dataIndex="title" key="title" />
                    <Column title="更新时间" dataIndex="time" key="time" />
                    <Column title="文章类型" dataIndex="type" key="type" />
                    <Column
                        title="Action"
                        key="action"
                        render={( record) => (
                            <Space size="middle">
                                <a onClick={(v)=>{to_edit(record.id)} }>编辑 </a>
                                <a>删除</a>
                            </Space>
                        )}

                    />
                </Table>

                <Pagination defaultCurrent={page} total={total} onChange={onChange} />
            </div>

        </div>

    );
}

export default Essay;


