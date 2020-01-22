/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  const
  RMR = require('rmr-util'),
  CONST = {
    billboard: 'rmr-billboard'
  },

  /**
    Billboard
    A billboard for your page
    @param {object} config - theme {"dark"}, node {string|node}
   */
  Billboard = function(config) {

    const node = RMR.Node.get('.' + CONST.billboard);
    if (! node) {
      console.error('No billboard `.' + CONST.billboard + '` found');
      return;
    }
    this.margin = RMR.Object.has(config, 'margin') && config.margin ? parseInt(config.margin, 10) : 0;

console.log(this.margin);

    const
    self = this,
    scroller = RMR.Node.create('div', { class: 'rmr-billboard-scroll' }),
    theme = config.hasOwnProperty('theme') ? config.theme : null,
    height = window.innerHeight;

    node.style.minHeight = (height - this.margin) + 'px';
    if (theme) {
      node.classList.add(theme);
    }

    if (config.resize) {
      window.addEventListener('resize', () => {
        RMR.Node.get('.' + CONST.billboard).style.minHeight = (window.innerHeight - self.margin) + 'px';
      });
    }

    if (config.scroller) {
      scroller.addEventListener('click', () => {
        self.scroll();
      });
      node.appendChild(scroller);
    }
  };

  Billboard.prototype.scroll = () => {
    const height = parseInt(window.getComputedStyle(RMR.Node.get('.' + CONST.billboard)).height, 10) - this.margin;
    RMR.Browser.scrollTo(height, 200);
  };

  module.exports = Billboard;

})();
