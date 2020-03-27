<template>
  <!-- 评论输入框组件 -->
  <div class="add-comment" :class="generateClass()">
    <input type="text" :class="generateInputClass()" @keyup="comInputKeyUp" ref="comInput"/>
    <face @insertEmt="insertEmtImg"></face>
    <div class="fr c99 ft12">
      <span class="input-num">{{inputTextNum}}</span>/150
      <button class="add-comment-btn"
              :disabled="inputTextNum == 0"
              :class="{'click-ok': inputTextNum > 0}"
              @click="addComment">评论
      </button>
    </div>
  </div>
</template>

<script>
import Face from '../Face/index'

export default {
  name: 'ReplayInput',
  components: {
    Face
  },
  props: ['level'],
  data () {
    return {
      inputTextNum: 0,
      comLevel: this.level
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    generateClass () {
      switch (this.comLevel) {
        case 0:
          return ''
        case 1:
          return 'w850'
        case 2:
          return 'w740 ml70'
      }
    },
    generateInputClass () {
      switch (this.comLevel) {
        case 0:
          return ''
        case 1:
          return 'w850'
        case 2:
          return 'w740'
      }
    },
    // 计算输入框输入内容长度
    comInputKeyUp () {
      var textlength = this.$refs.comInput.value.length
      this.inputTextNum = textlength
    },
    // 添加评论
    addComment () {
      this.$emit('add-comment', this.comLevel, this.$refs.comInput.value)
    },
    // 获取用户选择的表情并插入输入框，
    insertEmtImg (data) {
      var inputValue = this.$refs.comInput.value
      this.$refs.comInput.value = inputValue + data
      var textlength = this.$refs.comInput.value.length
      this.inputTextNum = textlength
    }
  }
}
</script>

<style lang="scss" scoped>
  .fr {
    float: right;
  }
  .ft12 {
    font-size: 12px;
  }
  .ft14 {
    font-size: 14px;
  }
  .c66 {
    color: #666;
  }
  .c99 {
    color: #999;
  }
  .c33 {
    color: #333;
  }

  .hide {
    display: none;
  }
  .w850 {
    width: 850px !important;
  }
  .w740 {
    width: 740px !important;
  }

  .ml70 {
    margin-left: 70px;
  }

  button {
    border: none;
    outline: none;
  }

  input {
    text-indent: 10px;
  }
  .add-comment {
    .face {
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
    input {
      width: 920px;
      height: 42px;
      border: solid 1px #dcdcdc;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    .input-num {
      color: #40d688;
    }
    .add-comment-btn {
      margin-left: 9px;
      width: 62px;
      height: 26px;
      background-color: #bbbbbb;
      border-radius: 4px;
      color: #fff;
      &.click-ok {
        background: #40d688;
      }
    }
  }
</style>
