<template>
    <div class="container">
        <div class="fog" v-if="showDrop||showSuccessBox" @click="showDrop=false"></div>
        <div class="alertBox" v-if="showSuccessBox&&ratio">
            <image class="image" :src="'/static/images/my/check@'+ratio+'x.png'" />
            <span>发布成功</span>
        </div>
        <div class="top">
            <input placeholder-style="color: #AFAFAF;" type="text" v-model="workname" placeholder="请输入作业名称" />
            <p class="item" @click="showGroup">{{selectGroupName}}</p>
            <p class="item" @click="showStudents">{{selectStudentsName}}</p>
        </div>
        <div class="middle">
            <p class="title">选择游戏：</p>
            <ul class="gameList">
                <li v-for="(item,index) in game" :key="index" @click="selectGameHan(item,index)">
                    <em :class="{checkBox:true, active:item.selected}"></em>
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <textarea cols="30" rows="10" v-model="remarks" placeholder="备注"></textarea>
        <p style="text-align:center">
            <button class="submit-btn btn" @click="sendMessage">点评</button>
        </p>
        <div :class="{drop_up:true,up:showDrop,down:!showDrop}">
            <template v-if="type=='group'">
                <p class="title">组别选择</p>
                <scroll-view :style="{'height': '384rpx'}" scroll-y="true">
                    <ul class="list">
                        <li v-for="(item,index) in stu_list" :key="index" @click="selectGroup(index)">
                            <span>{{item.name}}</span>
                            <image class="icon" v-if="selectedGroup==index" :src="'/static/images/my/select.png'" />
                        </li>
                    </ul>
                </scroll-view>
            </template>
            <template v-else>
                <p class="title">学生选择</p>
                <scroll-view :style="{'height': '384rpx'}" scroll-y="true">
                    <ul class="list">
                        <li v-for="(item,index) in students" :key="index" @click="selectStudents(index,item.id)">
                            <span>{{item.nickname}}</span>
                            <image class="icon" v-if="selectedUser.indexOf(item.id)>=0" :src="'/static/images/my/select.png'" />
                        </li>
                    </ul>
                </scroll-view>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showDrop: false,
                game: [],
                ratio: 1,
                showSuccessBox: false,
                token: "",
                type: "",
                students: [],
                stu_list: [],
                selectedGroup: 0,
                selectedUser: [],
                selectGroupName: "组别",
                selectStudentsName: ["学生"],
                selectGame: [],
                workname: "",
                remarks: ""
            };
        },
        onShow() {
            this.token = wx.getStorageSync("userInfo").token;
        },
        mounted() {
            this.ratio = this.globalData.ratio;
            this.getList();
            this.getIndexData();
        },
        methods: {
            getIndexData: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.game/getGameList",
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        this.game = result.data;
                        this.game.map(e => {
                            return {
                                name: e.name,
                                selected: false
                            };
                        });
                    });
            },
            sendMessage: function() {
                this.showSuccessBox = true;
                let params = {
                    name: this.workname,
                    game_ids: this.selectGame.join(","),
                    user_ids: this.selectedUser.join(","),
                    remarks: this.remarks
                };
                this.$http.post({
                    url: "/api/wxapp.student/publishStudentAssignments",
                    data: params,
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    setTimeout(() => {
                        this.showSuccessBox = false;
                    }, 1500);
                })
            },
            getList: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.student/myStudents",
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        this.stu_list = result.data;
                        this.students = this.stu_list[0].user || [];
                    });
            },
            showGroup: function() {
                this.showDrop = true;
                this.type = "group";
            },
            showStudents: function() {
                this.showDrop = true;
                this.type = "students";
            },
            selectGroup: function(index) {
                this.selectedGroup = index;
                this.students = this.stu_list[index].user;
                this.selectGroupName = this.stu_list[index].name;
                this.showDrop = false;
            },
            selectStudents: function(index, id) {
                this.selectedUser.push(id);
                this.selectStudentsName = [];
                this.selectStudentsName.push(this.students[index].nickname);
                this.showDrop = false;
            },
            selectGameHan: function(item, index) {
                this.$set(this.game, index, {
                    name: item.name,
                    selected: true,
                    id: item.id
                });
                this.selectGame.push(item.id);
            },
        }
    };
</script>
<style lang="scss" scoped>
    .top input,
    .top .item {
        border-bottom: 1px solid #f3f3f3;
        height: tovmin(100);
        line-height: tovmin(100);
    }

    .top .item {
        color: #c6c6c6;
    }

    .container {
        padding: tovmin(60);
        position: fixed;
        height: calc(100% - 120rpx);
        width: calc(100% - 120rpx);
        background: $grey-background;
        box-sizing: content-box;
    }

    .title {
        color: $black;
    }

    .middle {
        margin-top: 31px;
    }

    .gameList {
        display: grid;
        grid-template-columns: 30% 30% 30%;
        grid-template-rows: 23% 23% 23% 23%;
        grid-gap: 10px;
        justify-content: center;
        align-items: center;
        margin-top: tovmin(38);
        font-size: tovmin(26);
    }

    .gameList {
        white-space: nowrap;
    }

    textarea {
        margin-top: tovmin(60);
        font-size: tovmin(26);
        height: tovmin(250);
    }

    .btn {
        width: tovmin(362);
        height: tovmin(88);
        line-height: tovmin(88);
        border-radius: tovmin(44);
        border: tovmin(2) solid transparent;
        font-size: 14px;
        margin: 0 auto;
    }

    .drop_up {
        height: tovmin(460);
        background: white;
        position: absolute;
        z-index: 1001;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: tovmin(28);
    }

    .drop_up .title {
        color: #b4b4b4;
        font-size: tovmin(24);
        line-height: tovmin(74);
        text-indent: tovmin(22);
    }

    .list {
        width: 100%;
    }

    .list li {
        height: tovmin(88);
        line-height: tovmin(88);
        padding: 0 tovmin(30);
    }

    .list li:nth-child(2n) {
        background: #f8fbff;
    }

    .icon {
        height: tovmin(28);
        width: tovmin(32);
        float: right;
    }

    .image {
        width: tovmin(88);
        height: tovmin(88);
        margin-bottom: tovmin(40);
    }

    .alertBox {
        background: white;
        display: flex;
        flex-direction: column;
        height: tovmin(272);
        width: tovmin(272);
        border-radius: tovmin(22);
        position: absolute;
        top: 35%;
        left: 50%;
        margin-left: tovmin(-136);
        z-index: 1001;
        justify-content: center;
        align-items: center;
    }

    .down {
        animation: slide-down 0.5s;
        animation-fill-mode: forwards;
    }

    .up {
        animation: slide-up 0.5s;
        animation-fill-mode: forwards;
    }

    @keyframes slide-down {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(tovmin(1000));
            display: block;
        }
    }

    @keyframes slide-up {
        from {
            transform: translateY(tovmin(1000));
        }

        to {
            transform: translateY(0);
            display: none;
        }
    }
</style>