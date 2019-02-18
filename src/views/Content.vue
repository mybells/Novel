<template>
  <div>
    <h4 id="contentTitle" :style="contentStyle">{{contentTitle}}</h4>
    <div id="content" v-html="content" :style="contentStyle"></div>
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
  props: ["data"],
  data() {
    return {
      content: "",
      contentTitle: "",
      isSpinShow: true
    };
  },
  computed: {
    contentStyle: function() {
      return this.$store.state.contentStyle;
    }
  },
  watch: {
    data() {
      this.content = "";
      this.contentTitle = "";
      this.isSpinShow = true;
      let tempUrl = this.data.link.replace(/\//g, "%2F").replace("?", "%3F");
      this.$http.get("/chapter" + this.$store.state.bookContent + tempUrl).then(
        res2 => {
          this.contentTitle = this.data.title;
          this.content = res2.data.chapter.body;
          this.isSpinShow = false;
        },
        error => {
          console.info(error);
        }
      );
    }
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
     微软雅黑                   Microsoft Yahei
     楷体                      KaiTi*/

  /* font-family: "Microsoft Yahei";
  font-size: 1.2em; 0.9 1.2 1.5 
  color: #000000; */
}
#contentTitle {
  font-weight: bold;
  margin-bottom: 50px;
}
</style>
