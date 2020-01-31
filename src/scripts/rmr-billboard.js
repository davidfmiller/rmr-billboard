/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  const
  RMR = require('rmr-util'),
  CONST = {
    billboard: 'rmr-billboard',
    types: ['cross', 'scroll']
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

    if (! RMR.Object.has(config, 'type')) {
      config.type = 'scroll';
    }
    if (CONST.types.indexOf(config.type) === -1) {
      console.warn('Invalid `rmr-billboard` type `' + config.type + '`; defaulting to `scroll`');
      config.type = 'scroll';
    }
    this.type = config.type;

    this.node.classList.add(CONST.billboard);
    this.node.classList.add('rmr-' + this.type);

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
    this.goToPane(0);
  };

  Billboard.prototype.getPanes = function() {
    return RMR.Node.getAll(':scope > .rmr-pane', this.node);
  };

  Billboard.prototype.resize = function() {

    this.node.classList.add('rmr-init');

    const
      height = window.innerHeight - this.margin,
      panes = this.getPanes();

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

  /**
   
   @param index {Integer} - the 0-based of the pane that should be displayed
   @return true if navigation was successful, false if not
   */
  Billboard.prototype.goToPane = function(index) {

    index = parseInt(index, 10);

    const
      panes = this.getPanes(),
      pane = panes.length > index ? panes[index] : null;

    if (! pane) {
      console.error('Invalid rmr-billboard pane index `' + index +'`; only ' + panes.length + ' panes exist');
      return false;
    }

    if (this.type === 'scroll') {
      const height = RMR.Node.getRect(this.node).height;
      RMR.Node.scrollTo(this.node, index * height);
    } else if (this.type == 'cross') {

      let i = 0;
      panes.map((n) => {
        i === index ? n.classList.add('rmr-on') : n.classList.remove('rmr-on');
        i++;
      });
    } 

    return true;
  };


  Billboard.prototype.scroll = function() {
    const
      node = RMR.Node.get('.' + CONST.billboard),
      height = parseInt(RMR.Node.getRect(node).bottom, 10) - this.margin;

    RMR.Browser.scrollTo(height, 200);
  };

  module.exports = Billboard;

})();
