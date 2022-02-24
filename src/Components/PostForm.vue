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
h4{
  margin-left: 0;
}
form {
  display: flex;
  flex-direction: column;
  background: #474747;
 
  
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
.btn {
  padding: 15px;
  background-color: #474747;
  text-align: center;
}
.btn {
  width: 230px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.btn {
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
}
.btn:after {
  position: absolute;
  content: " ";
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1fd1f9;
  background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
  transition: all 0.3s ease;
}
.btn:hover {
  background: transparent;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
  color: #fff;
}
.btn:hover:after {
  -webkit-transform: scale(2) rotate(180deg);
  transform: scale(2) rotate(180deg);
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
}
</style>