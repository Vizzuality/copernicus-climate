import React, { lazy, Suspense } from 'react';
import { Provider, createClient } from 'urql';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Icons from 'components/icons';
import './App.scss';

// const Header = lazy(() => import('components/header'));
const MapPage = lazy(() => import('pages/map'));
const Placeholder = () => <div className="c-header" />;

const client = createClient({
  url: 'https://api-euwest.graphcms.com/v1/ck0ns5hjv22o301cb1q61f3ng/master'
});

function AppRouter() {
  return (
    <Router>
      <Provider value={client}>
        <div className="c-app">
          <Icons />
          <Suspense fallback={<Placeholder />}>
            {/* <Header /> */}
            <Switch>
              <Route path="/" exact component={MapPage} />
            </Switch>
          </Suspense>
        </div>
      </Provider>
    </Router>
  );
}

export default AppRouter;
