import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { messages, mark_one, mark_all } from 'service/index';
import Sidebar from 'component/sidebar'
import './index.css'
function UserInfo() {
    const [messagesList, setMessages] = useState({})
    const user = useSelector((state) => state.login);
    const accesstoken = localStorage.getItem('accesstoken')
    useEffect(() => {
        const fetchData = async () => {
            const mes = await messages({ accesstoken })
            setMessages(mes.data)
        }
        fetchData()
    }, [user, accesstoken])
    const { has_read_messages = [], hasnot_read_messages = [] } = messagesList
    return (
        <div className="main">
            <Sidebar name={user.loginname} />
            <div id="content">
                <div className="panel">
                    <div className="header">
                        <ul className="breadcrumb">
                            <li><Link to="/">主页</Link><span className="divider">/</span></li>
                            <li className="active">新消息</li>
                        </ul>
                    </div>
                    <div className="inner">
                        {
                            hasnot_read_messages.map(value => (
                                <div className="cell" key={value.id}>
                                    <span>
                                        <Link to={`/user/${value.author.loginname}`} >{value.author.loginname}</Link>
                                        回复了你的话题
                                    <Link to={`/topic/${value.topic.id}`} target="_blank">{value.topic.title}</Link>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="panel">
                    <div className="header">
                        <span className="col_fade">过往信息</span>
                    </div>
                    {
                        has_read_messages.map(value => (
                            <div className="cell" key={value.id}>
                                <span>
                                    <Link to={`/user/${value.author.loginname}`} >{value.author.loginname}</Link>
                                    回复了你的话题
                                    <Link to={`/topic/${value.topic.id}`} target="_blank">{value.topic.title}</Link>
                                </span>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div >
    )
}
export default UserInfo