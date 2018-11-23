/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  const
  RMR = require('rmr-util'),

  /**
    Billboard
    A billboard for your page
    @param {object} config - margin, theme, node
   */
  Billboard = function(config) {

    const node = RMR.Node.get(config.node);
    if (! node) {
      throw new Error('Invalid billboard <' + JSON.stringify(config.node) + '>');
    }

    const
    scroller = RMR.Node.create('div', { class: 'rmr-billboard-scroll' }),
    margin = config.hasOwnProperty('margin') ? parseInt(config.margin, 10) : 0,
    theme = config.hasOwnProperty('theme') ? config.theme : null,
    height = window.innerHeight;

    scroller.addEventListener('click', function() {
      RMR.Browser.scrollTo(height, 200);
    });

    node.appendChild(scroller);
    node.style.minHeight = height + 'px';

    scroller.style.bottom = margin + 'px';
    if (theme) {
      node.classList.add(theme);
    }
  };

  module.exports = Billboard;

})();
