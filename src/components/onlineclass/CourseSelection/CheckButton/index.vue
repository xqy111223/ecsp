<template>
  <div class="check-button">
    <div class="check-button-item" v-for="item in list" :key="item.id" @click="change(item)">
      <span class="color-normal" :selected="!value && item.id===null ? true : value===item.id">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
/*
* Description CheckButton
* Created By yinmeng@codyy.com
* Created At 2019/10/12 14:14
*/
export default {
  name: 'CheckButton',
  props: {
    value: {
      type: [Number, String]
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    isAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    list () {
      if (this.isAll) {
        return [{ id: null, label: '全部' }].concat(this.options)
      } else {
        return this.options
      }
    }
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    change (item) {
      this.$emit('update:value', item.id)
      this.$emit('change', item)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "&/default/var.scss";

  .check-button {
    position: relative;

    .check-button-item {
      display: inline-block;
      margin-right: 10px;

      > span {
        display: inline-block;
        padding: 0px 10px;
        cursor: pointer;
        background-color: white;
        border-radius: 20px;
        line-height: 24px;
      }

      > span[selected], > span:hover {
        background-color: $primary-color;
        background-color: var(--primary-color);
        color: white;
      }

      > span:last-child {
        margin-right: 0;
      }
    }
  }
</style>
