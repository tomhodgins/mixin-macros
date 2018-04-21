mixin('demo', ['selector', 'string', 'rule'],
  returnValue('Array.from(document.querySelectorAll(selector))',
    filterFunc('tag.textContent.includes(string)',
      reduceFunc(
        createAttribute(['selector', 'string'],
          addAttribute('tag', 'text',
            addRule('', '', 'text')))))))