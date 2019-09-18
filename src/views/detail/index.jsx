// eslint-disable-next-line react/jsx-curly-newline
import React, { useState, useEffect }
  from 'react';
import { Link } from 'react-router-dom';
import { detail, de_collect, collect } from 'service/index';
import Sidebar from 'component/sidebar'
import './index.css';

function Detail(props) {
  const [articleDetail, setArticleDetail] = useState({});
  const [is_collect, set_collect] = useState(false)
  const { match: { params: { id } } } = props;
  useEffect(() => {
    const fetchData = async () => {
      const res = await detail(id);
      setArticleDetail(res.data);
      set_collect(res.data.is_collect)
    };
    fetchData();
  }, [id]);
  const collect_topic = async (topic_id, is_collect) => {
    const data = { accesstoken: localStorage.getItem('accesstoken'), topic_id }
    if (is_collect) {
      const re = await de_collect(data)
      if (re.success) {
        set_collect(false)
        alert('已取消~~')
      }
    } else {
      const result = await collect(data)
      if (result.success) {
        set_collect(true)
        alert('收藏成功')
      }
    }
  }
  const tag = {
    share: '分享',
    ask: '问答',
    job: '招聘',
    dev: '客户端测试',
  };
  const { replies = [], author = {} } = articleDetail;
  return (
    <div className="main">
      <Sidebar name={author.loginname} />
      <div id="content">
        <div className="panel">
          <div className="header topic_header">
            <span className="topic_full_title">{articleDetail.title}</span>
            <div className="changes">
              <span>
                发布于
                {new Date(articleDetail.create_at).toLocaleString()}
              </span>
              <span>
                作者
                <Link to={`/user/${author.loginname}`}>
                  {author.loginname}
                </Link>
              </span>
              <span>
                {articleDetail.visit_count}
                次浏览
              </span>
              <span>
                来自
                {tag[articleDetail.tab]}
              </span>
              <input
                className="span-common span-success pull-right collect_btn"
                type="submit"
                value={is_collect ? '取消收藏' : '♡收藏'}
                action="collect"
                onClick={() => collect_topic(articleDetail.id, articleDetail.is_collect)}
              />
            </div>
          </div>
          <div className="inner topic">
            <div className="topic_content">
              <div className="markdown-text" dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="header">
            <span className="col_fade">
              {articleDetail.reply_count}
              回复
            </span>
          </div>
          {replies.map((item, index) => (
            <div
              className="cell reply_area reply_item"
              key={item.id}
            >
              <div className="author_content">
                <Link to={`/user/${item.author.loginname}`} className="user_avatar">
                  <img
                    src={item.author.avatar_url}
                    title="{item.author.avatar_url}"
                    alt={item.author.avatar_url}
                  />
                </Link>
                <div className="user_info">
                  <Link className="dark reply_author" to={`/user/${item.author.loginname}`}>{item.author.loginname}</Link>
                  <span className="reply_time" href="#5d4d2a13697873456c6bc3d9">
                    {index + 1}
                    楼•
                    {new Date(item.create_at).toLocaleString()}
                  </span>
                </div>
                <div className="user_action">
                  <span>
                    <i className="fa up_btn fa-thumbs-o-up invisible" title="喜欢" />
                    <span className="up-count" />
                  </span>
                  <span>
                    <i className="fa fa-reply reply2_btn" title="回复" />
                  </span>
                </div>
              </div>
              <div className="reply_content from-grace618">
                <div className="markdown-text">
                  <div className="content markdown-body" dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div >
  );
}

export default Detail;
