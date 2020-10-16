<template>
  <div class="container">
    <!-- 精品歌单头部 -->
    <div class="good_songs_top">
      <el-card
        shadow="never"
        v-if="goodSongsList[0]"
        :body-style="{ height: '135px', padding: '15px' }"
      >
        <el-image
          style="width: 135px; height: 135px"
          :src="goodSongsList[0].coverImgUrl"
        ></el-image>
        <div class="good_songs_top_desc">
          <span>精品歌单</span>
          <p>{{ goodSongsList[0].name }}</p>
          <span>{{ goodSongsList[0].description }}</span>
        </div>
      </el-card>
    </div>
    <!-- Tag选择栏 -->
    <div class="good_songs_tags">
      <span v-for="item of songsTags" :key="item.id">{{ item.name }}</span>
    </div>
    <!-- 歌单区 -->
    <div>
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <el-card :body-style="{ padding: '0px', width: '100%' }">
            <el-image
              :src="goodSongsList[0].coverImgUrl"
            ></el-image>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getGoodSongsList()
    this.getSongsTags()
  },
  data () {
    return {
      // 精品歌单列表
      goodSongsList: [],
      // tag列表
      songsTags: []
    }
  },
  methods: {
    async getGoodSongsList (tag = ' ') {
      const { data: res } = await this.$http.get(`http://localhost:3000/top/playlist/highquality?limit=20&cat=${tag}`)
      this.goodSongsList = res.playlists
      // console.log(res)
    },
    async getSongsTags () {
      const { data: res } = await this.$http.get('http://localhost:3000/playlist/highquality/tags')
      this.songsTags = res.tags.slice(0, 10)
      console.log(this.songsTags)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .good_songs_top {
    .el-card {
      border-radius: 5px;
      position: relative;
      background: linear-gradient(to right, rgb(123, 79, 50), rgb(103, 57, 2));
      .good_songs_top_desc {
        position: absolute;
        top: 0;
        left: 160px;
        margin: 10px;
        height: 135px;
        span:first-of-type {
          display: inline-block;
          border: 1px solid rgb(231, 170, 90);
          border-radius: 3px;
          color: rgb(231, 170, 90);
          padding: 3px 5px;
        }
        p {
          color: #fff;
          margin: 5px 0;
        }
        span:last-of-type {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          // 文本溢出显示省略号
          // text-overflow: ellipsis;
          // 溢出的部分隐藏
          // overflow: hidden;
        }
      }
    }
  }
  .good_songs_tags {
    margin: 20px 0;
    span {
      float: right;
      font-size: 12px;
      margin-left: 10px;
      color: #7f7f81;
      cursor: pointer;
    }
    span .active {
      color: #d33a31;
    }
  }
  // 清除浮动
  .good_songs_tags::after {
    content: "";
    clear: both;
    display: block;
    overflow: hidden;
  }
}
</style>
