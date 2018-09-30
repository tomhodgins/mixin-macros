// JS-in-CSS Mixin Templates
function prelude(code='', rhs='') {

  return `${code}${rhs}`

}

function returnValue(name='', rhs='') {

  return `  return ${name}\n\n${rhs}`

}

function filterFunc(func='', rhs='') {

  return `    .filter(tag => ${func})\n\n${rhs}`

}

function plainReduce(rhs='') {

  return '    .reduce((styles, tag, count) => {\n\n'
  + rhs + '\n'
  + '    }, \'\')\n\n'

}

function returnStyles(rhs='') {

  return `      return styles\n${rhs}`

}

function reduceFunc(rhs='') {

  return plainReduce(
    rhs
    + returnStyles()
  )

}

function createAttribute(args=[], rhs='') {

  return `      const attr = ${args.length > 1 ? '(' : ''}${args.join(' + ')}${args.length > 1 ? ')' : ''}.replace(/\\W/g, '')\n\n${rhs}`

}

function addAttribute(tag='', plugin='', rhs='') {

  return `      ${tag}.setAttribute(\`data-${plugin}-$\{attr}\`, count)\n${rhs}`

}

function resetAttribute(tag='', plugin='', rhs='') {

  return `      ${tag}.setAttribute(\`data-${plugin}-$\{attr}\`, '')\n${rhs}`

}

function plainRule(selector='', rule='', rhs='') {

  return `      styles += \`${selector} { ${rule} }\\n\`\n${rhs}`

}

function addRule(before='', after='', plugin='', rule='${rule}', rhs='') {

  return plainRule(
    `${before}[data-${plugin}-$\{attr}="$\{count}"]${after}`,
    rule
  ) + rhs

}

function addStylesheet(stylesheet='', plugin='', rhs='') {

  return `      styles += ${stylesheet}.replace(\n`
  + '        /:self|\\$this/g,\n'
  + `        \`[data-${plugin}-$\{attr}="$\{count}"]\`\n`
  + `      )\n${rhs}`

}

function ifElseReturn(statement='', attributes=[], tag='', plugin='', rhs='') {

  return `  if (${statement}) {\n\n`
  + createAttribute(attributes).substring(2)
  + `    ${tag}.setAttribute(\`data-${plugin}-$\{attr}\`, '')\n\n`
  + `    return \`$\{selector}[data-${plugin}-$\{attr}] { $\{rule} }\\n\`\n\n`
  + '  } else {\n\n'
  + '    return \'\'\n\n'
  + `  }\n\n${rhs}`

}

function ifElseReset(statement='', tag='tag', plugin='', stylesheet='stylesheet', rhs='') {

  return `      if (${statement}) {\n\n`
  + '  ' + addAttribute(tag, plugin)
  + addStylesheet(stylesheet, plugin)
            .replace(/^/, '  ')
            .replace(/\n/g, '\n  ')
  + '\n'
  + '      } else {\n\n'
  + '  ' + resetAttribute(tag, plugin)
  + '\n'
  + '      }\n\n'
  + returnStyles() + rhs

}

// CLI Output
if (process.argv[2]) {

  function mixin(name='', args=[], rhs='') {

    let format = process.argv[3] || 'named'

    switch(format) {

      case 'vanilla':

        return `export default (${args.join(', ')}) => {\n\n`
        + rhs
        + '}'

      case 'named':

        return `function ${name}(${args.join(', ')}) {\n\n`
        + rhs
        + '}'

      case 'cjs':

        return `module.exports = (${args.join(', ')}) => {\n\n`
        + rhs
        + '}'

    }

  }

  // Output evaluated file
  console.log(eval(process.argv[2]))

} else {

  console.log('Please specify an explression to evaluate, followed by the optional "vanilla" or "cjs" keywords')

}