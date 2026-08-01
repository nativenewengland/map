const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const mapSource = fs.readFileSync('js/map.js', 'utf8');
const start = mapSource.indexOf('(function configureMarkedFootnotes()');
const end = mapSource.indexOf('\n})();', start) + '\n})();'.length;
assert.ok(start >= 0 && end > start, 'footnote extension is present');

let extension;
const warnings = [];
const marked = {
  use(value) {
    extension = value;
  },
  parse(markdown) {
    let source = extension.hooks.preprocess(markdown);
    let html = source
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    if (html && !/^<(?:p|img|section|sup|a)/.test(html)) {
      html = '<p>' + html + '</p>';
    }
    return extension.hooks.postprocess(html);
  },
};

vm.runInNewContext(mapSource.slice(start, end), {
  activeFootnoteFeatureTitle: 'Regression fixture',
  console: { warn: (message) => warnings.push(message) },
  decodeURIComponent,
  encodeURIComponent,
  marked,
});

function render(markdown) {
  return marked.parse(markdown);
}

let html = render('Standard[^one].\n\n[^one]: populated');
assert.match(html, /<sup[^>]*><a href="#fn-1">\[1\]<\/a><\/sup>/);
assert.match(html, /<li id="fn-1"><p>populated<\/p><\/li>/);
assert.doesNotMatch(html, /\[\^one\]:/);

html = render(
  'Hokum[^1] text[^2] end[^3]. [^1]:https:\/\/one.test [^2]:https:\/\/two.test\/?a=1&b=2 [^3]:third'
);
assert.equal((html.match(/class="footnote-ref"/g) || []).length, 3);
assert.equal((html.match(/<li id="fn-/g) || []).length, 3);
assert.doesNotMatch(html, /\[\^[123]\]:/);
assert.match(html, /https:\/\/two\.test\/\?a=1&b=2/);

html = render('Again[^same], and again[^same].\n\n[^same]: source');
assert.match(html, /id="fnref-1"/);
assert.match(html, /id="fnref-1-2"/);
assert.equal((html.match(/<li id="fn-1"/g) || []).length, 1);

html = render('Missing[^lost].');
assert.match(html, /Missing\[\^lost\]/);
assert.doesNotMatch(html, /class="footnotes"/);
assert.doesNotMatch(html, /<li/);
assert.ok(warnings.some((warning) => warning.includes('lost') && warning.includes('Regression fixture')));

assert.equal(render('No notes here.'), '<p>No notes here.</p>');

html = render('Multiline[^multi].\n\n[^multi]: first line\n    second line');
assert.match(html, /first line\nsecond line/);
assert.doesNotMatch(html, /<li[^>]*><\/li>/);

html = render('Linked[^link].\n\n[^link]: Read [the source](https://example.test/article)');
assert.match(html, /<li id="fn-1"><p>Read <a href="https:\/\/example.test\/article">the source<\/a><\/p><\/li>/);

html = render('![Map](images/example.jpg) and **ordinary Markdown**.');
assert.match(html, /<img alt="Map" src="images\/example.jpg">/);
assert.match(html, /\*\*ordinary Markdown\*\*/);

const sanitizeCall = mapSource.indexOf('DOMPurify.sanitize(rendered, sanitizeConfig)');
const innerHtmlWrite = mapSource.indexOf("document.getElementById('info-description').innerHTML = html");
assert.ok(sanitizeCall >= 0 && innerHtmlWrite > sanitizeCall, 'rendered output passes through DOMPurify');

console.log('Footnote regression tests passed.');
