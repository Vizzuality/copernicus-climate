import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Icons from 'components/icons';
import './App.scss';

// const Header = lazy(() => import('components/header'));
const MapPage = lazy(() => import('pages/map'));
const Placeholder = () => <div className="c-header" />;

function AppRouter() {
  return (
    <Router>
      <div className="c-app">
        <Icons />
        <Suspense fallback={<Placeholder />}>
          {/* <Header /> */}
          <Switch>
            <Route path="/" exact component={MapPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default AppRouter;
