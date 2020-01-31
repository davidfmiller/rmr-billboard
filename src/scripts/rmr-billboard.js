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

    if (! RMR.Object.has(config, 'node')) {
      config.node = '.' + CONST.billboard;
    }

    this.node = RMR.Node.get(config.node);
    if (! this.node) {
      console.error('No billboard `.' + CONST.billboard + '` found');
      return;
    }

    this.node.classList.add(CONST.billboard);
    this.margin = RMR.Object.has(config, 'margin') && config.margin ? parseInt(config.margin, 10) : 0;
    this.listener = RMR.Object.has(config, 'listener') ? config.listener : null;

    const
    self = this,
    scroller = RMR.Node.create('div', { class: 'rmr-scroller' }),
    theme = config.hasOwnProperty('theme') ? config.theme : null;

    if (theme) {
      this.node.classList.add(theme);
    }

    if (RMR.Object.has(config, 'resize') && config.resize) {
      window.addEventListener('resize', () => {
        requestAnimationFrame(() => { self.resize(); });
      });
    }

    if (config.scroller) {
      scroller.addEventListener('click', function() {
        self.scroll();
      });
      this.node.appendChild(scroller);
    }

    // set initial size
    this.resize();
  };

  Billboard.prototype.resize = function() {

    const
      height = window.innerHeight - this.margin,
      panes = RMR.Node.getAll(':scope > .rmr-pane', this.node);

    this.node.style.height = height + 'px';

    let i = 0;
    panes.map((n) => {
      n.setAttribute('data-rmr-pane', i);
      n.style.height = height + 'px';
      i++;
    });

    if (this.listener) {
      this.listener(height);
    }
  };

  Billboard.prototype.scroll = function() {
    const
      node = RMR.Node.get('.' + CONST.billboard),
      height = parseInt(RMR.Node.getRect(node).bottom, 10) - this.margin;

    RMR.Browser.scrollTo(height, 200);
  };

  module.exports = Billboard;

})();
