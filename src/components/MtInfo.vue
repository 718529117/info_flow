<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>吃喝玩乐</span>
                </div>
            </template>
            <el-scrollbar height="500px" v-loading="loading">
                <div class="card_item" v-for="(item, index) in mt_info_list" :key="index">
                    <img class="headImage" :src="item.squareImage">
                    <div class="card_item_mid">
                        <div><span class="poiShortName">{{ item.poiShortName }}</span>
                        </div>
                        <div class="skuName">{{ item.skuName }}</div>
                        <div class="price_text">
                            <div>
                                到手¥
                                <sapn class="price">{{ item.priceVO.qqFinalPrice }}</sapn>
                            </div>
                            <span class="process_bar">{{ item.processBar.text }}</span>
                        </div>
                    </div>
                    <div class="mark" @click="markId(item.productId)">
                        <el-icon size="25" color="#e6e6e6" v-if="!mt_info_id_list.includes(item.productId)">
                            <Star />
                        </el-icon>
                        <el-icon size="28" color="#ffaa00" v-else>
                            <StarFilled />
                        </el-icon>
                    </div>
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
import { reqMtInfo } from '@/api/index'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import useCounter from '@/stores/counter'

const counterStore = useCounter()

let mt_info_list: any = reactive([])
let mt_info_id_list: any = reactive(counterStore.ids.mt_info_id_list)
let current_offset = ref(0)
let current_page = ref(1)
let requestId = ref('')
let loading = ref(false)

const getMtInfo = async () => {
    loading.value = true
    let result = await reqMtInfo(requestId.value, current_offset.value)
    if (result.code === 200) {
        loading.value = false
        mt_info_list.length = 0
        mt_info_list.push(...result.data.productList)
        requestId.value = result.data.requestId
    } else {
        loading.value = false
        ElMessage({
            type: 'error',
            message: `吃喝玩乐获取失败!${result.msg}`
        })
    }
}

const currentChange = () => {
    current_offset.value = (current_page.value - 1) * 20
    console.log(current_offset.value);

    getMtInfo()

}

onMounted(() => {
    getMtInfo()
})

const markId = (id: any) => {
    let is_id = mt_info_id_list.indexOf(id)
    if (is_id != -1) {
        mt_info_id_list.splice(is_id, 1)
    } else {
        mt_info_id_list.push(id)
    }
    getMarkInfo()
}

const getMarkInfo = () => {
    let new_arr = mt_info_list.filter((item: any) => mt_info_id_list.includes(item.productId));
    counterStore.ids.mt_info_id_list = mt_info_id_list
    counterStore.mark_info.mt_info = new_arr
}

</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}


.card_item:first-child {
    padding-top: 0;
}

.card_item {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;

    .mark {
        position: absolute;
        right: 0;
        top: 5px;
    }

    .card_item_mid {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        white-space: nowrap;
        overflow: hidden;

        .poiShortName {
            padding: 2px 5px;
            background-color: antiquewhite;
            color: saddlebrown;
            font-size: 12px;
            border-radius: 3px;
        }
    }

    .headImage {
        width: 60px;
        height: 60px;
        border-radius: 10px;
    }

    .price_text {
        white-space: nowrap;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        color: rgb(246, 69, 14);
        font-size: 12px;

        .process_bar {
            color: #666;
        }

        .price {
            padding-left: 5px;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
        }
    }

    .skuName {
        margin-top: 3px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

}

.pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>