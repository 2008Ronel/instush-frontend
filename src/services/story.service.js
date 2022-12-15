// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';
import gStories from '../assets/data/stories.json' assert { type: 'json' };
import { storageService } from './async-storage.service.js';
const STORAGE_KEY = 'story';

export const storyService = {
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  getStoriesByUser,
  // addStoryMsg,
};
window.cs = storyService;
// _createStories();

async function query(filterBy) {
  var stories = await httpService.get('story');

  return stories;
}

// async function query(filterBy) {
//   // return httpService.get(STORAGE_KEY, filterBy)

//   var stories = await storageService.query(STORAGE_KEY);
//   // if (filterBy.txt) {
//   //     const regex = new RegExp(filterBy.txt, 'i')
//   //     storys = storys.filter(story => regex.test(story.vendor) || regex.test(story.description))
//   // }
//   // if (filterBy.price) {
//   //     storys = storys.filter(story => story.price <= filterBy.price)
//   // }
//   return stories;
// }

async function getStoriesByUser(userId) {
  // var stories = await storageService.query(STORAGE_KEY);
  // return stories.filter((story) => story.by._id == userId);
  var story = await httpService.get(`story?userId=${userId}`);

  return story;
}

function getById(storyId) {
  // return storageService.get(STORAGE_KEY, storyId);
  return httpService.get(`story/${storyId}`);
}

async function remove(storyId) {
  // await storageService.remove(STORAGE_KEY, storyId);
  return httpService.delete(`story/${storyId}`);
}

async function save(story) {
  var savedStory;
  if (story._id) {
    // savedStory = await storageService.put(STORAGE_KEY, story);
    savedStory = await httpService.put(`story/${story._id}`, story);
  } else {
    // Later, owner is set by the backend
    // savedStory = await storageService.post(STORAGE_KEY, story);
    savedStory = await httpService.post('story', story);
  }

  console.log('saved story');
  return savedStory;
}

// async function addStoryMsg(storyId, txt) {
//   const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt });
//   return savedMsg;
// }

function getEmptyStory() {
  return {
    // vendor: 'Susita-' + (Date.now() % 1000),
    // price: utilService.getRandomIntInclusive(1000, 9000),
  };
}

// function _createStories() {
//   const stories = utilService.loadFromStorage(STORAGE_KEY);
//   if (!stories || !stories.length) {
//     utilService.saveToStorage(STORAGE_KEY, gStories);
//   }
// }
