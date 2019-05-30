import React from 'react';
import PropTypes from 'prop-types';
import { SocialMediaBar, SocialMediaSeparator } from '../styled/SocialMediaBox';
import {
  MailIcon, FacebookIcon,
  TwitterIcon, ShowMoreIcon,
} from '../styled/Icons';

export default function SocialMediaBox(props) {
  let { name } = props;
  name = name.split(' ').join('').toLowerCase();
  const link = name.split(' ').join('-').toLowerCase();

  return (
    <SocialMediaBar>
      <MailIcon>
        <a href={`mailto:hello@${name}.com`}>
          <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <title>E-Mail</title>
            <g id="Functional" stroke="none" strokeWidth="1" fillRule="evenodd">
              <g id="social_email" strokeWidth="1.2" stroke="#FFFFFF">
                <g id="Page-1-Copy-3" transform="translate(6.000000, 11.000000)">
                  <polygon id="Stroke-1" points="0 17.6710391 27.0233057 17.6710391 27.0233057 0 0 0" />
                  <polyline id="Stroke-3" points="27.0233057 1.51868508e-05 13.5706128 10.6064354 0 1.51868508e-05" />
                  <path d="M0,17.6710391 L7.32323908,10.2980512" id="Stroke-4" />
                  <path d="M20.110153,10.6064506 L27.0232827,17.5761517" id="Stroke-5" />
                </g>
              </g>
            </g>
          </svg>
        </a>
      </MailIcon>
      <SocialMediaSeparator />
      <FacebookIcon>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.thenotoriousfec.com/restaurants/${link}`}>
          <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <title>Facebook</title>
            <g id="Functional" stroke="none" strokeWidth="1" fillRule="evenodd">
              <g id="social_facebook">
                <ellipse className="zgt-sharing-icon-border" stroke="#FFFFFF" strokeWidth="1.2" cx="20" cy="19.9875519" rx="18" ry="17.9875519" />
                <path d="M22.0101002,30.3858921 L22.0101002,21.0869245 L25.1943446,21.0869245 L25.6710784,17.4629342 L22.0101002,17.4629342 L22.0101002,15.1491487 C22.0101002,14.0999646 22.3072901,13.384921 23.8422846,13.384921 L25.8,13.3840708 L25.8,10.1427614 C25.4613345,10.0986267 24.2992268,10 22.9473245,10 C20.1246913,10 18.192366,11.6887891 18.192366,14.7903515 L18.192366,17.4629342 L15,17.4629342 L15,21.0869245 L18.192366,21.0869245 L18.192366,30.3858921 L22.0101002,30.3858921 Z" id="Fill-3" fill="#FFFFFF" />
              </g>
            </g>
          </svg>
        </a>
      </FacebookIcon>
      <TwitterIcon>
        <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
          <title>Twitter</title>
          <g id="Functional" stroke="none" strokeWidth="1" fillRule="evenodd">
            <g id="social_twitter">
              <g id="Group-25" transform="translate(2.000000, 2.000000)">
                <g id="Page-1-Copy-4" strokeWidth="1.2" stroke="#FFFFFF">
                  <g id="Group-19">
                    <ellipse className="zgt-sharing-icon-border" cx="18" cy="17.9875519" rx="18" ry="17.9875519" />
                  </g>
                </g>
                <path d="M25.4535378,14.8306609 C25.4535378,19.6125533 21.8114118,25.1264182 15.1508067,25.1264182 C13.105916,25.1264182 11.2025294,24.5273874 9.6,23.5006609 C9.88323529,23.5340664 10.1715378,23.5512226 10.4637731,23.5512226 C12.1603109,23.5512226 13.7216975,22.972749 14.9609748,22.0022525 C13.3764454,21.9729283 12.0391513,20.9267783 11.5783361,19.4892101 C11.7994034,19.5313826 12.0262941,19.5541316 12.2596134,19.5541316 C12.5898908,19.5541316 12.9097311,19.5098429 13.2136134,19.4272362 C11.5571597,19.0947688 10.3088824,17.6322599 10.3088824,15.8789271 C10.3088824,15.8636603 10.308958,15.8485448 10.3092605,15.8334292 C10.7974538,16.1045273 11.3558319,16.2673222 11.9494538,16.2860655 C10.9778319,15.6371532 10.3385294,14.5295584 10.3385294,13.2742087 C10.3385294,12.6110122 10.5170924,11.9894591 10.8287647,11.4549718 C12.6147731,13.6442383 15.2829328,15.0849052 18.2924118,15.2357587 C18.2306975,14.970858 18.1986303,14.6946962 18.1986303,14.4110522 C18.1986303,12.4126956 19.819916,10.7925311 21.8198824,10.7925311 C22.8613866,10.7925311 23.8024538,11.2319413 24.4630084,11.9352697 C25.2878319,11.7730039 26.0628151,11.4719013 26.762395,11.0572051 C26.4920924,11.9021666 25.9179076,12.61139 25.1703025,13.0591894 C25.9028571,12.9717457 26.6006218,12.7772081 27.2500588,12.4894072 C26.7645126,13.2150311 26.1505462,13.85238 25.4431008,14.3626067 C25.4500588,14.5177682 25.4535378,14.6738367 25.4535378,14.8306609 Z" id="Fill-1" fill="#FFFFFF" />
              </g>
            </g>
          </g>
        </svg>
      </TwitterIcon>
      <ShowMoreIcon>
        <svg width="37px" height="37px" viewBox="0 0 37 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
          <title>Show More</title>
          <g id="FINAL" stroke="none" strokeWidth="1.2" fillRule="evenodd">
            <g id="Artboard" transform="translate(-902.000000, -361.000000)">
              <g id="Group-7" transform="translate(623.000000, 180.000000)">
                <g id="Group-2-Copy-3" transform="translate(98.000000, 170.000000)">
                  <g id="Group-19" transform="translate(182.000000, 12.000000)">
                    <circle className="zgt-sharing-icon-border" stroke="#FFFFFF" cx="17.5" cy="17.5" r="17.5" />
                    <text id="…" fontFamily="DomaineText-BlackItalic, Domaine Text" fontSize="16" fontStyle="italic" fontWeight="700" fill="#FFFFFF">
                      <tspan x="10" y="19.1666667">…</tspan>
                    </text>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </ShowMoreIcon>
    </SocialMediaBar>
  );
}

SocialMediaBox.propTypes = {
  name: PropTypes.string,
};

SocialMediaBox.defaultProps = {
  name: 'restaurant',
};
