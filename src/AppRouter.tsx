import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';

const HelloWorld = React.lazy(() => import('@/pages/HelloWord'));
const Login = React.lazy(() => import('@/pages/LoginPage'));

const AppRouter = () => {

  return (
      <div>
        <Suspense fallback={<Spin className="page-spin-fallback" />}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/helloworld" exact component={HelloWorld} />
          </Switch>
        </Suspense>
      </div>
  );
};

export default AppRouter;
