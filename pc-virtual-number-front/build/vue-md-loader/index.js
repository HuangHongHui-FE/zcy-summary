const MarkdownIt = require('markdown-it');
const Prism = require('prismjs');
require('prismjs/components/prism-bash');
const Token = require('markdown-it/lib/token');
const cheerio = require('cheerio');
const { genInlineComponentText } = require('./utils');

const fetch = (str, tag, scoped) => {
  const $ = cheerio.load(str, {
    decodeEntities: false,
    xmlMode: true,
  });
  if (!tag) {
    return str;
  }
  if (tag === 'style') {
    return scoped
      ? $(`${tag}[scoped]`).html()
      : $(`${tag}`)
          .not(`${tag}[scoped]`)
          .html();
  }
  return $(tag).html();
};

/**
 * `{{ }}` => `<span>{{</span> <span>}}</span>`
 * @param  {string} str
 * @return {string}
 */
const replaceDelimiters = function(str) {
  return str.replace(/({{|}})/g, '<span>$1</span>');
};

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */

const renderHighlight = function(str, lang) {
  if (!(lang && Prism.languages[lang])) {
    return '';
  }

  try {
    return replaceDelimiters(Prism.highlight(str, Prism.languages[lang], lang));
  } catch (err) {
    // console.error(err);
  }
};

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const md = MarkdownIt('default', {
    html: true,
    breaks: true,
    highlight: renderHighlight,
  });

  let id = 0;
  let totalScript = '';
  const components = {};

  md.core.ruler.push('update_template', function replace({ tokens }) {
    tokens.forEach((token, i) => {
      let template = '';
      let script = '';
      let code = '';
      if (
        token.type === 'fence' &&
        token.info === 'vue' &&
        token.markup === '```'
      ) {
        const { content } = token;
        sourceCode = content;
        code = '```html\n' + content + '```';
        template = fetch(content, 'template');
        script = fetch(content, 'script');
        style = fetch(content, 'style');
        scopedStyle = fetch(content, 'style', true);
        token.content = '';
        token.type = 'html_block';
      }
      if (template) {
        const codeHtml = code ? md.render(code) : '';
        let tpl = `
          <template>
            <code-box>
              <template slot="component">${template}</template>
              <template slot="code">${codeHtml}</template>
            </code-box>
          </template>
          `;
        const t = new Token('html_block', '', 0);
        const newContent = `<lego-demo-${id} />`;
        components[`lego-demo-${id}`] = genInlineComponentText(tpl, script);
        t.content = newContent;
        id++;
        tokens[i] = t;
      }
    });
  });

  md.renderer.rules.table_open = function() {
    return '<table class="table">';
  };

  const content = md.render(source);
  totalScript = `<script>
  export default {
    name: 'component-doc',
    components: {
      ${Object.keys(components).map(id => `'${id}': ${components[id]}`)}
    }
  }
</script>`;
  return `
    <template>
      <section class="markdown-section">${content}</section>
    </template>
    ${totalScript}
  `;
};
