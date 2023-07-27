<script setup>
import { ref, reactive } from 'vue';

const loginInfo = reactive({
    user: '',
    password: ''
})
const loginInfoRef = ref()
</script>

<template>
    <el-form :model="loginInfo" ref="loginInfoRef">
        <el-form-item label="用户名：">
            <el-input v-model="loginInfo.user"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
            <el-input v-model="loginInfo.password" show-password></el-input>
        </el-form-item>
    </el-form>
</template>