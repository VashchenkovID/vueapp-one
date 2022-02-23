<template>
  <div>
    <form action="" @submit.prevent>
      <h4>Создание поста</h4>
      <my-input
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Название"
      />
      <my-input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <my-button class="btn" @click="createPost">Создать</my-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: " ",
        body: " ",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>