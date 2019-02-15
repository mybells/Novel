<template>
  <div class="layout" :style="contentStyle">
    <div class="book-summary">
      <div class="book-search" role="search">
        <Input id="search" search placeholder="Chapter to search" size="large" v-model="search"/>
      </div>
      <div class="title" style="font-size:17px;">{{bookTitle}}</div>
      <div id="leftlist" style="padding: 10px 15px 10px;overflow: auto;height: calc(100% - 116px);">
        <ul id="ullist">
          <li v-for="(list,index) in searchData" :key="index">
            <router-link :to="'/about/'+bookTitle+'/'+bookSearchId+'/'+list.id">{{list.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div id="rightContent" style>
      <div class="book-header" style="height:66px;line-height:66px;text-align:left;display:flex;">
        <a href="javascript:void(0)" @click="hiddenBtn">
          <i class="fa fa-align-justify"></i>
        </a>
        <a href="javascript:void(0)" @click="searchBtn">
          <i class="fa fa-search"></i>
        </a>
        <Poptip placement="bottom" width="170">
          <a href="javascript:void(0)" style="position: relative;top: -2px;">
            <i class="fa fa-font"></i>
          </a>

          <div class="contentStyle" slot="content">
            <div>
              <a style="font-size:0.9em" @click="changeSize({fontSize:'0.9em'})">
                <i class="fa fa-font"></i>
              </a>
              <a style="font-size:1.2em" @click="changeSize({fontSize:'1.2em'})">
                <i class="fa fa-font"></i>
              </a>
              <a style="font-size:1.5em" @click="changeSize({fontSize:'1.5em'})">
                <i class="fa fa-font"></i>
              </a>
            </div>
            <div>
              <a href="javascript:void(0)" @click="changeSize({fontFamily:'KaiTi'})">楷体</a>
              <a href="javascript:void(0)" @click="changeSize({fontFamily:'Microsoft Yahei'})">宋体</a>
            </div>
            <div>
              <a
                href="javascript:void(0)"
                @click="changeSize({background:'#fff',color:'#000'})"
              >White</a>
              <a
                href="javascript:void(0)"
                @click="changeSize({background:'#f3eacb',color:'#704214'})"
              >Sepia</a>
              <a
                href="javascript:void(0)"
                @click="changeSize({background:'#1c1f2b',color:'#bdcadb'})"
              >Night</a>
            </div>
          </div>
        </Poptip>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      bookSearchId: this.$route.params.bookSearchId,
      sourceList: [],
      chapters: [],
      hiddenBtnflag: true,
      searchBtnflag: true,
      search: ""
    };
  },
  created() {},
  mounted() {
    this.init();
    window.onresize = () => {
      if (this.searchBtnflag) {
        $("#leftlist").outerHeight(
          $(".book-summary").height() -
            $(".book-search").outerHeight() -
            $(".title").outerHeight()
        );
      } else {
        $("#leftlist").outerHeight(
          $(".book-summary").outerHeight() - $(".title").outerHeight()
        );
      }
    };
  },
  computed: {
    contentStyle: function() {
      return { background: this.$store.state.contentStyle.background };
    },
    bookTitle() {
      return this.$route.params.bookTitle;
    },
    searchData() {
      var search = this.search;
      if (search) {
        return this.chapters.filter(function(chapter) {
          return (
            String(chapter.title)
              .toLowerCase()
              .indexOf(search) > -1
          );
        });
      }
      return this.chapters;
    }
  },
  methods: {
    init() {
      if (this.bookSearchId) {
        this.$http
          .get(
            "/api" +
              this.$store.state.bookChaperts +
              this.bookSearchId +
              "?view=chapters"
          )
          .then(
            res1 => {
              this.chapters = res1.data.mixToc.chapters;
              this.$nextTick(function() {
                this.$router.push({
                  path:
                    "/about/" +
                    this.bookTitle +
                    "/" +
                    this.bookSearchId +
                    "/" +
                    this.chapters[0].id
                });
              });
            },
            error => {
              console.info(error);
            }
          );
      }
    },
    hiddenBtn() {
      if (this.hiddenBtnflag) {
        $(".book-summary").animate({
          left: "-300px"
        });
        $("#rightContent").animate({
          marginLeft: "0"
        });
        this.hiddenBtnflag = false;
      } else {
        $(".book-summary").animate({
          left: "0"
        });
        $("#rightContent").animate({
          marginLeft: "300px"
        });
        this.hiddenBtnflag = true;
      }
    },
    searchBtn() {
      if (this.searchBtnflag) {
        $(".book-search").slideToggle();
        $("#leftlist").animate({
          height: $(".book-summary").height() - 50
        });
        this.searchBtnflag = false;
      } else {
        $("#leftlist").animate({
          height: $(".book-summary").height() - 116
        });
        $(".book-search").slideToggle();
        this.searchBtnflag = true;
      }
    },
    // searchChapter() {
    //   console.log(this.chapters)
    // }
    changeSize(obj) {
      this.$store.commit("setStyle", obj);
    }
  }
};
</script>

<style scoped>
.layout {
  height: 100%;
  display: flex;
  position: relative;
}

#rightContent {
  margin-left: 300px;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.book-summary {
  position: absolute;
  left: 0;
  width: 300px;
  background: #fafafa;
  height: 100%;
  text-align: left;
}

.book-summary .title {
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  background: cornsilk;
}

.book-summary ul li {
  height: 35px;
  line-height: 35px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.book-summary ul li a {
  display: block;
  text-decoration: none;
  color: #364149;
}

.book-summary ul li a:hover {
  display: block;
  text-decoration: none;
  color: #364149;
}

.book-summary ul li a:hover,
.book-summary ul li a.router-link-active {
  color: #008cff;
  background: 0 0;
  text-decoration: none;
}

.book-search {
  padding: 15px;
}

.book-header a {
  font-size: 14px;
  display: block;
  color: #ccc;
  height: 100%;
  width: 55px;
  text-align: center;
}

.book-header a:hover {
  color: #000;
}

.contentStyle > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid #ccc;
  height: 30px;
  line-height: 30px;
}
</style>
