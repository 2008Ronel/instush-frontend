<template>
  <section class="modal">
    <div v-if="story" class="story-details">
      <button class="end" v-on:click="close()">X</button>

      <div class="header">
        <router-link class="router" :to="'/user/' + story.by._id">
          <img :src="story.by.imgUrl" class="profile-img" v-on:click="hi()" />
        </router-link>
        <router-link class="router" :to="'/user/' + story.by._id">
          <h5 class="h5" v-on:click="hi()">{{ story.by.fullname }}</h5>
        </router-link>
        <!-- <button class="close" v-on:click="close()">X</button> -->
      </div>

      <div class="post">
        <img :src="story.imgUrl" class="user-img" alt="" />
      </div>
      <div class="right-side">
        <button class="remove-post" @click="removeStory(story._id)">
          remove post
        </button>
        <div class="hide">
          <div class="main">
            <router-link class="router" :to="'/user/' + story.by._id">
              <img
                :src="story.by.imgUrl"
                class="profile-img"
                v-on:click="hi()"
              />
            </router-link>

            <div class="desc">
              <p>
                <span class="name" v-on:click="hi()">{{
                  story.by.fullname
                }}</span>
                <span class="txt">{{ story.txt }}</span>
              </p>
            </div>
          </div>

          <div class="comments" v-for="comment in story.comments">
            <router-link class="router" :to="'/user/' + comment.by._id">
              <img
                :src="comment.by.imgUrl"
                class="profile-img"
                v-on:click="hi()"
              />
            </router-link>

            <p>
              <router-link class="router" :to="'/user/' + comment.by._id">
                <span class="name" v-on:click="hi()">
                  {{ comment.by.fullname }}</span
                >
              </router-link>

              <span class="txt">{{ comment.txt }}</span>
            </p>
            <img
              :src="'./img/heart.svg'"
              class="heart"
              v-on:click="likeComment(comment.id)"
            />
            <p>
              {{ comment?.likedBy?.length }}
              {{ comment?.likedBy?.length > 1 ? 'likes' : 'like' }}
            </p>
            <img
              :src="'./img/trash.png'"
              class="trash"
              v-on:click="deleteComment(comment.id)"
            />
          </div>
        </div>
        <hr />
        <div class="action">
          <img :src="'./img/heart.svg'" class="heart" v-on:click="like()" />

          <img :src="'./img/comment.svg'" class="comment" v-on:click="hi()" />
          <router-link :to="'/story/' + story._id"> </router-link>
          <img :src="'./img/share.svg'" class="share" v-on:click="hi()" />
          <img :src="'./img/save.svg'" class="save" v-on:click="hi()" />
        </div>

        <div class="likes">
          <p>
            {{ story.likedBy.length }}
            {{ story.likedBy.length > 1 ? 'Likes' : 'Like' }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { storyService } from '../services/story.service';

export default {
  data() {
    return {
      story: null,
    };
  },

  async created() {
    console.log('STER');
    const id = this.$route.params.id;

    const story = await storyService.getById(id);
    this.story = story;
  },
  methods: {
    close() {
      // this.$router.push(`/story`);
      this.$router.back();
    },
    hi() {
      // this.$router.push(`/story`);
      console.log('hi');
    },
    async deleteComment(commentId) {
      // this.story
      console.log('commentId', commentId);
      const story = JSON.parse(JSON.stringify(this.story));

      story.comments = this.story.comments.filter(
        (comment) => comment.id !== commentId
      );

      //? maybe we want to check if comment.by.id === loggedInUser.id

      // this.$emit('updated', story);
      this.story.comments = story.comments;
      await this.$store.dispatch({ type: 'updateStory', story });
    },

    async like() {
      const story = JSON.parse(JSON.stringify(this.story));
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));

      let isLiked = story.likedBy.some((like) => like._id === user.id);

      if (isLiked) {
        story.likedBy.splice(-1);
        this.story.likedBy.splice(-1);
      } else {
        const newLike = {
          createdAt: Date.now(),
          by: user,
        };

        this.story.likedBy.push(newLike);
        story.likedBy.push(newLike);
      }

      await this.$store.dispatch({ type: 'updateStory', story });
    },

    async likeComment(commentId) {
      const story = JSON.parse(JSON.stringify(this.story));
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
      const currentComment = story.comments.find(
        (comment) => comment.id === commentId
      );

      const isLiked = currentComment.likedBy.some(
        (userLike) => userLike.by._id == user._id
      );

      if (isLiked) {
        currentComment.likedBy = currentComment.likedBy.filter(
          (userLike) => userLike.by._id != user._id
        );

        this.story.comments = story.comments;
      } else {
        const newLike = {
          createdAt: Date.now(),
          by: user,
        };

        currentComment.likedBy.push(newLike);

        this.story.comments = story.comments;
      }

      await this.$store.dispatch({ type: 'updateStory', story });
    },

    async removeStory(storyId) {
      console.log(1, '1');
      console.log('storyId', storyId);
      await this.$store.dispatch({ type: 'removeStory', storyId });
      this.$router.push(`/story`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
