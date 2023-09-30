import React from 'react'
import axios from 'axios';

const sendRequestToPython = async () => {
    const dataToSend = [1, 2, 3];

    // DjangoのAPIエンドポイントにPOSTリクエストを送信
    axios.post('http://127.0.0.1:8000/execute_python_code/', { data: dataToSend })
        .then(response => {
            // サーバーからの応答を処理
            console.log(response.data);
        })
        .catch(error => {
            // エラーハンドリング
            console.error(error);
        });
};

sendRequestToPython();

export default sendRequestToPython