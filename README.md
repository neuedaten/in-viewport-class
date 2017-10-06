# in-viewport-class
A plain javascript script that adds classes to elements in viewport.
This Repository also includes a jQuery version.

## Install

### Plain Javascript:

`<script src="dist/in-viewport-class.js"></script>`

### jQuery

include this script after the jQuery library:

```<script src="dist/jquery.in-viewport-class.js"></script>```html

### bower

```bower install in-viewport-class```bash

### npm
```npm install --save in-viewport-class```bash


## Use
add `i-v` class to every element you want to observed.

```<div class="element i-v"></div>```html

## Classes

1. `in-viewport` added when the element enter the viewport, removed when the element left the viewport
2. `was-in-viewport` added when the element left the viewport
3. `in-viewport-once` added when the element enter the viewport first, newer removed

## Example

have a look at `example.html`