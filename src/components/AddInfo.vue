<template>
    <el-row class="input_box">
        <el-col class="addInfoBox" :span="24" :md="12">
            <el-col class="name">
                <div class="Title">姓名：</div>
                <el-input class="inputBox" v-model="name" placeholder="Please input name" clearable />
            </el-col>
            <el-col class="age">
                <div class="Title">年龄：</div>
                <el-input-number class="inputBox" v-model="age" :min="0" :max="120" @change="handleChange" clearable />
            </el-col>
            <el-col class="gender">
                <div class="Title">性别：</div>
                <el-radio-group v-model="gender">
                    <el-radio class="inputBox" :label="1">男</el-radio>
                    <el-radio class="inputBox" :label="0">女</el-radio>
                </el-radio-group>
            </el-col>
            <el-col class="id_num">
                <div class="Title">身份证号：</div>
                <el-input class="inputBox" v-model="id_num" placeholder="Please input id" clearable />
            </el-col>
            <el-col class="sample_type">
                <div class="Title">样品类型</div>
                <el-radio-group v-model="sample_type">
                    <el-radio class="inputBox" :label="0">骨髓</el-radio>
                    <el-radio class="inputBox" :label="1">脐带</el-radio>
                </el-radio-group>
            </el-col>
            <el-col class="sample_quantity">
                <div class="Title">样品量：</div>
                <el-input-number class="inputBox" v-model="sample_quantity" :min="0" :max="999" @change="handleChange" /> {{
                    sample_type ? "g" : "mL" }}
            </el-col>
            <el-col class="date">
                <div class="Title">采样日期：</div>

                <el-date-picker class="inputBox" v-model="date" type="date" placeholder="Pick a day"
                    :disabled-date="disabledDate" :shortcuts="shortcuts" :size="size" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" />

            </el-col>
            <el-col class="place">
                <div class="Title">采样地点：</div>
                <el-input class="inputBox" v-model="place" placeholder="Please input place" clearable />
            </el-col>
            <el-col class="Title">联系电话：</el-col>
            <el-input class="inputBox" v-model="phone" placeholder="Please input phone" clearable />
        </el-col>

        <el-col class="showInfoBox" :span="0" :md="10">
            <el-row class="showInfo">
                <el-col class="name Title">
                    <p>供者姓名：{{ name }}</p>
                </el-col>
                <el-col class="age Title">供者年龄：{{ age }}</el-col>
                <el-col class="gender Title">供者性别：{{ gender ? "男" : "女" }}</el-col>
                <el-col class="sample_type Title">样品类型：{{ sample_type ? "脐带" : "骨髓" }}</el-col>
                <el-col class="sample_quantity Title">样品量：{{ sample_quantity }} {{ sample_type ? "g" : "mL" }}</el-col>
                <el-col class="date Title">采样日期：{{ date }}</el-col>
                <el-col class="place Title">采样地点：{{ place }}</el-col>
                <el-col class="phone Title">联系电话：{{ phone }}</el-col>
            </el-row>
        </el-col>
        <el-row class="upload">
        <el-button class="uploadButton" type="primary" size="large" @click="post_button">
            提交<el-icon class="el-icon--right">
                <Upload />
            </el-icon>
        </el-button>
    </el-row>
    </el-row>

    <!-- <el-row class="upload">
        <el-button class="uploadButton" type="primary" size="large" @click="post_button">
            提交<el-icon class="el-icon--right">
                <Upload />
            </el-icon>
        </el-button>
    </el-row> -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
const name = ref('')  // 供者名字
const age = ref(1)  // 供者年龄
const handleChange = (value) => {
    console.log(value)
}
const gender = ref(0)  // 供者性别
const id_num = ref("")  // 身份证号
const sample_type = ref(0)  // 样品类型
const sample_quantity = ref(0)  // 样品数量

const date = ref('')  // 采样日期
// 快速选择日期
const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
]

const place = ref('')  // 采样地点
const phone = ref('')  // 联系电话

const add_url = ref('http://127.0.0.1:5000/add')

function post_button() {
    const new_add = reactive({
        "name": name.value,
        "age": age.value,
        "gender": (gender.value ? "男" : "女"),
        "id_num": id_num,
        "sample_type": (sample_type.value ? "U" : "B"),
        "sample_quantity": sample_quantity.value + (sample_type.value ? "g" : "mL"),
        "date": date.value,
        "place": place.value,
        "phone": phone.value
    })
    console.log(new_add)
    // function submit_dish() {
    //     axios.post(test_url.value, new_add).then(function (res) {
    //         console.log(res)
    //     })

    // }
}

onMounted(() => {
    let today = new Date()
    // date.value = today.getFullYear() +"-" + (today.getMonth() + 1) + "-" + today.getDate()
    // 之后使用day.js进行格式化
})
</script>

<style scoped>
.Title {
    font-family: Georgia, -apple-system, 'Nimbus Roman No9 L', 'PingFang SC', 'Hiragino Sans GB', 'Noto Serif SC', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'ST Heiti', sans-serif;
    padding: 1vh;
    height: 3vh;
}

.showInfo {
    border: solid 1px #5de2ce;
    height: 100%;
    padding: 1vw;
}

.input_box {
    height: 90vh;
    /* align-items: center; */
}

.addInfoBox {
    padding: 1vw;
    /* height: 100%; */
    border: solid 1px #5de2ce;
}

.showInfoBox {
    padding: 1vw;
}

.upload {
    justify-content: center;
    height: -4vh;
}

.uploadButton {
    font-size: 2vw;
    margin: 1vh;
    /* height: 4vh; */
}

.inputBox {
    height: 3vh;
}
</style>