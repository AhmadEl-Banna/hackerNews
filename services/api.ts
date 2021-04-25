import { create } from 'apisauce';

const api = create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
})

export default api;