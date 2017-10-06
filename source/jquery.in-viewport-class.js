/*jshint esversion: 6 */

(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory($, global, global.document);
        });
    } else if (typeof exports === "object" && exports) {
        module.exports = factory(require('jquery'), global, global.document);
    } else {
        factory(jQuery, global, global.document);
    }
})(typeof window !== 'undefined' ? window : this, function($, window, document, undefined) {
    'use strict';

    const pluginName = 'inViewportClass';

    // -- Globals (shared across all plugin instances)
    const defaultOptions = {
        'tellMeClass': 'i-v',
        'inViewClass': 'in-viewport',
        'onceInViewClass': 'in-viewport-once',
        'wasInViewClass': 'was-in-viewport'
    };

    const $window = $(window);
    const $document = $(document);

    const p = {}; p[pluginName] = class {
        constructor (el, opts) {
            this.el = el;
            this.opts = $.extend({}, defaultOptions, opts);

            this._defaultOptions = defaultOptions;
            this.$el = $(this.el);

            this.$elements = [];

            this.init();
        }

        init () {

            this.$el.find(`.${this.opts.tellMeClass}`).each((index, element) => {
                this.$elements.push($(element));
            });

            $window.on('resize scroll', event => {
                this.update();
            });

            this.update();
        }

        update() {
            let viewportTop = $window.scrollTop();
            let viewportBottom = viewportTop + $window.outerHeight();

            this.$elements.forEach($element => {
                if ($element.length === 0) {
                    return;
                }

                if (this.isInViewport($element, viewportTop, viewportBottom) === true) {
                    if (!$element.hasClass(this.opts.inViewClass)) {
                        $element.addClass(this.opts.inViewClass);

                        if (!$element.hasClass(this.opts.onceInViewClass)) {
                            $element.addClass(this.opts.onceInViewClass);
                        }
                    }
                } else {
                    if ($element.hasClass(this.opts.inViewClass)) {
                        $element.removeClass(this.opts.inViewClass);
                        $element.addClass(this.opts.wasInViewClass);
                    }
                }
            });
        }

        isInViewport($element, viewportTop, viewportBottom) {
            let elmTop = $element.offset().top;
            let elmBottom = elmTop + $element.outerHeight();
            if (elmBottom >= viewportTop && elmTop < viewportBottom) return true;
            return false;
        }
    };

    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_'+ pluginName)) {
                $.data(this, 'plugin_'+ pluginName, new p[pluginName](this, options));
            }
        });
    };
});

jQuery(() => {
    $(document).inViewportClass();
});
