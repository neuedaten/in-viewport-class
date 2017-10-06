/*jshint esversion: 6 */

((window, document) => {
    const WATCH_CLASS = 'i-v';
    const IN_VIEWPORT_CLASS = 'in-viewport';
    const ONCE_IN_VIEWPORT_CLASS = 'in-viewport-once';
    const WAS_IN_VIEWPORT = 'was-in-viewport';

    let elements = [];

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
        }
        else {
           return element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    function storeElements() {
        elements = document.getElementsByClassName(WATCH_CLASS);
    }

    function update() {
        let viewportTop = window.pageYOffset || document.documentElement.scrollTop;
        let viewportBottom = viewportTop + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        for(let i=0, len = elements.length; i < len; i+= 1) {
            let element = elements[i];

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
        let elementRect = element.getBoundingClientRect();
        let elementTop = elementRect.top + scrollTop;
        let elementBottom = elementTop + element.offsetHeight;

        if (elementBottom >= viewportTop && elementTop < viewportBottom) return true;
        return false;
    }

    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            storeElements();

            window.addEventListener('scroll', update);
            window.addEventListener('resize', update);

            update();
      }
    };

})(window, document);