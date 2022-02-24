<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-dialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
      hideDialog(){
          this.$emit('update:show', false)
      }
  }
};
</script>

<style  scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 10;
}
.dialog__content{
    margin: auto;
    background: #474747;
    border-radius: 14px;
    border: 1px solid #ccaa12;
    min-height: 50px;
    padding: 20px;
}
</style>