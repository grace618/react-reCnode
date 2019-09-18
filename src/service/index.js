import fetch from 'utils/index';
// https://cnodejs.org 其实已做跨域处理
//分类
const topics = (params) => fetch({
  url: '/api/v1/topics',
  method: 'get',
  params,
});
//详情
const detail = (id) => fetch({
  url: `/api/v1/topic/${id}`,
  method: 'get',
});
//用户信息
const getUserinfo = (name) => fetch({
  url: `/api/v1/user/${name}`,
  method: 'get'
})
//收藏列表
const topicCollect = (name) => fetch({
  url: `/api/v1/topic_collect/${name}`,
  method: 'get'
})
// 登录
const login = (accesstoken) => fetch({
  url: '/api/v1/accesstoken',
  method: 'post',
  data: accesstoken,
});
//收藏
const collect = (data) => fetch({
  url: '/api/v1/topic_collect/collect',
  method: 'post',
  data
});
//取消收藏
const de_collect = (data) => fetch({
  url: '/api/v1//topic_collect/de_collect',
  method: 'post',
  data
});
//我的收藏
const topic_collect = (name) => fetch({
  url: `/api/v1/topic_collect/${name}`,
  method: 'get',
});
//获取未读消息数
const count = (params) => fetch({
  url: `/api/v1/message/count`,
  method: 'get',
  params
});
//获取已读和未读消息
const messages = (params) => fetch({
  url: `/api/v1/messages`,
  method: 'get',
  params
});
//标记全部已读
const mark_all = (data) => fetch({
  url: `/api/v1/message/mark_all`,
  method: 'post',
  data
});
//标记单个消息已读
const mark_one = (data, msg_id) => fetch({
  url: `/api/v1/message/mark_one/${msg_id}`,
  method: 'post',
  data
});
export {
  topics,
  detail,
  login,
  getUserinfo,
  topicCollect,
  collect,
  de_collect,
  topic_collect,
  count,
  messages,
  mark_one,
  mark_all
};
