'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

(function (global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory($, global, global.document);
        });
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object" && exports) {
        module.exports = factory(require('jquery'), global, global.document);
    } else {
        factory(jQuery, global, global.document);
    }
})(typeof window !== 'undefined' ? window : undefined, function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'inViewportClass';

    // -- Globals (shared across all plugin instances)
    var defaultOptions = {
        'tellMeClass': 'i-v',
        'inViewClass': 'in-viewport',
        'onceInViewClass': 'in-viewport-once',
        'wasInViewClass': 'was-in-viewport'
    };

    var $window = $(window);
    var $document = $(document);

    var p = {};p[pluginName] = function () {
        function _class(el, opts) {
            _classCallCheck(this, _class);

            this.el = el;
            this.opts = $.extend({}, defaultOptions, opts);

            this._defaultOptions = defaultOptions;
            this.$el = $(this.el);

            this.$elements = [];

            this.init();
        }

        _createClass(_class, [{
            key: 'init',
            value: function init() {
                var _this = this;

                this.$el.find('.' + this.opts.tellMeClass).each(function (index, element) {
                    _this.$elements.push($(element));
                });

                $window.on('resize scroll', function (event) {
                    _this.update();
                });

                this.update();
            }
        }, {
            key: 'update',
            value: function update() {
                var _this2 = this;

                var viewportTop = $window.scrollTop();
                var viewportBottom = viewportTop + $window.outerHeight();

                this.$elements.forEach(function ($element) {
                    if ($element.length === 0) {
                        return;
                    }

                    if (_this2.isInViewport($element, viewportTop, viewportBottom) === true) {
                        if (!$element.hasClass(_this2.opts.inViewClass)) {
                            $element.addClass(_this2.opts.inViewClass);

                            if (!$element.hasClass(_this2.opts.onceInViewClass)) {
                                $element.addClass(_this2.opts.onceInViewClass);
                            }
                        }
                    } else {
                        if ($element.hasClass(_this2.opts.inViewClass)) {
                            $element.removeClass(_this2.opts.inViewClass);
                            $element.addClass(_this2.opts.wasInViewClass);
                        }
                    }
                });
            }
        }, {
            key: 'isInViewport',
            value: function isInViewport($element, viewportTop, viewportBottom) {
                var elmTop = $element.offset().top;
                var elmBottom = elmTop + $element.outerHeight();
                if (elmBottom >= viewportTop && elmTop < viewportBottom) return true;
                return false;
            }
        }]);

        return _class;
    }();

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new p[pluginName](this, options));
            }
        });
    };
});

jQuery(function () {
    $(document).inViewportClass();
});
//# sourceMappingURL=jquery.in-viewport-class.js.map
