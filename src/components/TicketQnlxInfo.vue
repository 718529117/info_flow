<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <span>去哪旅行</span>
            </template>
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane :name="index" :label="item.title" v-for="(item, index) in qnlx_info_list" :key="index">
                    <el-scrollbar height="460px" v-loading="loading">
                        <div class="card_item_box">
                            <div class="card_item" v-for="(item2, index2) in item.flightInfoList" :key="index2"
                                @click="markId(index, index2, item2)"
                                :class="qnlx_info_id_list.includes(index + '' + index2) ? 'act_item' : ''">
                                <div class="card_item_left">
                                    <div class="card_item_trip">{{ item2.depCity }}→{{ item2.arrCity }}</div>
                                    <div class="card_item_date">{{ item2.depDate }}&nbsp;{{ item2.depWeekDayDesc }}</div>
                                </div>
                                <div class="card_item_right">
                                    ¥<div class="price">{{ item2.price }}</div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqQnlxInfo } from '@/api/index'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import useCounter from '@/stores/counter'

const counterStore = useCounter()

let qnlx_info_list: any = reactive([])
let qnlx_info_id_list: any = reactive(counterStore.ids.qnlx_info_id_list)
let loading = ref(false)
const activeName = ref(0)

const getQnlxInfo = async () => {
    loading.value = true
    let result = await reqQnlxInfo()
    if (result.data) {
        loading.value = false
        qnlx_info_list.length = 0
        qnlx_info_list.push(...result.data.items)
    } else {
        loading.value = false
        ElMessage({
            type: 'error',
            message: `去哪旅行获取失败!${result.msg}`
        })
    }
}

onMounted(() => {
    getQnlxInfo()
})


const markId = (id: any, id2: any, item2: any) => {
    let str_id = String(id) + String(id2)
    let is_id = qnlx_info_id_list.indexOf(str_id)
    if (is_id != -1) {
        qnlx_info_id_list.splice(is_id, 1)
        getMarkInfo(item2, is_id)
    } else {
        qnlx_info_id_list.push(str_id)
        getMarkInfo(item2, false)

    }
}

const getMarkInfo = (item2: any, flag: any) => {
    if (flag) {
        counterStore.mark_info.ticket_qnlx_info.splice(flag, 1)
    } else {
        counterStore.mark_info.ticket_qnlx_info.push(item2)
    }
}
</script>

<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

::v-deep .el-card__body {
    padding-top: 5px;
}


* {
    box-sizing: border-box;
}

.card_item_box {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-content: start;
}

.card_item {
    width: calc(50% - 5px);
    display: flex;
    justify-content: space-between;
    border: 1px solid #f1f1f1;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;

    .card_item_trip {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .card_item_date {
        font-size: 12px;
        color: #666;
    }

    .card_item_right {
        display: flex;
        align-items: center;
        color: rgb(246, 69, 14);
        font-size: 12px;

        .price {
            padding-left: 3px;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
        }
    }
}

.act_item {
    border-color: rgb(246, 69, 14);
}
</style>