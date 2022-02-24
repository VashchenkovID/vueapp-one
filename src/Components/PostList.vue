<template>
  <div class="post-list" v-if="posts.length > 0">
    <h3>Список Заметок</h3>
    <transition-group name="user-list">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :state-button="buttonStateAdd"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else>Список пуст :(</h2>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    buttonStateAdd: {
      type: Boolean,
      required: true,
    }
  },
};
</script>

<style scoped>
.user-list {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.5s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.user-list-move {
  transition: transform 0.5s ease;
}
h2{
  color: rgb(245, 241, 11);
}
h3{
  color: rgb(245, 241, 11);
}
.post-list{
  margin-left:0 ;

}
</style>
