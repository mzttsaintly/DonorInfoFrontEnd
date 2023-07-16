<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <el-menu>
        <el-menu-item index="1">
            <RouterLink to="/">信息录入</RouterLink>
        </el-menu-item>
        <el-menu-item index="2">
            <RouterLink to="/showInfo">信息读取</RouterLink>
        </el-menu-item>
    </el-menu>
</template>