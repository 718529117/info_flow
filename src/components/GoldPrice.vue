<template>
    <el-card class="box-card">
        <template #header>
            <span>融通金</span>
        </template>
        <div>
            <el-scrollbar height="500px" v-loading="loading">
                <el-table :data="price_list" :header-row-style="{ color: '#000' }">
                    <el-table-column label-class-name="el_table_column" prop="shop_name" label="商品" align="center" />
                    <el-table-column label-class-name="el_table_column" prop="buyback" label="回购" align="center" />
                    <el-table-column label-class-name="el_table_column" prop="sale" label="销售" align="center" />
                    <el-table-column label-class-name="el_table_column" prop="time" label="时间" align="center" />
                </el-table>
                <el-table :data="price_list2" style="margin-top: 10px;" :header-row-style="{ color: '#000' }">
                    <el-table-column label-class-name="el_table_column" prop="shop_name" label="商品" align="center" />
                    <el-table-column label-class-name="el_table_column" prop="buyback" label="回购" align="center" />
                    <el-table-column label-class-name="el_table_column" prop="time" label="时间" align="center" />
                </el-table>
            </el-scrollbar>

        </div>
    </el-card>
</template>

<script setup lang="ts">
import { reqGoldPriceInfo } from '@/api/index'
import { ref, onMounted, reactive } from 'vue'
import useCounter from '@/stores/counter'

const counterStore = useCounter()

let price_list: any = reactive([])
let price_list2: any = reactive([])
let price_time = ref('')
let loading = ref(false)
let shop_name1 = ['黄金', '白银', '铂金', '钯金', '港金']
let shop_name2 = ['千足金', '18K（黄金）', 'Pt950', 'Pd990', 'Ag925']
// price_list = reuslt.

const getGoldPriceInfo = async () => {
    loading.value = true
    let result = await reqGoldPriceInfo(new Date())
    loading.value = false

    price_list.length = 0
    let result_data = result.split(",")
    result_data.shift()//删除第一个
    price_time.value = result_data.pop()//赋值并删除时间
    let result_data1 = result_data.slice(0, 10)
    let result_data2 = result_data.slice(10)

    for (let i = 0; i < result_data1.length; i += 2) {
        price_list.push({
            buyback: result_data[i],
            sale: result_data[i + 1],
            time: price_time.value,
        });
    }
    shop_name1.forEach((element, i) => {
        price_list[i].shop_name = element
    });

    for (let i = 0; i < result_data2.length; i++) {
        price_list2.push({
            buyback: result_data[i],
            time: price_time.value,
            shop_name: shop_name2[i]
        });
    }
    saveData()
}

onMounted(() => {
    getGoldPriceInfo()
})

const saveData = () => {
    counterStore.mark_info.gold_price_info = price_list
}

</script>

<style lang="scss" scoped>
.el_table_column {
    // font-weight: bold !important;
    color: #000 !important;
}
</style>