/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import LogosBlock from 'components/LogosBlock';
import BgFooter from 'assets/img/bg-header.png';
import { FOOTER_MENU, FOOTER_SOCIAL_LINKS } from 'const/constants';
import './styles.scss';

const Footer = () => {
  return (
    <div className="site-footer">
      <footer role="contentinfo">
        <div className="site-footer__top">
          <div className="site-footer__top__inner">
            <div className="social-list">
              <div className="social-list__inner">
                <h2 className="social-list__heading h2--alt">Follow us</h2>
                {FOOTER_SOCIAL_LINKS.map((s, key) => (
                  <a key={key} className={`social-link ${s.class}`} href={s.link} title={s.class}>
                    <svg className="social-link-icon-img">
                      <use href={s.icon} xlink="http://www.w3.org/1999/xlink" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="newsletter" id="mc_embed_signup">
              <form
                action="https://copernicus.us8.list-manage.com/subscribe/post?u=361ac98ec95eb114a884f0249&amp;id=a645d5154b"
                className="validate"
                id="mc-embedded-subscribe-form"
                method="post"
                name="mc-embedded-subscribe-form"
                noValidate=""
                target="_blank"
              >
                <div id="mc_embed_signup_scroll">
                  <label className="h2--alt" htmlFor="mce-EMAIL">
                    Subscribe to our mailing list
                  </label>
                  <input
                    className="email"
                    id="mce-EMAIL"
                    name="EMAIL"
                    placeholder="email address"
                    required=""
                    type="email"
                  />
                  <input
                    className="button-white"
                    id="mc-embedded-subscribe"
                    name="subscribe"
                    type="submit"
                    value="Subscribe"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="site-footer__middle" style={{ backgroundImage: `url(${BgFooter})` }}>
          <div className="site-footer__middle__inner">
            <div className="region region--footer_middle">
              <LogosBlock position="footer" />
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <div className="site-footer__bottom__inner">
            <div className="site-footer__bottom">
              <div className="site-footer__bottom__inner">
                <ul block="ce_footer" className="nav--footer">
                  {FOOTER_MENU.map(m => (
                    <li key={m.link} className="menu-item">
                      <a
                        href={m.fullUrl ? m.fullUrl : m.link}
                        target={m.fullUrl ? '_blank' : '_self'}
                      >
                        {m.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
