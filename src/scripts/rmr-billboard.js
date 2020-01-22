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
      console.error('No billboard <.rmr-billboard> found');
      return;
    }

    const
    self = this,
    scroller = RMR.Node.create('div', { class: 'rmr-billboard-scroll' }),
    theme = config.hasOwnProperty('theme') ? config.theme : null,
    height = window.innerHeight;

    scroller.addEventListener('click', function() {
      self.scroll();
    });

    node.style.minHeight = height + 'px';
    if (theme) {
      node.classList.add(theme);
    }
    if (config.scroller) {
      node.appendChild(scroller);
    }
  };

  Billboard.prototype.scroll = function() {
    const height = parseInt(window.getComputedStyle(RMR.Node.get('.rmr-billboard')).height, 10);
    RMR.Browser.scrollTo(height, 200);
  };

  module.exports = Billboard;

})();
