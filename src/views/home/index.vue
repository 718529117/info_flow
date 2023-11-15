<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <MtInfo />
            </el-col>
            <el-col :span="8">
                <!-- <MtTjInfo /> -->
            </el-col>
            <el-col :span="8">
                <DmInfo />
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="8">
                <TicketQnlxInfo />
            </el-col>
            <el-col :span="8">
                <TicketXclxInfo />
            </el-col>
            <el-col :span="8">
                <TicketTclxInfo />
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="8">
                <NewsGZyw />
            </el-col>
            <el-col :span="8">
                <GoldPrice />
            </el-col>
            <el-col :span="8">
                <!-- <DmInfo /> -->
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import MtInfo from '@/components/MtInfo.vue';
import MtTjInfo from '@/components/MtTjInfo.vue';
import TicketQnlxInfo from '@/components/TicketQnlxInfo.vue';
import TicketTclxInfo from '@/components/TicketTclxInfo.vue';
import TicketXclxInfo from '@/components/TicketXclxInfo.vue';
import DmInfo from '@/components/DmInfo.vue';
import NewsGZyw from '@/components/NewsGZyw.vue';
import GoldPrice from '@/components/GoldPrice.vue';
import { onMounted } from "vue"


</script>

<style lang="less" scoped></style> 