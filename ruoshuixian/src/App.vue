<script>
  export default {

  }

</script>

<style>
  page {
    height: 100%;
    width: 100%;
    font-size: 14px;
    font-family: "Noto Sans S Chinese";
    color: #333333;
    -webkit-text-size-adjust: 100%;
  }

  .icon {
    display: inline-block;
    background-size: 100%;
  }

  .fog {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: #959595;
    opacity: 0.8;
    color: white;
  }

  .container {
    background: #FCFCFC;
    padding: 15px;
    height: calc(100% - 30px);
  }

  .checkBox {
    border: 1px solid #C6C6C6;
    display: inline-block;
    height: 12px;
    width: 12px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .checkBox.active {
    border: 1px solid #FFC400;
  }

  .checkBox.active::after {
    content: "";
    display: inline-block;
    height: 6px;
    width: 6px;
    background: #FFC400;
    position: relative;
    top: -4px;
    left: 4px;
  }

  textarea {
    border: 1px solid #E4E7ED;
    background: #fcfcfc;
    border-radius: 4px;
    width: 100%;
    padding: 5px 8px;
    box-sizing: border-box;
    margin-bottom: 15px;
  }

  .yellow_btn {
    background-color: #ffc400;
    width: 181px;
    height: 44px;
    border-radius: 22px;
    border: 1px solid transparent;
    font-size: 16px;
  }

  .down {
    animation: slide-down .5s;
    animation-fill-mode: forwards
  }

  .up {
    animation: slide-up .5s;
    animation-fill-mode: forwards
  }

  @keyframes slide-down {
    from {
      transform: translateY(-1000px);
    }

    to {
      transform: translateY(0px);
      display: block;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(0px);
    }

    to {
      transform: translateY(-1000px);
      display: none;
    }
  }

</style>
