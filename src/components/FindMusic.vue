<template>
  <div>
    <el-carousel :interval="4000" type="card" height="220px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="banner-img" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 轮播图
      banners: []
    }
  },
  created () {
    this.getBanner()
  },
  methods: {
    async getBanner () {
      const { data: res } = await this.$http.get('http://localhost:3000/banner')
      this.banners = res.banners
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.banner-img {
  height: 220px;
}
</style>
