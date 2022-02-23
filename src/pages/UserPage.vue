<template>
  <div class="container">
    <h1>Страница с постами</h1>
    <my-input
      class="input"
      type="text"
      placeholder="Введите запрос"
      v-model="searchQuery"
    />
    <div class="app__btns">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <div class="container__wrapper">
      <div class="container__column">
        <post-list
          :posts="sortedAndSearchedPosts"
          @remove="removePost"
          v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
        <div ref="observer" class="observer"></div>
      </div>
      <div class="container__column">
        <post-list-two
          :postsTwo="sortedAndSearchedPostsTwo"
          @remove="removePostTwo"
          v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
      </div>
    </div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/Components/PostForm.vue";
import PostList from "@/Components/PostList.vue";
import axios from "axios";
import MyButton from "@/Components/UI/MyButton.vue";
import MySelect from "@/Components/UI/MySelect.vue";
import PostListTwo from "@/Components/PostListTwo.vue";

export default {
  components: {
    PostList,
    PostListTwo,
    PostForm,
    MyButton,
    MySelect,
  },
  data() {
    return {
      posts: [],
      postsTwo: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      limit: 10,
      totalPages: 0,
      page: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.unshift(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
      this.postsTwo.push(post);
    },
    removePostTwo(post) {
      this.postsTwo = this.postsTwo.filter((p) => p.id !== post.id);
      this.posts.unshift(post);
    },

    showDialog() {
      this.dialogVisible = true;
      this.isPostsLoading = false;
    },

    fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          this.isPostsLoading = false;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = response.data;
        }, 1000);
      } catch (e) {
        alert("Ошибка");
      }
    },
    loadMorePosts() {
      try {
        this.page += 1;

        setTimeout(async () => {
          this.isPostsLoading = false;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = [...this.posts, ...response.data];
        }, 500);
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  mounted() {
    this.fetchPosts();
    this.$refs.observer;
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedPostsTwo() {
      return [...this.postsTwo].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedAndSearchedPostsTwo() {
      return this.sortedPostsTwo.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {},
};
</script>

<style>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
  margin: 8px;
}
.current-page {
  border: 5px solid teal;
}
.container__wrapper {
  display: flex;
  flex-direction: row;
}
.container__column {
  width: 50%;
}
</style>
