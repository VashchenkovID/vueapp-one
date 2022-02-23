

export const postModule = {
    state: () => ({
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
    }),
    getters: {},
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        
    },
    actions: {},
}