import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from 'views/home/index.jsx';
import login from 'views/login/index.jsx';
import detail from 'views/detail/index.jsx';
import userinfo from 'views/userinfo/index.js';
import dashboard from 'views/dashboard/index.jsx';
import collections from 'views/collect';
import message from 'views/message'
import { getUserInfo } from './store/modules/login.js';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      dispatch(getUserInfo({ accesstoken: token }));
    }
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Switch>
          {/* 加入switch有的路由先匹配 */}
          <Route path="/login" component={login} />
          <Home>
            {/* 子路由写在组件中 */}
            <Switch>
              <Route path="/" component={dashboard} exact />
              <Route path="/topic/:id" component={detail} />
              <Route path="/user/:name" component={userinfo} />
              <Route path="/collections/:user" component={collections} />
              <Route path="/message" component={message} />
            </Switch>
          </Home>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
