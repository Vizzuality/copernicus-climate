import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Modal from 'components/modal';
import Icons from 'components/icons';
import Header from 'components/header';
import Footer from 'components/footer';
import HomePage from 'pages/home';
const Placeholder = () => <div className="c-header" />;

function AppRouter() {
  const modalOpenedBefore = sessionStorage.getItem('noResponsive');
  const [isOpenModal, setOpenModal] = useState(!modalOpenedBefore);
  return (
    <Router>
      {isMobile && isOpenModal ? (
        <Modal
          isOpen={isOpenModal}
          handleClose={() => setOpenModal(false)}
          afterOpen={() => sessionStorage.setItem('noResponsive', true)}
          title="Sorry! no responsive"
          text="This site does not support mobile version yet. Check the desktop version for the full experience."
        />
      ) : (
        <div className="c-app">
          <Icons />
          <Suspense fallback={<Placeholder />}>
            <Header />
            <Switch>
              <Route path="/" exact component={HomePage} />
              {/* <Redirect
                from="/:iso"
                exact
                to="/:iso/:time?/:type?"
                component={HomePage}
              /> */}
            </Switch>
            <Footer />
          </Suspense>
        </div>
      )}
    </Router>
  );
}

export default AppRouter;
