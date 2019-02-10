<template>
  <div>
    <h4 id="contentTitle">{{contentTitle}}</h4>
    <div id="content" v-html="content"></div>
    <div>
      <Spin v-if="isSpinShow">
        <Icon type="ios-loading" size="40" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>
<script>
export default {
  name: "Content",
  data() {
    return {
      contentId: "",
      content: "",
      contentTitle: "",
      isSpinShow: true
    };
  },
  watch: {
    $route() {
      this.isSpinShow = true;
      this.contentId = this.$route.params.content;
      this.$http.get(this.$store.state.bookContent + this.contentId).then(
        res2 => {
          this.content = res2.data.chapter.cpContent;
          this.contentTitle = res2.data.chapter.title;
          this.isSpinShow = false;
        },
        error => {
          console.info(error);
        }
      );
    }
  },
  created() {
    this.isSpinShow = true;
    this.contentId = this.$route.params.content;
    this.$http.get(this.$store.state.bookContent + this.contentId).then(
      res2 => {
        this.content = res2.data.chapter.cpContent;
        this.isSpinShow = false;
      },
      error => {
        console.info(error);
      }
    );
  }
};
</script>
<style scoped>
a {
  cursor: pointor;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#content {
  white-space: pre-wrap;
  text-align: left;
  word-break: normal;
  word-wrap: normal;
  text-indent: 1em;
/* 宋体                      SimSun（浏览器默认）
黑体                      SimHei
微软雅黑               Microsoft Yahei
楷体                       KaiTi*/

  font-family: "Microsoft Yahei";
  font-size: 1.2em;/* 0.9 1.2 1.5 */
  color: #000000;
}
#contentTitle {
  font-weight: bold;
  margin-bottom: 50px;
}
</style>
