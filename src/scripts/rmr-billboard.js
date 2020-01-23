/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  const
  RMR = require('rmr-util'),
  CONST = {
    billboard: 'rmr-billboard'
  },
  getHeight = function(node, margin) {
//    const top = RMR.Node.getRect(node.parentNode).top;
    return window.innerHeight - margin;
  },

  /**
    Billboard
    A billboard for your page
    @param {object} config - theme {"dark"}, node {string|node}
   */
  Billboard = function(config) {

    if (! RMR.Object.has(config, 'node')) {
      config.node = '.' + CONST.billboard;
    }

    const node = RMR.Node.get(config.node);
    if (! node) {
      console.error('No billboard `.' + CONST.billboard + '` found');
      return;
    }

    node.classList.add(CONST.billboard);
    this.margin = RMR.Object.has(config, 'margin') && config.margin ? parseInt(config.margin, 10) : 0;
    this.listener = RMR.Object.has(config, 'listener') ? config.listener : null;

    const
    self = this,
    scroller = RMR.Node.create('div', { class: 'rmr-scroller' }),
    theme = config.hasOwnProperty('theme') ? config.theme : null,
    height = getHeight(node, this.margin);

    node.style.height = height + 'px';
    self.listener(height);
    if (theme) {
      node.classList.add(theme);
    }

    if (config.resize) {
      window.addEventListener('resize', () => {
        const
          node = RMR.Node.get('.' + CONST.billboard),
          height = parseInt(getHeight(node, self.margin), 10);

        node.style.height = height + 'px';
        if (self.listener) {
          requestAnimationFrame(() => {
            self.listener(height);
          });
        }
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
    const node = RMR.Node.get('.' + CONST.billboard);
    const height = parseInt(RMR.Node.getRect(node).bottom, 10) - this.margin;
    RMR.Browser.scrollTo(height, 200);
  };

  module.exports = Billboard;

})();
