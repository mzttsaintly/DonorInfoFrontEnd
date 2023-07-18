<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>

        <el-menu active-text-color="#ffd04b" background-color="#7e92a5" class="sideBar_nav" default-active="1"
        text-color="#fff">
        
            <RouterLink to="/"><el-menu-item index="1">信息录入</el-menu-item></RouterLink>
        
        
            <RouterLink to="/showInfo"><el-menu-item index="2">信息读取</el-menu-item></RouterLink>

    </el-menu>
</template>

<style scoped>

</style>