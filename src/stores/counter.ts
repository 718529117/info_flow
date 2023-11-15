//定义关于counter的store
import { defineStore } from 'pinia'

/*defineStore 是需要传参数的，其中第一个参数是id，就是一个唯一的值，
简单点说就可以理解成是一个命名空间
*/
const useCounter = defineStore("counter", {
    state: () => ({
        mark_info: {
            mt_info: <any>[],
            ticket_qnlx_info: <any>[],
            ticket_tclx_info: <any>[],
            ticket_xclx_info: <any>[],
            news_gzyw_info: <any>[],
            gold_price_info: <any>[]
        },
        ids: {
            mt_info_id_list: <any>[],
            tclx_info_id_list: <any>[],
            xclx_info_id_list: <any>[],
            qnlx_info_id_list: <any>[],
            news_gzyw_id_list: <any>[]
        }
    }),

    getters: {

    },

    actions: {

    }
})

//暴露这个useCounter模块
export default useCounter
