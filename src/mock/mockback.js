import mockjs from "mockjs";

const testData = mockjs.mock('http://127.0.0.1:5000/add', 'post', {
    status: 200,
    datalist: ['上传成功']
})

export default testData