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
  ADMIN_DASHBOARD: 'adminDashboard',
  CREATE_WHEEL: 'createWheel',
  SYMBOL_CREATE: 'createSymbol',
  SYMBOL_UPDATE_OR_DELETE: 'updateOrDelete',
  WHEEL_UPDATE_OR_DELETE: 'updateWheel',
  WHEEL_OF_FORTUNE_TEST: 'testWheel',
  RTP_PAGE: "rtpPage",
  ADD_MONEY: "addMoney",
  CREDITS_REQUESTS: "credits"
};

export const API_ROUTES = {
  BASE_URL: 'http://192.180.0.84:5000',
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  ROLE: '/user/role',
  SEND_OTP: '/otp',
  VERIFY_OTP: '/verifyOtp',
  WHEELS: '/wheel',
  GET_GAME_DETAILS: '/getGameDetails',
  FILE_UPLOAD: '/fileUpload',
  SYMBOL: '/symbol',
  UPDATE_ROLE: '/user/updateRole',
  ADMIN: '/admin',
  SPIN_THE_WHEEL: "/spinTheWheel",
  GLOBAL_RTP: "/globalRtp",
  GET_WALLET_BALANCE: "/wallet",
  CREATE_TRANSACTION: "/transaction",
  CREDITS: "/credits"
};

export const MESSAGES = {
  ERROR_MESSAGES: {
    CANT_GET_WHEEL: 'error getting wheel',
    WALLET_GET_FAILED: "Failed to get wallet",
    FAILURE: "Failure !!"
  },
  MONEY_ADDED: "Money Added Successfully !!",
  MONEY_WITHDRAWN: "Money Withdrawn Successfully !!",
  SYMBOL_CREATED: 'Symbol Created Successfully',
  FILL_WHEEL: "Fill the whole Wheel",
  INVALID_FORM: "Fill Form Details Correctly",
  INVALID_AMOUNT: "Invalid Amount",
  FIRST_REMOVE: "First remove one item from wheel to add more !!",
  GLOBAL_RTP: 'Global RTP updated successfully',
  CREDITS_REQUESTED: "Credits Requested !!",

};

export const ROLES = {
  ADMIN: 1,
  USER: 2,
};

export const FREE_CREDITS = 10000;
