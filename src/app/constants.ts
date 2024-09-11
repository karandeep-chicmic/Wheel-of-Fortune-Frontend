export const ROUTES_UI = {
  DEFAULT: '',
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  OTP_TEST: 'otpTest',
  FEED: 'feed',
  USER_POSTS_PAGE: 'user/:id',
  USER: 'user',
  SETTINGS: 'settings',
  FRIEND_REQUESTS: 'friendRequests',
  ADD_POST: 'addPosts',
  MESSENGER: 'messenger',
  UPDATE_POST: 'updatePost/:postId',
  UPDATE_POST_1: 'updatePost',
  WILDCARD_ROUTE: '**',
  WHEEL_OF_FORTUNE: "wheel"
};

export const API_ROUTES = {
  BASE_URL: 'http://192.180.0.71:5000',
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  SEND_OTP: '/otp',
  VERIFY_OTP: '/verifyOtp',
};
