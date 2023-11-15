<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <span>携程旅行</span>
            </template>
            <el-scrollbar height="500px" v-loading="loading">
                <div class="card_item_box">
                    <div class="card_item" v-for="(item, index) in xclx_info_list" :key="index" @click="markId(index)"
                        :class="xclx_info_id_list.includes(index) ? 'act_item' : ''">
                        <div class="card_item_left">
                            <div class="card_item_trip">{{ item.departCity.name }}→{{ item.arriveCity.name }}</div>
                            <div class="card_item_date">{{ item.pl[0].departDate }}</div>
                        </div>
                        <div class="card_item_right">
                            ¥<div class="price">{{ item.pl[0].price }}</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqXclxInfo } from '@/api/index'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import useCounter from '@/stores/counter'

const counterStore = useCounter()

let xclx_info_list: any = reactive([])
let xclx_info_id_list: any = reactive(counterStore.ids.xclx_info_id_list)
let loading = ref(false)

const getXclxInfo = async () => {
    loading.value = true
    let result = await reqXclxInfo()
    if (result.routes) {
        loading.value = false
        xclx_info_list.length = 0
        xclx_info_list.push(...result.routes)
    } else {
        loading.value = false
        ElMessage({
            type: 'error',
            message: `携程旅行获取失败!${result.msg}`
        })
    }
}

onMounted(() => {
    getXclxInfo()
})

const markId = (id: any) => {
    let is_id = xclx_info_id_list.indexOf(id)
    if (is_id != -1) {
        xclx_info_id_list.splice(is_id, 1)
    } else {
        xclx_info_id_list.push(id)
    }
    getMarkInfo()
}

const getMarkInfo = () => {
    let new_arr = xclx_info_list.filter((item: any, index: any) => xclx_info_id_list.includes(index));
    counterStore.ids.xclx_info_id_list = xclx_info_id_list
    counterStore.mark_info.ticket_xclx_info = new_arr
    console.log(counterStore.mark_info.ticket_xclx_info);
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