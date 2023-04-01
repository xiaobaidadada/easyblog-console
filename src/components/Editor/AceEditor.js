import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/markdown';
import 'brace/theme/github';
import {Input} from 'antd';
import {useOutletContext} from "react-router-dom";
import {edit_type, get_edit_type} from "../config/config";


class Ace_get_router extends React.Component {


    //true是挂载函数  fasle是更新函数，内部值，不需要更新到界面，不需要设置state
    if_mount = true;

    constructor(props) {
        super();

        this.context_change = this.context_change.bind(this);//绑定this
        this.title_change = this.title_change.bind(this);//绑定this
        this.state = {
            mode: edit_type.essay.mode
        }


        this.state = {
            prevalue: '提示:\
            \n1. 如果直接打开这个界面，会出现三个不同的保存按钮，保存到文章，保存到css或者Js插件\
            \n2. 如果是通过某个插件打开的编辑功能，只会出现一个保存按钮，保存到特定的css或者js，通过他们的id进行更新记录'
        }

        // localStorage.setItem('md_mode', 'txt');

    }

    //设置插入的值；
    context_change(new_value) {

        this.md_context=new_value
        // localStorage.setItem('md_context', new_value);
        localStorage.setItem('edit', JSON.stringify({
            type: this.state.type,
            mode: this.state.mode,
            input: this.md_input,
            context: new_value
        }));

    }

    //标题用于头部交互
    title_change(new_value){

        //这个界面更新的话就会触发检测，所以不能用这个
        // this.setState({
        //     input:new_value.target.value
        // })
        this.md_input=new_value.target.value
        localStorage.setItem('edit', JSON.stringify({
            type: this.state.type,
            mode: this.state.mode,
            input: new_value.target.value,
            context: this.md_context
        }));
    }

    //挂载渲染，用于加载内容，两个跳转界面设置内容
    componentDidMount() {


        //设置是否设置提示框
        // if(this.props.mode.input !=null){
        //     this.setState({
        //         input:this.props.mode.input 
        //     })
        // }

        let v = localStorage.getItem('edit');
        if (v != null && v != undefined) {
            let edit = JSON.parse(v);
            console.log(edit.mode + "这就是")
            this.setState({
                input: edit.input,
                prevalue: edit.context,
                mode: edit.mode,
                type:edit.type
            })
            this.md_input=edit.input;
            // console.log(edit.mode)
            //缓存用于别的组件交互
            // localStorage.setItem('md_context', edit.context);
            // localStorage.setItem('md_mode', edit.mode);
            // localStorage.setItem('md_input', edit.input);
        }

        //每次都设置为true；
        this.if_mount = true;
    }

    //非跳转设置内容，两个组件在同一个界面的交互
    componentDidUpdate() {
        console.log(this.if_mount)
        if (this.if_mount) {
            //如果挂载函数不执行，这个就不执行；下面的就会执行；
            this.if_mount = false;
            return;
        }
        //设置是否设置提示框
        if (this.props.mode.input != null && this.props.mode.input != undefined &&
            this.props.mode.input != this.state.input) {
            this.setState({
                input: this.props.mode.input,
                mode: this.props.mode.mode,
                type: this.props.mode.type,
            })

            // console.log(2)
            //非跳转时候的判断
            // localStorage.setItem('md_mode', this.props.mode.mode);
            // localStorage.setItem('md_input',this.props.mode.input);
        }

    }

    render() {
        return (
            <div>

                {this.state.input != null &&

                    <Input placeholder={this.state.input} defaultValue={this.state.input} onChange={this.title_change}/>
                }

                <AceEditor
                    mode={this.state.mode}
                    theme="github"
                    onChange={this.context_change}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}

                    width='100%'
                    value={this.state.prevalue}
                />
                编辑器模式：{get_edit_type(this.state.type)}
            </div>
        );
    }
}

export default function Ace() {
    //为了使用这个东西传递子路由的变量 outlet
    const [md, header_f] = useOutletContext();

    return (<Ace_get_router mode={md} header_f={header_f}/>)
}