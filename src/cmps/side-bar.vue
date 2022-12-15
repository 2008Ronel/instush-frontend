<template>
  <div class="navigation">
    <div>
      <img :src="'./img/home.svg'" class="home" />
    </div>

    <div>
      <img :src="'./img/compass.svg'" class="compass" />
    </div>

    <div>
      <img :src="'./img/new.svg'" class="new" @click="addPost" />
    </div>

    <div>
      <img :src="'./img/messenger.svg'" class="messenger" />
    </div>
  </div>
</template>

<script>
import addPost from './add-post.vue';

export default {
  data() {
    return {};
  },
  methods: {
    addPost() {
      console.log('yay');
      this.$router.push(`/add-post`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
