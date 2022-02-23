<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
    <div class="post__btns" @click="$emit('remove', post)">
      <my-button >
        <slot>{{btnReverce}}</slot>
      </my-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      btnReverce: '+',
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
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
  border: 2px solid teal;
  margin-top: 15px;
}

</style>