const state = {
    rule: null,
    gameid: null,
    level: null,
    memoryTime: null,
    result: null,
    pockerNumber: null,
    code: null,
    userInfo: null,
    isNew: false,
    gameName: "",
    gamePages: {
        "闪视扑克牌": {
            'path': "flashPocker",
            "rule": ["自由选择闪视时间和张数", "回忆并选出看到的扑克牌"],
            'answerTime': 0
        },
        "快速扑克牌": {
            'path': "fastPocker",
            "rule": ["在最短时间内记忆52张扑克牌", "回忆并按顺序作答出所记扑克牌"],
            'answerTime': 300
        },
        "马拉松扑克牌": {
            'path': "marathonPocker",
            "rule": ["按顺序记忆并作答出所记扑克牌", "记忆牌副越多越好"],
            'answerTime': 7200
        },
        "二进制数字": {
            'path': "binaryNumber",
            "rule": ["按顺序记忆并作答出所记数字", "记忆的数字越多越好"],
            'answerTime': 1800
        },
        "快速数字": {
            'path': "fastNumber",
            "rule": ["按顺序记忆并作答出所记数字", "记忆速度越快越好"],
            'answerTime': 900
        },
        "马拉松数字": {
            'path': "marathonNumber",
            "rule": ["按顺序记忆并作答出所记词语", "记忆的词语越多越好"],
            'answerTime': 7200
        },
        "随机词语": {
            'path': "randomWords",
            "rule": ["按顺序记忆并作答出所记词语", "记忆的词语越多越好"],
            'answerTime': 1800
        },
        "人名头像": {
            'path': "peoplePic",
            "rule": ["记忆人名头像，越多越好", "作答时将人名和头像正确搭配"],
            'answerTime': 1800
        },
        "抽象图形": {
            'path': "abstractPic",
            "rule": ["记忆抽象图形，越多越好", "作答时将每行正确次序标注出来"],
            'answerTime': 1800
        },
        "听记数字": {
            'path': "listenAndRemember",
            "rule": ["按照播放数字顺序记忆并作答所听数字", "记得越多越好"],
            'answerTime': 300
        },
        "虚拟事件和日期": {
            'path': "virtualEvents",
            "rule": ["记忆虚拟事件和日期，越多越好", "记忆虚拟事件和日期，越多越好"],
            'answerTime': 900
        }
    }
};
export default state
