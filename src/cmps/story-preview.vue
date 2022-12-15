<template>
  <li class="story-preview">
    <div class="story-header flex space-between">
      <div>
        <div class="header">
          <router-link class="router" :to="'/user/' + story.by._id">
            <img :src="story.by.imgUrl" class="user-img" alt="" />
          </router-link>
          <div class="loc">
            <!-- <h5 class="h5" v-on:click="user()">{{ story.by.fullname }}</h5> -->
            <router-link class="router" :to="'/user/' + story.by._id">
              <h5 class="h5">
                {{ story.by.fullname }}
              </h5>
            </router-link>
            <h6>{{ story.loc.name }}</h6>
          </div>
          <!-- <button -->
          <div class="more-opt" @click="showModal()">
            <img :src="'./img/more.svg'" class="more" v-on:click="hi()" />
            <!-- </button> -->
          </div>
        </div>
        <img :src="story.imgUrl" class="post" alt="" />
        <div class="center">
          <div class="action">
            <img :src="'./img/heart.svg'" class="heart" v-on:click="like()" />
            <img
              :src="'./img/comment.svg'"
              class="comment"
              @click="showDetails"
            />
            <img :src="'./img/share.svg'" class="share" v-on:click="hi()" />
            <img :src="'./img/save.svg'" class="save" v-on:click="hi()" />
          </div>

          <div class="help">
            <p class="likes">
              {{ likeCount }}
              {{ likeCount > 1 ? 'likes' : 'like' }}
            </p>

            <div class="desc">
              <p>
                <router-link class="router" :to="'/user/' + story.by._id">
                  <span class="name">{{ story.by.fullname }}</span>
                </router-link>
                <span class="txt">{{ story.txt }}</span>
              </p>
              <!-- <p class="txt">{{ story.txt }}</p> -->
            </div>

            <p @click="showDetails" class="view">
              View all
              {{ story.comments.length }}
              {{ story.comments.length > 1 ? 'comments' : 'comment' }}
            </p>
          </div>
        </div>
        <hr class="add" />
        <div class="add">
          <div class="emoji-add">
            <img :src="'./img/emoji.svg'" class="emoji" />
            <input
              class="text"
              v-model="msg"
              type="text"
              placeholder="Add a comment..."
            />
          </div>
          <button class="send" @click="addComment">post</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['story'],

  data() {
    return {
      msg: '',
    };
  },
  computed: {
    likeCount() {
      return this.story.likedBy.length;
    },
  },
  methods: {
    like() {
      console.log(this.story);
      const story = JSON.parse(JSON.stringify(this.story));
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));

      let idx = story.likedBy.findIndex((like) => like.by._id === user._id);
      console.log(idx);
      if (idx !== -1) {
        console.log('found it');
        story.likedBy.splice(idx, 1);
        // this.story.likedBy.splice(-1);
      } else {
        const newLike = {
          createdAt: Date.now(),
          by: user,
        };

        story.likedBy.push(newLike);
      }

      console.log(story.likedBy);
      // this.story.likedBy = story.likedBy;

      this.$emit('updated', story);
    },
    addComment() {
      console.log('adding comment');

      const story = JSON.parse(JSON.stringify(this.story));
      console.log('story to update', story);
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));

      const comment = {
        createdAt: Date.now(),
        by: user,
        txt: this.msg,
        likedBy: [],
        id: Math.random(0, 100),
      };

      story.comments.push(comment);

      this.$emit('updated', story);
    },

    showDetails() {
      this.$router.push(`/story/${this.story._id}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
