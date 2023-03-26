import status from './config'

function asy_get(path, query, handle) {

    let result = {
        code: "未知",
        data: "无"
    }

    fetch(status.host + path + "?" + query, {
        method: "GET",

    }).then(response => response.json())
        .then(json_data => {
            //保证肯定是json数据
            if (json_data['code'] == 1) {
                result.data = json_data['value'];
                result.code = "成功"

            }
            handle(result)

        });

}


function asy_post_by_json(path, query, object_data,handle) {

    let result = {
        code: "未知",
        data: "无"
    }

    fetch(status.host + path + "?" + query, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object_data)

    }).then(response => response.json())
        .then(json_data => {
            //保证肯定是json数据
            if (json_data['code'] == 1) {
                result.data = json_data['value'];
                result.code = "成功"

            }
            handle(result)

        });

}

export default asy_get;