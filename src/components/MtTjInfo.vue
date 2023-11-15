<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>大牌优惠</span>
                </div>
            </template>
            <el-scrollbar height="500px" v-loading="loading">

                <div class="card_item" v-for="(item, index) in mt_brand_info_list" :key="index">
                    <img class="headImage" :src="item.squareImage">
                    <div class="card_item_mid">
                        <div><span class="poiShortName">{{ item.poiName }}</span>
                        </div>
                        <div class="skuName">{{ item.skuName }}</div>
                        <div class="price_text">
                            <div>
                                到手¥
                                <sapn class="price">{{ item.priceVO.qqFinalPrice }}</sapn>
                            </div>
                            <!-- <span class="process_bar">{{ item.processBar.text }}</span> -->
                        </div>
                    </div>
                    <div class="mark">
                        <el-icon size="25" color="#e6e6e6">
                            <Star />
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
import { reqMtTjInfo } from '@/api/index'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

let mt_brand_info_list: any = reactive([])
let current_page = ref(1)
let loading = ref(false)

const getMtTjInfo = async () => {
    loading.value = true
    let result = await reqMtTjInfo()
    if (result.code === 200) {
        loading.value = false
        mt_brand_info_list.length = 0
        mt_brand_info_list.push(...result.data.productList)
    } else {
        loading.value = false
        ElMessage({
            type: 'error',
            message: `大牌优惠获取失败!${result.msg}`
        })
    }
}

const currentChange = () => {
    getMtTjInfo()

}

onMounted(() => {
    getMtTjInfo()
})

</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.card_item {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;

    &:first-child {
        padding-top: 0;
    }

    // overflow: hidden;
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
            padding: 3px 10px;
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
            font-size: 20px;
            line-height: 20px;
        }
    }

    .skuName {
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