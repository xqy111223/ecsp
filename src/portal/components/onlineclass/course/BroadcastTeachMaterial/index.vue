<template>
  <div class="teach-material-box mt20">
    <div class="box-title">
      <span class="line"></span>
      <span class="title">教学材料</span>
    </div>
    <ul>
      <li type="word">
        <svg class="icon mate-icon" area-hidden="true">
          <use xlink:href="#iconword"></use>
        </svg>
        <p title="我是教学材料材料材料材料材料材料材料">我是教学材料材料材料材料材料材料材料</p>
      </li>
      <li>
        <svg class="icon mate-icon" area-hidden="true">
          <use xlink:href="#iconppt"></use>
        </svg>
        <p title="我是教学材料材料材料材料材料材料材料">我是教学材料材料材料材料材料材料材料</p>
      </li>
      <li>
        <svg class="icon mate-icon" area-hidden="true">
          <use xlink:href="#iconpdf"></use>
        </svg>
        <p title="我是教学材料材料材料材料材料材料材料">我是教学材料材料材料材料材料材料材料</p>
      </li>
      <li>
        <svg class="icon mate-icon" area-hidden="true">
          <use xlink:href="#iconpic"></use>
        </svg>
        <p title="我是教学材料材料材料材料材料材料材料">我是教学材料材料材料材料材料材料材料</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BroadcastTeachMaterial'
}
</script>

<style lang="scss" scoped>
  li {
    list-style: none;
  }

  .mt20 {
    margin-top: 20px;
  }

  .teach-material-box {
    width: 232px;
    height: 360px;
    background-color: #ffffff;
    padding-top: 20px;
    padding-bottom: 7px;
    ul {
      padding: 0 10px;
      font-size: 12px;
      color: #333;
      li:first-child {
        margin-top: 10px;
      }
      li {
        font-size: 0;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px dashed #dcdcdc;
        cursor: pointer;
        .mate-icon {
          width: 16px;
          height: 18px;
          display: inline-block;
          margin: 9px 10px;
        }
        > p {
          font-size: 12px;
          width: 165px;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }

  .box-title {
    font-size: 0;
    .line {
      display: inline-block;
      width: 3px;
      height: 8px;
      background-color: #347eff;
      border-radius: 2px;
      margin-left: 19px;
      margin-right: 13px;
    }
    .title {
      font-size: 14px;
      color: #333;
    }
  }
</style>
