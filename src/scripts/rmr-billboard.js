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
    @param {object} config - theme {"dark"}, node {string|node}, type {string}, margin {Integer}
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

    this.ratio = RMR.Object.has(config, 'ratio') && config.ratio ? parseFloat(config.ratio) : 1;
    this.margin = RMR.Object.has(config, 'margin') && config.margin ? parseInt(config.margin, 10) : 0;
    this.listener = RMR.Object.has(config, 'listener') ? config.listener : null;

    const
      self = this,
      scroller = RMR.Node.create('div', { class: 'rmr-scroller' }),
      theme = RMR.Object.has(config, 'theme') ? config.theme : null;

    if (theme) {
      this.node.classList.add('rmr-' + theme);
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

  /**
   
   
   @return {Array} - array of all panes 
   */
  Billboard.prototype.getPanes = function() {
    return RMR.Node.getAll(':scope > .rmr-pane', this.node);
  };

  /**
  
   Resize billboard to occupy the appropriate space within the browser window
   */
  Billboard.prototype.resize = function() {

    this.node.classList.add('rmr-init');

    let
      height = (window.innerHeight * this.ratio) - this.margin;

    const
      panes = this.getPanes();

    if (height < 0) {
      height = 0;
    }

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
   Display a given pane within the billboard
   
   @param index {Integer} - the (0-based) index of the pane that should be displayed
   @return true if navigation was successful, false if not
   */
  Billboard.prototype.goToPane = function(index) {

    index = parseInt(index, 10);

    const
      panes = this.getPanes(),
      pane = panes.length > index ? panes[index] : null;

    if (panes.length == 0) {
      return;
    }

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

  /**
   Scroll down to the content below the billboard (ie: it's `nextElementSibling`)
   
   @param duration {Integer, optional} - number of milliseconds over which the scroll will occur
   */
  Billboard.prototype.scroll = function(duration) {
    const
      node = RMR.Node.get('.' + CONST.billboard),
      height = parseInt(RMR.Node.getRect(node).bottom, 10) - this.margin;

    RMR.Browser.scrollTo(height, duration ? parseInt(duration, 10) : 200);
  };

  module.exports = Billboard;

})();
