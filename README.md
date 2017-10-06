# in-viewport-class
A jQuery plugin that adds classes to elements in viewport

## Install

include jQuery and this script to your HTML document.
As example:

`<script src="dist/jquery.in-viewport-class.js"></script>`

Or use bower:

`bower install in-viewport-class`

## Use
add `i-v` class to every element you want to observed.

`<div class="element i-v"></div>`

## Classes

1. `in-viewport` added when the element enter the viewport, removed when the element left the viewport
2. `was-in-viewport` added when the element left the viewport
3. `in-viewport-once` added when the element enter the viewport first, newer removed

## Example

have a look at `example.html`