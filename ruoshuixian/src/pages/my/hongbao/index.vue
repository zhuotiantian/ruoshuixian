<template>
  <div class="container">
    <div class="header">
      <div>
        <p>余额</p>
        <p style="font-size:50px">100.00元</p>
        <p>满1000元可提现</p>
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <span>红包记录1</span>
          <span>2.00元</span>
        </li>
        <li>
          <span>红包记录1</span>
          <span>2.00元</span>
        </li>
        <li>
          <span>红包记录1</span>
          <span>2.00元</span>
        </li>
        <li>
          <span>红包记录1</span>
          <span>2.00元</span>
        </li>
        <li>
          <span>红包记录1</span>
          <span>2.00元</span>
        </li>
        <li>
          <span>红包记录1</span>
          <span>2.00元</span>
        </li>
      </ul>
      <button class="btn">去提现</button>
    </div>

  </div>
</template>
<script>
  export default {

  }

</script>
<style scoped>
  .container {
    height: 100%;
  }

  .header {
    position: relative;
    z-index: -1;
    overflow: hidden;
    width: 100%;
    height: 200px;
    color: #fce2b1;
    text-align: center;
    position: relative;
  }

  .header>div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .header>div p {
    margin: 5px 0;
  }

  .header::after {
    content: '';
    width: 140%;
    height: 200px;
    position: absolute;
    left: -20%;
    top: 0;
    z-index: -1;
    border-radius: 0 0 50% 50%;
    background: #f25544;
  }

  .content {
    background-color: #fcfcfc;
    padding: 10px 15px;
    height: calc(100% - 220px);
  }

  .content ul li {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #E4E7ED;
  }

  .content ul li:last-child {
    border-bottom: none;
  }

  .btn {
    background-color: #ffc400;
    width: 40%;
    border-radius: 30px;
    border: none;
  }

</style>
