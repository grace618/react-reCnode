import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getUserinfo, topicCollect } from 'service/index';
import Sidebar from 'component/sidebar'
import './index.css'
function UserInfo(props) {
    const [userinfo, setUserInfo] = useState([])
    const [topic, setTopic] = useState(0)
    const { match: { params: { name } } } = props;
    useEffect(() => {
        const fetchData = async () => {
            const userinfo = await getUserinfo(name)
            const topic = await topicCollect(name)
            setTopic(topic.data.length)
            setUserInfo(userinfo.data)
        }
        fetchData()
    }, [name])
    const { recent_replies = [], recent_topics = [] } = userinfo;
    return (
        <div className="main">
            <Sidebar name={userinfo.loginname} />
            <div id="content">
                <div className="panel">
                    <div className="header">
                        <ul className="breadcrumb">
                            <li to="/"><Link to="/">主页</Link><span className="divider">/</span></li>
                        </ul>
                    </div>
                    <div className="inner userinfo">
                        <div className="user_big_avatar">
                            <img src={userinfo.avatar_url} className="user_avatar" title={userinfo.loginname} alt={userinfo.avatar_url} />
                        </div>
                        <span className="dark">{userinfo.loginname}</span>
                        <div className="user_profile">
                            <ul className="unstyled">
                                <li className="big">{userinfo.score} 积分</li>
                                <li>
                                    <Link className="dark" to={`/collections/${userinfo.loginname}`}>
                                        <span className="big collect-topic-count">{topic}</span>个话题收藏
                                    </Link>
                                </li>
                                <li>
                                    <i className="fa fa-lg fa-fw fa-github"></i>
                                    <a className="dark" href={`https://github.com/${userinfo.githubUsername}`} target="_blank" rel="noopener noreferrer">
                                        {userinfo.githubUsername}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <p className="col_fade">注册时间 {userinfo.create_at}</p>
                    </div>
                </div>
                <div className="panel">
                    <div className="header">
                        <span className="col_fade">最近创建的话题</span>
                    </div>
                    {
                        recent_topics.map(value => (
                            <div className="cell" key={value.id}>
                                <Link className="user_avatar pull-left" to={`/user/${value.author.loginname}`}>
                                    <img src={value.author.avatar_url} title={value.author.avatar_url} alt={value.author.avatar_url} />
                                </Link>
                                <Link className="last_time pull-right" to={`/topic/${value.id}`}>
                                    <img className="user_small_avatar" src={value.author.avatar_url} alt={value.author.avatar_url} />
                                    <span className="last_active_time">{value.last_reply_at}</span>
                                </Link>
                                <div className="topic_title_wrapper">
                                    <Link className="topic_title" to={`/topic/${value.id}`} title={value.title}>{value.title}</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="panel">
                    <div className="header">
                        <span className="col_fade">最近参与的话题</span>
                    </div>
                    {
                        recent_replies.map((value) => (
                            <div className="cell" key={value.id}>
                                <Link className="user_avatar pull-left" to={`/user/${value.author.loginname}`}>
                                    <img src={value.author.avatar_url} title={value.author.avatar_url} alt={value.author.avatar_url} />
                                </Link>
                                <Link className="last_time pull-right" to={`/topic/${value.id}`}>
                                    <img className="user_small_avatar" src={value.author.avatar_url} alt={value.author.avatar_url} />
                                    <span className="last_active_time">{value.last_reply_at} 天前</span>
                                </Link>
                                <div className="topic_title_wrapper">
                                    <Link className="topic_title" to={`/topic/${value.id}`} title={value.title}>
                                        {value.title}
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div >
    )
}
export default UserInfo