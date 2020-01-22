/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  const
  RMR = require('rmr-util'),
  CONST = {
    billboard: 'rmr-billboard'
  },
  getHeight = function(node, margin) {
    const top = node.previousElementSibling ? RMR.Node.getRect(node).top : 0;
    return window.innerHeight - margin - top;
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

    const
    self = this,
    scroller = RMR.Node.create('div', { class: 'rmr-billboard-scroll' }),
    theme = config.hasOwnProperty('theme') ? config.theme : null,
    height = getHeight(node, this.margin);

    node.style.minHeight = height + 'px';
    if (theme) {
      node.classList.add(theme);
    }

    if (config.resize) {
      window.addEventListener('resize', () => {
        const node = RMR.Node.get('.' + CONST.billboard);
        node.style.minHeight = getHeight(node, self.margin) + 'px'; // (window.innerHeight - self.margin) + 'px';
      });
    }

    if (config.scroller) {
      scroller.addEventListener('click', function() {
        self.scroll();
      });
      node.appendChild(scroller);
    }


  };

  Billboard.prototype.scroll = function() {
  console.log(this);

    const node = RMR.Node.get('.' + CONST.billboard);
    const height = parseInt(RMR.Node.getRect(node).bottom, 10) - this.margin;
    RMR.Browser.scrollTo(height, 200);
  };

  module.exports = Billboard;

})();
