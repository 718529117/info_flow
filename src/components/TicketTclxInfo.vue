<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <span>同城旅行</span>
            </template>
            <el-scrollbar height="500px" v-loading="loading">
                <div class="card_item_box">
                    <div class="card_item" v-for="(item, index) in tclx_info_list" :key="index" @click="markId(index)"
                        :class="tclx_info_id_list.includes(index) ? 'act_item' : ''">
                        <div class="card_item_left">
                            <div class="card_item_trip">{{ item.startcityname }}→{{ item.endcityname }}</div>
                            <div class="card_item_date">{{ item.flydate }}&nbsp;{{ item.week }}</div>
                        </div>
                        <div class="card_item_right">
                            ¥<div class="price">{{ item.price }}</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqTclxInfo } from '@/api/index'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import useCounter from '@/stores/counter'

const counterStore = useCounter()

let tclx_info_list: any = reactive([])
let tclx_info_id_list: any = reactive(counterStore.ids.tclx_info_id_list)
let loading = ref(false)

const getTclxInfo = async () => {
    loading.value = true
    let result = await reqTclxInfo()
    if (result.code === 0) {
        loading.value = false
        tclx_info_list.length = 0
        tclx_info_list.push(...result.data)
    } else {
        loading.value = false
        ElMessage({
            type: 'error',
            message: `同城旅行获取失败!${result.msg}`
        })
    }
}

onMounted(() => {
    getTclxInfo()
})


const markId = (id: any) => {
    let is_id = tclx_info_id_list.indexOf(id)
    if (is_id != -1) {
        tclx_info_id_list.splice(is_id, 1)
    } else {
        tclx_info_id_list.push(id)
    }
    getMarkInfo()
}

const getMarkInfo = () => {
    let new_arr = tclx_info_list.filter((item: any, index: any) => tclx_info_id_list.includes(index));
    counterStore.ids.tclx_info_id_list = tclx_info_id_list
    counterStore.mark_info.ticket_tclx_info = new_arr
    console.log(counterStore.mark_info.ticket_tclx_info);
}

</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.card_item_box {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
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