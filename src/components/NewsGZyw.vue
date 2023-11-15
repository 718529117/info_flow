<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span class="title">广州要闻</span>
                </div>
            </template>
            <el-scrollbar ref="scrollbarRef" height="460px" v-loading="loading">
                <div class="card_item" v-for="item in news_gzyw_list">
                    <div class="mark" @click="markId(item.time)">
                        <el-icon size="25" color="#e6e6e6" v-if="!news_gzyw_id_list.includes(item.time)">
                            <Star />
                        </el-icon>
                        <el-icon size="28" color="#ffaa00" v-else>
                            <StarFilled />
                        </el-icon>
                    </div>
                    <a class="title" :href="item.href" target="_blank">{{ item.title }}</a>
                    <div class="time">{{ item.time }}</div>
                </div>
            </el-scrollbar>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :total="50" v-model:current-page="current_page"
                    @current-change="currentChange" />

            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqNewsGzywInfo } from '@/api/index'
import { ref, onMounted, reactive } from 'vue'
import useCounter from '@/stores/counter'

const counterStore = useCounter()
let news_gzyw_list: any = reactive([])
let news_gzyw_id_list: any = reactive(counterStore.ids.news_gzyw_id_list)

let current_page = ref(1)
let loading = ref(false)
let scrollbarRef = ref(null)

const getNewsGzywInfo = async () => {
    loading.value = true
    let result = await reqNewsGzywInfo(current_page.value)
    loading.value = false
    const regexp1 = /<ul class="lists">([\s\S]*?)<\/ul>/
    const regex2 = /<a\s+href="(.*?)".*?>\s*<span>(.*?)<\/span>\s*<span class="time">\s*(.*?)\s*<\/span>/g;
    const text1 = result.match(regexp1)[1]
    const matches = text1.match(regex2);
    news_gzyw_list = matches!.map((match: any) => {
        const spanRegex = /<a\s+href="(.*?)".*?>\s*<span>(.*?)<\/span>\s*<span class="time">\s*(.*?)\s*<\/span>/
        const href = match.match(spanRegex)[1];
        const title = match.match(spanRegex)[2];
        const time = match.match(spanRegex)[3];
        return { title, time, href };
    });
}

const currentChange = () => {
    getNewsGzywInfo()
}
onMounted(() => {
    getNewsGzywInfo()
})

const markId = (id: any) => {
    let is_id = news_gzyw_id_list.indexOf(id)
    if (is_id != -1) {
        news_gzyw_id_list.splice(is_id, 1)
    } else {
        news_gzyw_id_list.push(id)
    }
    getMarkInfo()
}

const getMarkInfo = () => {
    let new_arr = news_gzyw_list.filter((item: any) => news_gzyw_id_list.includes(item.time));
    counterStore.ids.news_gzyw_id_list = news_gzyw_id_list
    counterStore.mark_info.news_gzyw_info = new_arr
}

</script>

<style lang="scss" scoped>
::v-deep .lists :first-child a {
    padding-top: 0;
}


.card_item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 5px 0;

    .title {
        text-align: justify;
        flex: 2;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        -webkit-line-clamp: 2;
    }

    .time {
        flex: 1;
        color: #999;
        text-align: right;
    }
}

.mark {
    width: 30px;
}

.pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>