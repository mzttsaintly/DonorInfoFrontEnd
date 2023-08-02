<script setup>
import { ref, reactive, watch } from 'vue';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';
import FileSaver from 'file-saver';
import * as xlsx from 'xlsx';

const gotInfo = ref()

const infoSearch = ref()  // 精确查询的表单代理对象

const get_url = 'http://192.168.1.251:8000/quest_all'  // 获取全部数据的接口

// 获取全部数据
async function getAllInfo() {
    await axios.post(get_url).then(response => {
        gotInfo.value = response.data
        console.log(response)
    }).catch(function (err) {
        ElMessageBox.alert(err, '服务器错误', {
            confirmButtonText: 'OK',
        })
        console.log(err)
    })
}

// const search_url = 'http://192.168.1.251:8000/query_by_param'  // 精确查找接口
const fuzzyQuery_url = 'http://192.168.1.251:8000/fuzzy_query'  // 模糊查找接口

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
// async function getInfoBySerial(verifyform, keword, con) {
//     if (!verifyform) return;
//     await verifyform.validate((valid, fields) => {
//         if (valid) {  // 验证是否有内容，有则执行
//             const new_search = reactive({
//                 'keyword': keword,
//                 'con': con
//             })
//             axios.post(search_url, new_search).then(response => {
//                 gotInfo.value = response.data
//                 console.log(response)
//             }).catch(function (err) {
//                 ElMessageBox.alert(err, '服务器错误', {
//                     confirmButtonText: 'OK',
//                 })
//                 console.log(err)
//             })
//         } else {
//             ElMessageBox.alert('不可以为空', '错误输入', {
//                 confirmButtonText: 'OK',
//             })
//             console.log('输入项有误', fields)
//         }
//     })
// }

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
        value: 'id_num',
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
    ],
    time: [
        { required: true, message: '不能为空', trigger: 'blur' },
    ]
})

const timeRef = ref()
const timeSelect = reactive({
    timeValue: ''  // 查询时间段
})

const time_url = 'http://192.168.1.251:8000/query_datas'  // 查询时间接口

// 按时间查询
async function getTimes(verifyform) {
    if (!verifyform) return;
    await verifyform.validate((valid, fields) => {
        if (valid) {
            let new_time = reactive({
                "start_time": timeSelect.timeValue[0],
                "end_time": timeSelect.timeValue[1]
            })
            axios.post(time_url, new_time).then(response => {
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

// 页面选择的项目内容
const selects = ref()

function selection(val) {
    selects.value = val
    console.log(val)
}

// 导出选择的内容至Excel
function exportClick() {
    let wb = xlsx.utils.table_to_book(document.querySelector('#my_table'), {
        raw: true  // 保持原始数据内容
    });  // 关联table
    // let wb = xlsx.utils.json_to_sheet(selects.value)
    let wbout = xlsx.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
    })
    try {
        const today = new Date()
        FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
        }), `细胞供者信息-${today.toISOString()}.xlsx`)  // 自定义文件名
    } catch (e) {
        if (typeof console !== 'undefined') {
            console.log(e, wbout);
        }
    }
    return wbout
}

// 分页获取数据
const PaginateItem = ref() // 分页对象
const totalPage = ref(1)  // 总页数
const currentPage = ref(1)  // 当前页数

const paginate_url = "http://192.168.1.251:8000/paginate_query"

function getPageAll() {
    let getPaginate = reactive({
        "currentPage": 1
    })
    axios.post(paginate_url, getPaginate).then(response => {
        PaginateItem.value = response.data
        totalPage.value = PaginateItem.value.total
        gotInfo.value = JSON.parse(PaginateItem.value.res)
        console.log(PaginateItem.value.res)
    }).catch(function (err) {
        ElMessageBox.alert(err, '服务器错误', {
            confirmButtonText: 'OK',
        })
        console.log(err)
    })
}

watch(currentPage, async (newValue) => {
    let getPaginate = reactive({
        "currentPage": newValue
    })
    axios.post(paginate_url, getPaginate).then(response => {
        PaginateItem.value = response.data
        totalPage.value = PaginateItem.value.total
        gotInfo.value = JSON.parse(PaginateItem.value.res)
    }).catch(function (err) {
        ElMessageBox.alert(err, '服务器错误', {
            confirmButtonText: 'OK',
        })
        console.log(err)
    })
})

// 导出全部数据到xlsx
async function exportAll() {
    await getAllInfo()
    let wb = xlsx.utils.table_to_book(document.querySelector('#showTable'), {
        raw: true  // 保持原始数据内容
    });  // 关联table
    // let wb = xlsx.utils.json_to_sheet(selects.value)
    let wbout = xlsx.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
    })
    try {
        const today = new Date()
        FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
        }), `细胞供者信息-${today.toISOString()}.xlsx`)  // 自定义文件名
    } catch (e) {
        if (typeof console !== 'undefined') {
            console.log(e, wbout);
        }
    }
    return wbout
}
</script>

<template>
    <el-row class="sreachBox">
        <el-col class="sreachInfo" :span="3">
            <!-- <el-button @click="getAllInfo()">获取全部数据</el-button> -->
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
                <!-- {{ formInfo.searchSelect }}
                {{ formInfo.searchContent }} -->
                <el-form-item>
                    <el-button type="primary"
                        @click="fuzzyQueryInfo(infoSearch, formInfo.searchSelect, formInfo.searchContent)">查找</el-button>
                    <el-button @click="resetForm(infoSearch)">重置</el-button>
                </el-form-item>
            </el-form>

            <el-tag>按时间查找</el-tag>
            <el-form ref="timeRef" :model="timeSelect" :rules="showRules" label-position="top">
                <el-form-item>
                    <el-date-picker v-model="timeSelect.timeValue" type="daterange" unlink-panels range-separator="至"
                        start-placeholder="开始时间" end-placeholder="结束时间" size="small" class="timeSelect"
                        value-format="YYYY-MM-DD" prop="time" />
                    <!-- {{ timeSelect.timeValue }} -->
                </el-form-item>
                <el-button type="primary" @click="getTimes(timeRef)">查找</el-button>
                <el-button @click="resetForm(timeRef)">重置</el-button>
            </el-form>
            <el-button class="getAll" @click="getPageAll()">获取全部数据</el-button>
        </el-col>
        <el-col class="showInfo" :span="21">
            <el-table class="showTable" stripe :data="gotInfo" max-height="80vh" @selection-change="selection"
                row-key="serial" id="showTable">
                <!-- 多选框 -->
                <el-table-column type="selection" width="55" reserve-selection />
                <el-table-column prop="serial" label="样本唯一ID"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="gender" label="性别"></el-table-column>
                <el-table-column prop="id_num" label="身份证号"></el-table-column>
                <el-table-column prop="sample_type" label="样品类型"></el-table-column>
                <el-table-column prop="sample_quantity" label="样品量"></el-table-column>
                <el-table-column prop="date" label="采样时间"></el-table-column>
                <el-table-column prop="place" label="采样地点" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-row class="infoFooter">
                <!-- {{ selects }} -->
                <el-pagination layout="prev, pager, next, total" :pager-count="11" v-model:current-page="currentPage"
                    v-model:page-count="totalPage" />
                <div>
                    <el-button type="primary" @click="exportClick">导出选中内容</el-button>
                    <el-button type="primary" @click="exportAll()">导出全部内容</el-button>
                </div>

            </el-row>

        </el-col>

    </el-row>

    <div class="nonedisplay">
        <el-table stripe :data="selects" max-height="80vh" id="my_table">
            <el-table-column prop="serial" label="样本唯一ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="id_num" label="身份证号"></el-table-column>
            <el-table-column prop="sample_type" label="样品类型"></el-table-column>
            <el-table-column prop="sample_quantity" label="样品量"></el-table-column>
            <el-table-column prop="date" label="采样时间"></el-table-column>
            <el-table-column prop="place" label="采样地点" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<style>
.el-row {
    align-content: space-around;
}
</style>

<style scoped>
.showTable {
    width: 100%;
}

.nonedisplay {
    display: none;
}

.infoFooter {
    justify-content: space-around;
}

.getAll {
    margin: 1vh auto;
}
</style>