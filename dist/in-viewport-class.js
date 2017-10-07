'use strict';

/*jshint esversion: 6 */

(function (window, document) {
    var WATCH_CLASS = 'i-v';
    var IN_VIEWPORT_CLASS = 'in-viewport';
    var ONCE_IN_VIEWPORT_CLASS = 'in-viewport-once';
    var WAS_IN_VIEWPORT = 'was-in-viewport';

    var elements = [];

    function hasClass(element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }

    function addClass(element, className) {
        if (element.classList) {
            return element.classList.add(className);
        } else {
            return element.className += ' ' + className;
        }
    }

    function removeClass(element, className) {
        if (element.classList) {
            return element.classList.remove(className);
        } else {
            return element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    function storeElements() {
        elements = document.getElementsByClassName(WATCH_CLASS);
    }

    function update() {
        var viewportTop = window.pageYOffset || document.documentElement.scrollTop;
        var viewportBottom = viewportTop + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        for (var i = 0, len = elements.length; i < len; i += 1) {
            var element = elements[i];

            if (true === isInViewport(element, scrollTop, viewportTop, viewportBottom)) {
                if (!hasClass(element, IN_VIEWPORT_CLASS)) {
                    addClass(element, IN_VIEWPORT_CLASS);

                    if (!hasClass(element, ONCE_IN_VIEWPORT_CLASS)) {
                        addClass(element, ONCE_IN_VIEWPORT_CLASS);
                    }
                }
            } else {
                if (hasClass(element, IN_VIEWPORT_CLASS)) {
                    removeClass(element, IN_VIEWPORT_CLASS);

                    if (!hasClass(element, WAS_IN_VIEWPORT)) {
                        addClass(element, WAS_IN_VIEWPORT);
                    }
                }
            }
        }
    }

    function isInViewport(element, scrollTop, viewportTop, viewportBottom) {
        var elementRect = element.getBoundingClientRect();
        var elementTop = elementRect.top + scrollTop;
        var elementBottom = elementTop + element.offsetHeight;

        if (elementBottom >= viewportTop && elementTop < viewportBottom) return true;
        return false;
    }

    document.onreadystatechange = function () {
        if (document.readyState === 'interactive') {
            storeElements();

            window.addEventListener('scroll', update);
            window.addEventListener('resize', update);

            update();
        }
    };
})(window, document);
//# sourceMappingURL=in-viewport-class.js.map
