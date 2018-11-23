/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  const
  RMR = require('rmr-util'),

  /**
    Billboard
    A billboard for your page
    @param {object} config - theme {"dark"}, node {string|node}
   */
  Billboard = function(config) {

    const node = RMR.Node.get(config.node);
    if (! node) {
      throw new Error('Invalid billboard <' + JSON.stringify(config.node) + '>');
    }

    const
    scroller = RMR.Node.create('div', { class: 'rmr-billboard-scroll' }),
    theme = config.hasOwnProperty('theme') ? config.theme : null,
    height = window.innerHeight;

    scroller.addEventListener('click', function() {
      RMR.Browser.scrollTo(height, 200);
    });

    node.appendChild(scroller);
    node.style.minHeight = height + 'px';
  };

  module.exports = Billboard;

})();
