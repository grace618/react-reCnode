import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topicCollect } from 'service/index';
import Sidebar from 'component/sidebar'
import './index.css'
function Collections(props) {
    const [topicsList, setTopicsList] = useState([]);
    const { match: { params: { user } } } = props;
    useEffect(() => {
        const fetchData = async () => {
            const res = await topicCollect(user);
            setTopicsList(res.data);
        };
        fetchData();
    }, [user]);// 通过监听变化渲染页面

    return (
        <div className="app-main">
            <div id="main">
                <Sidebar name={user} />
                <div className="content" id="content">
                    <div className="panel">
                        <div className="header">
                            <ul className="breadcrumb">
                                <li><a href="/">主页</a><span className="divider">/</span></li>
                                <li className="active">{user} 收藏的话题</li>
                            </ul>
                        </div>
                        <div className="inner no-padding">
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
                                                    {
                                                        list.top && <span className="topiclist-tab">置顶</span>
                                                    }
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
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Collections;
