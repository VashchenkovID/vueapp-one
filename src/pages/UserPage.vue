<template>
  <div class="container">
    <router-link class="nav__link" to="/">Главная</router-link>
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
          button-state-add
          @remove="removePost"
          v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
        <div ref="observer" class="observer"></div>
      </div>
      <div class="container__column">
        <post-list
          :posts="sortedAndSearchedPostsTwo"
          :button-state-add="false"
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

export default {
  components: {
    PostList,
    PostForm,
    MyButton,
    MySelect,
    
  },
  data() {
    return {
      posts: [],
      postsTwo: [],
      history: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      limit: 10,
      totalPages: 0,
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
      this.history.push({ state: "saved", post: post, date: Date.now() });
      sessionStorage.setItem("history", JSON.stringify(this.history));
    },
    removePostTwo(post) {
      this.postsTwo = this.postsTwo.filter((p) => p.id !== post.id);
      this.posts.unshift(post);
      this.history.push({ state: "deleted", post: post, date: Date.now() });
      sessionStorage.setItem("history", JSON.stringify(this.history));
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
    const history = sessionStorage.getItem("history");
    if (history) {
      this.history = JSON.parse(history);
    }
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
.input{
   border-radius: 10px;
   padding: 10px;
   border: 2px solid #000;
}
h1{
  padding-top: 40px;
   font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 42px;
line-height: 39px;
/* identical to box height */
color: rgb(245, 241, 11);
text-align: center;
}
strong{
  color: rgb(245, 241, 11);
}

body {
  background: #141212;
  font-family: Inter;
font-style: normal;
font-weight: bold;
color: #fff;
}
.container__wrapper {
  display: flex;
  flex-direction: row;
  margin: 0;
}
.container__column {
  width: 50%;
  margin: 0;
}
a {
  text-decoration: none;
}
.nav__link {
  padding: 15px;
  background-color: #474747;
  text-align: center;
}
.nav__link {
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
.nav__link {
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
}
.nav__link:after {
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
.nav__link:hover {
  background: transparent;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
  color: #fff;
}
.nav__link:hover:after {
  -webkit-transform: scale(2) rotate(180deg);
  transform: scale(2) rotate(180deg);
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
}

</style>
