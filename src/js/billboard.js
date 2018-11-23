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

    const node = RMR.Node.get('.rmr-billboard');
    if (! node) {
      throw new Error('No billboard <.rmr-billboard> found');
    }

    const
    self = this,
    scroller = RMR.Node.create('div', { class: 'rmr-billboard-scroll' }),
    theme = config.hasOwnProperty('theme') ? config.theme : null,
    height = window.innerHeight;

    scroller.addEventListener('click', function() {
      self.scroll();
    });

    if (theme) {
      node.classList.add(theme);
    }
    node.appendChild(scroller);
    node.style.minHeight = height + 'px';
  };

  Billboard.prototype.scroll = function() {
    const height = parseInt(window.getComputedStyle(RMR.Node.get('.rmr-billboard')).height, 10);
    RMR.Browser.scrollTo(height, 200);
  };

  module.exports = Billboard;

})();
