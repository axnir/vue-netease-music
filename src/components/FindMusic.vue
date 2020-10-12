<template>
  <div class="container">
    <!-- banner轮播图 -->
    <el-carousel :interval="4000" type="card" height="220px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="banner-img" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单区域 -->
    <div class="title_wrap">
      <p>推荐歌单</p>
    </div>
    <div class="songs_list_wrap">
      <el-row type="flex" justify="space-between">
        <el-col :span="4" v-for="item of songsList.slice(0, 5)" :key="item.id">
          <el-card
            :body-style="{ padding: '0px', width: '100%' }"
            shadow="hover"
          >
            <div class="songs_top-t">
              <span>{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" class="songs_image" />
            <div class="songs_title">
              <p>{{ item.name }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="4" v-for="item of songsList.slice(5, 10)" :key="item.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="songs_top-t">
              <span>{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" class="songs_image" />
            <div class="songs_title">
              <p>{{ item.name }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 最新音乐区域 -->
    <!-- 标题 -->
    <div class="title_wrap">
      <p>最新音乐</p>
    </div>
    <!-- 音乐 -->
    <div class="new_music_wrap">
      <el-row :gutter="10">
        <!-- 左侧栏 -->
        <el-col :span="12">
          <el-table :data="newMusicList.slice(0, 5)" :show-header="false">
            <!-- 序号 -->
            <el-table-column type="index">
              <template v-slot="scope">{{
                "0" + (scope.$index + 1).toString()
              }}</template>
            </el-table-column>
            <!-- 图片 -->
            <el-table-column>
              <template v-slot="scope">
                <el-image :src="scope.row.picUrl"></el-image>
              </template>
            </el-table-column>
            <!-- 歌曲名 -->
            <el-table-column>
              <template v-slot="scope" style="font-size: 12px">
                <strong>{{ scope.row.name }}</strong>
              </template>
            </el-table-column>
            <!-- 歌手名 -->
            <el-table-column>
              <template v-slot="scope">
                <span
                  class="new_music_name"
                  v-for="item of scope.row.song.artists"
                  :key="item.id"
                >
                  {{
                    scope.row.song.artists.length === 1
                      ? item.name
                      : item.name + "/"
                  }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!-- 右侧栏 -->
        <el-col :span="12">
          <el-table :data="newMusicList.slice(5, 10)" :show-header="false">
            <!-- 序号 -->
            <el-table-column type="index">
              <template v-slot="scope">{{
                scope.$index >= 4
                  ? scope.$index + 6
                  : "0" + (scope.$index + 6).toString()
              }}</template>
            </el-table-column>
            <!-- 图片 -->
            <el-table-column>
              <template v-slot="scope">
                <el-image :src="scope.row.picUrl"></el-image>
              </template>
            </el-table-column>
            <!-- 歌曲名 -->
            <el-table-column>
              <template v-slot="scope" style="font-size: 12px">
                <strong>{{ scope.row.name }}</strong>
              </template>
            </el-table-column>
            <!-- 歌手名 -->
            <el-table-column>
              <template v-slot="scope">
                <span
                  class="new_music_name"
                  v-for="item of scope.row.song.artists"
                  :key="item.id"
                >
                  {{
                    scope.row.song.artists.length === 1
                      ? item.name
                      : item.name + "/"
                  }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 推荐MV区域 -->
    <div>
      <!-- 标题 -->
      <div class="title_wrap">
        <p>推荐MV</p>
      </div>
      <!-- 内容区域 -->
      <div class="new_mv_wrap">
        <el-row type="flex" justify="space-between">
          <el-col :span="5" v-for="item of newMVList" :key="item.id">
            <el-card
              :body-style="{ padding: '0px', width: '100%' }"
              shadow="hover"
            >
              <img :src="item.picUrl" alt="" class="mv_img" />
              <p>{{ item.name }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      songsList: [],
      // 最新音乐
      newMusicList: [],
      // 最新MV
      newMVList: []
    }
  },
  created () {
    this.getBanner()
    this.getSongsList()
    this.getNewMusicList()
    this.getNewMV()
  },
  methods: {
    async getBanner () {
      const { data: res } = await this.$http.get('http://localhost:3000/banner')
      this.banners = res.banners
      // console.log(res)
    },
    async getSongsList () {
      const { data: res } = await this.$http.get('http://localhost:3000/personalized?limit=10')
      this.songsList = res.result
      // console.log(res)
    },
    async getNewMusicList () {
      const { data: res } = await this.$http.get('http://localhost:3000/personalized/newsong')
      this.newMusicList = res.result
      // console.log(res)
    },
    async getNewMV () {
      const { data: res } = await this.$http.get('http://localhost:3000/personalized/mv')
      this.newMVList = res.result
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin-right: 40px;
  margin-left: 40px;
}
.banner-img {
  height: 220px;
}

.title_wrap {
  p {
    font-size: 20px;
    color: #333333;
  }
  margin-top: 45px;
}

.songs_list_wrap {
  .el-row {
    margin-bottom: 10px;
    cursor: pointer;
    .el-card {
      border-radius: 6px;
      .songs_title p {
        font-size: 12px;
        // 文本强制不换行
        white-space: nowrap;
        // 文本溢出显示省略号
        text-overflow: ellipsis;
        // 溢出的部分隐藏
        overflow: hidden;
        padding-left: 3px;
        position: relative;
        width: 100%;
      }
      .songs_top-t {
        position: absolute;
        width: 16.4%;
        border-radius: 2px;
        top: 1px;
        background: rgba(0, 0, 0, 0.5);
        // overflow: hidden;
        transform: scale(0);
        transition: transform 0.5s;
        color: rgba(255, 255, 255, 0.95);
        font-size: 12px;
      }
      .songs_image {
        width: 100%;
      }
    }
    .el-card:hover {
      .songs_top-t {
        // display: block;
        transform: scale(1);
      }
    }
  }
}

.new_music_wrap {
  .el-image {
    width: 75px;
    height: 75px;
    cursor: pointer;
  }
  .new_music_name {
    font-size: 12px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.new_mv_wrap {
  .el-card {
    border-radius: 6px;
    cursor: pointer;
    .mv_img {
      width: 100%;
    }
    p {
      font-size: 12px;
      // 文本强制不换行
      white-space: nowrap;
      // 文本溢出显示省略号
      text-overflow: ellipsis;
      // 溢出的部分隐藏
      overflow: hidden;
    }
  }
}
</style>
