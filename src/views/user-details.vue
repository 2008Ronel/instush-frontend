<template>
  <section v-if="user">
    <div class="img-name">
      <img class="profile" :src="user.imgUrl" />
      <div class="header">
        <div class="name-more">
          <h1>{{ user.username }}</h1>
          <img :src="'./img/v.svg'" class="more" v-on:click="hi()" />

          <img :src="'./img/more.svg'" class="more" v-on:click="hi()" />
        </div>
        <img class="user-img" alt="" />

        <button class="follow">Following</button>
        <button class="message">Message</button>

        <img :src="'./img/add.png'" class="add" v-on:click="hi()" />
      </div>
    </div>
    <p class="bio">{{ user.bio }}</p>

    <hr />
    <div class="user-metrics">
      <p class="Posts">
        {{ storiesByUser.length }} <br />
        Posts
      </p>
      <p class="Followers">
        {{ user.followers.length }}0,133 <br />
        Followers
      </p>
      <p class="Following">
        {{ user.following.length }}93 <br />
        Following
      </p>
    </div>
  </section>
  <hr />

  <div class="posts">
    <div v-for="story in storiesByUser">
      <router-link class="router" :to="'/user/' + user._id + '/' + story._id">
        <img :src="story.imgUrl" class="img" />
      </router-link>
    </div>
  </div>
  <Router-view />
  <navBar />
</template>

<script>
import navBar from '../cmps/nav-bar.vue';

// import {userService} from '../services/user.service'

export default {
  data() {
    return {
      // user: null
    };
  },

  watch: {
    userId: {
      handler() {
        if (this.userId) {
          this.$store.dispatch({
            type: 'loadAndWatchUser',
            userId: this.userId,
          });

          this.$store.dispatch({
            type: 'getStoriesByUser',
            userId: this.userId,
          });
          console.log(this.$store);
        }
      },
      immediate: true,
    },
  },

  computed: {
    user() {
      return this.$store.getters.watchedUser;
    },

    storiesByUser() {
      return this.$store.getters.storiesByUser;
    },

    userId() {
      return this.$route.params.userId;
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="scss" scoped></style>
