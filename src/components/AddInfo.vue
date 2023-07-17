<template>
    <el-row class="input_box">
        <el-col class="addInfoBox" :span="24" :md="12">
            <el-form :model="form">
            <el-form-item label="姓名：" class="name Title">
                <!-- <div class="Title">姓名：</div> -->
                <el-input class="inputBox" v-model="form.name" placeholder="Please input name" clearable />
            </el-form-item>
            <el-form-item label="年龄：" class="age Title">
                <!-- <div class="Title">年龄：</div> -->
                <el-input-number class="inputBox" v-model="form.age" :min="0" :max="120" @change="handleChange" clearable />
            </el-form-item>
            <el-form-item label="性别：" class="gender Title">
                <!-- <div class="Title">性别：</div> -->
                <el-radio-group v-model="form.gender">
                    <el-radio class="inputBox" :label="1">男</el-radio>
                    <el-radio class="inputBox" :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item> 
            <el-form-item label="身份证号：" class="id_num Title">
                <!-- <div class="Title">身份证号：</div> -->
                <el-input class="inputBox" v-model="form.id_num" placeholder="Please input id" clearable />
            </el-form-item>
            <el-form-item label="样品类型" class="sample_type Title">
                <!-- <div class="Title">样品类型</div> -->
                <el-radio-group v-model="form.sample_type">
                    <el-radio class="inputBox" :label="0">骨髓</el-radio>
                    <el-radio class="inputBox" :label="1">脐带</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="样品量：" class="sample_quantity Title">
                <!-- <div class="Title">样品量：</div> -->
                <el-input-number class="inputBox" v-model="form.sample_quantity" :min="0" :max="999" @change="handleChange" /> {{
                    sample_type ? "g" : "mL" }}
            </el-form-item>
            <el-form-item label="采样日期：" class="date Title">
                <!-- <div class="Title">采样日期：</div> -->

                <el-date-picker class="inputBox" v-model="form.date" type="date" placeholder="Pick a day"
                    :disabled-date="disabledDate" :shortcuts="shortcuts" :size="size" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" />

            </el-form-item>

            <el-form-item label="采样地点：" class="place Title">
                <!-- <div class="Title">采样地点：</div> -->
                <el-input class="inputBox" v-model="form.place" placeholder="Please input place" clearable />
            </el-form-item>

            <el-form-item label="联系电话：" class="phone Title">
                <!-- <div class="Title">联系电话：</div> -->
                <el-input class="inputBox" v-model="form.phone" placeholder="Please input phone" clearable />
            </el-form-item>
        </el-form>
        </el-col>

        <el-col class="showInfoBox" :span="0" :md="10">
            <el-row class="showInfo">
                <el-col class="name showTitle">
                    <p>供者姓名：{{ form.name }}</p>
                </el-col>
                <el-col class="age showTitle">供者年龄：{{ form.age }}</el-col>
                <el-col class="gender showTitle">供者性别：{{ form.gender ? "男" : "女" }}</el-col>
                <el-col class="sample_type showTitle">样品类型：{{ form.sample_type ? "脐带" : "骨髓" }}</el-col>
                <el-col class="sample_quantity showTitle">样品量：{{ form.sample_quantity }} {{ form.sample_type ? "g" : "mL" }}</el-col>
                <el-col class="date showTitle">采样日期：{{ form.date }}</el-col>
                <el-col class="place showTitle">采样地点：{{ form.place }}</el-col>
                <el-col class="phone showTitle">联系电话：{{ form.phone }}</el-col>
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
import dayjs from 'dayjs';

const form = reactive({
    name: '',
    age: 1,
    gender: 0,
    id_num: '',
    sample_type: 0,
    sample_quantity: 0,
    date: '',
    place: '',
    phone: ''
})

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
    axios.post(add_url, new_add).then(function (response) {
        alert(response);
        console.log(response);
    }).catch(function (err) {
        alert(err)
        console.log(err)
    })
}

onMounted(() => {
    form.date = dayjs().format('YYYY-MM-DD')
})
</script>

<style scoped>
.Title {
    font-family: Georgia, -apple-system, 'Nimbus Roman No9 L', 'PingFang SC', 'Hiragino Sans GB', 'Noto Serif SC', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'ST Heiti', sans-serif;
    /* padding: 1vh;
    height: 2vh; */
}

.showTitle {
    font-family: Georgia, -apple-system, 'Nimbus Roman No9 L', 'PingFang SC', 'Hiragino Sans GB', 'Noto Serif SC', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'ST Heiti', sans-serif;
    padding: 1vh;
    height: 2vh;
}

.showInfo {
    padding: 1vw;
    align-content: space-around;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
}

.input_box {
    /* height: 65vh; */
    /* align-items: center; */
    width: 100%;
}

.addInfoBox {
    border: solid 1px #5de2ce;
    padding: 1vw;
    /* height: 70vh; */
}

.showInfoBox {
    padding: 1vw;
    /* height: 70vh; */
    border: #5de2ce 1px solid;
}

.upload {
    justify-content: center;
    align-items: center;
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