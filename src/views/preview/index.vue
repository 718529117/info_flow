<template>
    <el-container>
        <div class="container_l">
            <div class="preview_box">
                <div class="preview_area" ref="primaryAreaRef"
                    :style="{ 'height': preview_sty.sty_data.height + 'px', 'width': preview_sty.sty_data.width + 'px', 'padding': preview_sty.sty_data.padding + 'px' }">
                    <div ref="previewTextRef">
                        <div class="preview_title" :style="{ color: preview_color.color_data.title }">{{ preview_info.title
                        }}</div>
                        <div class="preview_small_title" :style="{ color: preview_color.color_data.small_title }">{{
                            preview_info.time
                        }}</div>
                        <div class="preview_tags"
                            :style="{ justifyContent: preview_sty.sty_data.tags ? 'space-between' : 'space-evenly' }">
                            <div class="tag" :style="{ color: preview_color.color_data.tag }"
                                v-show="preview_show.show_data.show_tag1">黄金：<span
                                    :style="{ color: preview_color.color_data.tags }">{{
                                        preview_info.tag1 }}</span></div>
                            <div class="tag" :style="{ color: preview_color.color_data.tag }"
                                v-show="preview_show.show_data.show_tag2">白银：<span
                                    :style="{ color: preview_color.color_data.tags }">{{
                                        preview_info.tag2 }}</span></div>
                            <div class="tag" :style="{ color: preview_color.color_data.tag }"
                                v-show="preview_show.show_data.show_tag3">白银：<span
                                    :style="{ color: preview_color.color_data.tags }">{{
                                        preview_info.tag3 }}</span></div>
                        </div>
                        <div v-for="(_, indexs) in preview_info.info" :key="indexs">
                            <div class="preview_list" v-show="preview_info.info[indexs].length"
                                :style="{ color: preview_color.color_data.preview_list }">
                                <div class="preview_list_title" :style="{ color: preview_color.color_data.preview_items }">
                                    {{
                                        preview_info.title_list[indexs] }}</div>
                                <div class="preview_items" :style="{ color: preview_color.color_data.preview_item }">
                                    <div class="preview_item" v-for="item in preview_info.info[0]"
                                        v-show="preview_info.info[indexs].length && indexs == 0" v-html="item">
                                    </div>
                                    <div class="preview_item" v-for="item in preview_info.info[1]"
                                        v-show="preview_info.info[indexs].length && indexs == 1" v-html="item">
                                    </div>
                                    <div class="preview_item" v-for="item in preview_info.info[2]"
                                        v-show="preview_info.info[indexs].length && indexs == 2" v-html="item">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <el-container class="container_r">
            <el-main>
                <el-form label-width="120px">
                    <el-form-item label="标题">
                        <div style="display: flex;width: 100%;">
                            <el-input v-model="preview_info.title" />
                            <el-color-picker v-model="preview_color.color_data.title" />
                        </div>
                    </el-form-item>
                    <el-form-item label="小标题">
                        <div style="display: flex;width: 100%;">
                            <el-input v-model="preview_info.time" />
                            <el-color-picker v-model="preview_color.color_data.small_title" />
                        </div>
                    </el-form-item>

                    <el-form-item label="标签信息">
                        <div style="display: flex;width: 100%;">
                            <el-input v-model="preview_info.tag1" style="flex:1;margin: 0 10px;" /><el-switch
                                v-model="preview_show.show_data.show_tag1" />
                            <el-input v-model="preview_info.tag2" style="flex:1;margin: 0 10px;" /><el-switch
                                v-model="preview_show.show_data.show_tag2" />
                            <el-input v-model="preview_info.tag3" style="flex:1;margin: 0 10px;" /><el-switch
                                v-model="preview_show.show_data.show_tag3" />
                            <span style="display: flex;flex: 1;justify-content: flex-end;">
                                两边对齐<el-switch v-model="preview_sty.sty_data.tags" style="margin: 0 10px;" />
                                <el-color-picker v-model="preview_color.color_data.tag" />
                                <el-color-picker v-model="preview_color.color_data.tags" />
                            </span>
                        </div>
                    </el-form-item>
                    <el-form-item label="文段名称">
                        <div style="display: flex;width: 100%;">
                            <el-input v-for="(_, index) in preview_info.title_list" v-model="preview_info.title_list[index]"
                                style="flex:1;margin: 0 10px;" />
                            <!-- <el-input v-model="preview_info.title_list" style="flex:1;margin: 0 10px;" />
                            <el-input v-model="preview_info.title_list" style="flex:1;margin: 0 10px;" /> -->
                        </div>
                    </el-form-item>
                    <el-form-item label="文段信息">
                        <div>
                            <span style="margin-right: 20px;"> 标题颜色：<el-color-picker
                                    v-model="preview_color.color_data.preview_items" /></span>
                            <span style="margin-right: 20px;"> 内容颜色：<el-color-picker
                                    v-model="preview_color.color_data.preview_item" style="margin-right: 20px;" /></span>
                            <span style="margin-right: 20px;">强调颜色(输入**符号)：<el-color-picker
                                    v-model="preview_color.color_data.emphasize_color" /></span>
                            <!-- <span @click="insertColor">插入颜色符&nbsp;&nbsp;&nbsp;<el-button :icon="Flag">插入颜色符</el-button></span> -->
                        </div>
                        <el-tabs class="demo-tabs" style="width: 100%">
                            <el-tab-pane :label="preview_info.title_list[0]">
                                <div class="preview_item" v-for="(item, index) in preview_info.info[0]"
                                    v-show="preview_info.info[0].length">
                                    <el-input v-model="preview_info.info[0][index]"
                                        @blur="handleInputBlur($event, item, index, 0)" />
                                </div>
                            </el-tab-pane>
                            <el-tab-pane :label="preview_info.title_list[1]">
                                <div class="preview_item" v-for="(item, index) in preview_info.info[1]"
                                    v-show="preview_info.info[1].length">
                                    <el-input v-model="preview_info.info[1][index]"
                                        @blur="handleInputBlur($event, item, index, 1)" />
                                </div>
                            </el-tab-pane>
                            <el-tab-pane :label="preview_info.title_list[2]">
                                <div v-show="preview_info.info[2].length">
                                    <div class="preview_item" v-for="(item, index) in preview_info.info[2]">
                                        <el-input v-model="preview_info.info[2][index]"
                                            @blur="handleInputBlur($event, item, index, 2)" />
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>

                    </el-form-item>
                    <el-form-item label="内边距">
                        <el-slider style="width: 200px;" v-model="preview_sty.sty_data.padding" :max="50" />
                    </el-form-item>
                    <el-form-item label="宽">
                        <el-slider style="width: 200px;margin-right: 20px;" v-model="preview_sty.sty_data.width" :min="300"
                            :max="500" :step="10" />{{
                                preview_sty.sty_data.width * 2.5 }}
                    </el-form-item>
                    <el-form-item label="高">
                        <el-slider style="width: 200px;margin-right: 20px;" v-model="preview_sty.sty_data.height" :min="100"
                            :max="1000" :step="10" />{{
                                preview_sty.sty_data.height * 2.5 }}
                    </el-form-item>

                </el-form>
            </el-main>
            <el-footer style="display: flex;justify-content:flex-end;align-items: flex-end;">
                <el-button @click="getSty">读取配置</el-button>
                <el-button @click="saveSty">保存配置</el-button>
                <el-button @click="reset">恢复默认</el-button>
                <el-button type="primary" @click="primaryAreaSave">导出图片</el-button>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import useCounter from '@/stores/counter'
import html2canvas from "html2canvas"
import { ElMessage } from 'element-plus'

const primaryAreaRef = ref<any>()
const counterStore = useCounter()
let preview_color = reactive({
    color_data: {
        title: '#ff2e4d',
        small_title: '#000',
        tag: '#000',
        tags: '#000',
        preview_list: '#ff2e4d',
        preview_item: '#000',
        preview_items: '#000',
        emphasize_color: '#ff2e4d'
    }
})

let preview_show = reactive({
    show_data: {
        show_tag1: true,
        show_tag2: true,
        show_tag3: true,
    }
})
let preview_sty = reactive({
    sty_data: {
        tags: false,
        width: 360,
        height: 480,
        padding: 20
    }
})
let preview_info = reactive({
    title: '今日信息差',
    time: '',
    tag1: counterStore.mark_info.gold_price_info[0]?.buyback,
    tag2: counterStore.mark_info.gold_price_info[1]?.buyback,
    tag3: counterStore.mark_info.gold_price_info[3]?.buyback,
    title_list: ['广州要闻', '吃喝玩乐', '特价机票'],
    info: <any>[[], [], []]
})

const initTicketInfo = () => {
    let preview_info_text_temp = []
    let qnlx = counterStore.mark_info.ticket_qnlx_info
    let tclx = counterStore.mark_info.ticket_tclx_info
    let xclx = counterStore.mark_info.ticket_xclx_info
    if (qnlx) {
        for (let i = 0; i < qnlx.length; i++) {
            preview_info_text_temp.push({
                start_city: qnlx[i].depCity,
                end_city: qnlx[i].arrCity,
                date: qnlx[i].depDate,
                price: qnlx[i].price
            })
        }
    }
    if (tclx) {
        for (let i = 0; i < tclx.length; i++) {
            preview_info_text_temp.push({
                start_city: tclx[i].startcityname,
                end_city: tclx[i].endcityname,
                date: formatDate(tclx[i].flydate),
                price: tclx[i].price
            })
        }
    }

    if (xclx) {
        for (let i = 0; i < xclx.length; i++) {
            preview_info_text_temp.push({
                start_city: xclx[i].departCity.name,
                end_city: xclx[i].arriveCity.name,
                date: formatDate(xclx[i].pl[0].departDate),
                price: xclx[i].pl[0].price
            })
        }
    }

    preview_info_text_temp.forEach((item: any) => {
        preview_info.info[2].push(item.start_city + '→' + item.end_city + ' ' + item.date + ' ' + '¥' + item.price)
    })
    counterStore.mark_info.news_gzyw_info.forEach((item: any, index: number) => {
        preview_info.info[0].push((index + 1) + '.' + item.title)
    });
    counterStore.mark_info.mt_info.forEach((item: any, index: number) => {
        preview_info.info[1].push((index + 1) + '.' + item.poiShortName + '|' + item.skuName + '|¥' + item.priceVO.qqFinalPrice)
    })
    console.log(preview_info.info[2]);

}

const handleInputBlur = (e: any, item: any, index: any, id: any) => {
    const newStr = item.replace(/\*\*(.*?)\*\*/g, `<span style='color:${preview_color.color_data.emphasize_color}'>$1</span>`);
    preview_info.info[id][index] = newStr
}
const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}月${day}日`;
}
const dateParse = (data = new Date()): any => {
    if (data) {
        let date = new Date(data);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '';
        return Y + M + D;
    }
}
onMounted(() => {
    preview_info.time = dateParse()
    initTicketInfo()
    getSty()
})
const saveSty = () => {
    localStorage.setItem('preview_show', JSON.stringify(preview_show.show_data))
    localStorage.setItem('preview_sty', JSON.stringify(preview_sty.sty_data))
    localStorage.setItem('preview_color', JSON.stringify(preview_color.color_data))
    ElMessage({
        showClose: true,
        message: '保存成功',
        type: 'success',
    })
}

const getSty = () => {
    let preview_show_temp = localStorage.getItem('preview_show')
    let preview_sty_temp = localStorage.getItem('preview_sty')
    let preview_color_temp = localStorage.getItem('preview_color')
    if (preview_show_temp && preview_sty_temp && preview_color_temp) {
        preview_show.show_data = JSON.parse(preview_show_temp)
        preview_sty.sty_data = JSON.parse(preview_sty_temp)
        preview_color.color_data = JSON.parse(preview_color_temp)
        console.log(preview_color.color_data);
    }

}

const reset = () => {
    preview_info.title = '今日信息差'
    preview_info.time = dateParse()
    preview_info.tag1 = counterStore.mark_info.gold_price_info[0]?.buyback
    preview_info.tag2 = counterStore.mark_info.gold_price_info[1]?.buyback
    preview_info.title_list = ['广州要闻', '吃喝玩乐', '特价机票']
    preview_info.info = [[], [], []]
    initTicketInfo()
    preview_color.color_data = {
        title: '#ff2e4d',
        small_title: '#000',
        tag: '#000',
        tags: '#000',
        preview_list: '#ff2e4d',
        preview_item: '#000',
        preview_items: '#000',
        emphasize_color: '#ff2e4d'
    }
    preview_show.show_data = {
        show_tag1: true,
        show_tag2: true,
        show_tag3: true,
    }
    preview_sty.sty_data = {
        tags: false,
        width: 360,
        height: 480,
        padding: 20
    }
    ElMessage({
        showClose: true,
        message: '重置成功',
        type: 'success',
    })
}

const primaryAreaSave = () => {
    html2canvas(primaryAreaRef.value, {
        width: primaryAreaRef.value.clientWidth, //dom 原始宽度
        height: primaryAreaRef.value.clientHeight,
        scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
        scrollX: 0,
        useCORS: true, //支持跨域，但好像没什么用
        allowTaint: true, //允许跨域（默认false）
        scale: 2.5
    }).then((canvas) => {
        // 生成的ba64图片
        const base64Data = canvas.toDataURL('image/jpeg', 1)
        let downloadLink = document.createElement('a');
        downloadLink.href = base64Data;
        downloadLink.download = preview_info.time + '.jpg'; // 设置下载的文件名  
        downloadLink.click();
        ElMessage({
            showClose: true,
            message: '下载成功',
            type: 'success',
        })
    })
}



</script>

<style lang="scss" scoped>
.switch_sty {
    padding-top: 20px;
}

.container_l {
    flex: 1;
}

.container_r {
    flex: 2;
}

.preview_box {
    display: flex;
    justify-content: center;
    flex: 1;
    // background-color: #e6e6e6;
    padding: 20px;
    background: repeating-linear-gradient(30deg, rgb(255, 250, 227), rgb(255, 250, 227) 15px, #ffde9b 0, #ffde9b 30px);

    .preview_area {
        background-color: #fff;

        .preview_title {
            color: red;
            font-weight: bold;
            font-size: 25px;
            text-align: center;
        }

        .preview_small_title {
            text-align: center;
            font-weight: bold;
            margin: 5px 0;
        }

        .preview_tags {
            display: flex;
            justify-content: space-evenly;
        }

        .preview_list {
            .preview_list_title {
                padding-top: 5px;
                font-weight: bold;
            }

            .preview_items {
                .preview_item {
                    white-space: pre-wrap;
                    padding: 3px 0;
                }
            }
        }
    }
}
</style>