<template>
    <el-header style="height: auto;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect" style="height: 80px;">
            <el-menu-item index="0">
                <img style="width: 100px" src="https://element-plus.org/images/element-plus-logo.svg" alt="Element logo" />
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">主页</el-menu-item>
            <el-menu-item index="2">预览选中</el-menu-item>
            <el-sub-menu index="3">
                <template #title>发布</template>
                <a href="https://www.xiaohongshu.com/" target="_blank"><el-menu-item index="3-1">小红书</el-menu-item></a>
            </el-sub-menu>
        </el-menu>
    </el-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    switch (key) {
        case '1':
            router.push({ path: '/' })
            break;
        case '2':
            router.push({ path: '/preview' })
            break;

        default:
            router.push({ path: '/' })

            break;
    }
}
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>
