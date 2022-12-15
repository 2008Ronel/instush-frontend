<template>
  <div>
    <ul class="story-list">
      <story-preview
        v-for="story in stories"
        @updated="updateStory"
        :story="story"
      />
    </ul>
  </div>
</template>

<script>
import storyPreview from './story-preview.vue';
import storyDetails from '../views/story-details.vue';

export default {
  data() {
    return {};
  },
  computed: {
    stories() {
      return this.$store.getters.stories;
    },
  },
  components: {
    storyPreview,
    storyDetails,
  },
  methods: {
    updateStory(story) {
      console.log(story);
      this.$emit('updated', story);
    },
    deleteComment(commentId) {
      console.log('Yayy', commentId);
      this.$emit('updated', story.comment);
    },
  },
};
</script>

<style lang="scss" scoped></style>
