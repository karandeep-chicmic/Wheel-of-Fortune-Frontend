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
  WHEEL_OF_FORTUNE: 'wheel/:wheelId',
  WHEEL_LISTING_PAGE: 'wheelList',
  ADMIN_DASHBOARD: "adminDashboard",
  CREATE_WHEEL: "createWheel",
  SYMBOL_CREATE: "createSymbol",
  SYMBOL_UPDATE_OR_DELETE: "updateOrDelete",
  WHEEL_UPDATE_OR_DELETE: "updateWheel"
};

export const API_ROUTES = {
  BASE_URL: 'http://192.180.0.84:5000',
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  ROLE: "/user/role",
  SEND_OTP: '/otp',
  VERIFY_OTP: '/verifyOtp',
  WHEELS: '/wheel',
  GET_GAME_DETAILS:"/getGameDetails",
  FILE_UPLOAD: "/fileUpload",
  SYMBOL: "/symbol",
  UPDATE_ROLE: "/user/updateRole",
  ADMIN: "/admin"
};

export const MESSAGES = {
  ERROR_MESSAGES: {
    CANT_GET_WHEEL: 'error getting wheel',
  },
  SYMBOL_CREATED: 'Symbol Created Successfully'
};

export const ROLES ={
  ADMIN: 1,
  USER: 2,
};

