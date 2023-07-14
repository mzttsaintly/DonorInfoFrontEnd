<template>
    <el-row class="input_box">
        <el-col class="name">
            <div class="Title">姓名：</div>
            <el-input v-model="name" placeholder="Please input" />
        </el-col>
        <el-col class="age">
            <div class="Title">年龄：</div>
            <el-input-number v-model="age" :min="0" :max="120" @change="handleChange" />
        </el-col>
        <el-col class="gender">
            <div class="Title">性别</div>
            <el-radio-group v-model="gender">
                <el-radio :label="男">男</el-radio>
                <el-radio :label="女">女</el-radio>
            </el-radio-group>
        </el-col>
        <el-col class="id_num">
            <div class="Title">身份证号：</div>
        </el-col>
        <el-col class="sample_type">
            <div class="Title">样品类型</div>
        </el-col>
        <el-col class="sample_quantity">
            <div class="Title">样品量：</div>
        </el-col>
        <el-col class="date">
            <div class="Title">采样日期：</div>
        </el-col>
        <el-col class="place">
            <div class="Title">采样地点：</div>
        </el-col>
        <el-col class="phone">联系电话：</el-col>
    </el-row>
</template>

<script setup>
import { ref } from 'vue';
const name = ref('')
const age = ref(1)
const gender = ref('男')
</script>