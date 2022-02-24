<template>
  <div class="post">
    <div class="id"><strong>Идентификатор: </strong>{{post.post.id }}</div>
    <div class="name"><strong>Имя: </strong>{{ post.post.title }}</div>
    <div class="state"><strong>Статус:</strong>{{post.state}}</div>
    <div class="time"><strong>Время операции: </strong>{{ post.date }}</div>
  </div>
</template>

<script>
export default {
  data() {
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

    
    
};
</script>

<style  scoped>
.post{
  border: 1px solid teal;
}
</style>