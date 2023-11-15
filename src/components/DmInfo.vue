<template>
    <div>
        <!-- <meta name="referrer" content="no-referrer"> -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>大麦</span>
                </div>
            </template>
            <a
                href="https://search.damai.cn/search.htm?spm=a2oeg.home.card_0.dviewall.591b23e1wZsa1m&ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=%E5%B9%BF%E5%B7%9E">大麦演唱会</a>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// import { reqDmInfo } from '@/api/index'
import { onMounted } from 'vue'
// import { ElMessage } from 'element-plus'
import axios from 'axios';

// let dm_info_list: any = reactive([])
// let loading = ref(false)

// const getQnlxInfo = async () => {
//     loading.value = true
//     let result = await reqDmInfo()
//     if (result.data) {
//         loading.value = false
//         dm_info_list.length = 0
//         dm_info_list.push(...result.data.items)
//     } else {
//         loading.value = false
//         ElMessage({
//             type: 'error',
//             message: `去哪旅行获取失败!${result.msg}`
//         })
//     }
//     console.log(result);

// }

onMounted(() => {
    // getQnlxInfo()
    axios({
        url: `https://search.damai.cn/searchajax.html?keyword=&cty=%E5%B9%BF%E5%B7%9E&ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&sctl=&tsg=0&st=&et=&order=1&pageSize=30&currPage=1&tn=`,
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, */*",
            // "Referer": "https://search.damai.cn",
        }
    })
})
</script>

<style lang="scss" scoped>
/*去除a标签下划线*/
a {
    text-decoration: none;
}

/*去除未被访问的a标签的下划线*/
a:link {
    text-decoration: none;
}

/*去除已经被访问过的a标签的下划线*/
a:visited {
    text-decoration: none;
}

/*去除鼠标悬停时的a标签的下划线*/
a:hover {
    text-decoration: none;
}

/*去除正在点击的a标签的下划线（鼠标按下，尚未松开）*/
a:active {
    text-decoration: none;
}

/*去除获得焦点的a标签的下划线（被鼠标点击过）*/
a:focus {
    text-decoration: none;
}
</style>