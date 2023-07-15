<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const router = useRouter()

onMounted(() => {
    router.push({name: 'AddInfo'})
})
</script>

<template>
    <el-row class="pcHeaderBox" :span="24">
        <Header></Header>
    </el-row>
    <el-row class="main">
        <el-col class="sideBar" :span="0" :md="2">
            <!-- sidebar预留 -->
        </el-col>
        <el-col class="main" :span="24" :md="22">
            <!-- <el-scrollbar height="80vh" ref="scrollToZero"> -->
                <router-view></router-view>
            <!-- </el-scrollbar> -->
        </el-col>
    </el-row>
    <el-row class="foot">
        <Footer></Footer>
    </el-row>
</template>

<style>
.pcHeaderBox {
    height: 10vh;
    justify-content: center;
    align-items: center;
}

.main {
    height: 80vh;
}

.foot {
    height: 10vh;
    justify-content: center;
    align-items: center;
}
</style>
