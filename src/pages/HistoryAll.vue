<template>
  <div class="post-list" v-if="posts.length > 0">
    <router-link class="link" to="/">Главная</router-link>
    <h3>Список истории</h3>

    <post-history-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script>
import PostHistoryItem from '@/Components/PostHistoryItem.vue';
export default {
  components: { PostHistoryItem },
  data() {
    return {
      history: [],
      posts: [],
    };
  },
  mounted() {
    const history = sessionStorage.getItem("history");
    if (history) {
      this.history = JSON.parse(history);
      this.posts = this.history;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>