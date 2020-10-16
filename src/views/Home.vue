<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span class="header-title">网易云音乐</span>
        <div class="header-sign">
          <i class="el-icon-arrow-left" @click="routerBack(-1)"></i>
          <i class="el-icon-arrow-right" @click="routerBack(1)"></i>
        </div>
      </div>
      <div>
        <el-input
          class="search"
          size="mini"
          v-model="searchInfo"
          prefix-icon="el-icon-search"
          placeholder="搜索"
        ></el-input>
      </div>
    </el-header>
    <el-container>
      <!-- 菜单栏 -->
      <el-aside width="250px">
        <!-- 用户信息 -->
        <div class="profile-photo" @click="loginDialogVisible = true">
          <el-avatar :src="avatarUrl"></el-avatar>
          <p class="user-name">{{ nickName }}</p>
        </div>
        <!-- 菜单 -->
        <el-menu
          default-active="/findmusic"
          :router="true"
          background-color="#ededed"
          text-color="#4a4a4a"
          active-text-color="#d33a31"
        >
          <el-menu-item :index="'/' + 'findmusic'">
            <i class="el-icon-menu"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item :index="'/' + 'songslist'">
            <i class="el-icon-menu"></i>
            <span slot="title">推荐歌单</span>
          </el-menu-item>
          <el-menu-item :index="'/' + 'latestmusic'">
            <i class="el-icon-menu"></i>
            <span slot="title">最新音乐</span>
          </el-menu-item>
          <el-menu-item :index="'/' + 'latestmv'">
            <i class="el-icon-menu"></i>
            <span slot="title">最新MV</span>
          </el-menu-item>
        </el-menu>
        <!-- 登录对话框 -->
        <el-dialog
          title="登录"
          :visible.sync="loginDialogVisible"
          width="25%"
          :before-close="handleClose"
          center
          :modal="false"
        >
          <el-input v-model="userID" size="mini"></el-input>
          <p>1、请 <a href="http://music.163.com" target="_blank">点我</a>打开网易云音乐官网</p>
          <p>2、点击页面右上角的“登录”</p>
          <p>3、点击您的头像，进入我的主页</p>
          <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="login">确 定</el-button>
          </span>
        </el-dialog>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data () {
    return {
      nickName: '请登录',
      avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      loginDialogVisible: false,
      searchInfo: '',
      userID: ''
    }
  },
  methods: {
    async login () {
      try {
        const { data: res } = await this.$http.get(`http://localhost:3000/user/detail?uid=${this.userID}`)
        console.log(res)
        // console.log(res)
        this.avatarUrl = res.profile.avatarUrl
        this.nickName = res.profile.nickname
        this.loginDialogVisible = false
        this.userID = ''
      } catch (error) {
        this.$message({
          message: error,
          type: 'error',
          showClose: true
        })
      }
    },
    handleClose () {
      this.loginDialogVisible = false
      this.userID = ''
    },
    routerBack (num) {
      this.$router.go(num)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  .el-header {
    display: flex;
    background-color: #d74d45;
    justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    color: #fff;
    font-size: 18px;
    .header-title {
      margin-left: 10px;
    }
    .header-sign {
      margin-left: 90px;
      display: inline-block;
      i {
        cursor: pointer;
      }
      i:first-child {
        margin-right: 10px;
      }
    }
  }

  .el-container {
    .el-aside {
      background-color: #ededed;
      .profile-photo {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .user-name {
          margin-left: 10px;
          font-size: 14px;
        }
      }
      a {
        color: #d74d45;
      }
    }
  }
}
</style>
