# Mixin-Macros

**String combinators designed to help the creation of jsincss plugins**

These macros were made after the first 24 jsincss plugins had been written in an attempt to simplify the source code, reveal higher-level patterns across multiple plugins, and lower the bar for creating new plugins and exploring similar ideas to the plugins that already exist with less overhead.

## Usage

This is a command-line script meant to be run with Node. It accepts two arguments, the first argument is the symbolic expression to evaluate, and the second argument is optionally either `"vanilla"` to format the output into a vanilla JS module, or `"cjs"` to output a CommonJS formatted module.

## Example

Run the `mixin-macros.js` file with node on the command line. In this example we give it the expression `mixin('demo')` to evaluate:

```
node mixin-macros.js "mixin('demo')"
```

And the output it should give us is an empty function named `demo`:

```js
function demo() {

}
```

If we change the input command to include a second argument of `"vanilla"` like this:

```
node mixin-macros.js "mixin('demo')" "vanilla"
```

The output returned to us is formatted as a vanilla JS module:

```js
export default () => {

}
```

And likewise adding `"cjs"` as the second argument outputs the same code formatted as a CommonJS module:

```js
module.exports = () => {

}
```

For a larger example of an expression that can be evaluated, look at `[demo.sexp](examples/demo.sexp)`:

```js
mixin('demo', ['selector', 'string', 'rule'],
  returnValue('Array.from(document.querySelectorAll(selector))',
    filterFunc('tag.textContent.includes(string)',
      reduceFunc(
        createAttribute(['selector', 'string'],
          addAttribute('tag', 'text',
            addRule('', '', 'text')))))))
```

Which makes use of a few macros included in this library like `returnValue()` and `filterFunc` and more, and when evaluated turns into:

```js
function demo(selector, string, rule) {

  return Array.from(document.querySelectorAll(selector))

    .filter(tag => tag.textContent.includes(string))

    .reduce((styles, tag, count) => {

      const attr = (selector + string).replace(/\W/g, '')

      tag.setAttribute(`data-text-${attr}`, count)
      styles += `[data-text-${attr}="${count}"] { ${rule} }\n`
      count++

      return styles

    }, '')

}
```

## How to use the macros

The macros that exist may not be enough to express all of your JavaScript logic, so the helper function `prelude()` lets you include raw JS at any point in your data. As you experiment with these macros it may become necessary for you to split existing macros into smaller pieces, or even build higher-level sections of templates by combining multiple smaller pieces together in a specific order.

## Plugins Using `Mixin-Macros`

The following plugins use `mixin-macros` for their source code:

- [jsincss-ancestor-selector](https://github.com/tomhodgins/jsincss-ancestor-selector)
- [jsincss-aspect-ratio](https://github.com/tomhodgins/jsincss-aspect-ratio)
- [jsincss-auto-expand](https://github.com/tomhodgins/jsincss-auto-expand)
- [jsincss-closest-selector](https://github.com/tomhodgins/jsincss-closest-selector)
- [jsincss-compare-attribute](https://github.com/tomhodgins/jsincss-compare-attribute)
- [jsincss-custom-specificity](https://github.com/tomhodgins/jsincss-custom-specificity)
- [jsincss-days](https://github.com/tomhodgins/jsincss-days)
- [jsincss-elder-selector](https://github.com/tomhodgins/jsincss-elder-selector)
- [jsincss-element-query](https://github.com/tomhodgins/jsincss-element-query)
- [jsincss-element-units](https://github.com/tomhodgins/jsincss-element-units)
- [jsincss-first-selector](https://github.com/tomhodgins/jsincss-first-selector)
- [jsincss-frontend-variables](https://github.com/tomhodgins/jsincss-frontend-variables)
- [jsincss-has-selector](https://github.com/tomhodgins/jsincss-has-selector)
- [jsincss-last-selector](https://github.com/tomhodgins/jsincss-last-selector)
- [jsincss-overflow](https://github.com/tomhodgins/jsincss-overflow)
- [jsincss-parent-selector](https://github.com/tomhodgins/jsincss-parent-selector)
- [jsincss-previous-selector](https://github.com/tomhodgins/jsincss-previous-selector)
- [jsincss-protocol-sniffer](https://github.com/tomhodgins/jsincss-protocol-sniffer)
- [jsincss-regex-match](https://github.com/tomhodgins/jsincss-regex-match)
- [jsincss-scoped-eval](https://github.com/tomhodgins/jsincss-scoped-eval)
- [jsincss-string-match](https://github.com/tomhodgins/jsincss-string-match)
- [jsincss-tag-count](https://github.com/tomhodgins/jsincss-tag-count)
- [jsincss-viewport](https://github.com/tomhodgins/jsincss-viewport)
- [jsincss-xpath-selector](https://github.com/tomhodgins/jsincss-xpath-selector)