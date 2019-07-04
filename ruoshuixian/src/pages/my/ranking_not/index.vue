<template>
  <div class="container">
    <div class="header">
      <span style="flex:1">
        <image class="image" src="/static/images/ranking_image1.png"></image>
      </span>
      <span style="flex:6">我</span>
      <span style="flex:1">04</span>
    </div>
    <div class="content">
      <ul>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" src="/static/images/ranking_image2.png"></image>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" src="/static/images/ranking_image4.png"></image>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" src="/static/images/ranking_image5.png"></image>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <span class="number">04</span>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <span class="number">05</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style scoped>
  .container {
    height: calc(100% - 30px);
  }

  .header {
    padding: 0 30px;
    height: 60px;
    background: #173771;
    color: white;
    display: flex;
    align-items: center;
  }

  .image {
    width: 45px;
    height: 40px;
  }

  .content {
    padding: 15px;
    background: #f7f7f7;
    height: calc(100% - 60px);
  }

  .content ul {
    background: white;
    padding: 15px 15px 10px 15px;
    height: calc(100% - 30px);
  }

  .content ul li {
    display: flex;
    align-items: center;
    height: 60px;
  }

  .icon {
    height: 30px;
    width: 30px
  }

  .number {
    color: #b0bdd0;
  }

</style>
