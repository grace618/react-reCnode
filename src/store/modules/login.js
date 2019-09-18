import {
  login,
} from 'service/index.js';

// Actions
const LOGININFO = 'my-app/login/LOGININFO';

// Action Creators
export const loginInfo = (data) => ({
  type: LOGININFO,
  data,
});

// Reducer
const initialState = {
  success: false,
  loginname: '',
  avatar_url: '',
  id: '',
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGININFO:
      return action.data;
    default:
      return state;
  }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export const getUserInfo = (accesstoken) => async (dispatch) => {
  const res = await login(accesstoken);
  // 按照真实开发应该获取accesstoken,然后存储accesstoken，刷新时获取用户信息
  localStorage.setItem('accesstoken', accesstoken.accesstoken);
  dispatch(loginInfo(res));
  return res;
};
/** 返回数据
 *{
     "success": true,
     "loginname": "grace618",
     "avatar_url": "",
     "id": ""
 }
*/
