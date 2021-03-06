import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookSearch: "/book/fuzzy-search?query=", //搜索书籍
    bookChaperts: "/mix-atoc/", //书籍目录
    bookContent: "/chapter/", //内容
    contentStyle: {
      fontFamily: "Microsoft Yahei",
      fontSize: "1.2em" /* 0.9 1.2 1.5 */,
      color: "#000"
    }
  },
  mutations: {
    setStyle: (state, n) => {
      state.contentStyle = Object.assign({}, state.contentStyle, n);
    }
  },
  actions: {}
});
