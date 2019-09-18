import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { topics } from 'service/index';
import Sidebar from 'component/sidebar'
import './index.css';

function Dashboard(props) {
  const [topicsList, setTopicsList] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const { location: { search } } = props;
  const tagName = queryString.parse(search).tab;
  const user = useSelector((state) => state.login);
  useEffect(() => {
    const fetchData = async () => {
      const res = await topics({ tab: tagName, limit: 20, page });
      setTopicsList(res.data);
    };
    fetchData();
  }, [tagName, page]);// 通过监听变化渲染页面

  const tag = {
    share: '分享',
    ask: '问答',
    job: '招聘',
    dev: '客户端测试',
  };
  return (
    <div className="app-main">
      <div className="content">
        <div className="NavTop">
          <Link
            to={{
              pathname: '/',
              search: '?tab=all',
            }}
            className={tagName === 'all' ? 'current' : ''}
          >
            全部
          </Link>
          <Link to="/?tab=good" className={tagName === 'good' ? 'current' : ''}>精华</Link>
          <Link to="/?tab=share" className={tagName === 'share' ? 'current' : ''}>分享</Link>
          <Link to="/?tab=ask" className={tagName === 'ask' ? 'current' : ''}>问答</Link>
          <Link to="/?tab=job" className={tagName === 'job' ? 'current' : ''}>招聘</Link>
        </div>
        <div className="inner">
          <div className="topicList">
            {
              topicsList.map((list) => (
                <div className="cell" key={list.id}>
                  <div className="cell-left">
                    <Link className="user_avatar pull-left" to={`/user/${list.author.loginname}`}>
                      <img src={list.author.avatar_url} title="singingXY" alt={list.author.avatar_url} />
                    </Link>
                    <span className="reply_count pull-left">
                      <span className="count_of_replies" title="回复数">{list.reply_count}</span>
                      <span className="count_seperator">/</span>
                      <span className="count_of_visits" title="点击数">{list.visit_count}</span>
                    </span>
                    <div className="topic_title_wrapper">
                      <span className="topiclist-tab">{(list.good && '精华') || tag[list.tab]}</span>
                      <Link
                        className="topic_title"
                        to={`/topic/${list.id}`}
                        title={list.title}
                      >
                        {list.title}
                      </Link>
                    </div>
                  </div>
                  <Link className="last_time pull-right" to={`/user/${list.author.loginname}`}>
                    <img
                      className="user_small_avatar"
                      src={list.author.avatar_url}
                      alt={list.author.avatar_url}
                    />
                    <span className="last_active_time">{new Date(list.create_at).toLocaleString()}</span>
                  </Link>
                </div>
              ))
            }
          </div>
          {/* total接口未提供，假设200 */}
          <Pagination defaultCurrent={page} onChange={(page) => setCurrentPage(page)} pageSize={20} total={200} />
        </div>
      </div>
      <Sidebar name={user.loginname} />
    </div>
  );
}
export default Dashboard;
