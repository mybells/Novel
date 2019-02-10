<template>
  <div class="layout">
    <div class="book-summary">
      <div class="book-search" role="search">
        <Input id="search" search placeholder="Chapter to search" size="large" v-model="search" />
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
             <Poptip placement="bottom" width="150" style="display:block">
        <a href="javascript:void(0)">          <i class="fa fa-font"></i>
        </a>
        <div class="api" slot="content">
            <table>
                <thead>
                    <tr>
                        <th>Version</th>
                        <th>Update Time</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0.9.5</td>
                        <td>2016-10-26</td>
                        <td>Add new components <code>Tooltip</code> and <code>Poptip</code></td>
                    </tr>
                    <tr>
                        <td>0.9.4</td>
                        <td>2016-10-25</td>
                        <td>Add new components <code>Modal</code></td>
                    </tr>
                    <tr>
                        <td>0.9.2</td>
                        <td>2016-09-28</td>
                        <td>Add new components <code>Select</code></td>
                    </tr>
                </tbody>
            </table>
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
        bookTitle: this.$route.params.bookTitle,
        sourceList: [],
        chapters: [],
        hiddenBtnflag: true,
        searchBtnflag: true,
        search: "",
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
      searchData() {
        var search=this.search;
        if (search) {
          return this.chapters.filter(function(chapter) {
            console.log()
            return String(chapter.title).toLowerCase().indexOf(search) > -1
            // return Object.keys(chapters).some(function(key) {
            //   return String(chapters[key]).toLowerCase().indexOf(search) > -1
            // })
          })
        }
        return this.chapters;
      }
    },
    methods: {
      init() {
        if (this.bookSearchId) {
          this.$http.get(this.$store.state.bookSource + this.bookSearchId).then(
            res => {
              this.sourceList = res.data;
              if (this.sourceList.length) {
                this.$http
                  .get(this.$store.state.bookChaperts + this.sourceList[0]._id)
                  .then(
                    res1 => {
                      this.chapters = res1.data.chapters;
                      this.$nextTick(function() {
                        this.$router.push({
                          path: "/about/" +
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
</style>
