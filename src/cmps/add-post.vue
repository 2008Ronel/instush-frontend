<template>
  <section class="add-post">
    <navBar />
    <form @submit.prevent="onSubmit" @submit="addPost">
      <label>Text:</label>
      <input v-model="post.txt" type="text" name="" id="" />
      <label>Select Image:</label>
      <img-uploader @uploaded="onImageUpload" />
      <p class="error">
        {{ errorMessage }}
      </p>
      <button type="submit">Add Story</button>
    </form>
  </section>
</template>

<script>
import navBar from '../cmps/nav-bar.vue';

import imgUploader from './img-uploader.vue';
export default {
  data() {
    return {
      errorMessage: null,
      post: {
        // _id: null,
        createdAt: null,
        txt: '',
        imgUrl: null,
        loc: {
          lat: 11.11,
          lng: 22.22,
          name: 'HOLLYWOO',
        },
        comments: [],
        likedBy: [],
        tags: [],
      },
    };
  },
  components: {
    navBar,
    imgUploader,
  },
  methods: {
    onImageUpload(imageUrl) {
      this.post.imgUrl = imageUrl;
    },

    async addPost() {
      if (!this.post.imgUrl || !this.post.txt) {
        this.errorMessage =
          'You must have text and image before uploading new story';
        return;
      }

      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));

      this.post.createdAt = Date.now();
      // this.post._id = Math.random();
      this.post.by = user;
      console.log('POST', this.post);

      await this.$store.dispatch({ type: 'addStory', story: this.post });

      this.$router.push(`/story`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
