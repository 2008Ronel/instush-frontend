<template>
  <section>
    <user-msg />
    <router-view />
  </section>
</template>

<script>
import { store } from './store/store';
import userMsg from './cmps/user-msg.vue';
import { userService } from './services/user.service';

export default {
  async created() {
    await this.$store.dispatch({ type: 'loadStories' });
    await this.$store.dispatch({
      type: 'login',
      userCred: { username: 'ronel', password: 123 },
    });
    console.log('Vue App created');
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: 'setLoggedinUser', user });
  },
  components: {
    userMsg,
  },
};
</script>
