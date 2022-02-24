<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
    <div class="post__btns" @click="$emit('remove', post)">
      <my-button>
        {{ stateButton ? '+' : '-' }}
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    stateButton: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    ClickActive() {
      this.change = '-';
      console.log(this.change);
    },
  },
};
</script>



<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid #000;
  margin-top: 15px;
}
strong{
  margin: 0;
  padding: 0;
}

</style>