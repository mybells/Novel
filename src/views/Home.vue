<template>
  <div id="home" class="container">
    <Input id="search" search enter-button placeholder="输入小说名" size="large" @on-search="search"/>
    <div id="list">
      <div
        v-for="(book,index) in listData"
        :key="index"
        class="list_book col-md-12 col-xs-12 col-lg-6"
      >
        <router-link :to="'/about/'+book.title+'/'+book._id">
          <img
            style="width:134px;height:174px;"
            :src="'http://statics.zhuishushenqi.com'+book.cover"
            :alt="book.title"
            class="cover"
          >
        </router-link>
        <div class="right">
          <router-link :to="'/about/'+book.title+'/'+book._id">
            <h6 class="name">
              <span>{{book.title}}</span>
            </h6>
          </router-link>
          <p class="author">
            <span>{{book.author}}</span>
            <span class="split">|</span>
            <span>{{book.cat}}</span>
          </p>
          <p class="desc">{{book.shortIntro}}</p>
          <p class="popularity">
            <span class="c-red">{{book.latelyFollower}}</span>人气
            <span class="split">|</span>
            <span class="c-red">{{book.retentionRatio}}%</span>读者留存
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      listData: []
    };
  },
  methods: {
    search(value) {
      if (value) {
        this.$http.get("/api" + this.$store.state.bookSearch + value).then(
          res => {
            console.info(res.data);
            this.listData = res.data.books;
          },
          error => {
            console.info(error);
          }
        );
      }
    }
  }
};
</script>

<style>
.container {
  min-width: 350px;
}
#list a {
  text-decoration: none;
  color: #000 !important;
}

#list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
#list .right {
  padding: 5px;
}
#list .right p.desc {
  height: 40px;
  margin: 5px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
#list .right p {
  height: 20px;
  line-height: 20px;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
}
#list .right p.popularity {
  position: absolute;
  margin-bottom: 0px;
  bottom: 0;
  left: 50%;
}

#list .list_book {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 50px;
}
</style>
