import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getUserinfo } from 'service/index';
function Sidebar(props) {
    const [userinfo, setUserInfo] = useState({})
    const { name } = props
    useEffect(() => {
        const fetchData = async () => {
            if (name) {
                const res = await getUserinfo(name)
                setUserInfo(res)
            }
        }
        fetchData()
    }, [name])
    return (
        <div className="sidebar" id="sidebar">
            {
                (userinfo.success) ? (
                    <div className="panel">
                        <div className="header">
                            <span className="col_fade">个人信息</span>
                        </div>
                        <div className="inner">
                            <div className="user_card">
                                <div>
                                    <Link className="user_avatar" to={`/user/${userinfo.data.loginname}`}>
                                        <img
                                            src={userinfo.data.avatar_url}
                                            title={userinfo.data.loginname}
                                            alt="头像"
                                        />
                                    </Link>
                                    <span className="user_name">
                                        <Link className="dark" to={`/user/${userinfo.data.loginname}`}>{userinfo.data.loginname}</Link>
                                    </span>
                                    <div className="board clearfix">
                                        <div className="floor">
                                            <span className="big">积分: {userinfo.data.score}</span>
                                        </div>
                                    </div>
                                    <div className="space clearfix" />
                                    <span className="signature">
                                        “
                                        这家伙很懒，什么个性签名都没有留下。
                                        ”
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="inner">
                                <a href="https://cnodejs.org/" id="create_topic_btn" target="_blank" rel="noopener noreferrer">
                                    <span className="span-success">发布话题</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="panel">
                            <div className="inner">
                                <p>CNode：Node.js专业中文社区</p>
                                <div>
                                    您可以
                                <Link to="/login"> 登录 </Link>
                                    或通过
                                <a href="https://cnodejs.org/">cnode社区</a>
                                    注册
                                 </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
export default Sidebar