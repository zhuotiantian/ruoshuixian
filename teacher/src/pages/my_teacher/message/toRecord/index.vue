<template>
  <div class="container">
    <div class="item" v-for="(item,index) in worklist" :key="index">
      <p class="title">
        <span>{{item.name}}</span>
      </p>
      <span class="remind active" v-if="item.status=='normal'" @click="remind($event,item.students_homework_id)">提醒打卡</span>
      <span class="remind" v-else>已提醒</span>
      <p style="margin-bottom:15px">
        <span class="work-item" v-for="(item,_index) in item.game" :key="_index">{{item}}</span>
      </p>
      <div class="textarea">{{item.remarks}}</div>
    </div>
  </div>
</template>
<script>
export default {
  onLoad () {
    this.token = this.$store.state.userInfo.token;
    this.getWorkList();
  },
  data () {
    return {
      worklist: [],
      works: [],
      openid: ""
    }
  },
  methods: {
    getWorkList: function () {
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
      })
    },
    remind: function (e, id) {
      this.formId = e.mp.detail.formId
      let openid = this.openid;
      this.$http.get({
        url: "/api/wxapp.user/cardReminder",
        data: {
          students_homework_id: id
        },
        header: {
          token: this.token
        }
      }).then(result => {
        if (result.code == 1) {
          wx.showToast({
            title: "提醒成功"
          })
          this.getWorkList();
        }
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
  overflow-y: auto;
}

.item {
  padding: tovmin(30);
  box-sizing: content-box;
  background: white;
  border-radius: tovmin(6);
  margin: tovmin(30) tovmin(40);
  height: tovmin(396);
  position: relative;
}

.title {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: tovmin(20);
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
  position: absolute;
  right: tovmin(-10);
  top: tovmin(30);
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
  border: tovmin(2) solid #f6f6f6;
  background: $grey-background;
  border-radius: tovmin(12);
  width: 100%;
  padding: tovmin(10) tovmin(18);
  box-sizing: border-box;
  font-size: tovmin(26);
  height: tovmin(260);
}
</style>
