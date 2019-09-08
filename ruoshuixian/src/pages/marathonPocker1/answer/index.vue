<template>
    <div class="container">
        <div class="fog" v-if="showFog"></div>
        <alertBox :text="text" v-if="showFog&&!showTip" @hideFog="hideFog" @confirm="confirm"></alertBox>
        <div class="tips" v-if="showFog&&showTip">
            <p style="margin-bottom:30rpx">你可以通过以下两种方式对扑克牌的顺序进行修改</p>
            <p>方式一、双击屏幕上半区的任意一张扑克，将这张扑克牌退回原位。</p>
            <p>方式二、单击屏幕上半区的任意一张扑克，然后长按下半区的任意一张扑克，进行“替换位置/从前面插入/从后面插入”操作。</p>
            <p>
                <span class="btn default-btn" @click="shideTip">我知道了</span>
            </p>
        </div>
        <CardTitle seconds="3600" type="作答完成" @finish="finish"></CardTitle>
        <div v-if="result.length>0" class="btnGroup" style="position:relative:z-index:998;">
            <div class="btn default-btn" @click.stop="replace">替换</div>
            <div class="btn default-btn" @click="insertBefore">从前插入</div>
            <div class="btn default-btn" @click="insertAfter">从后插入</div>
        </div>
        <div class="result-div">
            <em class="arrow arrow-left" v-if="allResult[currentIndex-1].length>0" style="flex:1;"></em>
            <scroll-view :style="{width:'99%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
                <div class="result" :style="{width:102+(allResult[currentIndex-1].length-1)*20+'rpx'}">
                    <image :class="{pocker:true,active:item.active}" @click="backHandler($event,index,item.rowIndex,item.columnIndex)" :style="{right:(allResult[currentIndex-1].length-index)*20+'rpx'}" v-for="(item,index) in allResult[currentIndex-1]" :key="index" :src="item.url" ref="pocker" />
                </div>
            </scroll-view>
            <em class="arrow arrow-right" v-if="allResult[currentIndex-1].length>0" style="flex:1;"></em>
        </div>
        <div class="list">
            <div class="row" v-for="(item,index) in pocker" :key="index">
                <image @click="selectPocker($event,index,_index)" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend($event,index,_index)" ref="pocker" :class="{pocker:true,hidden:!_item.show,active:_item.active}" v-for="(_item,_index) in item" :key="_index" :src="'/static/images/pocker/'+(_index/1+1)+'-'+(index/1+1)+'.png'" />
            </div>
        </div>
        <div class="pageFoot">
            <span class="pageBtn" @click="prevPage">上一页</span>
            <div class="btn-group">
                <span :class="{item:true, active:item.active}" @click="select(index,item)" v-for="(item,index) in groupPage[currentPage]" :key="index">{{item.number}}幅</span>
            </div>
            <span class="pageBtn" @click="nextPage">下一页</span>
            <span class="btn tips-btn" style="float-right" @click="showTips">操作提示</span>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle"
    import Keybord from "@/components/Keybord"
    import alertBox from "@/components/alertBox"
    export default {
        components: {
            CardTitle,
            Keybord,
            alertBox
        },
        data() {
            let pocker = [];
            for (let j = 0; j < 4; j++) {
                let columns = [];
                for (let i = 0; i < 13; i++) {
                    columns.push({
                        show: true,
                        active: false
                    });
                };
                pocker.push(columns);
            }
            return {
                pocker: pocker,

                showFog: false,
                showTip: false,
                result: [],
                lastClick: 0,
                showBtnGroup: false,
                game_records_id: 1,
                userInfo: {},
                selectTopPocker: {},
                pages: [],
                groupPage: [],
                currentPage: 0,
                currentIndex: 1,
                allResult: [],
            }
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data())
            let level = this.$getStorage("level");
            let rule = this.$getStorage("rule");
            let userInfo = this.$getStorage("userInfo");
            Promise.all([level, rule, userInfo]).then(values => {
                this.level = values[0];
                this.rule = values[1].rules_of_the_game.filter(e => {
                    return e.game_level == (this.level || "primary")
                })[0];
                this.token = values[2].token;
                this.list = this.rule.list;
                // 生成pock的副数
                for (var i = 1; i <= this.list.length; i++) {
                    this.pages.push({
                        number: i,
                        active: false
                    });
                    this.allResult.push([]);
                };
                this.pages[0].active = true;
                let groupPage = [];
                for (var i = 0; i < this.pages.length; i += 10) {
                    groupPage.push(this.pages.slice(i, i + 10));
                };
                this.groupPage = groupPage;
                this.startTime = new Date().getTime();
                this.game_records_id = this.rule.game_records_id;
            })
        },
        methods: {
            finish: function(data) {
                if (data == "timeout") {
                    this.confirm();
                } else {
                    this.showFog = true;
                }
            },
            hideFog: function() {
                this.showFog = false;
            },
            showTips: function() {
                this.showFog = true;
                this.showTip = true;
            },
            shideTip: function() {
                this.showFog = false;
                this.showTip = false;
            },
            confirm: function() {
                this.endTime = new Date().getTime();
                let result = [];
                for (var i = 0; i < this.allResult.length; i++) {
                    let item = [];
                    for (var j = 0; j < this.allResult[i].length; j++) {
                        item.push({
                            color: this.allResult[i][j].rowIndex,
                            index: this.allResult[i][j].columnIndex,
                        })
                    };
                    result.push(item)
                }
                this.$http.post({
                    url: "/api/wxapp.game/submitTheGame",
                    data: {
                        game_records_id: this.game_records_id,
                        game_time: (this.endTime - this.startTime) / 1000,
                        content: JSON.stringify(result)
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    if (result.code == 1) {
                        this.$setStorage("result", result.data).then(() => {
                            wx.navigateTo({
                                url: "../result/main"
                            })
                        });
                    } else {
                        wx.showToast({
                            title: result.msg,
                            icon: "none"
                        });
                    }
                })

            },
            touchstart: function() {
                this.touchstartTime = new Date().getTime();
            },
            touchend: function(e, index, _index) {
                this.touchendTime = new Date().getTime();
                if (this.touchendTime - this.touchstartTime < 500) {

                } else {
                    this.longPress(e, index, _index);
                }
            },
            longPress: function(e, index, _index) {
                this.showBtnGroup = true;
                //index:行标
                //_index:列标
                this.selectBottomPocker = {
                    e,
                    index,
                    _index
                };
                this.$set(this.pocker[index][_index], "active", !this.pocker[index][_index].active);
            },
            selectPocker: function(e, index, _index) {
                if (this.touchendTime - this.touchstartTime > 500) return false
                this.allResult[this.currentIndex - 1].push({
                    url: '/static/images/pocker/' + (_index / 1 + 1) + '-' + (index / 1 + 1) + '.png',
                    rowIndex: index,
                    columnIndex: _index,
                    active: false
                });
                let hidden = this.pocker[index];
                hidden[_index].show = false;
                this.$set(this.pocker, "index", hidden);
            },
            backHandler: function(e, index, row, column) {
                let currentTime = new Date().getTime();
                if (currentTime - this.lastClick < 300) {
                    this.allResult[this.currentIndex - 1].splice(index, 1);
                    this.$set(this.pocker[row][column], "show", true);
                } else {
                    this.lastClick = new Date().getTime();
                    this.$set(this.allResult[this.currentIndex - 1][index], "active", !this.allResult[this.currentIndex - 1][index].active);
                    //index:result中的位置,row:下半区行标,column:下半区列标
                    this.selectTopPocker = {
                        e,
                        index,
                        row,
                        column
                    }
                }
            },
            hidden: function() {
                let hidden = this.pocker[this.selectBottomPocker.index];
                hidden[this.selectBottomPocker._index].show = false;
                this.$set(this.pocker, this.selectBottomPocker.index, hidden);
            },
            removeActive: function() {
                this.allResult[this.currentIndex - 1].forEach(e => {
                    e.active = false
                });
            },
            show: function() {
                this.$set(this.pocker[this.selectTopPocker.row][this.selectTopPocker.column], "show", true);
            },
            replace: function() {
                this.removeActive();
                this.$set(this.allResult[this.currentIndex - 1], this.selectTopPocker.index, {
                    url: '/static/images/pocker/' + (this.selectBottomPocker._index / 1 + 1) + '-' + (this.selectBottomPocker.index / 1 + 1) + '.png',
                    rowIndex: this.selectBottomPocker.index,
                    columnIndex: this.selectBottomPocker._index,
                    active: true
                });
                this.hidden();
                this.show();
            },
            insertBefore: function() {
                this.removeActive();
                this.allResult[this.currentIndex - 1].splice(this.selectTopPocker.index + 1, 0, {
                    url: '/static/images/pocker/' + (this.selectBottomPocker._index / 1 + 1) + '-' + (this.selectBottomPocker.index / 1 + 1) + '.png',
                    rowIndex: this.selectBottomPocker.index,
                    columnIndex: this.selectBottomPocker._index,
                    active: true,
                    index: this.selectTopPocker.index + 1
                });
                this.$set(this.selectTopPocker, "index", this.selectTopPocker.index + 1);
                this.$set(this.selectTopPocker, "row", this.selectBottomPocker.index);
                this.$set(this.selectTopPocker, "column", this.selectBottomPocker._index);
                this.hidden();
            },
            insertAfter: function() {
                this.allResult[this.currentIndex - 1].forEach(e => {
                    e.active = false
                });
                this.allResult[this.currentIndex - 1].splice(this.selectTopPocker.index, 0, {
                    url: '/static/images/pocker/' + (this.selectBottomPocker._index / 1 + 1) + '-' + (this.selectBottomPocker.index / 1 + 1) + '.png',
                    rowIndex: this.selectBottomPocker.index,
                    columnIndex: this.selectBottomPocker._index,
                    active: true,
                    index: this.selectTopPocker.index
                });
                this.$set(this.selectTopPocker, "index", this.selectTopPocker.index);
                this.$set(this.selectTopPocker, "row", this.selectBottomPocker.index);
                this.$set(this.selectTopPocker, "column", this.selectBottomPocker._index);
                this.hidden();
            },
            nextPage: function() {
                if (this.currentPage > 3) {
                    return false
                } else {
                    this.currentPage++;
                    this.pages = this.pages.map((e) => {
                        return e + 10
                    });
                }
            },
            prevPage: function() {
                if (this.currentPage > 1) {
                    this.currentPage--
                    this.pages = this.pages.map((e) => {
                        return e - 10
                    });
                }
            },
            select: function(index, item) {
                this.$set(this.groupPage, this.currentPage, this.groupPage[this.currentPage].map(e => {
                    return {
                        number: e.number,
                        active: false
                    }
                }));
                this.$set(this.groupPage[this.currentPage], index, {
                    number: item.number,
                    active: true
                });
                this.currentIndex = this.groupPage[this.currentPage][index].number;
                this.pocker.forEach(e => {
                    e.forEach(m => {
                        m.show = true;
                    })
                });
                if (this.allResult[this.currentIndex - 1].length > 0) {
                    this.allResult[this.currentIndex - 1].forEach(e => {
                        this.$set(this.pocker[e.rowIndex][e.columnIndex], "show", false);
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .hidden {
        visibility: hidden;
    }

    .container {
        padding-top: tovmin(520);
        color: white;
        text-align: center;
        padding-bottom: tovmin(100);
    }

    .pageFoot {
        position: fixed;
        width: 100%;
        height: tovmin(120);
        background: white;
        z-index: 999;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        padding: 0 tovmin(60);
        box-sizing: border-box;
        font-size: tovmin(28);
        align-items: center;
    }

    .pageBtn {
        color: $yellow;
    }

    .item {
        height: tovmin(80);
        width: tovmin(80);
        display: inline-block;
        border-radius: tovmin(8);
        line-height: tovmin(80);
        text-align: center;
        margin-right: tovmin(24);
        border: tovmin(2) solid #E5E5E5;
        color: $black;
    }

    .item.active {
        color: white;
        background: $middle-blue;
        border: none;
    }


    .tips {
        position: fixed;
        top: tovmin(150);
        padding: 0 tovmin(100);
        z-index: 1002;
    }

    .tips p {
        text-align: left;
    }

    .tips p:last-child {
        text-align: center;
    }

    .pocker {
        width: tovmin(102);
        height: tovmin(150);
        margin-right: tovmin(10);
        margin-bottom: tovmin(10);
    }

    .operationTips {
        text-align: right;
        padding-right: tovmin(30);
        padding-bottom: tovmin(30);
    }

    .result {
        position: absolute;
        min-width: 100%;
        height: 100%;
        bottom: tovmin(75);
    }

    .result image {
        position: absolute;
        bottom: tovmin(0);
    }

    .result-div {
        display: flex;
        height: tovmin(238);
        align-items: center;
    }
</style>