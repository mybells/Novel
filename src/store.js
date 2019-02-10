import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookSearch: "https://novel.juhe.im/search?keyword=", //搜索书籍
    bookSource: "https://novel.juhe.im/book-sources?view=summary&book=", //获取书籍源
    bookChaperts: "https://novel.juhe.im/book-chapters/", //书籍目录
    bookContent:
      "https://novel.juhe.im/chapters/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F" //内容
  },
  mutations: {},
  actions: {}
});
