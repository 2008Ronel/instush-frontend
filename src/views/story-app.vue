<template>
  <div class="container home">
    <story-list @updated="updateStory" />
    <router-view />
    <!-- <nav-bar /> -->
    <side-bar />

    <hr />
    <!-- <form @submit.prevent="addStory()">
      <h2>Add story</h2>
      <input type="text" v-model="storyToAdd.vendor" />
      <button>Save</button>
    </form> -->
  </div>
</template>

<script>
import sideBar from '../cmps/side-bar.vue';
// import navBar from '../cmps/nav-bar.vue';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { storyService } from '../services/story.service.local';
import {
  getActionRemoveStory,
  getActionUpdateStory,
  getActionAddStoryMsg,
} from '../store/story.store';
import storyList from '../cmps/story-list.vue';
export default {
  data() {
    return {
      // storyToAdd: storyService.getEmptyStory()
    };
  },
  components: {
    storyList,
    // navBar,
    sideBar,
  },
  computed: {
    loggedInUser() {
      // return this.$store.getters.loggedinUser
    },
    stories() {
      return this.$store.getters.stories;
    },
  },
  created() {
    this.$store.dispatch({ type: 'loadStories' });
  },
  methods: {
    async updateStory(story) {
      console.log(story);
      try {
        await this.$store.dispatch({ type: 'updateStory', story });
      } catch {}
    },

    async deleteComment(commentId) {
      console.log(commentId);
      try {
        await this.$store.dispatch({ type: 'updateStory', story });
      } catch {}
    },
    // async addStory() {
    //   try {
    //     await this.$store.dispatch({type: 'addStory', story: this.storyToAdd})
    //     showSuccessMsg('Story added')
    //     this.storyToAdd = storyService.getEmptyStory()
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot add story')
    //   }
    // },
    // async removeStory(storyId) {
    //   try {
    //     await this.$store.dispatch(getActionRemoveStory(storyId))
    //     showSuccessMsg('Story removed')
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot remove story')
    //   }
    // },
    // async updateStory(story) {
    //   try {
    //     story = {...story}
    //     story.price = +prompt('New price?', story.price)
    //     await this.$store.dispatch(getActionUpdateStory(story))
    //     showSuccessMsg('Story updated')
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot update story')
    //   }
    // },
    // async addStoryMsg(storyId) {
    //   try {
    //     await this.$store.dispatch(getActionAddStoryMsg(storyId))
    //     showSuccessMsg('Story msg added')
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot add story msg')
    //   }
    // },
    // printStoryToConsole(story) {
    //   console.log('Story msgs:', story.msgs)
    // }
  },
};
</script>
