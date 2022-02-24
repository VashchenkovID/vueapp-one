<template>
  <div class="post-list" v-if="history.length > 0">
    <h3>Список пользователей</h3>
    <transition-group name="user-list">
      <post-history-item
        v-for="hpost in history"
        :key="hpost.id"
        :hpost="hpost"

      />
    </transition-group>
  </div>
  <h2 v-else>Список пуст :(</h2>
</template>

<script>
import PostHistoryItem from "@/Components/PostHistoryItem.vue"
export default {
 components:{PostHistoryItem},
  props: {
    history: {
      type: Array,
      required: true,
    },
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
</style>
