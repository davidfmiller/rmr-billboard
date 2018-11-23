/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  /**
   * rmr-util
   *
   * JS for your browser
   *
   *
   *
   */


  const
  RMR = require('rmr-util'),
  
  Billboard = function(config) {

    const node = RMR.Node.get(config.node);
    if (! node) {
      throw new Error('Invalid billboard <' + JSON.stringify(config.node) + '>');
    }

    const
    scroller = RMR.Node.create('div', { class: 'rmr-billboard-scroll' }),
    height = window.innerHeight;

    scroller.addEventListener('click', function() {
      RMR.Browser.scrollTo(height, 200);
    });

    node.appendChild(scroller);
    node.style.minHeight = height + 'px';

    const margin = config.hasOwnProperty('margin') ? parseInt(config.margin, 10) : 0;
    scroller.style.bottom = margin + 'px';

    const theme = config.hasOwnProperty('theme') ? config.theme : null;
    if (theme) {
      node.classList.add(theme);
    }
  };

  module.exports = Billboard;

})();
