<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const gotInfo = ref()

const infoSearch = ref()  // 精确查询的表单代理对象

const get_url = 'http://localhost:5000/quest_all'  // 获取全部数据的接口

// 获取全部数据
function getAllInfo() {
    axios.post(get_url).then(response => {
        gotInfo.value = response.data
        console.log(response)
    }).catch(function (err) {
        ElMessageBox.alert(err, '服务器错误', {
            confirmButtonText: 'OK',
        })
        console.log(err)
    })
}

const search_url = 'http://localhost:5000/query_by_param'  // 精确查找接口
const fuzzyQuery_url = 'http://localhost:5000/fuzzy_query'  // 模糊查找接口

const formInfo = reactive({
    searchSelect: '', // 查询选择器
    searchContent: ''  // 查询内容
})

// 模糊查找
async function fuzzyQueryInfo(verifyform, attr_name, con) {
    if (!verifyform) return;
    await verifyform.validate((valid, fields) => {
        if (valid) {  // 验证是否有内容，有则执行
            const new_search = reactive({
                'attr_name': attr_name,
                'con': con
            })
            axios.post(fuzzyQuery_url, new_search).then(response => {
                gotInfo.value = response.data
                console.log(response)
            }).catch(function (err) {
                ElMessageBox.alert(err, '服务器错误', {
                    confirmButtonText: 'OK',
                })
                console.log(err)
            })
        } else {
            ElMessageBox.alert('不可以为空', '错误输入', {
                confirmButtonText: 'OK',
            })
            console.log('输入项有误', fields)
        }
    })
}


// 精确查找，根据条件查找数据，必须全等，先校验是否有内容
async function getInfoBySerial(verifyform, keword, con) {
    if (!verifyform) return;
    await verifyform.validate((valid, fields) => {
        if (valid) {  // 验证是否有内容，有则执行
            const new_search = reactive({
                'keyword': keword,
                'con': con
            })
            axios.post(search_url, new_search).then(response => {
                gotInfo.value = response.data
                console.log(response)
            }).catch(function (err) {
                ElMessageBox.alert(err, '服务器错误', {
                    confirmButtonText: 'OK',
                })
                console.log(err)
            })
        } else {
            ElMessageBox.alert('不可以为空', '错误输入', {
                confirmButtonText: 'OK',
            })
            console.log('输入项有误', fields)
        }
    })
}

// 重置表单
function resetForm(form) {
    if (!form) return;
    form.resetFields()
}

// 条件查询的下拉内容
const selectOptions = [
    {
        value: 'serial',
        label: '流水号'
    },
    {
        value: 'name',
        label: '姓名'
    },
    {
        value: 'name',
        label: '身份证号'
    },
    {
        value: 'place',
        label: '采样地点'
    },
    {
        value: 'phone',
        label: '联系电话'
    },
]

// 校验输入
const showRules = reactive({
    searchSelect: [
        { required: true, message: '不能为空', trigger: 'blur' },
    ],
    searchContent: [
        { required: true, message: '不能为空', trigger: 'blur' },
    ]
})
</script>

<template>
    <el-row class="sreachBox">
        <el-col class="sreachInfo" :span="3">
            <el-button @click="getAllInfo()">获取全部数据</el-button>
            
            <el-form :model="formInfo" class="infoSearch" :rules="showRules" label-position="top" ref="infoSearch">
                <el-tag>按条件查找</el-tag>
                <el-form-item label="请选择需要查询的项目" prop="searchSelect">
                    <el-select v-model="formInfo.searchSelect" class="m-2" placeholder="请选择查询项目" size="large">
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="输入查询内容" prop="searchContent">
                    <el-input v-model="formInfo.searchContent" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"
                        @click="fuzzyQueryInfo(infoSearch, formInfo.searchSelect, formInfo.searchContent)">查找</el-button>
                    <el-button @click="resetForm(infoSearch)">重置</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <el-col class="showInfo" :span="21">
            <el-table class="showTable" stripe :data="gotInfo" max-height="80vh">
                <el-table-column prop="serial" label="流水号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="gender" label="性别"></el-table-column>
                <el-table-column prop="id_num" label="身份证号"></el-table-column>
                <el-table-column prop="sample_type" label="样品类型"></el-table-column>
                <el-table-column prop="sample_quantity" label="样品量"></el-table-column>
                <el-table-column prop="date" label="采样时间"></el-table-column>
                <el-table-column prop="place" label="采样地点"></el-table-column>
                <el-table-column prop="phone" label="联系电话"></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<style scoped>
.showTable {
    width: 100%;
}
</style>