<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import AddInfo from './components/AddInfo.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-container>
                    <el-main><AddInfo></AddInfo></el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped></style>
