<template>
    <div class="container">
        <div class="item" v-for="(item,index) in worklist" :key="index">
            <p class="title">
                <span>{{item.name}}</span>
            </p>
            <form report-submit="true" @submit="remind($event,item.students_homework_id)">
                <button class="remind active" v-if="item.reminder_status=='normal'" form-type="submit" data-type="click">提醒打卡</button>
                <button class="remind" v-else form-type="submit" data-type="click">已提醒</button>
            </form>
            <p style="margin-bottom:15px">
                <span class="work-item" v-for="(item,_index) in works" :key="_index">{{item.game_name}}</span>
            </p>
            <div class="textarea">{{item.remarks}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        onLoad() {
            this.userInfo = this.$getParams("userInfo");
            // this.code = this.$getParams("code");
            this.token = this.userInfo.token;
            wx.getStorage({
                key: "code",
                success: (res) => {
                    this.code = res.data;
                    this.getOpenid();

                }
            });
            this.getWorkList();
        },
        data() {
            return {
                worklist: [],
                works: [],
                openid: ""
            }
        },
        methods: {
            getOpenid: function() {
                this.$http.get({
                    url: "/api/wxapp.user/getOpenId",
                    data: {
                        code: this.code,
                        type: "teacher"
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    this.openid = result.data.openid;
                });
            },
            getWorkList: function() {
                this.$http.get({
                    url: "/api/wxapp.student/cardTaskList",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    this.worklist = result.data;
                    this.worksid = result.data.map(e => {
                        return e.students_homework_details_id
                    });
                    this.getWorks();
                })
            },
            getWorks: function() {
                this.worksid.forEach(e => {
                    this.$http
                        .get({
                            url: "/api/wxapp.student/myCardTask",
                            data: {
                                students_homework_details_id: e
                            },
                            header: {
                                token: this.token
                            }
                        })
                        .then(result => {
                            this.works = result.data;
                        });
                })
            },
            remind: function(e, id) {
                this.formId = e.mp.detail.formId
                let openid = this.openid;
                this.$http.get({
                    url: "/api/wxapp.user/cardReminder",
                    data: {
                        temp_open_id: openid,
                        students_homework_id: id,
                        form_id: this.formId
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    console.log(result);
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        position: absolute;
        height: 100%;
        width: 100%;
        background: $grey-background;
    }

    .item {
        padding: tovmin(30);
        box-sizing: content-box;
        background: white;
        border-radius: tovmin(6);
        margin: tovmin(30) tovmin(40);
        height: tovmin(396);
    }

    .title {
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-bottom: tovmin(20);
    }

    form {
        position: absolute;
        right: tovmin(30);
        top: tovmin(60);
        z-index: 999;
    }

    .remind {
        font-size: tovmin(24);
        display: inline-block;
        height: tovmin(48);
        width: tovmin(108);
        line-height: tovmin(48);
        text-align: center;
        border-radius: tovmin(6);
        padding: 0;
        background: #ebebeb;
    }

    .remind.active {
        background: $yellow;
    }

    .work-item {
        font-size: tovmin(26);
        color: white;
        background: $middle-blue;
        display: inline-block;
        padding: tovmin(4) tovmin(18);
        border-radius: tovmin(44);
        margin-right: tovmin(20);
    }

    .textarea {
        border: tovmin(2) solid #F6F6F6;
        background: $grey-background;
        border-radius: tovmin(12);
        width: 100%;
        padding: tovmin(10) tovmin(18);
        box-sizing: border-box;
        font-size: tovmin(26);
        height: tovmin(260);
    }
</style>