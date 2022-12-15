import { createRouter, createWebHashHistory } from 'vue-router';

import home from './views/home.vue';
import chat from './views/chat.vue';
import storyApp from './views/story-app.vue';
import reviewApp from './views/review-app.vue';
import loginSignup from './views/login-signup.vue';
import userDetails from './views/user-details.vue';
import storyList from '../src/cmps/story-list.vue';
import storyPreview from '../src/cmps/story-preview.vue';
import storyDetails from '../src/views/story-details.vue';
import addPost from './cmps/add-post.vue';
import imgUploader from '../src/cmps/img-uploader.vue';

const routes = [
  {
    path: '/',
    name: 'app',
    component: storyApp,
  },
  {
    path: '/preview',
    name: 'story-preview',
    component: storyPreview,
  },

  {
    path: '/story',
    name: 'story-app',
    component: storyApp,
    children: [
      {
        path: ':id',
        name: 'story-details',
        component: storyDetails,
      },
    ],
  },
  {
    path: '/add-post',
    name: 'add-post',
    component: addPost,
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp,
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat,
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup,
  },
  {
    path: '/user/:userId',
    name: 'user-details',
    component: userDetails,
    children: [
      {
        path: ':id',
        name: 'story-user-details',
        component: storyDetails,
      },
    ],
  },
];

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
});
