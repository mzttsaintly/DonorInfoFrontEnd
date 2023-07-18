<template>
    <el-row class="input_box">
        <el-col class="addInfoBox" :span="24" :md="12">
            <el-form :model="form" :rules="rules" ref="formRef" label-position="right" label-width="auto">
                <el-form-item label="姓名：" class="name Title" prop="name">
                    <!-- <div class="Title">姓名：</div> -->
                    <el-input class="inputBox" v-model="form.name" placeholder="请输入供者姓名" clearable />
                </el-form-item>
                <el-form-item label="年龄：" class="age Title" prop="age">
                    <!-- <div class="Title">年龄：</div> -->
                    <el-input-number class="inputBox" v-model="form.age" :min="0" :max="120" clearable />
                </el-form-item>
                <el-form-item label="性别：" class="gender Title">
                    <!-- <div class="Title">性别：</div> -->
                    <el-radio-group v-model="form.gender">
                        <el-radio class="inputBox" :label="1">男</el-radio>
                        <el-radio class="inputBox" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号：" class="id_num Title" prop="id_num">
                    <!-- <div class="Title">身份证号：</div> -->
                    <el-input class="inputBox" v-model="form.id_num" placeholder="请输入供者身份证号" clearable />
                </el-form-item>
                <el-form-item label="样品类型" class="sample_type Title" prop="sample_type">
                    <!-- <div class="Title">样品类型</div> -->
                    <el-radio-group v-model="form.sample_type">
                        <el-radio-button class="inputBox" :label="0">骨髓</el-radio-button>
                        <el-radio-button class="inputBox" :label="1">外周血</el-radio-button>
                        <el-radio-button class="inputBox" :label="2">脐带血</el-radio-button>
                        <el-radio-button class="inputBox" :label="3">脐带</el-radio-button>
                        <el-radio-button class="inputBox" :label="4">其他组织样品</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="样品量：" class="sample_quantity Title">
                    <!-- <div class="Title">样品量：</div> -->
                    <el-input-number class="inputBox" v-model="form.sample_quantity" :min="0" :max="999" /> g
                </el-form-item>
                <el-form-item label="采样日期：" class="date Title">
                    <!-- <div class="Title">采样日期：</div> -->

                    <el-date-picker class="inputBox" v-model="form.date" type="date" placeholder="Pick a day"
                        :disabled-date="disabledDate" :shortcuts="shortcuts" :size="size" format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD" />

                </el-form-item>

                <el-form-item label="采样地点：" class="place Title"  prop="place">
                    <!-- <div class="Title">采样地点：</div> -->
                    <el-input class="inputBox" v-model="form.place" placeholder="请输入采样地点" clearable />
                </el-form-item>

                <el-form-item label="联系电话：" class="phone Title"  prop="phone">
                    <!-- <div class="Title">联系电话：</div> -->
                    <el-input type="number" class="inputBox" v-model="form.phone" placeholder="请输入联系电话" clearable />
                </el-form-item>

                <el-form-item class="upload">
                    <el-button class="uploadButton" type="primary" size="large" @click="post_button">
                        提交<el-icon class="el-icon--right">
                            <Upload />
                        </el-icon>
                    </el-button>
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
                <el-col class="gender showTitle">身份证号：{{ form.id_num }}</el-col>
                <el-col class="sample_type showTitle">样品类型：{{ showSampleType(form.sample_type) }}</el-col>
                <el-col class="sample_quantity showTitle">样品量：{{ form.sample_quantity }}g</el-col>
                <el-col class="date showTitle">采样日期：{{ form.date }}</el-col>
                <el-col class="place showTitle">采样地点：{{ form.place }}</el-col>
                <el-col class="phone showTitle">联系电话：{{ form.phone }}</el-col>
            </el-row>
        </el-col>
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
// import { FormInstance, FormRules } from 'element-plus';

const formRef = ref()

const form = reactive({
    name: '',
    age: 1,
    gender: 0,
    id_num: '',
    sample_type: '',
    sample_quantity: 0,
    date: '',
    place: '',
    phone: ''
})

const rules = reactive({
    name: [
        { required: true, message: '姓名不能为空', trigger: 'blur' },
    ],
    age: [
        { required: true, message: '年龄不能为空', trigger: 'blur' }
    ],
    id_num: [
        { required: true, message: '身份证号不能为空', trigger: 'blur' }
    ],
    sample_type: [
        { required: true, message: '样品类型不能为空', trigger: 'blur' }
    ],
    sample_quantity: [
        { required: true, message: '样品数量不能为空', trigger: 'blur' }
    ],
    place: [
        { required: true, message: '采样地点不能为空', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '联系电话不能为空', trigger: 'blur' }
    ],
})

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

function showSampleType(sample_type) {
    const sampleDict = {
        0: "骨髓",
        1: "外周血",
        2: "脐带血",
        3: "脐带",
        4: "其他组织样品"
    }
    return sampleDict[sample_type]
}

const add_url = ref('http://localhost:5000/add')

function post_button() {
    const new_add = reactive({
        "name": form.name,
        "age": form.age,
        "gender": (form.gender ? "男" : "女"),
        "id_num": form.id_num,
        "sample_type": showSampleType(form.sample_type),
        "sample_quantity": form.sample_quantity + 'g',
        "date": form.date,
        "place": form.place,
        "phone": form.phone
    })
    console.log(new_add)
    axios.post(add_url.value, new_add).then(function (response) {
        alert(response.data);
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

<style>
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

.upload>div {
    align-items: center;
    justify-content: center;
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