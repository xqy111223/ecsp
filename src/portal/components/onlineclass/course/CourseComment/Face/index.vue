<template>
  <div class="com-face-container" >
    <i class="face icon face-icon el-icon-custom-expression" ref="faceIcon" @click="showEmtBox"
       v-click-outside="onClickOutside"></i>
    <div ref="emtBox"  class="emt-box" :class="{hide: isShowEmt===false}">
      <ul>
        <li v-for="(value, name, index) in faceEmtObejct" :key="index" @click="selectEmt(name)">
          <img :src="getImgUrl(value)" alt="" :title="name">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import vClickOutside from 'v-click-outside'

const emt = {
  微笑: 'weixiao',
  呲牙: 'ciya',
  再见: 'zaijian',
  偷笑: 'touxiao',
  调皮: 'tiaopi',
  大哭: 'daku',
  擦汗: 'cahan',
  猪头: 'zhutou',
  得意: 'deyi',
  傲慢: 'aoman',
  发怒: 'fanu',
  害羞: 'haixiu',
  憨笑: 'hanxiao',
  汗: 'han',
  尴尬: 'ganga',
  抓狂: 'zhuakuang',
  花: 'hua',
  惊恐: 'jingkong',
  惊讶: 'jingya',
  可爱: 'keai',
  抠鼻: 'koubi',
  耍酷: 'ku',
  流泪: 'liulei',
  便便: 'bianbian',
  难过: 'nanguo',
  撇嘴: 'piezui',
  敲打: 'qiaoda',
  亲亲: 'qinqin',
  色: 'se',
  胜利: 'shengli',
  示爱: 'shiai',
  白眼: 'baiyan',
  衰: 'shuai',
  睡: 'shui',
  鄙视: 'bishi',
  吐: 'tu',
  嘘: 'xu',
  委屈: 'weiqu',
  炸弹: 'zhadan',
  心: 'xin',
  心裂: 'xinlie',
  菜刀: 'caidao',
  疑问: 'yiwen',
  阴险: 'yinxian'
}
export default {
  name: 'Face',
  directives: {
    clickOutside: vClickOutside.directive
  },
  data () {
    return {
      faceEmtObejct: emt,
      isShowEmt: false
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 加载表情图片， value为图片名称
    getImgUrl (value) {
      const url = 'assets/face/' + value + '.gif'
      const imgUrl = require('@/' + url)
      return imgUrl
    },
    selectEmt (name) {
      const selectEmtImg = '[' + name + ']'
      this.$emit('insertEmt', selectEmtImg)// 触发父组件中的事件，传递选择的表情
    },
    // 点击组件外的区域隐藏表情框
    onClickOutside () {
      this.isShowEmt = false
    },
    // 展示表情框
    showEmtBox () {
      this.isShowEmt = true
    }
  }
}
</script>

<style lang="scss" scoped>
.hide{
  display: none;
}
li{
  list-style: none;
}
.com-face-container{
  display: inline-block;
  position: relative;
  .face{
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
  .emt-box{
    height: 160px;
    width: 300px;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.15);
    padding: 16px;
    ul{
      li{
        float: left;
        &:hover img{
          background: rgba(64,214,136,0.2);
          border:1px solid rgba(191,246,217, 0.2);
        }
        img{
            border: 1px solid #ebebeb;
            cursor: pointer;
            display: block;
            padding: 2px;
            width: 30px;
            box-sizing: border-box;
        }
      }
    }
  }
}

</style>
