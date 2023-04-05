

let status = {
    "if_login": true,//是否登录
    "host": "http://localhost:666/",//ip地址
    // "host":window.document.location.origin+"/"
};

let edit_type={
    css_index:{
        name:"css首页插件",
        type:"css_index",
        mode:"css"
    },
    css_blog:{
        name:"css博客插件",
        type:"css_blog",
        mode:"css"
    },
    js_index:{
        name:"js首页插件",
        type:"js_index",
        mode:"javascript"
    },
    js_blog:{
        name:"js博客插件",
        type:"js_blog",
        mode:"javascript"
    },
    essay:{
        name:"博客",
        type:"essay",
        mode:"markdown"
    },
    comment:{
        name:"评论",
        type:"comment",
        mode:"txt"
    },
    blog_type:{
        name:"博客类型",
        type:"blog_type",
        mode:"txt"
    }
}

//获取编辑器编辑内容类型
function get_edit_type(type){
    // console.log(type)
        if(type === edit_type.css_blog.type)
            return edit_type.css_blog.name
        else if(type === edit_type.css_index.type)
            return edit_type.css_index.name
        else if(type === edit_type.js_index.type)
            return edit_type.js_index.name
        else if(type === edit_type.js_blog.type)
            return edit_type.js_blog.name
        else if(type === edit_type.essay.type)
            return edit_type.essay.name
        else if(type === edit_type.comment.type)
            return edit_type.comment.name
        else if(type === edit_type.blog_type.type)
            return edit_type.blog_type.name

}


export default status;

export {get_edit_type,edit_type};