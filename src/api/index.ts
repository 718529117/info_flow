import request from "./request"

let environment = 1
// 0测试环境，1正式环境

let mt_url_base = ""
let mt_tj_url_base = ""
let qnlx_url_base = ""
let tclx_url_base = ""
let xclx_url_base = ""
let dm_url_base = ""
let news_gzyw_base = ""
let gold_price_base = ""
if (!environment) {
    mt_url_base = "api_mt/"
    mt_tj_url_base = "api_tj/"
    qnlx_url_base = "api_qn/"
    tclx_url_base = "api_tc/"
    xclx_url_base = "api_xc/"
    dm_url_base = "api_dm/"
    news_gzyw_base = "api_gzyw/"
    gold_price_base = "api_gold/"
} else {
    mt_url_base = "https://peppermall.meituan.com/"
    mt_tj_url_base = "https://apisg.meituan.com/"
    qnlx_url_base = "https://touch.qunar.com/"
    tclx_url_base = "https://wx.17u.cn/"
    xclx_url_base = "https://m.ctrip.com/"
    dm_url_base = ""
    news_gzyw_base = "https://news.ycwb.com/"
    gold_price_base = "http://beijingrtj.com/"
}

let mt_info_url = mt_url_base + "api/product/mtlj/limit/list?"
let mt_tj_info_url = mt_tj_url_base + "sg/channel/v1/homepage/list?ci=30&lng=114.05956268310547&lat=22.54286003112793&mainOffset=0&mainPageSize=30&methods=mainZone"//美团特价
let qnlx_info_url = qnlx_url_base + "lowFlightInterface/api/getAirline"//去哪旅行机票
let tclx_info_url = tclx_url_base + "cheapflights/bffapi/cheapflightapi/cheapselect/domestic"//同城旅行机票
let xclx_info_url = xclx_url_base + "restapi/soa2/19728/fuzzySearch"//携程旅行机票
let dm_info_url = dm_url_base + "https://search.damai.cn/searchajax.html?"//大麦
let news_gzyw_url = news_gzyw_base
let gold_price_url = gold_price_base + "admin/get_price5.php?&t="

let qnlx_info_body = JSON.stringify({
    "b":
    {
        "simpleData": "yes",
        "locationCity": "广州",
        "holiday": "未来30天",
        "t": "f_urInfo_page_superLow",
        "cat": "miniapp_bargain_recommend_more_lowFlight-cheap-ticket"
    },
    "c": {}
})
let tclx_info_body = JSON.stringify({
    "oc": "CAN",
    "userTag": 2,
    "channel": 852
})
let xclx_info_body = JSON.stringify({
    "tt": 1,
    "source": "themeboard",
    "st": 24,
    "segments": [
        {
            "dcs": [
                {
                    "code": "CAN",
                    "ct": 1
                }
            ],
            "acs": [
                {
                    "ct": 6,
                    "code": "bd_49_29"
                }
            ],
            "dow": [],
            "sr": null,
            "drl": [
                {
                    "begin": "2023-10-15",
                    "end": "2023-12-14"
                }
            ]
        }
    ],
    "filters": null,
    "guid": "8fd6070a-1a6c-40b3-ae75-68f8a26c437b",
    "head": {
        "cid": "09031020115138993860",
        "ctok": "",
        "cver": "",
        "lang": "01",
        "sid": "55555549",
        "syscode": "30",
        "auth": "",
        "extension": [
            {
                "name": "protocal",
                "value": "https"
            },
            {
                "name": "source",
                "value": "miniapp"
            },
            {
                "name": "fromVersion",
                "value": "2"
            }
        ]
    }
})


export const reqMtInfo = (
    requestId: string,
    offset: number,
    sort = 2, //2销量排序,1离我距离,4价格排序，空智能排序
    ver = '3.37.1',
    platform = 9,
    limit = 10,
    cityId = 20
) => request.get<any, any>(`${mt_info_url}_ver=${ver}&platform=${platform}&offset=${offset}&limit=${limit}&cityId=${cityId}&sort=${sort}&requestId=${requestId}`)

export const reqMtTjInfo = (
    // pageSize = 10,
    // page = 0,
    // sortRuleId = 35,
    // strategyId = 3514,
    // ver = '3.22.30',
    // cityId = 20
) => request<any, any>({
    url: mt_tj_info_url,
    method: 'post',
    headers: {
        "Origin": "https://apisg.meituan.com"
    }
})

export const reqQnlxInfo = () => request<any, any>({
    url: qnlx_info_url,
    method: 'post',
    data: qnlx_info_body,
    headers: {
        "Content-Type": "application/json"
    }
})

export const reqTclxInfo = () => request<any, any>({
    url: tclx_info_url,
    method: 'post',
    data: tclx_info_body,
    headers: {
        "Content-Type": "application/json"
    }
})

export const reqXclxInfo = () => request<any, any>({
    url: xclx_info_url,
    method: 'post',
    data: xclx_info_body,
    headers: {
        "Content-Type": "application/json"
    }
})

export const reqDmInfo = (keyword = '', cty = '广州', ctl = '演唱会', sctl = '', tsg = 0, st = '', et = '', order = 1, pageSize = 30, currPage = 1, tn = '') => request<any, any>({
    url: `${dm_info_url}keyword=${keyword}&cty=${cty}&ctl=${ctl}演唱会&sctl=${sctl}&tsg=${tsg}&st=${st}&et=${et}&order=${order}&pageSize=${pageSize}&currPage=${currPage}&tn=${tn}`,
    method: 'get',
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://search.damai.cn",
    }
})
export const reqNewsGzywInfo = (page = 1) => request<any, any>({
    url: `${news_gzyw_url}n_bd_gz${page != 1 ? '_' + page : ''}.htm`,
    method: 'get',
})
export const reqGoldPriceInfo = (time: any) => request<any, any>({
    url: gold_price_url + time,
    method: 'post',
})