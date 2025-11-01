(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["_system/test.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>CSS Architecture Test - AgentStatic</title>\n  <link rel=\"stylesheet\" href=\"../index.css\">\n  <style>\n    /* Test component to verify layers work */\n    @layer components {\n      .test-card {\n        padding: var(--spacing-lg);\n        background: var(--color-surface);\n        border-radius: var(--radius-lg);\n        box-shadow: var(--shadow-md);\n      }\n\n      .test-card-title {\n        font-size: var(--font-size-xl);\n        font-weight: var(--font-weight-semibold);\n        margin-block-end: var(--spacing-sm);\n        color: var(--color-primary-600);\n      }\n\n      .test-card-content {\n        color: var(--color-text-muted);\n      }\n    }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <h1>CSS Architecture Test</h1>\n    <p class=\"lead\">Testing cascade layers, reset, base styles, and component-scoped naming.</p>\n\n    <hr>\n\n    <section>\n      <h2>Typography Test</h2>\n      <p>This paragraph tests base typography styles. It should use design tokens for font size, line height, and color.</p>\n      <small>This is small text.</small>\n\n      <h3>Heading Level 3</h3>\n      <p>Lorem ipsum dolor sit amet, <a href=\"#\">this is a link</a>, consectetur adipiscing elit.</p>\n\n      <h4>Heading Level 4</h4>\n      <p>Another paragraph with <code>inline code</code> to test styles.</p>\n\n      <pre><code>// Code block test\nconst test = \"hello world\";</code></pre>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2>Component-Scoped Naming Test</h2>\n      <div class=\"test-card\">\n        <h3 class=\"test-card-title\">Test Card Component</h3>\n        <p class=\"test-card-content\">\n          This card uses component-scoped naming (NOT BEM). Classes are simple and flat:\n          .test-card, .test-card-title, .test-card-content.\n        </p>\n      </div>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2>Utility Classes Test</h2>\n      <div class=\"flex gap-md items-center mb-lg\">\n        <div class=\"p-md rounded-md shadow-sm\" style=\"background: var(--color-gray-100);\">\n          Flex item 1\n        </div>\n        <div class=\"p-md rounded-lg shadow-md\" style=\"background: var(--color-gray-200);\">\n          Flex item 2\n        </div>\n      </div>\n\n      <p class=\"text-center mb-xl\">Centered text with margin</p>\n\n      <div class=\"grid grid-cols-2 gap-lg\">\n        <div class=\"p-lg rounded-lg shadow-sm\" style=\"background: var(--color-primary-50);\">\n          Grid item 1\n        </div>\n        <div class=\"p-lg rounded-lg shadow-sm\" style=\"background: var(--color-primary-100);\">\n          Grid item 2\n        </div>\n      </div>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2>Dark Mode Test</h2>\n      <p>Open this page with system dark mode enabled to test dark mode styles.</p>\n      <p>Toggle your system theme and watch colors change automatically.</p>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2>Accessibility Test</h2>\n      <p>\n        <span class=\"sr-only\">This text is only visible to screen readers</span>\n        Regular text with screen reader only content above.\n      </p>\n      <a href=\"#main\" class=\"skip-to-main\">Skip to main content (focus this link to see)</a>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2>Form Elements Test</h2>\n      <form>\n        <div>\n          <label for=\"test-input\">Test Input</label>\n          <input type=\"text\" id=\"test-input\" placeholder=\"Enter text...\">\n        </div>\n        <div style=\"margin-block-start: var(--spacing-md);\">\n          <label for=\"test-textarea\">Test Textarea</label>\n          <textarea id=\"test-textarea\" placeholder=\"Enter longer text...\"></textarea>\n        </div>\n        <div style=\"margin-block-start: var(--spacing-md);\">\n          <button type=\"button\">Test Button</button>\n          <button type=\"button\" disabled>Disabled Button</button>\n        </div>\n      </form>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2>Lists Test</h2>\n      <h3>Unordered List</h3>\n      <ul>\n        <li>List item 1</li>\n        <li>List item 2</li>\n        <li>List item 3</li>\n      </ul>\n\n      <h3>Ordered List</h3>\n      <ol>\n        <li>First item</li>\n        <li>Second item</li>\n        <li>Third item</li>\n      </ol>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2>Layer Specificity Test</h2>\n      <p>\n        The cascade layer order should be: reset → base → components → utilities → overrides.\n        The test card component above should have styles from the components layer,\n        which override base styles even with lower selector specificity.\n      </p>\n      <p>\n        Open DevTools and inspect elements to verify @layer rules are applied correctly.\n      </p>\n    </section>\n  </div>\n\n  <footer style=\"margin-block-start: var(--spacing-4xl); padding-block: var(--spacing-2xl); border-block-start: 1px solid var(--color-gray-300);\">\n    <div class=\"container text-center\">\n      <p style=\"color: var(--color-text-muted);\">\n        <small>AgentStatic CSS Architecture Test Page - Phase 1 Foundation</small>\n      </p>\n    </div>\n  </footer>\n</body>\n</html>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["_templates/atom.template/component.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"variant": "default","size": "md","className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_5;
t_5 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["COMPONENT_NAME_KEBAB","COMPONENT_NAME_KEBAB-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"),"COMPONENT_NAME_KEBAB-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  ";
t_2 += "\n  <div\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_8 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_6;
if(runtime.isArray(t_8)) {
var t_7 = t_8.length;
for(t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6][0];
frame.set("[object Object]", t_8[t_6][0]);
var t_10 = t_8[t_6][1];
frame.set("[object Object]", t_8[t_6][1]);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_9, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_10, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_6 = -1;
var t_7 = runtime.keys(t_8).length;
for(var t_11 in t_8) {
t_6++;
var t_12 = t_8[t_11];
frame.set("key", t_11);
frame.set("value", t_12);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_11, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_12, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    ";
t_2 += "\n    ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")):""), env.opts.autoescape);
t_2 += "\n    ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 60, colno = 13, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n  </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("COMPONENT_NAME_KEBAB");
context.setVariable("COMPONENT_NAME_KEBAB", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["_templates/molecule.template/component.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"variant": "default","layout": "vertical","className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_5;
t_5 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["COMPONENT_NAME_KEBAB","COMPONENT_NAME_KEBAB-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"),"COMPONENT_NAME_KEBAB-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  ";
t_2 += "\n  <div\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_8 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_6;
if(runtime.isArray(t_8)) {
var t_7 = t_8.length;
for(t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6][0];
frame.set("[object Object]", t_8[t_6][0]);
var t_10 = t_8[t_6][1];
frame.set("[object Object]", t_8[t_6][1]);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_9, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_10, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_6 = -1;
var t_7 = runtime.keys(t_8).length;
for(var t_11 in t_8) {
t_6++;
var t_12 = t_8[t_11];
frame.set("key", t_11);
frame.set("value", t_12);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_11, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_12, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    ";
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")) {
t_2 += "\n      <div class=\"COMPONENT_NAME_KEBAB-header\">\n        ";
t_2 += "\n        ";
t_2 += "\n        ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")), env.opts.autoescape);
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    ";
t_2 += "\n    <div class=\"COMPONENT_NAME_KEBAB-body\">\n      ";
t_2 += "\n      ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"body")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"body")):""), env.opts.autoescape);
t_2 += "\n      ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 69, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n    </div>\n\n    ";
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"footer")) {
t_2 += "\n      <div class=\"COMPONENT_NAME_KEBAB-footer\">\n        ";
t_2 += "\n        ";
t_2 += "\n        ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"footer")), env.opts.autoescape);
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n  </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("COMPONENT_NAME_KEBAB");
context.setVariable("COMPONENT_NAME_KEBAB", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["_templates/organism.template/component.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"variant": "default","layout": "default","size": "default","className": "","attributes": {},"a11y": {"role": "region"}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_5;
t_5 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["COMPONENT_NAME_KEBAB","COMPONENT_NAME_KEBAB-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"),"COMPONENT_NAME_KEBAB-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout"),"COMPONENT_NAME_KEBAB-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  ";
t_2 += "\n  <section\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabelledBy")) {
t_2 += "aria-labelledby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabelledBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_8 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_6;
if(runtime.isArray(t_8)) {
var t_7 = t_8.length;
for(t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6][0];
frame.set("[object Object]", t_8[t_6][0]);
var t_10 = t_8[t_6][1];
frame.set("[object Object]", t_8[t_6][1]);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_9, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_10, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_6 = -1;
var t_7 = runtime.keys(t_8).length;
for(var t_11 in t_8) {
t_6++;
var t_12 = t_8[t_11];
frame.set("key", t_11);
frame.set("value", t_12);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_11, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_12, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    ";
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")) {
t_2 += "\n      <div class=\"COMPONENT_NAME_KEBAB-header\">\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")),"heading")) {
t_2 += "\n          ";
t_2 += "\n          <h2>";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")),"heading"), env.opts.autoescape);
t_2 += "</h2>\n        ";
;
}
t_2 += "\n\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")),"subheading")) {
t_2 += "\n          <p>";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")),"subheading"), env.opts.autoescape);
t_2 += "</p>\n        ";
;
}
t_2 += "\n\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")),"description")) {
t_2 += "\n          <div>";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"header")),"description")), env.opts.autoescape);
t_2 += "</div>\n        ";
;
}
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    ";
t_2 += "\n    <div class=\"COMPONENT_NAME_KEBAB-body\">\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "split") {
t_2 += "\n        ";
t_2 += "\n        <div class=\"COMPONENT_NAME_KEBAB-primary\">\n          ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")),"primary")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")),"primary")):""), env.opts.autoescape);
t_2 += "\n        </div>\n\n        <div class=\"COMPONENT_NAME_KEBAB-secondary\">\n          ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")),"secondary")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")),"secondary")):""), env.opts.autoescape);
t_2 += "\n        </div>\n      ";
;
}
else {
t_2 += "\n        ";
t_2 += "\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")),"items")) {
t_2 += "\n          ";
frame = frame.push();
var t_15 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")),"items");
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("item", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_2 += "\n            ";
t_2 += "\n            <div class=\"COMPONENT_NAME_KEBAB-item\">\n              ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, t_16), env.opts.autoescape);
t_2 += "\n            </div>\n          ";
;
}
}
frame = frame.pop();
t_2 += "\n        ";
;
}
else {
t_2 += "\n          ";
t_2 += "\n          ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")):""), env.opts.autoescape);
t_2 += "\n          ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 119, colno = 19, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n        ";
;
}
t_2 += "\n      ";
;
}
t_2 += "\n    </div>\n\n    ";
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"footer")) {
t_2 += "\n      <div class=\"COMPONENT_NAME_KEBAB-footer\">\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"footer")),"actions")) {
t_2 += "\n          ";
frame = frame.push();
var t_19 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"footer")),"actions");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("action", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_2 += "\n            ";
t_2 += "\n            ";
t_2 += "\n            ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, t_20), env.opts.autoescape);
t_2 += "\n          ";
;
}
}
frame = frame.pop();
t_2 += "\n        ";
;
}
t_2 += "\n\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"footer")),"content")) {
t_2 += "\n          ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"footer")),"content")), env.opts.autoescape);
t_2 += "\n        ";
;
}
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n  </section>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("COMPONENT_NAME_KEBAB");
context.setVariable("COMPONENT_NAME_KEBAB", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/badge/badge.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"text": "","variant": "default","size": "md","style": "filled","shape": "","icon": "","dismissible": false,"notification": false,"dot": false,"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_5;
t_5 = ["badge"];
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") != "default") {
t_2 += "\n    ";
var t_6;
t_6 = ((lineno = 91, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_6, true);
if(frame.topLevel) {
context.setVariable("classList", t_6);
}
if(frame.topLevel) {
context.addExport("classList", t_6);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")) {
t_2 += "\n    ";
var t_7;
t_7 = ((lineno = 96, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_7, true);
if(frame.topLevel) {
context.setVariable("classList", t_7);
}
if(frame.topLevel) {
context.addExport("classList", t_7);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"style") == "outline") {
t_2 += "\n    ";
var t_8;
t_8 = ((lineno = 101, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-outline"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_8, true);
if(frame.topLevel) {
context.setVariable("classList", t_8);
}
if(frame.topLevel) {
context.addExport("classList", t_8);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"style") == "subtle") {
t_2 += "\n    ";
var t_9;
t_9 = ((lineno = 103, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-subtle"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_9, true);
if(frame.topLevel) {
context.setVariable("classList", t_9);
}
if(frame.topLevel) {
context.addExport("classList", t_9);
}
t_2 += "\n  ";
;
}
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"shape") == "rounded") {
t_2 += "\n    ";
var t_10;
t_10 = ((lineno = 108, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-rounded"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_10, true);
if(frame.topLevel) {
context.setVariable("classList", t_10);
}
if(frame.topLevel) {
context.addExport("classList", t_10);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"shape") == "pill") {
t_2 += "\n    ";
var t_11;
t_11 = ((lineno = 110, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-pill"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_11, true);
if(frame.topLevel) {
context.setVariable("classList", t_11);
}
if(frame.topLevel) {
context.addExport("classList", t_11);
}
t_2 += "\n  ";
;
}
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"notification")) {
t_2 += "\n    ";
var t_12;
t_12 = ((lineno = 115, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-notification"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_12, true);
if(frame.topLevel) {
context.setVariable("classList", t_12);
}
if(frame.topLevel) {
context.addExport("classList", t_12);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"dot")) {
t_2 += "\n    ";
var t_13;
t_13 = ((lineno = 117, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["badge-dot"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_2 += "\n  ";
;
}
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_14;
t_14 = ((lineno = 122, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_14, true);
if(frame.topLevel) {
context.setVariable("classList", t_14);
}
if(frame.topLevel) {
context.addExport("classList", t_14);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_15;
t_15 = (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"dismissible") && !runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"dot") && !runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"notification")?"button":"span");
frame.set("tagName", t_15, true);
if(frame.topLevel) {
context.setVariable("tagName", t_15);
}
if(frame.topLevel) {
context.addExport("tagName", t_15);
}
t_2 += "\n\n  ";
t_2 += "\n  <";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tagName"), env.opts.autoescape);
t_2 += "\n    class=\"";
t_2 += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLive")) {
t_2 += "aria-live=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLive"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"dismissible") && runtime.contextOrFrameLookup(context, frame, "tagName") == "button") {
t_2 += "type=\"button\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_18 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_16;
if(runtime.isArray(t_18)) {
var t_17 = t_18.length;
for(t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16][0];
frame.set("[object Object]", t_18[t_16][0]);
var t_20 = t_18[t_16][1];
frame.set("[object Object]", t_18[t_16][1]);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_20, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_16 = -1;
var t_17 = runtime.keys(t_18).length;
for(var t_21 in t_18) {
t_16++;
var t_22 = t_18[t_21];
frame.set("key", t_21);
frame.set("value", t_22);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_21, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_22, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    ";
t_2 += "\n    ";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"dot")) {
t_2 += "\n      ";
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"icon")) {
t_2 += "\n        <span class=\"badge-icon\" aria-hidden=\"true\">\n          ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"icon")), env.opts.autoescape);
t_2 += "\n        </span>\n      ";
;
}
t_2 += "\n\n      ";
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text")) {
t_2 += "\n        <span class=\"badge-text\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text"), env.opts.autoescape);
t_2 += "</span>\n      ";
;
}
t_2 += "\n\n      ";
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"dismissible")) {
t_2 += "\n        <button\n          class=\"badge-close\"\n          type=\"button\"\n          aria-label=\"Remove badge\"\n        >\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n            <path d=\"M9 3L3 9M3 3L9 9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </button>\n      ";
;
}
t_2 += "\n\n      ";
t_2 += "\n      ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 169, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n    ";
;
}
t_2 += "\n  </";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tagName"), env.opts.autoescape);
t_2 += ">\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("badge");
context.setVariable("badge", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/breadcrumb/breadcrumb.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
t_2 += "\n  ";
env.getTemplate("atoms/link/link.njk", false, "atoms/breadcrumb/breadcrumb.njk", false, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
t_3.getExported(function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
if(Object.prototype.hasOwnProperty.call(t_3, "link")) {
var t_6 = t_3.link;
} else {
cb(new Error("cannot import 'link'")); return;
}
context.setVariable("link", t_6);
t_2 += "\n\n  ";
var t_7;
t_7 = {"items": [],"separator": "chevron","size": "md","truncate": false,"schema": false,"className": "","attributes": {},"a11y": {"ariaLabel": "Breadcrumb"}};
frame.set("defaults", t_7, true);
if(frame.topLevel) {
context.setVariable("defaults", t_7);
}
if(frame.topLevel) {
context.addExport("defaults", t_7);
}
t_2 += "\n\n  ";
var t_8;
t_8 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_8, true);
if(frame.topLevel) {
context.setVariable("config", t_8);
}
if(frame.topLevel) {
context.addExport("config", t_8);
}
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "props")),"a11y")) {
t_2 += "\n    ";
var t_9;
t_9 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "config"),{"a11y": env.getFilter("merge").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "defaults")),"a11y"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "props")),"a11y"))});
frame.set("config", t_9, true);
if(frame.topLevel) {
context.setVariable("config", t_9);
}
if(frame.topLevel) {
context.addExport("config", t_9);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_10;
t_10 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["breadcrumb",(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size") != "md"?"breadcrumb-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"truncate")?"breadcrumb-truncate":""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_10, true);
if(frame.topLevel) {
context.setVariable("classList", t_10);
}
if(frame.topLevel) {
context.addExport("classList", t_10);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_11;
t_11 = (function() {
var output = "";
output += "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n      <path fill-rule=\"evenodd\" d=\"M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06z\"/>\n    </svg>\n  ";
;
return output;
})()
;
frame.set("chevronIcon", t_11, true);
if(frame.topLevel) {
context.setVariable("chevronIcon", t_11);
}
if(frame.topLevel) {
context.addExport("chevronIcon", t_11);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"schema")) {
t_2 += "\n    <script type=\"application/ld+json\">\n    {\n      \"@context\": \"https://schema.org\",\n      \"@type\": \"BreadcrumbList\",\n      \"itemListElement\": [";
frame = frame.push();
var t_14 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"items");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("item", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
t_2 += "{\n          \"@type\": \"ListItem\",\n          \"position\": ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
t_2 += ",\n          \"name\": \"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_15),"label"), env.opts.autoescape);
t_2 += "\"";
if(runtime.memberLookup((t_15),"href")) {
t_2 += ",\n          \"item\": \"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_15),"href"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "}";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"last")) {
t_2 += ",";
;
}
;
}
}
frame = frame.pop();
t_2 += "]\n    }\n    </script>\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  <nav\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"\n    ";
frame = frame.push();
var t_18 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_16;
if(runtime.isArray(t_18)) {
var t_17 = t_18.length;
for(t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16][0];
frame.set("[object Object]", t_18[t_16][0]);
var t_20 = t_18[t_16][1];
frame.set("[object Object]", t_18[t_16][1]);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_20, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_16 = -1;
var t_17 = runtime.keys(t_18).length;
for(var t_21 in t_18) {
t_16++;
var t_22 = t_18[t_21];
frame.set("key", t_21);
frame.set("value", t_22);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_21, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_22, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <ol class=\"breadcrumb-list\">\n      ";
frame = frame.push();
var t_25 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"items");
if(t_25) {t_25 = runtime.fromIterator(t_25);
var t_24 = t_25.length;
for(var t_23=0; t_23 < t_25.length; t_23++) {
var t_26 = t_25[t_23];
frame.set("item", t_26);
frame.set("loop.index", t_23 + 1);
frame.set("loop.index0", t_23);
frame.set("loop.revindex", t_24 - t_23);
frame.set("loop.revindex0", t_24 - t_23 - 1);
frame.set("loop.first", t_23 === 0);
frame.set("loop.last", t_23 === t_24 - 1);
frame.set("loop.length", t_24);
t_2 += "\n        <li class=\"breadcrumb-item\">\n          ";
t_2 += "\n          ";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"first")) {
t_2 += "\n            <span class=\"breadcrumb-separator breadcrumb-separator-";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"separator"), env.opts.autoescape);
t_2 += "\" aria-hidden=\"true\">";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"separator") == "chevron") {
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "chevronIcon")), env.opts.autoescape);
;
}
t_2 += "</span>\n          ";
;
}
t_2 += "\n\n          ";
t_2 += "\n          ";
if(runtime.memberLookup((t_26),"href")) {
t_2 += "\n            ";
t_2 += "\n            ";
t_2 += runtime.suppressValue((lineno = 139, colno = 19, runtime.callWrap(t_6, "link", context, [{"text": runtime.memberLookup((t_26),"label"),"href": runtime.memberLookup((t_26),"href"),"variant": "inherit","className": "breadcrumb-link"}])), env.opts.autoescape);
t_2 += "\n          ";
;
}
else {
t_2 += "\n            ";
t_2 += "\n            <span class=\"breadcrumb-current\" aria-current=\"page\">\n              ";
t_2 += runtime.suppressValue(runtime.memberLookup((t_26),"label"), env.opts.autoescape);
t_2 += "\n            </span>\n          ";
;
}
t_2 += "\n        </li>\n      ";
;
}
}
frame = frame.pop();
t_2 += "\n    </ol>\n  </nav>\n";
})});
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("breadcrumb");
context.setVariable("breadcrumb", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/button/button.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/atoms/button/button.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"text": "","variant": "primary","size": "md","type": "button","disabled": false,"loading": false,"iconOnly": false,"fullWidth": false,"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_5;
t_5 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["button","button-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"),"button-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"loading")?"button-loading":""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconOnly")?"button-icon-only":""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"fullWidth")?"button-full":""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  <!-- Determine if rendering as link or button -->\n  ";
var t_6;
t_6 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"href");
frame.set("isLink", t_6, true);
if(frame.topLevel) {
context.setVariable("isLink", t_6);
}
if(frame.topLevel) {
context.addExport("isLink", t_6);
}
t_2 += "\n  ";
var t_7;
t_7 = (runtime.contextOrFrameLookup(context, frame, "isLink")?"a":"button");
frame.set("elementType", t_7, true);
if(frame.topLevel) {
context.setVariable("elementType", t_7);
}
if(frame.topLevel) {
context.addExport("elementType", t_7);
}
t_2 += "\n\n  <!-- Build ARIA attributes -->\n  ";
var t_8;
t_8 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel") || ((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconOnly")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text"):""));
frame.set("ariaLabel", t_8, true);
if(frame.topLevel) {
context.setVariable("ariaLabel", t_8);
}
if(frame.topLevel) {
context.addExport("ariaLabel", t_8);
}
t_2 += "\n  ";
var t_9;
t_9 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"loading");
frame.set("ariaBusy", t_9, true);
if(frame.topLevel) {
context.setVariable("ariaBusy", t_9);
}
if(frame.topLevel) {
context.addExport("ariaBusy", t_9);
}
t_2 += "\n\n  <!-- Render as link -->\n  ";
if(runtime.contextOrFrameLookup(context, frame, "isLink")) {
t_2 += "\n  <a\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n    href=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"href"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"target")) {
t_2 += "target=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"target"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rel")) {
t_2 += "rel=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"target") == "_blank" && !runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rel")) {
t_2 += "rel=\"noopener noreferrer\"";
;
}
t_2 += "\n    ";
if(runtime.contextOrFrameLookup(context, frame, "ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "aria-disabled=\"true\" tabindex=\"-1\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_12 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_10;
if(runtime.isArray(t_12)) {
var t_11 = t_12.length;
for(t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10][0];
frame.set("[object Object]", t_12[t_10][0]);
var t_14 = t_12[t_10][1];
frame.set("[object Object]", t_12[t_10][1]);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_13, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_14, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_10 = -1;
var t_11 = runtime.keys(t_12).length;
for(var t_15 in t_12) {
t_10++;
var t_16 = t_12[t_15];
frame.set("key", t_15);
frame.set("value", t_16);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_15, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_16, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Icon start -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")) {
t_2 += "\n    <span class=\"button-icon button-icon-start\" aria-hidden=\"true\">\n      ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")), env.opts.autoescape);
t_2 += "\n    </span>\n    ";
;
}
t_2 += "\n\n    <!-- Button text -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text")) {
t_2 += "\n    <span class=\"button-text\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text"), env.opts.autoescape);
t_2 += "</span>\n    ";
;
}
t_2 += "\n\n    <!-- Icon end -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n    <span class=\"button-icon button-icon-end\" aria-hidden=\"true\">\n      ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")), env.opts.autoescape);
t_2 += "\n    </span>\n    ";
;
}
t_2 += "\n\n    <!-- Loading spinner -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"loading")) {
t_2 += "\n    <span class=\"button-spinner\" aria-hidden=\"true\"></span>\n    ";
;
}
t_2 += "\n  </a>\n  ";
;
}
else {
t_2 += "\n  <!-- Render as button -->\n  <button\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n    type=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"type"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"loading")) {
t_2 += "disabled";
;
}
t_2 += "\n    ";
if(runtime.contextOrFrameLookup(context, frame, "ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.contextOrFrameLookup(context, frame, "ariaBusy")) {
t_2 += "aria-busy=\"true\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_19 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_17;
if(runtime.isArray(t_19)) {
var t_18 = t_19.length;
for(t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17][0];
frame.set("[object Object]", t_19[t_17][0]);
var t_21 = t_19[t_17][1];
frame.set("[object Object]", t_19[t_17][1]);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_20, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_21, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_17 = -1;
var t_18 = runtime.keys(t_19).length;
for(var t_22 in t_19) {
t_17++;
var t_23 = t_19[t_22];
frame.set("key", t_22);
frame.set("value", t_23);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_22, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_23, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Icon start -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")) {
t_2 += "\n    <span class=\"button-icon button-icon-start\" aria-hidden=\"true\">\n      ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")), env.opts.autoescape);
t_2 += "\n    </span>\n    ";
;
}
t_2 += "\n\n    <!-- Button text -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text")) {
t_2 += "\n    <span class=\"button-text\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text"), env.opts.autoescape);
t_2 += "</span>\n    ";
;
}
t_2 += "\n\n    <!-- Icon end -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n    <span class=\"button-icon button-icon-end\" aria-hidden=\"true\">\n      ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")), env.opts.autoescape);
t_2 += "\n    </span>\n    ";
;
}
t_2 += "\n\n    <!-- Loading spinner -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"loading")) {
t_2 += "\n    <span class=\"button-spinner\" aria-hidden=\"true\"></span>\n    ";
;
}
t_2 += "\n  </button>\n  ";
;
}
t_2 += "\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("button");
context.setVariable("button", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/divider/divider.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/atoms/divider/divider.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"orientation": "horizontal","variant": "solid","thickness": "thin","color": "default","spacing": "md","withText": "","withIcon": "","textAlign": "center","className": "","attributes": {},"a11y": {"role": "separator"}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  <!-- Determine if this is a text/icon divider -->\n  ";
var t_5;
t_5 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"withText") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"withIcon");
frame.set("hasContent", t_5, true);
if(frame.topLevel) {
context.setVariable("hasContent", t_5);
}
if(frame.topLevel) {
context.addExport("hasContent", t_5);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_6;
t_6 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["divider","divider-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"orientation"),(!runtime.contextOrFrameLookup(context, frame, "hasContent")?"divider-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"):""),"divider-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"thickness"),"divider-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color"),"divider-spacing-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"spacing"),(runtime.contextOrFrameLookup(context, frame, "hasContent")?"divider-with-content":""),(runtime.contextOrFrameLookup(context, frame, "hasContent")?"divider-align-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"textAlign"):""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_6, true);
if(frame.topLevel) {
context.setVariable("classList", t_6);
}
if(frame.topLevel) {
context.addExport("classList", t_6);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"orientation") == "horizontal" && !runtime.contextOrFrameLookup(context, frame, "hasContent")) {
t_2 += "\n    <hr\n      class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"orientation") == "vertical") {
t_2 += "aria-orientation=\"vertical\"";
;
}
else {
t_2 += "aria-orientation=\"horizontal\"";
;
}
t_2 += "\n      ";
frame = frame.push();
var t_9 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_9) {t_9 = runtime.fromIterator(t_9);
var t_7;
if(runtime.isArray(t_9)) {
var t_8 = t_9.length;
for(t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7][0];
frame.set("[object Object]", t_9[t_7][0]);
var t_11 = t_9[t_7][1];
frame.set("[object Object]", t_9[t_7][1]);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_10, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_11, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
} else {
t_7 = -1;
var t_8 = runtime.keys(t_9).length;
for(var t_12 in t_9) {
t_7++;
var t_13 = t_9[t_12];
frame.set("key", t_12);
frame.set("value", t_13);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_12, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_13, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
}
}
frame = frame.pop();
t_2 += "\n    >\n  ";
;
}
else {
t_2 += "\n    <div\n      class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"orientation") == "vertical") {
t_2 += "aria-orientation=\"vertical\"";
;
}
else {
t_2 += "aria-orientation=\"horizontal\"";
;
}
t_2 += "\n      ";
frame = frame.push();
var t_16 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_14;
if(runtime.isArray(t_16)) {
var t_15 = t_16.length;
for(t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14][0];
frame.set("[object Object]", t_16[t_14][0]);
var t_18 = t_16[t_14][1];
frame.set("[object Object]", t_16[t_14][1]);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_17, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_18, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
} else {
t_14 = -1;
var t_15 = runtime.keys(t_16).length;
for(var t_19 in t_16) {
t_14++;
var t_20 = t_16[t_19];
frame.set("key", t_19);
frame.set("value", t_20);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_20, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
}
}
frame = frame.pop();
t_2 += "\n    >\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"withText")) {
t_2 += "\n        <span class=\"divider-text\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"withText"), env.opts.autoescape);
t_2 += "</span>\n      ";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"withIcon")) {
t_2 += "\n        <span class=\"divider-icon\">";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"withIcon")), env.opts.autoescape);
t_2 += "</span>\n      ";
;
}
t_2 += "\n    </div>\n  ";
;
}
t_2 += "\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("divider");
context.setVariable("divider", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/heading/heading.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/atoms/heading/heading.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"level": 2,"align": "left","weight": "bold","color": "default","gradient": false,"eyebrow": "","className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_5;
t_5 = ["heading","heading-h" + env.getFilter("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"level"))];
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  <!-- Size override (optional) -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")) {
t_2 += "\n    ";
var t_6;
t_6 = ((lineno = 82, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["heading-size-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_6, true);
if(frame.topLevel) {
context.setVariable("classList", t_6);
}
if(frame.topLevel) {
context.addExport("classList", t_6);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Alignment -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"align") != "left") {
t_2 += "\n    ";
var t_7;
t_7 = ((lineno = 87, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["heading-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"align")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_7, true);
if(frame.topLevel) {
context.setVariable("classList", t_7);
}
if(frame.topLevel) {
context.addExport("classList", t_7);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Weight -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"weight") != "bold") {
t_2 += "\n    ";
var t_8;
t_8 = ((lineno = 92, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["heading-weight-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"weight")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_8, true);
if(frame.topLevel) {
context.setVariable("classList", t_8);
}
if(frame.topLevel) {
context.addExport("classList", t_8);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Color variant -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color") != "default") {
t_2 += "\n    ";
var t_9;
t_9 = ((lineno = 97, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["heading-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_9, true);
if(frame.topLevel) {
context.setVariable("classList", t_9);
}
if(frame.topLevel) {
context.addExport("classList", t_9);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Gradient -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"gradient")) {
t_2 += "\n    ";
var t_10;
t_10 = ((lineno = 102, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["heading-gradient"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_10, true);
if(frame.topLevel) {
context.setVariable("classList", t_10);
}
if(frame.topLevel) {
context.addExport("classList", t_10);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_11;
t_11 = ((lineno = 107, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_11, true);
if(frame.topLevel) {
context.setVariable("classList", t_11);
}
if(frame.topLevel) {
context.addExport("classList", t_11);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Join classes -->\n  ";
var t_12;
t_12 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_12, true);
if(frame.topLevel) {
context.setVariable("classString", t_12);
}
if(frame.topLevel) {
context.addExport("classString", t_12);
}
t_2 += "\n\n  <!-- Determine heading tag -->\n  ";
var t_13;
t_13 = "h" + env.getFilter("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"level"));
frame.set("tag", t_13, true);
if(frame.topLevel) {
context.setVariable("tag", t_13);
}
if(frame.topLevel) {
context.addExport("tag", t_13);
}
t_2 += "\n\n  <!-- Render wrapper if eyebrow exists -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"eyebrow")) {
t_2 += "\n  <div class=\"heading-container\">\n    <span class=\"heading-eyebrow\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"eyebrow"), env.opts.autoescape);
t_2 += "</span>\n  ";
;
}
t_2 += "\n\n  <!-- Main heading element -->\n  <";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tag"), env.opts.autoescape);
t_2 += "\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_16 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_14;
if(runtime.isArray(t_16)) {
var t_15 = t_16.length;
for(t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14][0];
frame.set("[object Object]", t_16[t_14][0]);
var t_18 = t_16[t_14][1];
frame.set("[object Object]", t_16[t_14][1]);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_17, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_18, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_14 = -1;
var t_15 = runtime.keys(t_16).length;
for(var t_19 in t_16) {
t_14++;
var t_20 = t_16[t_19];
frame.set("key", t_19);
frame.set("value", t_20);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_20, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Text content or caller content -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text")) {
t_2 += "\n      ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text"), env.opts.autoescape);
t_2 += "\n    ";
;
}
else {
t_2 += "\n      ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 137, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n    ";
;
}
t_2 += "\n  </";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tag"), env.opts.autoescape);
t_2 += ">\n\n  <!-- Close wrapper if eyebrow exists -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"eyebrow")) {
t_2 += "\n  </div>\n  ";
;
}
t_2 += "\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("heading");
context.setVariable("heading", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/icon/icon.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/atoms/icon/icon.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"name": "check","size": "md","color": "","circle": false,"circleColor": "","decorative": false,"ariaLabel": "","className": "","attributes": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_5;
t_5 = ["icon"];
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  <!-- Add size class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")) {
t_2 += "\n    ";
var t_6;
t_6 = ((lineno = 58, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["icon-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_6, true);
if(frame.topLevel) {
context.setVariable("classList", t_6);
}
if(frame.topLevel) {
context.addExport("classList", t_6);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add color class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color")) {
t_2 += "\n    ";
var t_7;
t_7 = ((lineno = 63, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["icon-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_7, true);
if(frame.topLevel) {
context.setVariable("classList", t_7);
}
if(frame.topLevel) {
context.addExport("classList", t_7);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add circle classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"circle")) {
t_2 += "\n    ";
var t_8;
t_8 = ((lineno = 68, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["icon-circle"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_8, true);
if(frame.topLevel) {
context.setVariable("classList", t_8);
}
if(frame.topLevel) {
context.addExport("classList", t_8);
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"circleColor")) {
t_2 += "\n      ";
var t_9;
t_9 = ((lineno = 70, colno = 40, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["icon-circle-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"circleColor")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_9, true);
if(frame.topLevel) {
context.setVariable("classList", t_9);
}
if(frame.topLevel) {
context.addExport("classList", t_9);
}
t_2 += "\n    ";
;
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_10;
t_10 = ((lineno = 76, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_10, true);
if(frame.topLevel) {
context.setVariable("classList", t_10);
}
if(frame.topLevel) {
context.addExport("classList", t_10);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Define SVG paths for all icons -->\n  ";
var t_11;
t_11 = {"check": "M20 6L9 17l-5-5","x": "M18 6L6 18M6 6l12 12","plus": "M12 5v14M5 12h14","minus": "M5 12h14","chevron-down": "M6 9l6 6 6-6","chevron-up": "M18 15l-6-6-6 6","chevron-right": "M9 18l6-6-6-6","chevron-left": "M15 18l-6-6 6-6","arrow-right": "M5 12h14M12 5l7 7-7 7","arrow-left": "M19 12H5M12 19l-7-7 7-7","arrow-up": "M12 19V5M5 12l7-7 7 7","arrow-down": "M12 5v14M5 12l7 7 7-7","external-link": "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3","download": "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3","upload": "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12","search": "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z","menu": "M4 6h16M4 12h16M4 18h16","user": "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z","settings": "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z","mail": "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6","phone": "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z","home": "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10","star": "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z","heart": "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z","info": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01","alert-circle": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01","alert-triangle": "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01","lock": "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4","unlock": "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 019.9-1","shield": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","verified": "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3","trophy": "M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M12 21v-6M8 21h8M12 15a6 6 0 006-6V3H6v6a6 6 0 006 6z","gift": "M20 12v10H4V12M2 7h20v5H2V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z","calendar": "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18","clock": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2","eye": "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z","eye-off": "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22","play": "M5 3l14 9-14 9V3z","pause": "M10 4H6v16h4V4zM18 4h-4v16h4V4z","twitter": "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z","linkedin": "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2V9zM4 6a2 2 0 100-4 2 2 0 000 4z","github": "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22","facebook": "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z","instagram": "M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zM17.5 6.5a1 1 0 110-2 1 1 0 010 2z","youtube": "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02l0-6.53 5.75 3.27-5.75 3.26z","globe": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z","link": "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71","file": "M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7zM13 2v7h7","image": "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21 15l-5-5L5 21","video": "M23 7l-7 5 7 5V7zM16 5H3a2 2 0 00-2 2v10a2 2 0 002 2h13a2 2 0 002-2V7a2 2 0 00-2-2z","tag": "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01","bookmark": "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z","share": "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"};
frame.set("iconPaths", t_11, true);
if(frame.topLevel) {
context.setVariable("iconPaths", t_11);
}
if(frame.topLevel) {
context.addExport("iconPaths", t_11);
}
t_2 += "\n\n  <!-- Get the path for the requested icon -->\n  ";
var t_12;
t_12 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "iconPaths")),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "iconPaths")),"check");
frame.set("path", t_12, true);
if(frame.topLevel) {
context.setVariable("path", t_12);
}
if(frame.topLevel) {
context.addExport("path", t_12);
}
t_2 += "\n\n  <!-- Determine stroke-width based on icon type -->\n  ";
var t_13;
t_13 = 2;
frame.set("strokeWidth", t_13, true);
if(frame.topLevel) {
context.setVariable("strokeWidth", t_13);
}
if(frame.topLevel) {
context.addExport("strokeWidth", t_13);
}
t_2 += "\n  ";
if(runtime.inOperator(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"),["star","heart"])) {
t_2 += "\n    ";
var t_14;
t_14 = 1.5;
frame.set("strokeWidth", t_14, true);
if(frame.topLevel) {
context.setVariable("strokeWidth", t_14);
}
if(frame.topLevel) {
context.addExport("strokeWidth", t_14);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Render the icon -->\n  <span\n    class=\"";
t_2 += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"decorative")) {
t_2 += "aria-hidden=\"true\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel") && !runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"decorative")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\" role=\"img\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_17 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_17) {t_17 = runtime.fromIterator(t_17);
var t_15;
if(runtime.isArray(t_17)) {
var t_16 = t_17.length;
for(t_15=0; t_15 < t_17.length; t_15++) {
var t_18 = t_17[t_15][0];
frame.set("[object Object]", t_17[t_15][0]);
var t_19 = t_17[t_15][1];
frame.set("[object Object]", t_17[t_15][1]);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_18, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_15 = -1;
var t_16 = runtime.keys(t_17).length;
for(var t_20 in t_17) {
t_15++;
var t_21 = t_17[t_20];
frame.set("key", t_20);
frame.set("value", t_21);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_20, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_21, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "strokeWidth"), env.opts.autoescape);
t_2 += "\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    >\n      <path d=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
t_2 += "\" />\n    </svg>\n  </span>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("icon");
context.setVariable("icon", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/input/input.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"type": "text","size": "md","name": "","id": "","value": "","placeholder": "","disabled": false,"readonly": false,"required": false,"state": "default","iconStart": "","iconEnd": "","fullWidth": false,"rows": 4,"options": [],"checked": false,"label": "","ariaLabel": "","ariaDescribedBy": "","className": "","attributes": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "\n    ";
var t_5;
t_5 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "config"),{"id": "input-" + "" + env.getFilter("random").call(context, (lineno = 129, colno = 57, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [1000,9999])))});
frame.set("config", t_5, true);
if(frame.topLevel) {
context.setVariable("config", t_5);
}
if(frame.topLevel) {
context.addExport("config", t_5);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_6;
t_6 = ["input","input-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")];
frame.set("inputClasses", t_6, true);
if(frame.topLevel) {
context.setVariable("inputClasses", t_6);
}
if(frame.topLevel) {
context.addExport("inputClasses", t_6);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") != "default") {
t_2 += "\n    ";
var t_7;
t_7 = ((lineno = 140, colno = 44, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "inputClasses")),"push"), "inputClasses[\"push\"]", context, ["input-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state")])),runtime.contextOrFrameLookup(context, frame, "inputClasses"));
frame.set("inputClasses", t_7, true);
if(frame.topLevel) {
context.setVariable("inputClasses", t_7);
}
if(frame.topLevel) {
context.addExport("inputClasses", t_7);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")) {
t_2 += "\n    ";
var t_8;
t_8 = ((lineno = 145, colno = 44, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "inputClasses")),"push"), "inputClasses[\"push\"]", context, ["input-with-icon-start"])),runtime.contextOrFrameLookup(context, frame, "inputClasses"));
frame.set("inputClasses", t_8, true);
if(frame.topLevel) {
context.setVariable("inputClasses", t_8);
}
if(frame.topLevel) {
context.addExport("inputClasses", t_8);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n    ";
var t_9;
t_9 = ((lineno = 149, colno = 44, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "inputClasses")),"push"), "inputClasses[\"push\"]", context, ["input-with-icon-end"])),runtime.contextOrFrameLookup(context, frame, "inputClasses"));
frame.set("inputClasses", t_9, true);
if(frame.topLevel) {
context.setVariable("inputClasses", t_9);
}
if(frame.topLevel) {
context.addExport("inputClasses", t_9);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"fullWidth")) {
t_2 += "\n    ";
var t_10;
t_10 = ((lineno = 154, colno = 44, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "inputClasses")),"push"), "inputClasses[\"push\"]", context, ["input-full-width"])),runtime.contextOrFrameLookup(context, frame, "inputClasses"));
frame.set("inputClasses", t_10, true);
if(frame.topLevel) {
context.setVariable("inputClasses", t_10);
}
if(frame.topLevel) {
context.addExport("inputClasses", t_10);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_11;
t_11 = ((lineno = 159, colno = 44, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "inputClasses")),"push"), "inputClasses[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "inputClasses"));
frame.set("inputClasses", t_11, true);
if(frame.topLevel) {
context.setVariable("inputClasses", t_11);
}
if(frame.topLevel) {
context.addExport("inputClasses", t_11);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
var t_12;
t_12 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "inputClasses")," "));
frame.set("inputClassList", t_12, true);
if(frame.topLevel) {
context.setVariable("inputClassList", t_12);
}
if(frame.topLevel) {
context.addExport("inputClassList", t_12);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"type") == "checkbox") {
t_2 += "\n    <label class=\"input-checkbox input-checkbox-";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"), env.opts.autoescape);
t_2 += " ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className"), env.opts.autoescape);
t_2 += "\">\n      <input\n        type=\"checkbox\"\n        class=\"input-checkbox-input\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) {
t_2 += "name=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value")) {
t_2 += "value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"checked")) {
t_2 += "checked";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_2 += "required";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
frame = frame.push();
var t_15 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_13;
if(runtime.isArray(t_15)) {
var t_14 = t_15.length;
for(t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13][0];
frame.set("[object Object]", t_15[t_13][0]);
var t_17 = t_15[t_13][1];
frame.set("[object Object]", t_15[t_13][1]);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_16, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_17, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
} else {
t_13 = -1;
var t_14 = runtime.keys(t_15).length;
for(var t_18 in t_15) {
t_13++;
var t_19 = t_15[t_18];
frame.set("key", t_18);
frame.set("value", t_19);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_18, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
}
}
frame = frame.pop();
t_2 += "\n      >\n      <span class=\"input-checkbox-label\">";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"label")), env.opts.autoescape);
t_2 += "</span>\n      <span class=\"input-checkbox-box\"></span>\n    </label>\n\n  ";
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"type") == "radio") {
t_2 += "\n    <label class=\"input-radio input-radio-";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"), env.opts.autoescape);
t_2 += " ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className"), env.opts.autoescape);
t_2 += "\">\n      <input\n        type=\"radio\"\n        class=\"input-radio-input\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) {
t_2 += "name=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value")) {
t_2 += "value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"checked")) {
t_2 += "checked";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_2 += "required";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
frame = frame.push();
var t_22 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_20;
if(runtime.isArray(t_22)) {
var t_21 = t_22.length;
for(t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20][0];
frame.set("[object Object]", t_22[t_20][0]);
var t_24 = t_22[t_20][1];
frame.set("[object Object]", t_22[t_20][1]);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_23, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_24, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
} else {
t_20 = -1;
var t_21 = runtime.keys(t_22).length;
for(var t_25 in t_22) {
t_20++;
var t_26 = t_22[t_25];
frame.set("key", t_25);
frame.set("value", t_26);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_25, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_26, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
}
}
frame = frame.pop();
t_2 += "\n      >\n      <span class=\"input-radio-label\">";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"label")), env.opts.autoescape);
t_2 += "</span>\n      <span class=\"input-radio-circle\"></span>\n    </label>\n\n  ";
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"type") == "textarea") {
t_2 += "\n    ";
var t_27;
t_27 = runtime.contextOrFrameLookup(context, frame, "inputClasses");
frame.set("textareaClasses", t_27, true);
if(frame.topLevel) {
context.setVariable("textareaClasses", t_27);
}
if(frame.topLevel) {
context.addExport("textareaClasses", t_27);
}
t_2 += "\n    ";
var t_28;
t_28 = ((lineno = 211, colno = 50, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "textareaClasses")),"push"), "textareaClasses[\"push\"]", context, ["input-textarea"])),runtime.contextOrFrameLookup(context, frame, "textareaClasses"));
frame.set("textareaClasses", t_28, true);
if(frame.topLevel) {
context.setVariable("textareaClasses", t_28);
}
if(frame.topLevel) {
context.addExport("textareaClasses", t_28);
}
t_2 += "\n    ";
var t_29;
t_29 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "textareaClasses")," "));
frame.set("textareaClassList", t_29, true);
if(frame.topLevel) {
context.setVariable("textareaClassList", t_29);
}
if(frame.topLevel) {
context.addExport("textareaClassList", t_29);
}
t_2 += "\n\n    <textarea\n      class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "textareaClassList"), env.opts.autoescape);
t_2 += "\"\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) {
t_2 += "name=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"placeholder")) {
t_2 += "placeholder=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"placeholder"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rows")) {
t_2 += "rows=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rows"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"readonly")) {
t_2 += "readonly";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_2 += "required";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "error") {
t_2 += "aria-invalid=\"true\"";
;
}
t_2 += "\n      ";
frame = frame.push();
var t_32 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_30;
if(runtime.isArray(t_32)) {
var t_31 = t_32.length;
for(t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30][0];
frame.set("[object Object]", t_32[t_30][0]);
var t_34 = t_32[t_30][1];
frame.set("[object Object]", t_32[t_30][1]);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_33, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_34, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
} else {
t_30 = -1;
var t_31 = runtime.keys(t_32).length;
for(var t_35 in t_32) {
t_30++;
var t_36 = t_32[t_35];
frame.set("key", t_35);
frame.set("value", t_36);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_35, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_36, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
}
}
frame = frame.pop();
t_2 += "\n    >";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value"), env.opts.autoescape);
t_2 += "</textarea>\n\n  ";
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"type") == "select") {
t_2 += "\n    ";
var t_37;
t_37 = runtime.contextOrFrameLookup(context, frame, "inputClasses");
frame.set("selectClasses", t_37, true);
if(frame.topLevel) {
context.setVariable("selectClasses", t_37);
}
if(frame.topLevel) {
context.addExport("selectClasses", t_37);
}
t_2 += "\n    ";
var t_38;
t_38 = ((lineno = 234, colno = 46, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "selectClasses")),"push"), "selectClasses[\"push\"]", context, ["input-select"])),runtime.contextOrFrameLookup(context, frame, "selectClasses"));
frame.set("selectClasses", t_38, true);
if(frame.topLevel) {
context.setVariable("selectClasses", t_38);
}
if(frame.topLevel) {
context.addExport("selectClasses", t_38);
}
t_2 += "\n    ";
var t_39;
t_39 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "selectClasses")," "));
frame.set("selectClassList", t_39, true);
if(frame.topLevel) {
context.setVariable("selectClassList", t_39);
}
if(frame.topLevel) {
context.addExport("selectClassList", t_39);
}
t_2 += "\n\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n      <div class=\"input-wrapper ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"fullWidth")) {
t_2 += "input-full-width";
;
}
t_2 += "\">\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")) {
t_2 += "\n          <span class=\"input-icon input-icon-start\" aria-hidden=\"true\">\n            ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")), env.opts.autoescape);
t_2 += "\n          </span>\n        ";
;
}
t_2 += "\n\n        <select\n          class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "selectClassList"), env.opts.autoescape);
t_2 += "\"\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) {
t_2 += "name=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_2 += "required";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "error") {
t_2 += "aria-invalid=\"true\"";
;
}
t_2 += "\n          ";
frame = frame.push();
var t_42 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_42) {t_42 = runtime.fromIterator(t_42);
var t_40;
if(runtime.isArray(t_42)) {
var t_41 = t_42.length;
for(t_40=0; t_40 < t_42.length; t_40++) {
var t_43 = t_42[t_40][0];
frame.set("[object Object]", t_42[t_40][0]);
var t_44 = t_42[t_40][1];
frame.set("[object Object]", t_42[t_40][1]);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
t_2 += "\n            ";
t_2 += runtime.suppressValue(t_43, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_44, env.opts.autoescape);
t_2 += "\"\n          ";
;
}
} else {
t_40 = -1;
var t_41 = runtime.keys(t_42).length;
for(var t_45 in t_42) {
t_40++;
var t_46 = t_42[t_45];
frame.set("key", t_45);
frame.set("value", t_46);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
t_2 += "\n            ";
t_2 += runtime.suppressValue(t_45, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_46, env.opts.autoescape);
t_2 += "\"\n          ";
;
}
}
}
frame = frame.pop();
t_2 += "\n        >\n          ";
frame = frame.push();
var t_49 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"options");
if(t_49) {t_49 = runtime.fromIterator(t_49);
var t_48 = t_49.length;
for(var t_47=0; t_47 < t_49.length; t_47++) {
var t_50 = t_49[t_47];
frame.set("option", t_50);
frame.set("loop.index", t_47 + 1);
frame.set("loop.index0", t_47);
frame.set("loop.revindex", t_48 - t_47);
frame.set("loop.revindex0", t_48 - t_47 - 1);
frame.set("loop.first", t_47 === 0);
frame.set("loop.last", t_47 === t_48 - 1);
frame.set("loop.length", t_48);
t_2 += "\n            <option\n              value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_50),"value"), env.opts.autoescape);
t_2 += "\"\n              ";
if(runtime.memberLookup((t_50),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n              ";
if(runtime.memberLookup((t_50),"selected")) {
t_2 += "selected";
;
}
t_2 += "\n            >";
t_2 += runtime.suppressValue(runtime.memberLookup((t_50),"label"), env.opts.autoescape);
t_2 += "</option>\n          ";
;
}
}
frame = frame.pop();
t_2 += "\n        </select>\n\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n          <span class=\"input-icon input-icon-end\" aria-hidden=\"true\">\n            ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")), env.opts.autoescape);
t_2 += "\n          </span>\n        ";
;
}
t_2 += "\n      </div>\n    ";
;
}
else {
t_2 += "\n      <select\n        class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "selectClassList"), env.opts.autoescape);
t_2 += "\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) {
t_2 += "name=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_2 += "required";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "error") {
t_2 += "aria-invalid=\"true\"";
;
}
t_2 += "\n        ";
frame = frame.push();
var t_53 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_53) {t_53 = runtime.fromIterator(t_53);
var t_51;
if(runtime.isArray(t_53)) {
var t_52 = t_53.length;
for(t_51=0; t_51 < t_53.length; t_51++) {
var t_54 = t_53[t_51][0];
frame.set("[object Object]", t_53[t_51][0]);
var t_55 = t_53[t_51][1];
frame.set("[object Object]", t_53[t_51][1]);
frame.set("loop.index", t_51 + 1);
frame.set("loop.index0", t_51);
frame.set("loop.revindex", t_52 - t_51);
frame.set("loop.revindex0", t_52 - t_51 - 1);
frame.set("loop.first", t_51 === 0);
frame.set("loop.last", t_51 === t_52 - 1);
frame.set("loop.length", t_52);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_54, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_55, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
} else {
t_51 = -1;
var t_52 = runtime.keys(t_53).length;
for(var t_56 in t_53) {
t_51++;
var t_57 = t_53[t_56];
frame.set("key", t_56);
frame.set("value", t_57);
frame.set("loop.index", t_51 + 1);
frame.set("loop.index0", t_51);
frame.set("loop.revindex", t_52 - t_51);
frame.set("loop.revindex0", t_52 - t_51 - 1);
frame.set("loop.first", t_51 === 0);
frame.set("loop.last", t_51 === t_52 - 1);
frame.set("loop.length", t_52);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_56, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_57, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
}
}
frame = frame.pop();
t_2 += "\n      >\n        ";
frame = frame.push();
var t_60 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"options");
if(t_60) {t_60 = runtime.fromIterator(t_60);
var t_59 = t_60.length;
for(var t_58=0; t_58 < t_60.length; t_58++) {
var t_61 = t_60[t_58];
frame.set("option", t_61);
frame.set("loop.index", t_58 + 1);
frame.set("loop.index0", t_58);
frame.set("loop.revindex", t_59 - t_58);
frame.set("loop.revindex0", t_59 - t_58 - 1);
frame.set("loop.first", t_58 === 0);
frame.set("loop.last", t_58 === t_59 - 1);
frame.set("loop.length", t_59);
t_2 += "\n          <option\n            value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_61),"value"), env.opts.autoescape);
t_2 += "\"\n            ";
if(runtime.memberLookup((t_61),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n            ";
if(runtime.memberLookup((t_61),"selected")) {
t_2 += "selected";
;
}
t_2 += "\n          >";
t_2 += runtime.suppressValue(runtime.memberLookup((t_61),"label"), env.opts.autoescape);
t_2 += "</option>\n        ";
;
}
}
frame = frame.pop();
t_2 += "\n      </select>\n    ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
;
}
else {
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n      <div class=\"input-wrapper ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"fullWidth")) {
t_2 += "input-full-width";
;
}
t_2 += "\">\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")) {
t_2 += "\n          <span class=\"input-icon input-icon-start\" aria-hidden=\"true\">\n            ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")), env.opts.autoescape);
t_2 += "\n          </span>\n        ";
;
}
t_2 += "\n\n        <input\n          type=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"type"), env.opts.autoescape);
t_2 += "\"\n          class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "inputClassList"), env.opts.autoescape);
t_2 += "\"\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) {
t_2 += "name=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value")) {
t_2 += "value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"placeholder")) {
t_2 += "placeholder=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"placeholder"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"readonly")) {
t_2 += "readonly";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_2 += "required";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "error") {
t_2 += "aria-invalid=\"true\"";
;
}
t_2 += "\n          ";
frame = frame.push();
var t_64 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_64) {t_64 = runtime.fromIterator(t_64);
var t_62;
if(runtime.isArray(t_64)) {
var t_63 = t_64.length;
for(t_62=0; t_62 < t_64.length; t_62++) {
var t_65 = t_64[t_62][0];
frame.set("[object Object]", t_64[t_62][0]);
var t_66 = t_64[t_62][1];
frame.set("[object Object]", t_64[t_62][1]);
frame.set("loop.index", t_62 + 1);
frame.set("loop.index0", t_62);
frame.set("loop.revindex", t_63 - t_62);
frame.set("loop.revindex0", t_63 - t_62 - 1);
frame.set("loop.first", t_62 === 0);
frame.set("loop.last", t_62 === t_63 - 1);
frame.set("loop.length", t_63);
t_2 += "\n            ";
t_2 += runtime.suppressValue(t_65, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_66, env.opts.autoescape);
t_2 += "\"\n          ";
;
}
} else {
t_62 = -1;
var t_63 = runtime.keys(t_64).length;
for(var t_67 in t_64) {
t_62++;
var t_68 = t_64[t_67];
frame.set("key", t_67);
frame.set("value", t_68);
frame.set("loop.index", t_62 + 1);
frame.set("loop.index0", t_62);
frame.set("loop.revindex", t_63 - t_62);
frame.set("loop.revindex0", t_63 - t_62 - 1);
frame.set("loop.first", t_62 === 0);
frame.set("loop.last", t_62 === t_63 - 1);
frame.set("loop.length", t_63);
t_2 += "\n            ";
t_2 += runtime.suppressValue(t_67, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_68, env.opts.autoescape);
t_2 += "\"\n          ";
;
}
}
}
frame = frame.pop();
t_2 += "\n        >\n\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n          <span class=\"input-icon input-icon-end\" aria-hidden=\"true\">\n            ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")), env.opts.autoescape);
t_2 += "\n          </span>\n        ";
;
}
t_2 += "\n      </div>\n    ";
;
}
else {
t_2 += "\n      <input\n        type=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"type"), env.opts.autoescape);
t_2 += "\"\n        class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "inputClassList"), env.opts.autoescape);
t_2 += "\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name")) {
t_2 += "name=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value")) {
t_2 += "value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"placeholder")) {
t_2 += "placeholder=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"placeholder"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "disabled";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"readonly")) {
t_2 += "readonly";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_2 += "required";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "error") {
t_2 += "aria-invalid=\"true\"";
;
}
t_2 += "\n        ";
frame = frame.push();
var t_71 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_71) {t_71 = runtime.fromIterator(t_71);
var t_69;
if(runtime.isArray(t_71)) {
var t_70 = t_71.length;
for(t_69=0; t_69 < t_71.length; t_69++) {
var t_72 = t_71[t_69][0];
frame.set("[object Object]", t_71[t_69][0]);
var t_73 = t_71[t_69][1];
frame.set("[object Object]", t_71[t_69][1]);
frame.set("loop.index", t_69 + 1);
frame.set("loop.index0", t_69);
frame.set("loop.revindex", t_70 - t_69);
frame.set("loop.revindex0", t_70 - t_69 - 1);
frame.set("loop.first", t_69 === 0);
frame.set("loop.last", t_69 === t_70 - 1);
frame.set("loop.length", t_70);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_72, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_73, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
} else {
t_69 = -1;
var t_70 = runtime.keys(t_71).length;
for(var t_74 in t_71) {
t_69++;
var t_75 = t_71[t_74];
frame.set("key", t_74);
frame.set("value", t_75);
frame.set("loop.index", t_69 + 1);
frame.set("loop.index0", t_69);
frame.set("loop.revindex", t_70 - t_69);
frame.set("loop.revindex0", t_70 - t_69 - 1);
frame.set("loop.first", t_69 === 0);
frame.set("loop.last", t_69 === t_70 - 1);
frame.set("loop.length", t_70);
t_2 += "\n          ";
t_2 += runtime.suppressValue(t_74, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_75, env.opts.autoescape);
t_2 += "\"\n        ";
;
}
}
}
frame = frame.pop();
t_2 += "\n      >\n    ";
;
}
t_2 += "\n  ";
;
}
;
}
;
}
;
}
t_2 += "\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("input");
context.setVariable("input", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/link/link.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"text": "","href": "#","variant": "default","external": false,"download": false,"downloadFilename": "","iconStart": "","iconEnd": "","disabled": false,"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_5;
t_5 = ["link","link-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant")];
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"external")) {
t_2 += "\n    ";
var t_6;
t_6 = ((lineno = 87, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["link-external"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_6, true);
if(frame.topLevel) {
context.setVariable("classList", t_6);
}
if(frame.topLevel) {
context.addExport("classList", t_6);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_7;
t_7 = ((lineno = 92, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_7, true);
if(frame.topLevel) {
context.setVariable("classList", t_7);
}
if(frame.topLevel) {
context.addExport("classList", t_7);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_8;
t_8 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_8, true);
if(frame.topLevel) {
context.setVariable("classString", t_8);
}
if(frame.topLevel) {
context.addExport("classString", t_8);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_9;
t_9 = (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"external")?"_blank":"");
frame.set("target", t_9, true);
if(frame.topLevel) {
context.setVariable("target", t_9);
}
if(frame.topLevel) {
context.addExport("target", t_9);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_10;
t_10 = (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"external")?"noopener noreferrer":"");
frame.set("rel", t_10, true);
if(frame.topLevel) {
context.setVariable("rel", t_10);
}
if(frame.topLevel) {
context.addExport("rel", t_10);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_11;
t_11 = (function() {
var output = "";
output += "\n    <svg class=\"link-icon link-icon-external\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n      <path d=\"M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72z\"/>\n      <path d=\"M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5z\"/>\n    </svg>\n  ";
;
return output;
})()
;
frame.set("externalIcon", t_11, true);
if(frame.topLevel) {
context.setVariable("externalIcon", t_11);
}
if(frame.topLevel) {
context.addExport("externalIcon", t_11);
}
t_2 += "\n\n  ";
t_2 += "\n  ";
var t_12;
t_12 = (function() {
var output = "";
output += "\n    <svg class=\"link-icon link-icon-download\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n      <path d=\"M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75z\"/>\n      <path d=\"M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5z\"/>\n    </svg>\n  ";
;
return output;
})()
;
frame.set("downloadIcon", t_12, true);
if(frame.topLevel) {
context.setVariable("downloadIcon", t_12);
}
if(frame.topLevel) {
context.addExport("downloadIcon", t_12);
}
t_2 += "\n\n  ";
t_2 += "\n  <a\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    href=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"href"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.contextOrFrameLookup(context, frame, "target")) {
t_2 += "target=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "target"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.contextOrFrameLookup(context, frame, "rel")) {
t_2 += "rel=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "rel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"download")) {
t_2 += "download";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"downloadFilename")) {
t_2 += "=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"downloadFilename"), env.opts.autoescape);
t_2 += "\"";
;
}
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"disabled")) {
t_2 += "aria-disabled=\"true\" tabindex=\"-1\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabelledBy")) {
t_2 += "aria-labelledby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabelledBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_15 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_13;
if(runtime.isArray(t_15)) {
var t_14 = t_15.length;
for(t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13][0];
frame.set("[object Object]", t_15[t_13][0]);
var t_17 = t_15[t_13][1];
frame.set("[object Object]", t_15[t_13][1]);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_16, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_17, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_13 = -1;
var t_14 = runtime.keys(t_15).length;
for(var t_18 in t_15) {
t_13++;
var t_19 = t_15[t_18];
frame.set("key", t_18);
frame.set("value", t_19);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_18, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    ";
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")) {
t_2 += "\n      <span class=\"link-icon\">";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconStart")), env.opts.autoescape);
t_2 += "</span>\n    ";
;
}
t_2 += "\n\n    ";
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text")) {
t_2 += "\n      <span class=\"link-text\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"text"), env.opts.autoescape);
t_2 += "</span>\n    ";
;
}
t_2 += "\n\n    ";
t_2 += "\n    ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 148, colno = 13, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n\n    ";
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")) {
t_2 += "\n      <span class=\"link-icon\">";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconEnd")), env.opts.autoescape);
t_2 += "</span>\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"external")) {
t_2 += "\n      ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "externalIcon")), env.opts.autoescape);
t_2 += "\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"download")) {
t_2 += "\n      ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "downloadIcon")), env.opts.autoescape);
t_2 += "\n    ";
;
}
;
}
;
}
t_2 += "\n  </a>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("link");
context.setVariable("link", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["atoms/text/text.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/atoms/text/text.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"element": "p","size": "base","weight": "normal","color": "default","align": "left","lineHeight": "normal","lead": false,"readable": false,"truncate": false,"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_5;
t_5 = env.getFilter("trim").call(context, env.getFilter("join").call(context, env.getFilter("reject").call(context, ["text",(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size") != "base"?"text-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"weight") != "normal"?"text-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"weight"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color") != "default"?"text-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"align") != "left"?"text-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"align"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"lineHeight") != "normal"?"text-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"lineHeight"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"lead")?"text-lead":""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"readable")?"text-readable":""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"truncate")?"text-truncate":""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")],"equalto",false)," "));
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n\n  <!-- Render the appropriate element -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"element") == "p") {
t_2 += "\n    <p\n      class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
frame = frame.push();
var t_8 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_6;
if(runtime.isArray(t_8)) {
var t_7 = t_8.length;
for(t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6][0];
frame.set("[object Object]", t_8[t_6][0]);
var t_10 = t_8[t_6][1];
frame.set("[object Object]", t_8[t_6][1]);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_9, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_10, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
} else {
t_6 = -1;
var t_7 = runtime.keys(t_8).length;
for(var t_11 in t_8) {
t_6++;
var t_12 = t_8[t_11];
frame.set("key", t_11);
frame.set("value", t_12);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_11, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_12, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
}
}
frame = frame.pop();
t_2 += "\n    >\n      ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")):""), env.opts.autoescape);
t_2 += "\n      ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 107, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n    </p>\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"element") == "span") {
t_2 += "\n    <span\n      class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
frame = frame.push();
var t_15 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_13;
if(runtime.isArray(t_15)) {
var t_14 = t_15.length;
for(t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13][0];
frame.set("[object Object]", t_15[t_13][0]);
var t_17 = t_15[t_13][1];
frame.set("[object Object]", t_15[t_13][1]);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_16, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_17, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
} else {
t_13 = -1;
var t_14 = runtime.keys(t_15).length;
for(var t_18 in t_15) {
t_13++;
var t_19 = t_15[t_18];
frame.set("key", t_18);
frame.set("value", t_19);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_18, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_19, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
}
}
frame = frame.pop();
t_2 += "\n    >\n      ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")):""), env.opts.autoescape);
t_2 += "\n      ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 121, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n    </span>\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"element") == "div") {
t_2 += "\n    <div\n      class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      ";
frame = frame.push();
var t_22 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_20;
if(runtime.isArray(t_22)) {
var t_21 = t_22.length;
for(t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20][0];
frame.set("[object Object]", t_22[t_20][0]);
var t_24 = t_22[t_20][1];
frame.set("[object Object]", t_22[t_20][1]);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_23, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_24, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
} else {
t_20 = -1;
var t_21 = runtime.keys(t_22).length;
for(var t_25 in t_22) {
t_20++;
var t_26 = t_22[t_25];
frame.set("key", t_25);
frame.set("value", t_26);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_2 += "\n        ";
t_2 += runtime.suppressValue(t_25, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_26, env.opts.autoescape);
t_2 += "\"\n      ";
;
}
}
}
frame = frame.pop();
t_2 += "\n    >\n      ";
t_2 += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")?env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"content")):""), env.opts.autoescape);
t_2 += "\n      ";
t_2 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "caller")?(lineno = 135, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])):""), env.opts.autoescape);
t_2 += "\n    </div>\n  ";
;
}
;
}
;
}
t_2 += "\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("text");
context.setVariable("text", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/card/card.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/card/card.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  <!-- Import atom components -->\n  ";
env.getTemplate("atoms/button/button.njk", false, "molecules/card/card.njk", false, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
t_3.getExported(function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
if(Object.prototype.hasOwnProperty.call(t_3, "button")) {
var t_6 = t_3.button;
} else {
cb(new Error("cannot import 'button'")); return;
}
context.setVariable("button", t_6);
t_2 += "\n  ";
env.getTemplate("atoms/heading/heading.njk", false, "molecules/card/card.njk", false, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
t_7.getExported(function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
if(Object.prototype.hasOwnProperty.call(t_7, "heading")) {
var t_10 = t_7.heading;
} else {
cb(new Error("cannot import 'heading'")); return;
}
context.setVariable("heading", t_10);
t_2 += "\n  ";
env.getTemplate("atoms/link/link.njk", false, "molecules/card/card.njk", false, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
t_11.getExported(function(t_13,t_11) {
if(t_13) { cb(t_13); return; }
if(Object.prototype.hasOwnProperty.call(t_11, "link")) {
var t_14 = t_11.link;
} else {
cb(new Error("cannot import 'link'")); return;
}
context.setVariable("link", t_14);
t_2 += "\n  ";
env.getTemplate("atoms/text/text.njk", false, "molecules/card/card.njk", false, function(t_16,t_15) {
if(t_16) { cb(t_16); return; }
t_15.getExported(function(t_17,t_15) {
if(t_17) { cb(t_17); return; }
if(Object.prototype.hasOwnProperty.call(t_15, "text")) {
var t_18 = t_15.text;
} else {
cb(new Error("cannot import 'text'")); return;
}
context.setVariable("text", t_18);
t_2 += "\n  ";
env.getTemplate("atoms/badge/badge.njk", false, "molecules/card/card.njk", false, function(t_20,t_19) {
if(t_20) { cb(t_20); return; }
t_19.getExported(function(t_21,t_19) {
if(t_21) { cb(t_21); return; }
if(Object.prototype.hasOwnProperty.call(t_19, "badge")) {
var t_22 = t_19.badge;
} else {
cb(new Error("cannot import 'badge'")); return;
}
context.setVariable("badge", t_22);
t_2 += "\n\n  ";
var t_23;
t_23 = {"variant": "default","clickable": false,"href": "","image": {},"badge": null,"icon": "","stat": {},"title": "","description": "","metadata": {},"tags": [],"actions": {},"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_23, true);
if(frame.topLevel) {
context.setVariable("defaults", t_23);
}
if(frame.topLevel) {
context.addExport("defaults", t_23);
}
t_2 += "\n\n  ";
var t_24;
t_24 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_24, true);
if(frame.topLevel) {
context.setVariable("config", t_24);
}
if(frame.topLevel) {
context.addExport("config", t_24);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_25;
t_25 = ["card"];
frame.set("classList", t_25, true);
if(frame.topLevel) {
context.setVariable("classList", t_25);
}
if(frame.topLevel) {
context.addExport("classList", t_25);
}
t_2 += "\n\n  <!-- Add variant class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "horizontal") {
t_2 += "\n    ";
var t_26;
t_26 = ((lineno = 129, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["card-horizontal"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_26, true);
if(frame.topLevel) {
context.setVariable("classList", t_26);
}
if(frame.topLevel) {
context.addExport("classList", t_26);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "overlay") {
t_2 += "\n    ";
var t_27;
t_27 = ((lineno = 131, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["card-overlay"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_27, true);
if(frame.topLevel) {
context.setVariable("classList", t_27);
}
if(frame.topLevel) {
context.addExport("classList", t_27);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "minimal") {
t_2 += "\n    ";
var t_28;
t_28 = ((lineno = 133, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["card-minimal"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_28, true);
if(frame.topLevel) {
context.setVariable("classList", t_28);
}
if(frame.topLevel) {
context.addExport("classList", t_28);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "icon") {
t_2 += "\n    ";
var t_29;
t_29 = ((lineno = 135, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["card-icon"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_29, true);
if(frame.topLevel) {
context.setVariable("classList", t_29);
}
if(frame.topLevel) {
context.addExport("classList", t_29);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "stat") {
t_2 += "\n    ";
var t_30;
t_30 = ((lineno = 137, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["card-stat"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_30, true);
if(frame.topLevel) {
context.setVariable("classList", t_30);
}
if(frame.topLevel) {
context.addExport("classList", t_30);
}
t_2 += "\n  ";
;
}
;
}
;
}
;
}
;
}
t_2 += "\n\n  <!-- Add clickable class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"clickable")) {
t_2 += "\n    ";
var t_31;
t_31 = ((lineno = 142, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["card-link"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_31, true);
if(frame.topLevel) {
context.setVariable("classList", t_31);
}
if(frame.topLevel) {
context.addExport("classList", t_31);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_32;
t_32 = ((lineno = 147, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_32, true);
if(frame.topLevel) {
context.setVariable("classList", t_32);
}
if(frame.topLevel) {
context.addExport("classList", t_32);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Join class list -->\n  ";
var t_33;
t_33 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_33, true);
if(frame.topLevel) {
context.setVariable("classString", t_33);
}
if(frame.topLevel) {
context.addExport("classString", t_33);
}
t_2 += "\n\n  <!-- Determine wrapper element -->\n  ";
var t_34;
t_34 = (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"clickable")?"a":"article");
frame.set("wrapperTag", t_34, true);
if(frame.topLevel) {
context.setVariable("wrapperTag", t_34);
}
if(frame.topLevel) {
context.addExport("wrapperTag", t_34);
}
t_2 += "\n\n  <!-- Main card container -->\n  <";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "wrapperTag"), env.opts.autoescape);
t_2 += "\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"clickable") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"href")) {
t_2 += "href=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"href"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_37 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_37) {t_37 = runtime.fromIterator(t_37);
var t_35;
if(runtime.isArray(t_37)) {
var t_36 = t_37.length;
for(t_35=0; t_35 < t_37.length; t_35++) {
var t_38 = t_37[t_35][0];
frame.set("[object Object]", t_37[t_35][0]);
var t_39 = t_37[t_35][1];
frame.set("[object Object]", t_37[t_35][1]);
frame.set("loop.index", t_35 + 1);
frame.set("loop.index0", t_35);
frame.set("loop.revindex", t_36 - t_35);
frame.set("loop.revindex0", t_36 - t_35 - 1);
frame.set("loop.first", t_35 === 0);
frame.set("loop.last", t_35 === t_36 - 1);
frame.set("loop.length", t_36);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_38, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_39, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_35 = -1;
var t_36 = runtime.keys(t_37).length;
for(var t_40 in t_37) {
t_35++;
var t_41 = t_37[t_40];
frame.set("key", t_40);
frame.set("value", t_41);
frame.set("loop.index", t_35 + 1);
frame.set("loop.index0", t_35);
frame.set("loop.revindex", t_36 - t_35);
frame.set("loop.revindex0", t_36 - t_35 - 1);
frame.set("loop.first", t_35 === 0);
frame.set("loop.last", t_35 === t_36 - 1);
frame.set("loop.length", t_36);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_40, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_41, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Badge overlay -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"badge")) {
t_2 += "\n      <div class=\"card-badge\">\n        ";
t_2 += runtime.suppressValue((lineno = 171, colno = 16, runtime.callWrap(t_22, "badge", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"badge")])), env.opts.autoescape);
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Icon Card Variant -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "icon") {
t_2 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"icon")) {
t_2 += "\n        <div class=\"card-icon-image\" aria-hidden=\"true\">\n          ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"icon")), env.opts.autoescape);
t_2 += "\n        </div>\n      ";
;
}
t_2 += "\n\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title")) {
t_2 += "\n        ";
t_2 += runtime.suppressValue((lineno = 184, colno = 18, runtime.callWrap(t_10, "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title"),"level": 3,"align": "center","className": "card-title"}])), env.opts.autoescape);
t_2 += "\n      ";
;
}
t_2 += "\n\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_2 += "\n        ";
t_2 += runtime.suppressValue((lineno = 193, colno = 15, runtime.callWrap(t_18, "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"),"align": "center","color": "muted","className": "card-description"}])), env.opts.autoescape);
t_2 += "\n      ";
;
}
t_2 += "\n\n    <!-- Stat Card Variant -->\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "stat") {
t_2 += "\n      <div class=\"card-stat-value\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"stat")),"value"), env.opts.autoescape);
t_2 += "</div>\n      <div class=\"card-stat-label\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"stat")),"label"), env.opts.autoescape);
t_2 += "</div>\n\n    <!-- Default/Horizontal/Overlay/Minimal Variants -->\n    ";
;
}
else {
t_2 += "\n      <!-- Image section -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"src")) {
t_2 += "\n        <div class=\"card-media ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"aspectRatio") == "4-3") {
t_2 += "card-media-4-3";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"aspectRatio") == "square") {
t_2 += "card-media-square";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"aspectRatio") == "21-9") {
t_2 += "card-media-21-9";
;
}
;
}
;
}
t_2 += "\">\n          <img\n            src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"src"), env.opts.autoescape);
t_2 += "\"\n            alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"alt") || "", env.opts.autoescape);
t_2 += "\"\n            class=\"card-image\"\n            loading=\"lazy\"\n          />\n        </div>\n      ";
;
}
t_2 += "\n\n      <!-- Content section -->\n      <div class=\"card-content\">\n        <!-- Header (title + metadata) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")) {
t_2 += "\n          <div class=\"card-header\">\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title")) {
t_2 += "\n              ";
t_2 += runtime.suppressValue((lineno = 226, colno = 24, runtime.callWrap(t_10, "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title"),"level": 3,"className": "card-title"}])), env.opts.autoescape);
t_2 += "\n            ";
;
}
t_2 += "\n\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata") && (runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"author") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"date") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"category"))) {
t_2 += "\n              <div class=\"card-metadata\">\n                ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"author")) {
t_2 += "\n                  <span class=\"card-metadata-item\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"author"), env.opts.autoescape);
t_2 += "</span>\n                ";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"date")) {
t_2 += "\n                  <time class=\"card-metadata-item\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"date"), env.opts.autoescape);
t_2 += "</time>\n                ";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"category")) {
t_2 += "\n                  <span class=\"card-metadata-item\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"metadata")),"category"), env.opts.autoescape);
t_2 += "</span>\n                ";
;
}
t_2 += "\n              </div>\n            ";
;
}
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n\n        <!-- Body (description + tags) -->\n        <div class=\"card-body\">\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_2 += "\n            ";
t_2 += runtime.suppressValue((lineno = 252, colno = 19, runtime.callWrap(t_18, "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"),"className": "card-description"}])), env.opts.autoescape);
t_2 += "\n          ";
;
}
t_2 += "\n\n          <!-- Tags -->\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"tags") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"tags")),"length") > 0) {
t_2 += "\n            <div class=\"card-tags\">\n              ";
frame = frame.push();
var t_44 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"tags");
if(t_44) {t_44 = runtime.fromIterator(t_44);
var t_43 = t_44.length;
for(var t_42=0; t_42 < t_44.length; t_42++) {
var t_45 = t_44[t_42];
frame.set("tag", t_45);
frame.set("loop.index", t_42 + 1);
frame.set("loop.index0", t_42);
frame.set("loop.revindex", t_43 - t_42);
frame.set("loop.revindex0", t_43 - t_42 - 1);
frame.set("loop.first", t_42 === 0);
frame.set("loop.last", t_42 === t_43 - 1);
frame.set("loop.length", t_43);
t_2 += "\n                ";
t_2 += runtime.suppressValue((lineno = 262, colno = 24, runtime.callWrap(t_22, "badge", context, [{"text": t_45,"size": "sm","style": "outline","variant": "default"}])), env.opts.autoescape);
t_2 += "\n              ";
;
}
}
frame = frame.pop();
t_2 += "\n            </div>\n          ";
;
}
t_2 += "\n        </div>\n\n        <!-- Footer (actions) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions") && (runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary"))) {
t_2 += "\n          <div class=\"card-footer\">\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary")) {
t_2 += "\n              ";
t_2 += runtime.suppressValue((lineno = 277, colno = 23, runtime.callWrap(t_6, "button", context, [runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary")])), env.opts.autoescape);
t_2 += "\n            ";
;
}
t_2 += "\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary")) {
t_2 += "\n              ";
t_2 += runtime.suppressValue((lineno = 280, colno = 21, runtime.callWrap(t_14, "link", context, [runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary")])), env.opts.autoescape);
t_2 += "\n            ";
;
}
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n      </div>\n    ";
;
}
;
}
t_2 += "\n  </";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "wrapperTag"), env.opts.autoescape);
t_2 += ">\n";
})})})})})})})})})});
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("card");
context.setVariable("card", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/cta-block/cta-block.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/cta-block/cta-block.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  <!-- Import dependencies -->\n  ";
env.getTemplate("atoms/heading/heading.njk", false, "molecules/cta-block/cta-block.njk", false, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
t_3.getExported(function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
if(Object.prototype.hasOwnProperty.call(t_3, "heading")) {
var t_6 = t_3.heading;
} else {
cb(new Error("cannot import 'heading'")); return;
}
context.setVariable("heading", t_6);
t_2 += "\n  ";
env.getTemplate("atoms/button/button.njk", false, "molecules/cta-block/cta-block.njk", false, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
t_7.getExported(function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
if(Object.prototype.hasOwnProperty.call(t_7, "button")) {
var t_10 = t_7.button;
} else {
cb(new Error("cannot import 'button'")); return;
}
context.setVariable("button", t_10);
t_2 += "\n\n  ";
var t_11;
t_11 = {"layout": "centered","background": {"type": "default"},"headingLevel": 2,"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_11, true);
if(frame.topLevel) {
context.setVariable("defaults", t_11);
}
if(frame.topLevel) {
context.addExport("defaults", t_11);
}
t_2 += "\n\n  ";
var t_12;
t_12 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_12, true);
if(frame.topLevel) {
context.setVariable("config", t_12);
}
if(frame.topLevel) {
context.addExport("config", t_12);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_13;
t_13 = ["cta-block"];
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_2 += "\n\n  <!-- Layout variant -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "centered") {
t_2 += "\n    ";
var t_14;
t_14 = ((lineno = 90, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["cta-block-centered"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_14, true);
if(frame.topLevel) {
context.setVariable("classList", t_14);
}
if(frame.topLevel) {
context.addExport("classList", t_14);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "split") {
t_2 += "\n    ";
var t_15;
t_15 = ((lineno = 92, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["cta-block-split"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_15, true);
if(frame.topLevel) {
context.setVariable("classList", t_15);
}
if(frame.topLevel) {
context.addExport("classList", t_15);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "inline") {
t_2 += "\n    ";
var t_16;
t_16 = ((lineno = 94, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["cta-block-inline"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_16, true);
if(frame.topLevel) {
context.setVariable("classList", t_16);
}
if(frame.topLevel) {
context.addExport("classList", t_16);
}
t_2 += "\n  ";
;
}
;
}
;
}
t_2 += "\n\n  <!-- Background variant -->\n  ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "primary") {
t_2 += "\n    ";
var t_17;
t_17 = ((lineno = 99, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["cta-block-bg-primary"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_17, true);
if(frame.topLevel) {
context.setVariable("classList", t_17);
}
if(frame.topLevel) {
context.addExport("classList", t_17);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "gradient") {
t_2 += "\n    ";
var t_18;
t_18 = ((lineno = 101, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["cta-block-bg-gradient"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_18, true);
if(frame.topLevel) {
context.setVariable("classList", t_18);
}
if(frame.topLevel) {
context.addExport("classList", t_18);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "gradient-subtle") {
t_2 += "\n    ";
var t_19;
t_19 = ((lineno = 103, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["cta-block-bg-gradient-subtle"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_19, true);
if(frame.topLevel) {
context.setVariable("classList", t_19);
}
if(frame.topLevel) {
context.addExport("classList", t_19);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "image") {
t_2 += "\n    ";
var t_20;
t_20 = ((lineno = 105, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["cta-block-bg-image"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_20, true);
if(frame.topLevel) {
context.setVariable("classList", t_20);
}
if(frame.topLevel) {
context.addExport("classList", t_20);
}
t_2 += "\n  ";
;
}
;
}
;
}
;
}
t_2 += "\n\n  <!-- Custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_21;
t_21 = ((lineno = 110, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_21, true);
if(frame.topLevel) {
context.setVariable("classList", t_21);
}
if(frame.topLevel) {
context.addExport("classList", t_21);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
var t_22;
t_22 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_22, true);
if(frame.topLevel) {
context.setVariable("classString", t_22);
}
if(frame.topLevel) {
context.addExport("classString", t_22);
}
t_2 += "\n\n  <!-- Main container -->\n  <section\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_25 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_25) {t_25 = runtime.fromIterator(t_25);
var t_23;
if(runtime.isArray(t_25)) {
var t_24 = t_25.length;
for(t_23=0; t_23 < t_25.length; t_23++) {
var t_26 = t_25[t_23][0];
frame.set("[object Object]", t_25[t_23][0]);
var t_27 = t_25[t_23][1];
frame.set("[object Object]", t_25[t_23][1]);
frame.set("loop.index", t_23 + 1);
frame.set("loop.index0", t_23);
frame.set("loop.revindex", t_24 - t_23);
frame.set("loop.revindex0", t_24 - t_23 - 1);
frame.set("loop.first", t_23 === 0);
frame.set("loop.last", t_23 === t_24 - 1);
frame.set("loop.length", t_24);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_26, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_27, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_23 = -1;
var t_24 = runtime.keys(t_25).length;
for(var t_28 in t_25) {
t_23++;
var t_29 = t_25[t_28];
frame.set("key", t_28);
frame.set("value", t_29);
frame.set("loop.index", t_23 + 1);
frame.set("loop.index0", t_23);
frame.set("loop.revindex", t_24 - t_23);
frame.set("loop.revindex0", t_24 - t_23 - 1);
frame.set("loop.first", t_23 === 0);
frame.set("loop.last", t_23 === t_24 - 1);
frame.set("loop.length", t_24);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_28, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_29, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Background image (if specified) -->\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "image" && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"image")) {
t_2 += "\n      <div\n        class=\"cta-block-background\"\n        style=\"background-image: url('";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"image"), env.opts.autoescape);
t_2 += "');\"\n        aria-hidden=\"true\"\n      ></div>\n      <div class=\"cta-block-overlay ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"overlay") == "light") {
t_2 += "cta-block-overlay-light";
;
}
t_2 += "\"></div>\n    ";
;
}
t_2 += "\n\n    <!-- Content container -->\n    <div class=\"cta-block-container\">\n      <!-- Split layout - visual side -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "split" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"visual")) {
t_2 += "\n        <div class=\"cta-block-split-visual\">\n          ";
if(env.getTest("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"visual")) === true) {
t_2 += "\n            <img src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"visual"), env.opts.autoescape);
t_2 += "\" alt=\"\" loading=\"lazy\" />\n          ";
;
}
else {
t_2 += "\n            ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"visual")), env.opts.autoescape);
t_2 += "\n          ";
;
}
t_2 += "\n        </div>\n      ";
;
}
t_2 += "\n\n      <!-- Content side -->\n      <div>\n        <!-- Urgency element (optional) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"urgency")) {
t_2 += "\n          <div class=\"cta-block-urgency\">\n            <span class=\"cta-block-urgency-icon\" aria-hidden=\"true\">\n              <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                <circle cx=\"8\" cy=\"8\" r=\"7\" />\n                <line x1=\"8\" y1=\"4\" x2=\"8\" y2=\"8\" />\n                <line x1=\"8\" y1=\"8\" x2=\"10\" y2=\"10\" />\n              </svg>\n            </span>\n            <span>\n              ";
if(env.getTest("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"urgency")) === true) {
t_2 += "\n                ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"urgency"), env.opts.autoescape);
t_2 += "\n              ";
;
}
else {
t_2 += "\n                ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"urgency")), env.opts.autoescape);
t_2 += "\n              ";
;
}
t_2 += "\n            </span>\n          </div>\n        ";
;
}
t_2 += "\n\n        <!-- Main content -->\n        <div class=\"cta-block-content\">\n          <!-- Eyebrow text (optional) -->\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"eyebrow")) {
t_2 += "\n            <div class=\"cta-block-eyebrow\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"eyebrow"), env.opts.autoescape);
t_2 += "</div>\n          ";
;
}
t_2 += "\n\n          <!-- Heading -->\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headline")) {
t_2 += "\n            ";
t_2 += runtime.suppressValue((lineno = 180, colno = 22, runtime.callWrap(t_6, "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headline"),"level": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headingLevel"),"size": "2xl"}])), env.opts.autoescape);
t_2 += "\n          ";
;
}
t_2 += "\n\n          <!-- Subheadline (optional) -->\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subheadline")) {
t_2 += "\n            <div class=\"cta-block-subheadline\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subheadline"), env.opts.autoescape);
t_2 += "</div>\n          ";
;
}
t_2 += "\n\n          <!-- Description -->\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_2 += "\n            <p class=\"cta-block-description\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"), env.opts.autoescape);
t_2 += "</p>\n          ";
;
}
t_2 += "\n        </div>\n\n        <!-- CTA Actions -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")) {
t_2 += "\n          <div class=\"cta-block-actions\">\n            <!-- Primary CTA (required) -->\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")) {
t_2 += "\n              ";
t_2 += runtime.suppressValue((lineno = 203, colno = 23, runtime.callWrap(t_10, "button", context, [{"text": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"text"),"href": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"href"),"variant": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"variant") || "primary","size": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"size") || "lg","target": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"target"),"rel": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"rel")}])), env.opts.autoescape);
t_2 += "\n            ";
;
}
t_2 += "\n\n            <!-- Secondary CTA (optional) -->\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")) {
t_2 += "\n              ";
t_2 += runtime.suppressValue((lineno = 215, colno = 23, runtime.callWrap(t_10, "button", context, [{"text": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"text"),"href": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"href"),"variant": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"variant") || "ghost","size": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"size") || "lg","target": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"target"),"rel": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"rel")}])), env.opts.autoescape);
t_2 += "\n            ";
;
}
t_2 += "\n          </div>\n\n          <!-- Trust signal below CTAs (optional) -->\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trustSignal")) {
t_2 += "\n            <div class=\"cta-block-trust\">\n              ";
if(env.getTest("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trustSignal")) === true) {
t_2 += "\n                ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trustSignal"), env.opts.autoescape);
t_2 += "\n              ";
;
}
else {
t_2 += "\n                ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trustSignal")), env.opts.autoescape);
t_2 += "\n              ";
;
}
t_2 += "\n            </div>\n          ";
;
}
t_2 += "\n        ";
;
}
t_2 += "\n      </div>\n    </div>\n  </section>\n";
})})})});
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("ctaBlock");
context.setVariable("ctaBlock", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/feature-list/feature-list.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/feature-list/feature-list.njk -->\n\n";
output += "\n\n";
env.getTemplate("atoms/icon/icon.njk", false, "molecules/feature-list/feature-list.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "icon")) {
var t_4 = t_1.icon;
} else {
cb(new Error("cannot import 'icon'")); return;
}
context.setVariable("icon", t_4);
output += "\n";
env.getTemplate("atoms/text/text.njk", false, "molecules/feature-list/feature-list.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "text")) {
var t_8 = t_5.text;
} else {
cb(new Error("cannot import 'text'")); return;
}
context.setVariable("text", t_8);
output += "\n\n";
var macro_t_9 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_10 = "";t_10 += "\n  ";
var t_11;
t_11 = {"items": [],"iconPosition": "left","density": "normal","columns": 1,"defaultIcon": "check","className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_11, true);
if(frame.topLevel) {
context.setVariable("defaults", t_11);
}
if(frame.topLevel) {
context.addExport("defaults", t_11);
}
t_10 += "\n\n  ";
var t_12;
t_12 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_12, true);
if(frame.topLevel) {
context.setVariable("config", t_12);
}
if(frame.topLevel) {
context.addExport("config", t_12);
}
t_10 += "\n\n  <!-- Build class list -->\n  ";
var t_13;
t_13 = ["feature-list"];
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_10 += "\n\n  <!-- Add icon position class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconPosition") == "top") {
t_10 += "\n    ";
var t_14;
t_14 = ((lineno = 82, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["feature-list-top"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_14, true);
if(frame.topLevel) {
context.setVariable("classList", t_14);
}
if(frame.topLevel) {
context.addExport("classList", t_14);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Add density class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"density") == "compact") {
t_10 += "\n    ";
var t_15;
t_15 = ((lineno = 87, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["feature-list-compact"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_15, true);
if(frame.topLevel) {
context.setVariable("classList", t_15);
}
if(frame.topLevel) {
context.addExport("classList", t_15);
}
t_10 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"density") == "spacious") {
t_10 += "\n    ";
var t_16;
t_16 = ((lineno = 89, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["feature-list-spacious"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_16, true);
if(frame.topLevel) {
context.setVariable("classList", t_16);
}
if(frame.topLevel) {
context.addExport("classList", t_16);
}
t_10 += "\n  ";
;
}
;
}
t_10 += "\n\n  <!-- Add columns class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"columns") == 2) {
t_10 += "\n    ";
var t_17;
t_17 = ((lineno = 94, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["feature-list-two-column"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_17, true);
if(frame.topLevel) {
context.setVariable("classList", t_17);
}
if(frame.topLevel) {
context.addExport("classList", t_17);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_10 += "\n    ";
var t_18;
t_18 = ((lineno = 99, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_18, true);
if(frame.topLevel) {
context.setVariable("classList", t_18);
}
if(frame.topLevel) {
context.addExport("classList", t_18);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Render semantic list -->\n  <ul\n    class=\"";
t_10 += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "), env.opts.autoescape);
t_10 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_10 += "id=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_10 += "aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    ";
frame = frame.push();
var t_21 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_21) {t_21 = runtime.fromIterator(t_21);
var t_19;
if(runtime.isArray(t_21)) {
var t_20 = t_21.length;
for(t_19=0; t_19 < t_21.length; t_19++) {
var t_22 = t_21[t_19][0];
frame.set("[object Object]", t_21[t_19][0]);
var t_23 = t_21[t_19][1];
frame.set("[object Object]", t_21[t_19][1]);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_22, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_23, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
} else {
t_19 = -1;
var t_20 = runtime.keys(t_21).length;
for(var t_24 in t_21) {
t_19++;
var t_25 = t_21[t_24];
frame.set("key", t_24);
frame.set("value", t_25);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_24, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_25, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_10 += "\n  >\n    ";
frame = frame.push();
var t_28 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"items");
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("item", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
t_10 += "\n      ";
var t_30;
t_30 = {"icon": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"defaultIcon"),"text": "","included": true};
frame.set("itemDefaults", t_30, true);
if(frame.topLevel) {
context.setVariable("itemDefaults", t_30);
}
if(frame.topLevel) {
context.addExport("itemDefaults", t_30);
}
t_10 += "\n      ";
var t_31;
t_31 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "itemDefaults"),t_29);
frame.set("itemConfig", t_31, true);
if(frame.topLevel) {
context.setVariable("itemConfig", t_31);
}
if(frame.topLevel) {
context.addExport("itemConfig", t_31);
}
t_10 += "\n\n      <!-- Build item class list -->\n      ";
var t_32;
t_32 = ["feature-list-item"];
frame.set("itemClassList", t_32, true);
if(frame.topLevel) {
context.setVariable("itemClassList", t_32);
}
if(frame.topLevel) {
context.addExport("itemClassList", t_32);
}
t_10 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"included")) {
t_10 += "\n        ";
var t_33;
t_33 = ((lineno = 122, colno = 50, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemClassList")),"push"), "itemClassList[\"push\"]", context, ["feature-list-item-included"])),runtime.contextOrFrameLookup(context, frame, "itemClassList"));
frame.set("itemClassList", t_33, true);
if(frame.topLevel) {
context.setVariable("itemClassList", t_33);
}
if(frame.topLevel) {
context.addExport("itemClassList", t_33);
}
t_10 += "\n      ";
;
}
else {
t_10 += "\n        ";
var t_34;
t_34 = ((lineno = 124, colno = 50, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemClassList")),"push"), "itemClassList[\"push\"]", context, ["feature-list-item-not-included"])),runtime.contextOrFrameLookup(context, frame, "itemClassList"));
frame.set("itemClassList", t_34, true);
if(frame.topLevel) {
context.setVariable("itemClassList", t_34);
}
if(frame.topLevel) {
context.addExport("itemClassList", t_34);
}
t_10 += "\n      ";
;
}
t_10 += "\n\n      ";
var t_35;
t_35 = "";
frame.set("iconColor", t_35, true);
if(frame.topLevel) {
context.setVariable("iconColor", t_35);
}
if(frame.topLevel) {
context.addExport("iconColor", t_35);
}
t_10 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"included") && (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"icon") == "check" || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"icon") == "verified")) {
t_10 += "\n        ";
var t_36;
t_36 = "success";
frame.set("iconColor", t_36, true);
if(frame.topLevel) {
context.setVariable("iconColor", t_36);
}
if(frame.topLevel) {
context.addExport("iconColor", t_36);
}
t_10 += "\n      ";
;
}
else {
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"included") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"icon") == "x") {
t_10 += "\n        ";
var t_37;
t_37 = "error";
frame.set("iconColor", t_37, true);
if(frame.topLevel) {
context.setVariable("iconColor", t_37);
}
if(frame.topLevel) {
context.addExport("iconColor", t_37);
}
t_10 += "\n      ";
;
}
;
}
t_10 += "\n\n      <li class=\"";
t_10 += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "itemClassList")," "), env.opts.autoescape);
t_10 += "\">\n        <!-- Icon -->\n        <span class=\"feature-list-icon\">\n          ";
t_10 += runtime.suppressValue((lineno = 137, colno = 17, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "icon"), "icon", context, [{"name": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"icon"),"size": "sm","color": runtime.contextOrFrameLookup(context, frame, "iconColor"),"decorative": true}])), env.opts.autoescape);
t_10 += "\n        </span>\n\n        <!-- Text -->\n        <span class=\"feature-list-text\">\n          ";
t_10 += runtime.suppressValue((lineno = 147, colno = 17, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "text"), "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "itemConfig")),"text"),"element": "span","size": "base"}])), env.opts.autoescape);
t_10 += "\n        </span>\n      </li>\n    ";
;
}
}
frame = frame.pop();
t_10 += "\n  </ul>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_10);
});
context.addExport("featureList");
context.setVariable("featureList", macro_t_9);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/form-group/form-group.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
env.getTemplate("atoms/input/input.njk", false, "molecules/form-group/form-group.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "input")) {
var t_4 = t_1.input;
} else {
cb(new Error("cannot import 'input'")); return;
}
context.setVariable("input", t_4);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_6 = "";t_6 += "\n  ";
var t_7;
t_7 = {"layout": "vertical","required": false,"optional": false,"state": "default","showCharacterCount": false,"className": "","attributes": {}};
frame.set("defaults", t_7, true);
if(frame.topLevel) {
context.setVariable("defaults", t_7);
}
if(frame.topLevel) {
context.addExport("defaults", t_7);
}
t_6 += "\n\n  ";
var t_8;
t_8 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_8, true);
if(frame.topLevel) {
context.setVariable("config", t_8);
}
if(frame.topLevel) {
context.addExport("config", t_8);
}
t_6 += "\n\n  ";
t_6 += "\n  ";
var t_9;
t_9 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"inputId") + "-help";
frame.set("helpId", t_9, true);
if(frame.topLevel) {
context.setVariable("helpId", t_9);
}
if(frame.topLevel) {
context.addExport("helpId", t_9);
}
t_6 += "\n  ";
var t_10;
t_10 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"inputId") + "-error";
frame.set("errorId", t_10, true);
if(frame.topLevel) {
context.setVariable("errorId", t_10);
}
if(frame.topLevel) {
context.addExport("errorId", t_10);
}
t_6 += "\n  ";
var t_11;
t_11 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"inputId") + "-success";
frame.set("successId", t_11, true);
if(frame.topLevel) {
context.setVariable("successId", t_11);
}
if(frame.topLevel) {
context.addExport("successId", t_11);
}
t_6 += "\n  ";
var t_12;
t_12 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"inputId") + "-warning";
frame.set("warningId", t_12, true);
if(frame.topLevel) {
context.setVariable("warningId", t_12);
}
if(frame.topLevel) {
context.addExport("warningId", t_12);
}
t_6 += "\n  ";
var t_13;
t_13 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"inputId") + "-count";
frame.set("countId", t_13, true);
if(frame.topLevel) {
context.setVariable("countId", t_13);
}
if(frame.topLevel) {
context.addExport("countId", t_13);
}
t_6 += "\n\n  ";
t_6 += "\n  ";
var t_14;
t_14 = [];
frame.set("describedByParts", t_14, true);
if(frame.topLevel) {
context.setVariable("describedByParts", t_14);
}
if(frame.topLevel) {
context.addExport("describedByParts", t_14);
}
t_6 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"helpText")) {
t_6 += "\n    ";
var t_15;
t_15 = ((lineno = 82, colno = 52, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "describedByParts")),"push"), "describedByParts[\"push\"]", context, [runtime.contextOrFrameLookup(context, frame, "helpId")])),runtime.contextOrFrameLookup(context, frame, "describedByParts"));
frame.set("describedByParts", t_15, true);
if(frame.topLevel) {
context.setVariable("describedByParts", t_15);
}
if(frame.topLevel) {
context.addExport("describedByParts", t_15);
}
t_6 += "\n  ";
;
}
t_6 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"errorMessage") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "error") {
t_6 += "\n    ";
var t_16;
t_16 = ((lineno = 85, colno = 52, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "describedByParts")),"push"), "describedByParts[\"push\"]", context, [runtime.contextOrFrameLookup(context, frame, "errorId")])),runtime.contextOrFrameLookup(context, frame, "describedByParts"));
frame.set("describedByParts", t_16, true);
if(frame.topLevel) {
context.setVariable("describedByParts", t_16);
}
if(frame.topLevel) {
context.addExport("describedByParts", t_16);
}
t_6 += "\n  ";
;
}
t_6 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"successMessage") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "success") {
t_6 += "\n    ";
var t_17;
t_17 = ((lineno = 88, colno = 52, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "describedByParts")),"push"), "describedByParts[\"push\"]", context, [runtime.contextOrFrameLookup(context, frame, "successId")])),runtime.contextOrFrameLookup(context, frame, "describedByParts"));
frame.set("describedByParts", t_17, true);
if(frame.topLevel) {
context.setVariable("describedByParts", t_17);
}
if(frame.topLevel) {
context.addExport("describedByParts", t_17);
}
t_6 += "\n  ";
;
}
t_6 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"warningMessage") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") == "warning") {
t_6 += "\n    ";
var t_18;
t_18 = ((lineno = 91, colno = 52, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "describedByParts")),"push"), "describedByParts[\"push\"]", context, [runtime.contextOrFrameLookup(context, frame, "warningId")])),runtime.contextOrFrameLookup(context, frame, "describedByParts"));
frame.set("describedByParts", t_18, true);
if(frame.topLevel) {
context.setVariable("describedByParts", t_18);
}
if(frame.topLevel) {
context.addExport("describedByParts", t_18);
}
t_6 += "\n  ";
;
}
t_6 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"showCharacterCount")) {
t_6 += "\n    ";
var t_19;
t_19 = ((lineno = 94, colno = 52, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "describedByParts")),"push"), "describedByParts[\"push\"]", context, [runtime.contextOrFrameLookup(context, frame, "countId")])),runtime.contextOrFrameLookup(context, frame, "describedByParts"));
frame.set("describedByParts", t_19, true);
if(frame.topLevel) {
context.setVariable("describedByParts", t_19);
}
if(frame.topLevel) {
context.addExport("describedByParts", t_19);
}
t_6 += "\n  ";
;
}
t_6 += "\n  ";
var t_20;
t_20 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "describedByParts")," "));
frame.set("describedBy", t_20, true);
if(frame.topLevel) {
context.setVariable("describedBy", t_20);
}
if(frame.topLevel) {
context.addExport("describedBy", t_20);
}
t_6 += "\n\n  ";
t_6 += "\n  ";
var t_21;
t_21 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["form-group",(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") != "vertical"?"form-group-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") != "default"?"form-group--" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state"):""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_21, true);
if(frame.topLevel) {
context.setVariable("classList", t_21);
}
if(frame.topLevel) {
context.addExport("classList", t_21);
}
t_6 += "\n\n  ";
t_6 += "\n  <div\n    class=\"";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_6 += "\"\n    ";
frame = frame.push();
var t_24 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_24) {t_24 = runtime.fromIterator(t_24);
var t_22;
if(runtime.isArray(t_24)) {
var t_23 = t_24.length;
for(t_22=0; t_22 < t_24.length; t_22++) {
var t_25 = t_24[t_22][0];
frame.set("[object Object]", t_24[t_22][0]);
var t_26 = t_24[t_22][1];
frame.set("[object Object]", t_24[t_22][1]);
frame.set("loop.index", t_22 + 1);
frame.set("loop.index0", t_22);
frame.set("loop.revindex", t_23 - t_22);
frame.set("loop.revindex0", t_23 - t_22 - 1);
frame.set("loop.first", t_22 === 0);
frame.set("loop.last", t_22 === t_23 - 1);
frame.set("loop.length", t_23);
t_6 += "\n      ";
t_6 += runtime.suppressValue(t_25, env.opts.autoescape);
t_6 += "=\"";
t_6 += runtime.suppressValue(t_26, env.opts.autoescape);
t_6 += "\"\n    ";
;
}
} else {
t_22 = -1;
var t_23 = runtime.keys(t_24).length;
for(var t_27 in t_24) {
t_22++;
var t_28 = t_24[t_27];
frame.set("key", t_27);
frame.set("value", t_28);
frame.set("loop.index", t_22 + 1);
frame.set("loop.index0", t_22);
frame.set("loop.revindex", t_23 - t_22);
frame.set("loop.revindex0", t_23 - t_22 - 1);
frame.set("loop.first", t_22 === 0);
frame.set("loop.last", t_22 === t_23 - 1);
frame.set("loop.length", t_23);
t_6 += "\n      ";
t_6 += runtime.suppressValue(t_27, env.opts.autoescape);
t_6 += "=\"";
t_6 += runtime.suppressValue(t_28, env.opts.autoescape);
t_6 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_6 += "\n  >\n    ";
t_6 += "\n    <label for=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"inputId"), env.opts.autoescape);
t_6 += "\" class=\"form-group-label\">\n      ";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"label"), env.opts.autoescape);
t_6 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"required")) {
t_6 += "\n        <span class=\"form-group-required\" aria-label=\"required\">*</span>\n      ";
;
}
t_6 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"optional")) {
t_6 += "\n        <span class=\"form-group-optional\">(optional)</span>\n      ";
;
}
t_6 += "\n    </label>\n\n    ";
t_6 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "horizontal") {
t_6 += "\n      <div class=\"form-group-field\">\n    ";
;
}
t_6 += "\n\n    ";
t_6 += "\n    ";
t_6 += runtime.suppressValue((lineno = 130, colno = 12, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "input"), "input", context, [env.getFilter("merge").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"input"),{"id": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"inputId"),"state": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state"),"ariaDescribedBy": (runtime.contextOrFrameLookup(context, frame, "describedBy")?runtime.contextOrFrameLookup(context, frame, "describedBy"):"")})])), env.opts.autoescape);
t_6 += "\n\n    ";
t_6 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"helpText")) {
t_6 += "\n      <p class=\"form-group-help\" id=\"";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "helpId"), env.opts.autoescape);
t_6 += "\">\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"helpText"), env.opts.autoescape);
t_6 += "\n      </p>\n    ";
;
}
t_6 += "\n\n    ";
t_6 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"errorMessage")) {
t_6 += "\n      <p\n        class=\"form-group-error\"\n        id=\"";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "errorId"), env.opts.autoescape);
t_6 += "\"\n        role=\"alert\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") != "error") {
t_6 += "hidden";
;
}
t_6 += "\n      >\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"errorMessage"), env.opts.autoescape);
t_6 += "\n      </p>\n    ";
;
}
t_6 += "\n\n    ";
t_6 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"successMessage")) {
t_6 += "\n      <p\n        class=\"form-group-success\"\n        id=\"";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "successId"), env.opts.autoescape);
t_6 += "\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") != "success") {
t_6 += "hidden";
;
}
t_6 += "\n      >\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"successMessage"), env.opts.autoescape);
t_6 += "\n      </p>\n    ";
;
}
t_6 += "\n\n    ";
t_6 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"warningMessage")) {
t_6 += "\n      <p\n        class=\"form-group-warning\"\n        id=\"";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "warningId"), env.opts.autoescape);
t_6 += "\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"state") != "warning") {
t_6 += "hidden";
;
}
t_6 += "\n      >\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"warningMessage"), env.opts.autoescape);
t_6 += "\n      </p>\n    ";
;
}
t_6 += "\n\n    ";
t_6 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"showCharacterCount") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"maxLength")) {
t_6 += "\n      <p class=\"form-group-count\" id=\"";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "countId"), env.opts.autoescape);
t_6 += "\">\n        <span class=\"form-group-count-current\">0</span> / ";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"maxLength"), env.opts.autoescape);
t_6 += "\n      </p>\n    ";
;
}
t_6 += "\n\n    ";
t_6 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "horizontal") {
t_6 += "\n      </div>\n    ";
;
}
t_6 += "\n  </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_6);
});
context.addExport("formGroup");
context.setVariable("formGroup", macro_t_5);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/image-text/image-text.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/image-text/image-text.njk -->\n\n";
output += "\n\n";
env.getTemplate("atoms/heading/heading.njk", false, "molecules/image-text/image-text.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "heading")) {
var t_4 = t_1.heading;
} else {
cb(new Error("cannot import 'heading'")); return;
}
context.setVariable("heading", t_4);
output += "\n";
env.getTemplate("atoms/text/text.njk", false, "molecules/image-text/image-text.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "text")) {
var t_8 = t_5.text;
} else {
cb(new Error("cannot import 'text'")); return;
}
context.setVariable("text", t_8);
output += "\n";
env.getTemplate("atoms/button/button.njk", false, "molecules/image-text/image-text.njk", false, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
t_9.getExported(function(t_11,t_9) {
if(t_11) { cb(t_11); return; }
if(Object.prototype.hasOwnProperty.call(t_9, "button")) {
var t_12 = t_9.button;
} else {
cb(new Error("cannot import 'button'")); return;
}
context.setVariable("button", t_12);
output += "\n\n";
var macro_t_13 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_14 = "";t_14 += "\n  ";
var t_15;
t_15 = {"imagePosition": "left","image": {},"aspectRatio": "auto","headingLevel": 2,"ratio": "50-50","gap": "lg","verticalAlign": "center","alternate": false,"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_15, true);
if(frame.topLevel) {
context.setVariable("defaults", t_15);
}
if(frame.topLevel) {
context.addExport("defaults", t_15);
}
t_14 += "\n\n  ";
var t_16;
t_16 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_16, true);
if(frame.topLevel) {
context.setVariable("config", t_16);
}
if(frame.topLevel) {
context.addExport("config", t_16);
}
t_14 += "\n\n  <!-- Validate required image props -->\n  ";
if(!runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"src") || !runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"alt")) {
t_14 += "\n    <!-- Error: image-text requires image.src and image.alt -->\n  ";
;
}
t_14 += "\n\n  <!-- Build class list -->\n  ";
var t_17;
t_17 = env.getFilter("trim").call(context, env.getFilter("join").call(context, env.getFilter("reject").call(context, ["image-text","image-text-image-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"imagePosition"),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"aspectRatio") != "auto"?"image-text-aspect-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"aspectRatio"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ratio") != "50-50"?"image-text-ratio-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ratio"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"gap") != "lg"?"image-text-gap-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"gap"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"verticalAlign") != "center"?"image-text-align-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"verticalAlign"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"backgroundColor")?"image-text-bg-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"backgroundColor"):""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")],"equalto",false)," "));
frame.set("classList", t_17, true);
if(frame.topLevel) {
context.setVariable("classList", t_17);
}
if(frame.topLevel) {
context.addExport("classList", t_17);
}
t_14 += "\n\n  <!-- Main container -->\n  <div\n    class=\"";
t_14 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_14 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_14 += "id=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_14 += "\"";
;
}
t_14 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_14 += "role=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_14 += "\"";
;
}
t_14 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_14 += "aria-label=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_14 += "\"";
;
}
t_14 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_14 += "aria-describedby=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_14 += "\"";
;
}
t_14 += "\n    ";
frame = frame.push();
var t_20 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_20) {t_20 = runtime.fromIterator(t_20);
var t_18;
if(runtime.isArray(t_20)) {
var t_19 = t_20.length;
for(t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18][0];
frame.set("[object Object]", t_20[t_18][0]);
var t_22 = t_20[t_18][1];
frame.set("[object Object]", t_20[t_18][1]);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
t_14 += "\n      ";
t_14 += runtime.suppressValue(t_21, env.opts.autoescape);
t_14 += "=\"";
t_14 += runtime.suppressValue(t_22, env.opts.autoescape);
t_14 += "\"\n    ";
;
}
} else {
t_18 = -1;
var t_19 = runtime.keys(t_20).length;
for(var t_23 in t_20) {
t_18++;
var t_24 = t_20[t_23];
frame.set("key", t_23);
frame.set("value", t_24);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
t_14 += "\n      ";
t_14 += runtime.suppressValue(t_23, env.opts.autoescape);
t_14 += "=\"";
t_14 += runtime.suppressValue(t_24, env.opts.autoescape);
t_14 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_14 += "\n  >\n    <!-- Media section (image) -->\n    <div class=\"image-text-media\">\n      <figure class=\"image-text-figure\">\n        <img\n          src=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"src"), env.opts.autoescape);
t_14 += "\"\n          alt=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"alt"), env.opts.autoescape);
t_14 += "\"\n          class=\"image-text-image\"\n          loading=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"image")),"loading") || "lazy", env.opts.autoescape);
t_14 += "\"\n        >\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"caption")) {
t_14 += "\n          <figcaption class=\"image-text-caption\">\n            ";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"caption"), env.opts.autoescape);
t_14 += "\n          </figcaption>\n        ";
;
}
t_14 += "\n      </figure>\n    </div>\n\n    <!-- Content section (text + CTA) -->\n    <div class=\"image-text-content\">\n      <!-- Headline -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headline")) {
t_14 += "\n        ";
t_14 += runtime.suppressValue((lineno = 157, colno = 18, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "heading"), "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headline"),"level": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headingLevel"),"size": "xl"}])), env.opts.autoescape);
t_14 += "\n      ";
;
}
t_14 += "\n\n      <!-- Description -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_14 += "\n        ";
t_14 += runtime.suppressValue((lineno = 166, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "text"), "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"),"size": "lg","lineHeight": "relaxed","color": "muted"}])), env.opts.autoescape);
t_14 += "\n      ";
;
}
t_14 += "\n\n      <!-- Call-to-action button -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")) {
t_14 += "\n        ";
t_14 += runtime.suppressValue((lineno = 176, colno = 17, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "button"), "button", context, [{"text": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"text"),"href": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"href"),"variant": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"variant") || "primary","size": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"size") || "md"}])), env.opts.autoescape);
t_14 += "\n      ";
;
}
t_14 += "\n    </div>\n  </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_14);
});
context.addExport("imageText");
context.setVariable("imageText", macro_t_13);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/logo-grid/logo-grid.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/logo-grid/logo-grid.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"variant": "grid","colorScheme": "grayscale-hover","columns": {"mobile": 2,"tablet": 4,"desktop": 6},"gap": "md","align": "center","animation": {"enabled": true,"speed": "normal","pauseOnHover": true},"className": "","attributes": {},"a11y": {"ariaLabel": "Customer logos"}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  <!-- Ensure animation is properly configured -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "marquee" && !runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"animation")),"enabled")) {
t_2 += "\n    ";
var t_5;
t_5 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "config"),{"animation": {"enabled": true,"speed": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"animation")),"speed") || "normal","pauseOnHover": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"animation")),"pauseOnHover") || true}});
frame.set("config", t_5, true);
if(frame.topLevel) {
context.setVariable("config", t_5);
}
if(frame.topLevel) {
context.addExport("config", t_5);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_6;
t_6 = ["logo-grid","logo-grid-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"),"logo-grid-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"colorScheme"),"logo-grid-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"align")];
frame.set("classList", t_6, true);
if(frame.topLevel) {
context.setVariable("classList", t_6);
}
if(frame.topLevel) {
context.addExport("classList", t_6);
}
t_2 += "\n\n  <!-- Gap variant -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"gap")) {
t_2 += "\n    ";
var t_7;
t_7 = ((lineno = 119, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["logo-grid-gap-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"gap")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_7, true);
if(frame.topLevel) {
context.setVariable("classList", t_7);
}
if(frame.topLevel) {
context.addExport("classList", t_7);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Animation speed for marquee -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "marquee" && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"animation")),"speed")) {
t_2 += "\n    ";
var t_8;
t_8 = ((lineno = 124, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["logo-grid-animation-" + runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"animation")),"speed")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_8, true);
if(frame.topLevel) {
context.setVariable("classList", t_8);
}
if(frame.topLevel) {
context.addExport("classList", t_8);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_9;
t_9 = ((lineno = 129, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_9, true);
if(frame.topLevel) {
context.setVariable("classList", t_9);
}
if(frame.topLevel) {
context.addExport("classList", t_9);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Join classes -->\n  ";
var t_10;
t_10 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_10, true);
if(frame.topLevel) {
context.setVariable("classString", t_10);
}
if(frame.topLevel) {
context.addExport("classString", t_10);
}
t_2 += "\n\n  <!-- Main container -->\n  <section\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_13 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_13) {t_13 = runtime.fromIterator(t_13);
var t_11;
if(runtime.isArray(t_13)) {
var t_12 = t_13.length;
for(t_11=0; t_11 < t_13.length; t_11++) {
var t_14 = t_13[t_11][0];
frame.set("[object Object]", t_13[t_11][0]);
var t_15 = t_13[t_11][1];
frame.set("[object Object]", t_13[t_11][1]);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_14, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_15, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_11 = -1;
var t_12 = runtime.keys(t_13).length;
for(var t_16 in t_13) {
t_11++;
var t_17 = t_13[t_16];
frame.set("key", t_16);
frame.set("value", t_17);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_16, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_17, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Header section (title + subtitle) - optional -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subtitle")) {
t_2 += "\n      <div class=\"logo-grid-header\">\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title")) {
t_2 += "\n          <p class=\"logo-grid-title\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title"), env.opts.autoescape);
t_2 += "</p>\n        ";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subtitle")) {
t_2 += "\n          <p class=\"logo-grid-subtitle\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subtitle"), env.opts.autoescape);
t_2 += "</p>\n        ";
;
}
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Grid variant (default) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "grid") {
t_2 += "\n      <div class=\"logo-grid-container\">\n        ";
frame = frame.push();
var t_20 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logos");
if(t_20) {t_20 = runtime.fromIterator(t_20);
var t_19 = t_20.length;
for(var t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18];
frame.set("logo", t_21);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
t_2 += "\n          ";
if(runtime.memberLookup((t_21),"href")) {
t_2 += "\n            <!-- Clickable logo -->\n            <a\n              href=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"href"), env.opts.autoescape);
t_2 += "\"\n              class=\"logo-grid-link\"\n              ";
if(runtime.memberLookup((t_21),"alt")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"alt"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n              rel=\"noopener noreferrer\"\n              target=\"_blank\"\n            >\n              <img\n                src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"src"), env.opts.autoescape);
t_2 += "\"\n                alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"alt") || "", env.opts.autoescape);
t_2 += "\"\n                class=\"logo-grid-logo\"\n                ";
if(runtime.memberLookup((t_21),"width")) {
t_2 += "width=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"width"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((t_21),"height")) {
t_2 += "height=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"height"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                loading=\"lazy\"\n              >\n            </a>\n          ";
;
}
else {
t_2 += "\n            <!-- Non-clickable logo -->\n            <div class=\"logo-grid-item\">\n              <img\n                src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"src"), env.opts.autoescape);
t_2 += "\"\n                alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"alt") || "", env.opts.autoescape);
t_2 += "\"\n                class=\"logo-grid-logo\"\n                ";
if(runtime.memberLookup((t_21),"width")) {
t_2 += "width=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"width"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((t_21),"height")) {
t_2 += "height=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_21),"height"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                loading=\"lazy\"\n              >\n            </div>\n          ";
;
}
t_2 += "\n        ";
;
}
}
frame = frame.pop();
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Horizontal scroll variant -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "scroll") {
t_2 += "\n      <div class=\"logo-grid-scroll-container\">\n        <div class=\"logo-grid-scroll-track\">\n          ";
frame = frame.push();
var t_24 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logos");
if(t_24) {t_24 = runtime.fromIterator(t_24);
var t_23 = t_24.length;
for(var t_22=0; t_22 < t_24.length; t_22++) {
var t_25 = t_24[t_22];
frame.set("logo", t_25);
frame.set("loop.index", t_22 + 1);
frame.set("loop.index0", t_22);
frame.set("loop.revindex", t_23 - t_22);
frame.set("loop.revindex0", t_23 - t_22 - 1);
frame.set("loop.first", t_22 === 0);
frame.set("loop.last", t_22 === t_23 - 1);
frame.set("loop.length", t_23);
t_2 += "\n            ";
if(runtime.memberLookup((t_25),"href")) {
t_2 += "\n              <!-- Clickable logo -->\n              <a\n                href=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"href"), env.opts.autoescape);
t_2 += "\"\n                class=\"logo-grid-link\"\n                ";
if(runtime.memberLookup((t_25),"alt")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"alt"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                rel=\"noopener noreferrer\"\n                target=\"_blank\"\n              >\n                <img\n                  src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"src"), env.opts.autoescape);
t_2 += "\"\n                  alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"alt") || "", env.opts.autoescape);
t_2 += "\"\n                  class=\"logo-grid-logo\"\n                  ";
if(runtime.memberLookup((t_25),"width")) {
t_2 += "width=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"width"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                  ";
if(runtime.memberLookup((t_25),"height")) {
t_2 += "height=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"height"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                  loading=\"lazy\"\n                >\n              </a>\n            ";
;
}
else {
t_2 += "\n              <!-- Non-clickable logo -->\n              <div class=\"logo-grid-item\">\n                <img\n                  src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"src"), env.opts.autoescape);
t_2 += "\"\n                  alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"alt") || "", env.opts.autoescape);
t_2 += "\"\n                  class=\"logo-grid-logo\"\n                  ";
if(runtime.memberLookup((t_25),"width")) {
t_2 += "width=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"width"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                  ";
if(runtime.memberLookup((t_25),"height")) {
t_2 += "height=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_25),"height"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                  loading=\"lazy\"\n                >\n              </div>\n            ";
;
}
t_2 += "\n          ";
;
}
}
frame = frame.pop();
t_2 += "\n        </div>\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Marquee animation variant -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "marquee") {
t_2 += "\n      <div class=\"logo-grid-marquee-container\">\n        <!-- First track (original logos) -->\n        <div class=\"logo-grid-marquee-track\">\n          ";
frame = frame.push();
var t_28 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logos");
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("logo", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
t_2 += "\n            <div class=\"logo-grid-item\">\n              <img\n                src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_29),"src"), env.opts.autoescape);
t_2 += "\"\n                alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_29),"alt") || "", env.opts.autoescape);
t_2 += "\"\n                class=\"logo-grid-logo\"\n                ";
if(runtime.memberLookup((t_29),"width")) {
t_2 += "width=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_29),"width"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((t_29),"height")) {
t_2 += "height=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_29),"height"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                loading=\"lazy\"\n              >\n            </div>\n          ";
;
}
}
frame = frame.pop();
t_2 += "\n          <!-- Duplicate logos for seamless loop -->\n          ";
frame = frame.push();
var t_32 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logos");
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_31 = t_32.length;
for(var t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30];
frame.set("logo", t_33);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
t_2 += "\n            <div class=\"logo-grid-item\">\n              <img\n                src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"src"), env.opts.autoescape);
t_2 += "\"\n                alt=\"\"\n                class=\"logo-grid-logo\"\n                ";
if(runtime.memberLookup((t_33),"width")) {
t_2 += "width=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"width"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((t_33),"height")) {
t_2 += "height=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"height"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                loading=\"lazy\"\n                aria-hidden=\"true\"\n              >\n            </div>\n          ";
;
}
}
frame = frame.pop();
t_2 += "\n        </div>\n      </div>\n    ";
;
}
t_2 += "\n  </section>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("logoGrid");
context.setVariable("logoGrid", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/pricing/pricing.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/pricing/pricing.njk -->\n\n";
output += "\n\n";
env.getTemplate("atoms/button/button.njk", false, "molecules/pricing/pricing.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "button")) {
var t_4 = t_1.button;
} else {
cb(new Error("cannot import 'button'")); return;
}
context.setVariable("button", t_4);
output += "\n";
env.getTemplate("atoms/badge/badge.njk", false, "molecules/pricing/pricing.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "badge")) {
var t_8 = t_5.badge;
} else {
cb(new Error("cannot import 'badge'")); return;
}
context.setVariable("badge", t_8);
output += "\n";
env.getTemplate("molecules/feature-list/feature-list.njk", false, "molecules/pricing/pricing.njk", false, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
t_9.getExported(function(t_11,t_9) {
if(t_11) { cb(t_11); return; }
if(Object.prototype.hasOwnProperty.call(t_9, "featureList")) {
var t_12 = t_9.featureList;
} else {
cb(new Error("cannot import 'featureList'")); return;
}
context.setVariable("featureList", t_12);
output += "\n\n";
var macro_t_13 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_14 = "";t_14 += "\n  ";
var t_15;
t_15 = {"name": "","price": "","period": "month","description": "","features": [],"cta": {},"ctaNote": "","badge": "","badgeVariant": "primary","highlighted": false,"originalPrice": "","savings": "","className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_15, true);
if(frame.topLevel) {
context.setVariable("defaults", t_15);
}
if(frame.topLevel) {
context.addExport("defaults", t_15);
}
t_14 += "\n\n  ";
var t_16;
t_16 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_16, true);
if(frame.topLevel) {
context.setVariable("config", t_16);
}
if(frame.topLevel) {
context.addExport("config", t_16);
}
t_14 += "\n\n  <!-- Build class list -->\n  ";
var t_17;
t_17 = ["pricing"];
frame.set("classList", t_17, true);
if(frame.topLevel) {
context.setVariable("classList", t_17);
}
if(frame.topLevel) {
context.addExport("classList", t_17);
}
t_14 += "\n\n  <!-- Add highlighted variant -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"highlighted")) {
t_14 += "\n    ";
var t_18;
t_18 = ((lineno = 109, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["pricing-highlighted"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_18, true);
if(frame.topLevel) {
context.setVariable("classList", t_18);
}
if(frame.topLevel) {
context.addExport("classList", t_18);
}
t_14 += "\n  ";
;
}
t_14 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_14 += "\n    ";
var t_19;
t_19 = ((lineno = 114, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_19, true);
if(frame.topLevel) {
context.setVariable("classList", t_19);
}
if(frame.topLevel) {
context.addExport("classList", t_19);
}
t_14 += "\n  ";
;
}
t_14 += "\n\n  <!-- Main pricing card container -->\n  <div\n    class=\"";
t_14 += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "), env.opts.autoescape);
t_14 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_14 += "id=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_14 += "\"";
;
}
t_14 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_14 += "aria-label=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_14 += "\"";
;
}
else {
t_14 += "aria-label=\"";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_14 += " pricing plan\"";
;
}
t_14 += "\n    ";
frame = frame.push();
var t_22 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_20;
if(runtime.isArray(t_22)) {
var t_21 = t_22.length;
for(t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20][0];
frame.set("[object Object]", t_22[t_20][0]);
var t_24 = t_22[t_20][1];
frame.set("[object Object]", t_22[t_20][1]);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_14 += "\n      ";
t_14 += runtime.suppressValue(t_23, env.opts.autoescape);
t_14 += "=\"";
t_14 += runtime.suppressValue(t_24, env.opts.autoescape);
t_14 += "\"\n    ";
;
}
} else {
t_20 = -1;
var t_21 = runtime.keys(t_22).length;
for(var t_25 in t_22) {
t_20++;
var t_26 = t_22[t_25];
frame.set("key", t_25);
frame.set("value", t_26);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_14 += "\n      ";
t_14 += runtime.suppressValue(t_25, env.opts.autoescape);
t_14 += "=\"";
t_14 += runtime.suppressValue(t_26, env.opts.autoescape);
t_14 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_14 += "\n  >\n    <!-- Badge wrapper (Popular, Best Value) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"badge")) {
t_14 += "\n      <div class=\"pricing-badge-wrapper\">\n        ";
t_14 += runtime.suppressValue((lineno = 129, colno = 16, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "badge"), "badge", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"badge"),"variant": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"badgeVariant"),"size": "md","shape": "pill"}])), env.opts.autoescape);
t_14 += "\n      </div>\n    ";
;
}
t_14 += "\n\n    <!-- Header: Plan name and description -->\n    <div class=\"pricing-header\">\n      <h3 class=\"pricing-name\">";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"name"), env.opts.autoescape);
t_14 += "</h3>\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_14 += "\n        <p class=\"pricing-description\">";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"), env.opts.autoescape);
t_14 += "</p>\n      ";
;
}
t_14 += "\n    </div>\n\n    <!-- Price display with optional strikethrough -->\n    <div class=\"pricing-price-wrapper\">\n      <!-- Show original price with strikethrough if provided -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"originalPrice")) {
t_14 += "\n        <div class=\"pricing-original\">\n          <span class=\"pricing-original-amount\">";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"originalPrice"), env.opts.autoescape);
t_14 += "</span>\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"savings")) {
t_14 += "\n            <span class=\"pricing-savings\">";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"savings"), env.opts.autoescape);
t_14 += "</span>\n          ";
;
}
t_14 += "\n        </div>\n      ";
;
}
t_14 += "\n\n      <!-- Current price -->\n      <div class=\"pricing-price\">\n        <span class=\"pricing-amount\">";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"price"), env.opts.autoescape);
t_14 += "</span>\n        <span class=\"pricing-period\">/";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"period"), env.opts.autoescape);
t_14 += "</span>\n      </div>\n    </div>\n\n    <!-- Features list -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"features") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"features")),"length") > 0) {
t_14 += "\n      <div class=\"pricing-features\">\n        ";
t_14 += runtime.suppressValue((lineno = 168, colno = 22, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "featureList"), "featureList", context, [{"items": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"features"),"iconPosition": "left","density": "normal"}])), env.opts.autoescape);
t_14 += "\n      </div>\n    ";
;
}
t_14 += "\n\n    <!-- CTA section -->\n    <div class=\"pricing-cta\">\n      ";
t_14 += runtime.suppressValue((lineno = 178, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "button"), "button", context, [{"text": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"text"),"href": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"href"),"variant": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"variant") || "primary","size": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"size") || "lg","fullWidth": true}])), env.opts.autoescape);
t_14 += "\n\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ctaNote")) {
t_14 += "\n        <p class=\"pricing-cta-note\">";
t_14 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"ctaNote"), env.opts.autoescape);
t_14 += "</p>\n      ";
;
}
t_14 += "\n    </div>\n  </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_14);
});
context.addExport("pricing");
context.setVariable("pricing", macro_t_13);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/stat/stat.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/stat/stat.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  <!-- Import dependencies -->\n  ";
env.getTemplate("atoms/icon/icon.njk", false, "molecules/stat/stat.njk", false, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
t_3.getExported(function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
if(Object.prototype.hasOwnProperty.call(t_3, "icon")) {
var t_6 = t_3.icon;
} else {
cb(new Error("cannot import 'icon'")); return;
}
context.setVariable("icon", t_6);
t_2 += "\n\n  <!-- Set defaults -->\n  ";
var t_7;
t_7 = {"variant": "default","size": "md","color": "default","countUp": false,"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_7, true);
if(frame.topLevel) {
context.setVariable("defaults", t_7);
}
if(frame.topLevel) {
context.addExport("defaults", t_7);
}
t_2 += "\n\n  ";
var t_8;
t_8 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_8, true);
if(frame.topLevel) {
context.setVariable("config", t_8);
}
if(frame.topLevel) {
context.addExport("config", t_8);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_9;
t_9 = ["stat"];
frame.set("classList", t_9, true);
if(frame.topLevel) {
context.setVariable("classList", t_9);
}
if(frame.topLevel) {
context.addExport("classList", t_9);
}
t_2 += "\n\n  <!-- Add variant classes (can be multiple) -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant")) {
t_2 += "\n    ";
var t_10;
t_10 = (lineno = 89, colno = 42, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant")),"split"), "config[\"variant\"][\"split\"]", context, [" "]));
frame.set("variants", t_10, true);
if(frame.topLevel) {
context.setVariable("variants", t_10);
}
if(frame.topLevel) {
context.addExport("variants", t_10);
}
t_2 += "\n    ";
frame = frame.push();
var t_13 = runtime.contextOrFrameLookup(context, frame, "variants");
if(t_13) {t_13 = runtime.fromIterator(t_13);
var t_12 = t_13.length;
for(var t_11=0; t_11 < t_13.length; t_11++) {
var t_14 = t_13[t_11];
frame.set("v", t_14);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
t_2 += "\n      ";
var t_15;
t_15 = ((lineno = 91, colno = 40, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["stat-" + t_14])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_15, true);
if(frame.topLevel) {
context.setVariable("classList", t_15);
}
if(frame.topLevel) {
context.addExport("classList", t_15);
}
t_2 += "\n    ";
;
}
}
frame = frame.pop();
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add size class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size") != "md") {
t_2 += "\n    ";
var t_16;
t_16 = ((lineno = 97, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["stat-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_16, true);
if(frame.topLevel) {
context.setVariable("classList", t_16);
}
if(frame.topLevel) {
context.addExport("classList", t_16);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add color class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color") != "default") {
t_2 += "\n    ";
var t_17;
t_17 = ((lineno = 102, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["stat-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"color")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_17, true);
if(frame.topLevel) {
context.setVariable("classList", t_17);
}
if(frame.topLevel) {
context.addExport("classList", t_17);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_18;
t_18 = ((lineno = 107, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_18, true);
if(frame.topLevel) {
context.setVariable("classList", t_18);
}
if(frame.topLevel) {
context.addExport("classList", t_18);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Join classes -->\n  ";
var t_19;
t_19 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_19, true);
if(frame.topLevel) {
context.setVariable("classString", t_19);
}
if(frame.topLevel) {
context.addExport("classString", t_19);
}
t_2 += "\n\n  <!-- Main container -->\n  <div\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_22 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_20;
if(runtime.isArray(t_22)) {
var t_21 = t_22.length;
for(t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20][0];
frame.set("[object Object]", t_22[t_20][0]);
var t_24 = t_22[t_20][1];
frame.set("[object Object]", t_22[t_20][1]);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_23, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_24, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_20 = -1;
var t_21 = runtime.keys(t_22).length;
for(var t_25 in t_22) {
t_20++;
var t_26 = t_22[t_25];
frame.set("key", t_25);
frame.set("value", t_26);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_25, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_26, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Icon (optional) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"icon")) {
t_2 += "\n      <div class=\"stat-icon\">\n        ";
t_2 += runtime.suppressValue((lineno = 127, colno = 15, runtime.callWrap(t_6, "icon", context, [{"name": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"icon"),"size": (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size") == "xl" || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size") == "lg"?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"size"):"lg"),"decorative": true}])), env.opts.autoescape);
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Value (number) with optional prefix/suffix -->\n    <div class=\"stat-value-wrapper\">\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"prefix")) {
t_2 += "\n        <span class=\"stat-prefix\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"prefix"), env.opts.autoescape);
t_2 += "</span>\n      ";
;
}
t_2 += "\n\n      <span\n        class=\"stat-value\"\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"countUp")) {
t_2 += "data-count-to=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n      >\n        ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"value"), env.opts.autoescape);
t_2 += "\n      </span>\n\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"suffix")) {
t_2 += "\n        <span class=\"stat-suffix\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"suffix"), env.opts.autoescape);
t_2 += "</span>\n      ";
;
}
t_2 += "\n    </div>\n\n    <!-- Label (description) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"label")) {
t_2 += "\n      <div class=\"stat-label\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"label"), env.opts.autoescape);
t_2 += "</div>\n    ";
;
}
t_2 += "\n\n    <!-- Trend indicator (optional) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trend")) {
t_2 += "\n      ";
var t_27;
t_27 = env.getFilter("lower").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trend")),"direction"));
frame.set("trendDirection", t_27, true);
if(frame.topLevel) {
context.setVariable("trendDirection", t_27);
}
if(frame.topLevel) {
context.addExport("trendDirection", t_27);
}
t_2 += "\n      ";
var t_28;
t_28 = "stat-trend stat-trend-" + runtime.contextOrFrameLookup(context, frame, "trendDirection");
frame.set("trendClass", t_28, true);
if(frame.topLevel) {
context.setVariable("trendClass", t_28);
}
if(frame.topLevel) {
context.addExport("trendClass", t_28);
}
t_2 += "\n\n      <!-- Determine arrow icon -->\n      ";
if(runtime.contextOrFrameLookup(context, frame, "trendDirection") == "up") {
t_2 += "\n        ";
var t_29;
t_29 = "arrow-up";
frame.set("trendIcon", t_29, true);
if(frame.topLevel) {
context.setVariable("trendIcon", t_29);
}
if(frame.topLevel) {
context.addExport("trendIcon", t_29);
}
t_2 += "\n      ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "trendDirection") == "down") {
t_2 += "\n        ";
var t_30;
t_30 = "arrow-down";
frame.set("trendIcon", t_30, true);
if(frame.topLevel) {
context.setVariable("trendIcon", t_30);
}
if(frame.topLevel) {
context.addExport("trendIcon", t_30);
}
t_2 += "\n      ";
;
}
else {
t_2 += "\n        ";
var t_31;
t_31 = "minus";
frame.set("trendIcon", t_31, true);
if(frame.topLevel) {
context.setVariable("trendIcon", t_31);
}
if(frame.topLevel) {
context.addExport("trendIcon", t_31);
}
t_2 += "\n      ";
;
}
;
}
t_2 += "\n\n      <div class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "trendClass"), env.opts.autoescape);
t_2 += "\">\n        <span class=\"stat-trend-icon\">\n          ";
t_2 += runtime.suppressValue((lineno = 174, colno = 17, runtime.callWrap(t_6, "icon", context, [{"name": runtime.contextOrFrameLookup(context, frame, "trendIcon"),"size": "sm","decorative": true}])), env.opts.autoescape);
t_2 += "\n        </span>\n\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trend")),"value")) {
t_2 += "\n          <span class=\"stat-trend-value\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trend")),"value"), env.opts.autoescape);
t_2 += "</span>\n        ";
;
}
t_2 += "\n\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trend")),"label")) {
t_2 += "\n          <span class=\"stat-trend-label\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trend")),"label"), env.opts.autoescape);
t_2 += "</span>\n        ";
;
}
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Comparison text (optional) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"comparison")) {
t_2 += "\n      <div class=\"stat-comparison\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"comparison"), env.opts.autoescape);
t_2 += "</div>\n    ";
;
}
t_2 += "\n\n    <!-- Allow caller content for advanced customization -->\n    ";
if(runtime.contextOrFrameLookup(context, frame, "caller")) {
t_2 += "\n      ";
t_2 += runtime.suppressValue((lineno = 198, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "caller"), "caller", context, [])), env.opts.autoescape);
t_2 += "\n    ";
;
}
t_2 += "\n  </div>\n";
})});
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("stat");
context.setVariable("stat", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["molecules/testimonial/testimonial.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/molecules/testimonial/testimonial.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  ";
var t_3;
t_3 = {"quote": "Customer testimonial quote...","author": {"name": "Anonymous","title": "","company": "","avatar": ""},"rating": 0,"logo": null,"verified": false,"verifiedText": "Verified Customer","variant": "default","expandable": false,"videoThumbnail": "","className": "","id": "","attributes": {},"a11y": {}};
frame.set("defaults", t_3, true);
if(frame.topLevel) {
context.setVariable("defaults", t_3);
}
if(frame.topLevel) {
context.addExport("defaults", t_3);
}
t_2 += "\n\n  ";
var t_4;
t_4 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_4, true);
if(frame.topLevel) {
context.setVariable("config", t_4);
}
if(frame.topLevel) {
context.addExport("config", t_4);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_5;
t_5 = "testimonial testimonial-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant");
frame.set("classList", t_5, true);
if(frame.topLevel) {
context.setVariable("classList", t_5);
}
if(frame.topLevel) {
context.addExport("classList", t_5);
}
t_2 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_6;
t_6 = runtime.contextOrFrameLookup(context, frame, "classList") + " " + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className");
frame.set("classList", t_6, true);
if(frame.topLevel) {
context.setVariable("classList", t_6);
}
if(frame.topLevel) {
context.addExport("classList", t_6);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Main container -->\n  <blockquote\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_2 += "role=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy")) {
t_2 += "aria-describedby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaDescribedBy"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
frame = frame.push();
var t_9 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_9) {t_9 = runtime.fromIterator(t_9);
var t_7;
if(runtime.isArray(t_9)) {
var t_8 = t_9.length;
for(t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7][0];
frame.set("[object Object]", t_9[t_7][0]);
var t_11 = t_9[t_7][1];
frame.set("[object Object]", t_9[t_7][1]);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_10, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_11, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_7 = -1;
var t_8 = runtime.keys(t_9).length;
for(var t_12 in t_9) {
t_7++;
var t_13 = t_9[t_12];
frame.set("key", t_12);
frame.set("value", t_13);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_12, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_13, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Video Thumbnail -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"videoThumbnail")) {
t_2 += "\n      <div class=\"testimonial-video\" tabindex=\"0\" role=\"button\" aria-label=\"Play video testimonial\">\n        <img\n          src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"videoThumbnail"), env.opts.autoescape);
t_2 += "\"\n          alt=\"Video testimonial from ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"name"), env.opts.autoescape);
t_2 += "\"\n          class=\"testimonial-video-thumbnail\"\n        >\n        <div class=\"testimonial-video-play\" aria-hidden=\"true\"></div>\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Star Rating -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rating") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rating") > 0) {
t_2 += "\n      <div class=\"testimonial-rating\" role=\"img\" aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rating"), env.opts.autoescape);
t_2 += " out of 5 stars\">\n        <span class=\"testimonial-rating-text\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rating"), env.opts.autoescape);
t_2 += " out of 5 stars</span>\n        ";
frame = frame.push();
var t_16 = (lineno = 64, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [1,6]));
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_15 = t_16.length;
for(var t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14];
frame.set("i", t_17);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
t_2 += "\n          <svg\n            class=\"testimonial-star";
if(t_17 <= runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rating")) {
t_2 += " testimonial-star--filled";
;
}
t_2 += "\"\n            viewBox=\"0 0 24 24\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n            aria-hidden=\"true\"\n          >\n            <path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        ";
;
}
}
frame = frame.pop();
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Quote Text -->\n    <p class=\"testimonial-quote";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"expandable")) {
t_2 += " testimonial-quote--expandable";
;
}
t_2 += "\">\n      ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"quote")), env.opts.autoescape);
t_2 += "\n    </p>\n\n    <!-- Expand button -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"expandable")) {
t_2 += "\n      <button class=\"testimonial-expand-btn\" type=\"button\" aria-expanded=\"false\">\n        Read more\n      </button>\n    ";
;
}
t_2 += "\n\n    <!-- Footer: Avatar, Author, Logo -->\n    <footer class=\"testimonial-footer\">\n      <!-- Avatar Image -->\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"avatar")) {
t_2 += "\n        <img\n          src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"avatar"), env.opts.autoescape);
t_2 += "\"\n          alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"name"), env.opts.autoescape);
t_2 += "\"\n          class=\"testimonial-avatar\"\n        >\n      ";
;
}
t_2 += "\n\n      <!-- Author Information -->\n      <div class=\"testimonial-author\">\n        <cite class=\"testimonial-name\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"name"), env.opts.autoescape);
t_2 += "</cite>\n\n        <!-- Title and Company -->\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"title") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"company")) {
t_2 += "\n          <div class=\"testimonial-title\">\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"title")) {
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"title"), env.opts.autoescape);
;
}
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"title") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"company")) {
t_2 += " at ";
;
}
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"company")) {
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"company"), env.opts.autoescape);
;
}
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n\n        <!-- Verification Badge -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"verified")) {
t_2 += "\n          <div class=\"testimonial-verified\">\n            <svg class=\"testimonial-verified-icon\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            </svg>\n            ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"verifiedText"), env.opts.autoescape);
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n      </div>\n\n      <!-- Company Logo -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"src")) {
t_2 += "\n        <img\n          src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"src"), env.opts.autoescape);
t_2 += "\"\n          alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"alt") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"author")),"company") || "Company logo", env.opts.autoescape);
t_2 += "\"\n          class=\"testimonial-logo\"\n        >\n      ";
;
}
t_2 += "\n    </footer>\n  </blockquote>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("testimonial");
context.setVariable("testimonial", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/accordion/accordion.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/organisms/accordion/accordion.njk -->\n\n";
output += "\n\n";
env.getTemplate("atoms/heading/heading.njk", false, "organisms/accordion/accordion.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "heading")) {
var t_4 = t_1.heading;
} else {
cb(new Error("cannot import 'heading'")); return;
}
context.setVariable("heading", t_4);
output += "\n";
env.getTemplate("atoms/icon/icon.njk", false, "organisms/accordion/accordion.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "icon")) {
var t_8 = t_5.icon;
} else {
cb(new Error("cannot import 'icon'")); return;
}
context.setVariable("icon", t_8);
output += "\n\n";
var macro_t_9 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_10 = "";t_10 += "\n  ";
var t_11;
t_11 = {"title": "","subtitle": "","items": [],"behavior": "single","variant": "default","iconPosition": "right","grouped": false,"categories": [],"id": "","className": "","attributes": {}};
frame.set("defaults", t_11, true);
if(frame.topLevel) {
context.setVariable("defaults", t_11);
}
if(frame.topLevel) {
context.addExport("defaults", t_11);
}
t_10 += "\n\n  ";
var t_12;
t_12 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_12, true);
if(frame.topLevel) {
context.setVariable("config", t_12);
}
if(frame.topLevel) {
context.addExport("config", t_12);
}
t_10 += "\n\n  <!-- Build class list -->\n  ";
var t_13;
t_13 = ["accordion"];
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_10 += "\n\n  <!-- Add variant class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") != "default") {
t_10 += "\n    ";
var t_14;
t_14 = ((lineno = 109, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["accordion-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_14, true);
if(frame.topLevel) {
context.setVariable("classList", t_14);
}
if(frame.topLevel) {
context.addExport("classList", t_14);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Add icon position class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"iconPosition") == "left") {
t_10 += "\n    ";
var t_15;
t_15 = ((lineno = 114, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["accordion-icon-left"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_15, true);
if(frame.topLevel) {
context.setVariable("classList", t_15);
}
if(frame.topLevel) {
context.addExport("classList", t_15);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Add grouped class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"grouped")) {
t_10 += "\n    ";
var t_16;
t_16 = ((lineno = 119, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["accordion-grouped"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_16, true);
if(frame.topLevel) {
context.setVariable("classList", t_16);
}
if(frame.topLevel) {
context.addExport("classList", t_16);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_10 += "\n    ";
var t_17;
t_17 = ((lineno = 124, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_17, true);
if(frame.topLevel) {
context.setVariable("classList", t_17);
}
if(frame.topLevel) {
context.addExport("classList", t_17);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Join classes -->\n  ";
var t_18;
t_18 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_18, true);
if(frame.topLevel) {
context.setVariable("classString", t_18);
}
if(frame.topLevel) {
context.addExport("classString", t_18);
}
t_10 += "\n\n  <!-- Render accordion -->\n  <section\n    class=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_10 += "\"\n    data-component=\"accordion\"\n    data-behavior=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"behavior"), env.opts.autoescape);
t_10 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_10 += "id=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    ";
frame = frame.push();
var t_21 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_21) {t_21 = runtime.fromIterator(t_21);
var t_19;
if(runtime.isArray(t_21)) {
var t_20 = t_21.length;
for(t_19=0; t_19 < t_21.length; t_19++) {
var t_22 = t_21[t_19][0];
frame.set("[object Object]", t_21[t_19][0]);
var t_23 = t_21[t_19][1];
frame.set("[object Object]", t_21[t_19][1]);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_22, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_23, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
} else {
t_19 = -1;
var t_20 = runtime.keys(t_21).length;
for(var t_24 in t_21) {
t_19++;
var t_25 = t_21[t_24];
frame.set("key", t_24);
frame.set("value", t_25);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_24, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_25, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_10 += "\n  >\n    <!-- Optional header -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title")) {
t_10 += "\n    <div class=\"accordion-header\">\n      <h2 class=\"accordion-title\">";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title"), env.opts.autoescape);
t_10 += "</h2>\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subtitle")) {
t_10 += "\n      <p class=\"accordion-subtitle\">";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subtitle"), env.opts.autoescape);
t_10 += "</p>\n      ";
;
}
t_10 += "\n    </div>\n    ";
;
}
t_10 += "\n\n    <!-- Grouped accordion (categories) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"grouped") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"categories")),"length") > 0) {
t_10 += "\n      ";
frame = frame.push();
var t_28 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"categories");
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("category", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
t_10 += "\n      <div class=\"accordion-category\">\n        <h3 class=\"accordion-category-title\">";
t_10 += runtime.suppressValue(runtime.memberLookup((t_29),"title"), env.opts.autoescape);
t_10 += "</h3>\n        <div class=\"accordion-list\">\n          ";
frame = frame.push();
var t_32 = runtime.memberLookup((t_29),"items");
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_31 = t_32.length;
for(var t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30];
frame.set("item", t_33);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
t_10 += "\n            ";
t_10 += runtime.suppressValue((lineno = 157, colno = 28, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "accordionItem"), "accordionItem", context, [t_33,runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"behavior"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0")])), env.opts.autoescape);
t_10 += "\n          ";
;
}
}
frame = frame.pop();
t_10 += "\n        </div>\n      </div>\n      ";
;
}
}
frame = frame.pop();
t_10 += "\n\n    <!-- Standard accordion (flat list) -->\n    ";
;
}
else {
t_10 += "\n      <div class=\"accordion-list\">\n        ";
frame = frame.push();
var t_36 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"items");
if(t_36) {t_36 = runtime.fromIterator(t_36);
var t_35 = t_36.length;
for(var t_34=0; t_34 < t_36.length; t_34++) {
var t_37 = t_36[t_34];
frame.set("item", t_37);
frame.set("loop.index", t_34 + 1);
frame.set("loop.index0", t_34);
frame.set("loop.revindex", t_35 - t_34);
frame.set("loop.revindex0", t_35 - t_34 - 1);
frame.set("loop.first", t_34 === 0);
frame.set("loop.last", t_34 === t_35 - 1);
frame.set("loop.length", t_35);
t_10 += "\n          ";
t_10 += runtime.suppressValue((lineno = 167, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "accordionItem"), "accordionItem", context, [t_37,runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"behavior"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0")])), env.opts.autoescape);
t_10 += "\n        ";
;
}
}
frame = frame.pop();
t_10 += "\n      </div>\n    ";
;
}
t_10 += "\n  </section>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_10);
});
context.addExport("accordion");
context.setVariable("accordion", macro_t_9);
output += "\n\n<!-- Internal macro for rendering individual accordion items -->\n";
var macro_t_38 = runtime.makeMacro(
["item", "behavior", "index"], 
[], 
function (l_item, l_behavior, l_index, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("item", l_item);
frame.set("behavior", l_behavior);
frame.set("index", l_index);
var t_39 = "";t_39 += "\n  <!-- Generate unique IDs for ARIA relationships -->\n  ";
var t_40;
t_40 = "accordion-button-" + runtime.memberLookup((l_item),"id");
frame.set("buttonId", t_40, true);
if(frame.topLevel) {
context.setVariable("buttonId", t_40);
}
if(frame.topLevel) {
context.addExport("buttonId", t_40);
}
t_39 += "\n  ";
var t_41;
t_41 = "accordion-panel-" + runtime.memberLookup((l_item),"id");
frame.set("panelId", t_41, true);
if(frame.topLevel) {
context.setVariable("panelId", t_41);
}
if(frame.topLevel) {
context.addExport("panelId", t_41);
}
t_39 += "\n\n  <!-- Determine initial state -->\n  ";
var t_42;
t_42 = runtime.memberLookup((l_item),"defaultOpen") || false;
frame.set("isOpen", t_42, true);
if(frame.topLevel) {
context.setVariable("isOpen", t_42);
}
if(frame.topLevel) {
context.addExport("isOpen", t_42);
}
t_39 += "\n\n  <!-- Render item -->\n  <div\n    class=\"accordion-item";
if(runtime.contextOrFrameLookup(context, frame, "isOpen")) {
t_39 += " accordion-item-open";
;
}
t_39 += "\"\n    data-accordion-item\n  >\n    <!-- Trigger button -->\n    <button\n      class=\"accordion-trigger\"\n      type=\"button\"\n      aria-expanded=\"";
t_39 += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "isOpen")?"true":"false"), env.opts.autoescape);
t_39 += "\"\n      aria-controls=\"";
t_39 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelId"), env.opts.autoescape);
t_39 += "\"\n      id=\"";
t_39 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "buttonId"), env.opts.autoescape);
t_39 += "\"\n      data-accordion-trigger\n    >\n      <span class=\"accordion-question\">";
t_39 += runtime.suppressValue(runtime.memberLookup((l_item),"question"), env.opts.autoescape);
t_39 += "</span>\n      <span class=\"accordion-icon\" aria-hidden=\"true\">\n        ";
t_39 += runtime.suppressValue((lineno = 199, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "icon"), "icon", context, [{"name": "chevron-down","size": "md","decorative": true}])), env.opts.autoescape);
t_39 += "\n      </span>\n    </button>\n\n    <!-- Content panel -->\n    <div\n      class=\"accordion-panel\"\n      id=\"";
t_39 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelId"), env.opts.autoescape);
t_39 += "\"\n      role=\"region\"\n      aria-labelledby=\"";
t_39 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "buttonId"), env.opts.autoescape);
t_39 += "\"\n      data-accordion-panel\n      ";
if(!runtime.contextOrFrameLookup(context, frame, "isOpen")) {
t_39 += "hidden";
;
}
t_39 += "\n    >\n      <div class=\"accordion-content\">\n        <!-- Render answer as HTML if it contains tags, otherwise as plain text -->\n        ";
if(env.getFilter("safe").call(context, runtime.memberLookup((l_item),"answer"))) {
t_39 += "\n          ";
t_39 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((l_item),"answer")), env.opts.autoescape);
t_39 += "\n        ";
;
}
else {
t_39 += "\n          <p>";
t_39 += runtime.suppressValue(runtime.memberLookup((l_item),"answer"), env.opts.autoescape);
t_39 += "</p>\n        ";
;
}
t_39 += "\n      </div>\n    </div>\n  </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_39);
});
context.addExport("accordionItem");
context.setVariable("accordionItem", macro_t_38);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/comparison-table/comparison-table.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/organisms/comparison-table/comparison-table.njk -->\n\n";
output += "\n\n";
env.getTemplate("atoms/button/button.njk", false, "organisms/comparison-table/comparison-table.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "button")) {
var t_4 = t_1.button;
} else {
cb(new Error("cannot import 'button'")); return;
}
context.setVariable("button", t_4);
output += "\n";
env.getTemplate("atoms/badge/badge.njk", false, "organisms/comparison-table/comparison-table.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "badge")) {
var t_8 = t_5.badge;
} else {
cb(new Error("cannot import 'badge'")); return;
}
context.setVariable("badge", t_8);
output += "\n\n";
var macro_t_9 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_10 = "";t_10 += "\n  ";
var t_11;
t_11 = {"columns": [],"rows": [],"variant": "default","responsive": "scroll","className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_11, true);
if(frame.topLevel) {
context.setVariable("defaults", t_11);
}
if(frame.topLevel) {
context.addExport("defaults", t_11);
}
t_10 += "\n\n  ";
var t_12;
t_12 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_12, true);
if(frame.topLevel) {
context.setVariable("config", t_12);
}
if(frame.topLevel) {
context.addExport("config", t_12);
}
t_10 += "\n\n  <!-- Build class list -->\n  ";
var t_13;
t_13 = ["comparison-table"];
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_10 += "\n\n  <!-- Add variant class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") != "default") {
t_10 += "\n    ";
var t_14;
t_14 = ((lineno = 118, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["comparison-table-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_14, true);
if(frame.topLevel) {
context.setVariable("classList", t_14);
}
if(frame.topLevel) {
context.addExport("classList", t_14);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Add responsive class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"responsive") == "cards") {
t_10 += "\n    ";
var t_15;
t_15 = ((lineno = 123, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["comparison-table-cards"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_15, true);
if(frame.topLevel) {
context.setVariable("classList", t_15);
}
if(frame.topLevel) {
context.addExport("classList", t_15);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_10 += "\n    ";
var t_16;
t_16 = ((lineno = 128, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_16, true);
if(frame.topLevel) {
context.setVariable("classList", t_16);
}
if(frame.topLevel) {
context.addExport("classList", t_16);
}
t_10 += "\n  ";
;
}
t_10 += "\n\n  <!-- Main container with horizontal scroll -->\n  <div\n    class=\"";
t_10 += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "), env.opts.autoescape);
t_10 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_10 += "id=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_10 += "aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    role=\"region\"\n    aria-describedby=\"table-caption-";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id") || "default", env.opts.autoescape);
t_10 += "\"\n    tabindex=\"0\"\n    ";
frame = frame.push();
var t_19 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_17;
if(runtime.isArray(t_19)) {
var t_18 = t_19.length;
for(t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17][0];
frame.set("[object Object]", t_19[t_17][0]);
var t_21 = t_19[t_17][1];
frame.set("[object Object]", t_19[t_17][1]);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_20, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_21, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
} else {
t_17 = -1;
var t_18 = runtime.keys(t_19).length;
for(var t_22 in t_19) {
t_17++;
var t_23 = t_19[t_22];
frame.set("key", t_22);
frame.set("value", t_23);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_22, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_23, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_10 += "\n  >\n    <div class=\"comparison-table-wrapper\">\n      <table class=\"comparison-table-table\" role=\"table\">\n        <!-- Table caption for accessibility -->\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"caption")) {
t_10 += "\n        <caption id=\"table-caption-";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id") || "default", env.opts.autoescape);
t_10 += "\" class=\"comparison-table-sr-only\">\n          ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"caption"), env.opts.autoescape);
t_10 += "\n        </caption>\n        ";
;
}
t_10 += "\n\n        <!-- Table Header: Plan columns -->\n        <thead class=\"comparison-table-header\">\n          <tr>\n            <!-- First column: \"Features\" header -->\n            <th scope=\"col\" class=\"comparison-table-feature-header\">\n              Features\n            </th>\n\n            <!-- Plan columns -->\n            ";
frame = frame.push();
var t_26 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"columns");
if(t_26) {t_26 = runtime.fromIterator(t_26);
var t_25 = t_26.length;
for(var t_24=0; t_24 < t_26.length; t_24++) {
var t_27 = t_26[t_24];
frame.set("column", t_27);
frame.set("loop.index", t_24 + 1);
frame.set("loop.index0", t_24);
frame.set("loop.revindex", t_25 - t_24);
frame.set("loop.revindex0", t_25 - t_24 - 1);
frame.set("loop.first", t_24 === 0);
frame.set("loop.last", t_24 === t_25 - 1);
frame.set("loop.length", t_25);
t_10 += "\n              ";
var t_28;
t_28 = {"title": "","subtitle": "","price": "","priceAmount": "","pricePeriod": "","description": "","highlighted": false,"badge": "","cta": {}};
frame.set("columnDefaults", t_28, true);
if(frame.topLevel) {
context.setVariable("columnDefaults", t_28);
}
if(frame.topLevel) {
context.addExport("columnDefaults", t_28);
}
t_10 += "\n              ";
var t_29;
t_29 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "columnDefaults"),t_27);
frame.set("col", t_29, true);
if(frame.topLevel) {
context.setVariable("col", t_29);
}
if(frame.topLevel) {
context.addExport("col", t_29);
}
t_10 += "\n\n              ";
var t_30;
t_30 = "comparison-table-plan";
frame.set("columnClass", t_30, true);
if(frame.topLevel) {
context.setVariable("columnClass", t_30);
}
if(frame.topLevel) {
context.addExport("columnClass", t_30);
}
t_10 += "\n              ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"highlighted")) {
t_10 += "\n                ";
var t_31;
t_31 = runtime.contextOrFrameLookup(context, frame, "columnClass") + " comparison-table-plan-highlighted";
frame.set("columnClass", t_31, true);
if(frame.topLevel) {
context.setVariable("columnClass", t_31);
}
if(frame.topLevel) {
context.addExport("columnClass", t_31);
}
t_10 += "\n              ";
;
}
t_10 += "\n\n              <th scope=\"col\" class=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "columnClass"), env.opts.autoescape);
t_10 += "\">\n                <!-- Badge for highlighted plans -->\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"badge")) {
t_10 += "\n                <div class=\"comparison-table-badge\">\n                  ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"badge"), env.opts.autoescape);
t_10 += "\n                </div>\n                ";
;
}
t_10 += "\n\n                <div class=\"comparison-table-plan-content\">\n                  <!-- Plan title -->\n                  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"title")) {
t_10 += "\n                  <h3 class=\"comparison-table-plan-title\">\n                    ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"title"), env.opts.autoescape);
t_10 += "\n                  </h3>\n                  ";
;
}
t_10 += "\n\n                  <!-- Plan subtitle -->\n                  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"subtitle")) {
t_10 += "\n                  <p class=\"comparison-table-plan-subtitle\">\n                    ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"subtitle"), env.opts.autoescape);
t_10 += "\n                  </p>\n                  ";
;
}
t_10 += "\n\n                  <!-- Price display (simple or complex) -->\n                  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"priceAmount") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"pricePeriod")) {
t_10 += "\n                  <div class=\"comparison-table-plan-price\">\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"priceAmount")) {
t_10 += "\n                    <span class=\"comparison-table-plan-price-amount\">";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"priceAmount"), env.opts.autoescape);
t_10 += "</span>\n                    ";
;
}
t_10 += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"pricePeriod")) {
t_10 += "\n                    <span class=\"comparison-table-plan-price-period\">";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"pricePeriod"), env.opts.autoescape);
t_10 += "</span>\n                    ";
;
}
t_10 += "\n                  </div>\n                  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"price")) {
t_10 += "\n                  <div class=\"comparison-table-plan-price\">\n                    ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"price"), env.opts.autoescape);
t_10 += "\n                  </div>\n                  ";
;
}
;
}
t_10 += "\n\n                  <!-- Description -->\n                  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"description")) {
t_10 += "\n                  <p class=\"comparison-table-plan-description\">\n                    ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"description"), env.opts.autoescape);
t_10 += "\n                  </p>\n                  ";
;
}
t_10 += "\n\n                  <!-- CTA button -->\n                  ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"cta")),"text")) {
t_10 += "\n                    ";
var t_32;
t_32 = "secondary";
frame.set("buttonVariant", t_32, true);
if(frame.topLevel) {
context.setVariable("buttonVariant", t_32);
}
if(frame.topLevel) {
context.addExport("buttonVariant", t_32);
}
t_10 += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"highlighted")) {
t_10 += "\n                      ";
var t_33;
t_33 = "primary";
frame.set("buttonVariant", t_33, true);
if(frame.topLevel) {
context.setVariable("buttonVariant", t_33);
}
if(frame.topLevel) {
context.addExport("buttonVariant", t_33);
}
t_10 += "\n                    ";
;
}
t_10 += "\n                    ";
var t_34;
t_34 = {"variant": runtime.contextOrFrameLookup(context, frame, "buttonVariant"),"size": "md"};
frame.set("ctaDefaults", t_34, true);
if(frame.topLevel) {
context.setVariable("ctaDefaults", t_34);
}
if(frame.topLevel) {
context.addExport("ctaDefaults", t_34);
}
t_10 += "\n                    ";
var t_35;
t_35 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "ctaDefaults"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "col")),"cta"));
frame.set("ctaConfig", t_35, true);
if(frame.topLevel) {
context.setVariable("ctaConfig", t_35);
}
if(frame.topLevel) {
context.addExport("ctaConfig", t_35);
}
t_10 += "\n                    ";
t_10 += runtime.suppressValue((lineno = 237, colno = 29, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "button"), "button", context, [runtime.contextOrFrameLookup(context, frame, "ctaConfig")])), env.opts.autoescape);
t_10 += "\n                  ";
;
}
t_10 += "\n                </div>\n              </th>\n            ";
;
}
}
frame = frame.pop();
t_10 += "\n          </tr>\n        </thead>\n\n        <!-- Table Body: Feature rows -->\n        <tbody>\n          ";
frame = frame.push();
var t_38 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"rows");
if(t_38) {t_38 = runtime.fromIterator(t_38);
var t_37 = t_38.length;
for(var t_36=0; t_36 < t_38.length; t_36++) {
var t_39 = t_38[t_36];
frame.set("row", t_39);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
t_10 += "\n            ";
var t_40;
t_40 = {"feature": "","category": "","values": [],"tooltip": ""};
frame.set("rowDefaults", t_40, true);
if(frame.topLevel) {
context.setVariable("rowDefaults", t_40);
}
if(frame.topLevel) {
context.addExport("rowDefaults", t_40);
}
t_10 += "\n            ";
var t_41;
t_41 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "rowDefaults"),t_39);
frame.set("rowConfig", t_41, true);
if(frame.topLevel) {
context.setVariable("rowConfig", t_41);
}
if(frame.topLevel) {
context.addExport("rowConfig", t_41);
}
t_10 += "\n\n            <!-- Category row (spans all columns) -->\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rowConfig")),"category")) {
t_10 += "\n            <tr class=\"comparison-table-category-row\">\n              <td colspan=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"columns")),"length") + 1, env.opts.autoescape);
t_10 += "\" class=\"comparison-table-category\">\n                ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rowConfig")),"category"), env.opts.autoescape);
t_10 += "\n              </td>\n            </tr>\n\n            <!-- Feature row -->\n            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rowConfig")),"feature")) {
t_10 += "\n            <tr>\n              <!-- Feature name (first column) -->\n              <th scope=\"row\" class=\"comparison-table-feature\">\n                ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rowConfig")),"feature"), env.opts.autoescape);
t_10 += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rowConfig")),"tooltip")) {
t_10 += "\n                <span class=\"comparison-table-feature-tooltip\" title=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rowConfig")),"tooltip"), env.opts.autoescape);
t_10 += "\">\n                  <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n                    <circle cx=\"8\" cy=\"8\" r=\"7\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n                    <path d=\"M8 7V11M8 5V5.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n                  </svg>\n                </span>\n                ";
;
}
t_10 += "\n              </th>\n\n              <!-- Feature values for each column -->\n              ";
frame = frame.push();
var t_44 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rowConfig")),"values");
if(t_44) {t_44 = runtime.fromIterator(t_44);
var t_43 = t_44.length;
for(var t_42=0; t_42 < t_44.length; t_42++) {
var t_45 = t_44[t_42];
frame.set("value", t_45);
frame.set("loop.index", t_42 + 1);
frame.set("loop.index0", t_42);
frame.set("loop.revindex", t_43 - t_42);
frame.set("loop.revindex0", t_43 - t_42 - 1);
frame.set("loop.first", t_42 === 0);
frame.set("loop.last", t_42 === t_43 - 1);
frame.set("loop.length", t_43);
t_10 += "\n                ";
var t_46;
t_46 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") - 1;
frame.set("valueIndex", t_46, true);
if(frame.topLevel) {
context.setVariable("valueIndex", t_46);
}
if(frame.topLevel) {
context.addExport("valueIndex", t_46);
}
t_10 += "\n                ";
var t_47;
t_47 = runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"columns")),runtime.contextOrFrameLookup(context, frame, "valueIndex"))),"highlighted");
frame.set("isHighlighted", t_47, true);
if(frame.topLevel) {
context.setVariable("isHighlighted", t_47);
}
if(frame.topLevel) {
context.addExport("isHighlighted", t_47);
}
t_10 += "\n                ";
var t_48;
t_48 = "comparison-table-value";
frame.set("valueClass", t_48, true);
if(frame.topLevel) {
context.setVariable("valueClass", t_48);
}
if(frame.topLevel) {
context.addExport("valueClass", t_48);
}
t_10 += "\n                ";
if(runtime.contextOrFrameLookup(context, frame, "isHighlighted")) {
t_10 += "\n                  ";
var t_49;
t_49 = runtime.contextOrFrameLookup(context, frame, "valueClass") + " comparison-table-value-highlighted";
frame.set("valueClass", t_49, true);
if(frame.topLevel) {
context.setVariable("valueClass", t_49);
}
if(frame.topLevel) {
context.addExport("valueClass", t_49);
}
t_10 += "\n                ";
;
}
t_10 += "\n\n                <td class=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "valueClass"), env.opts.autoescape);
t_10 += "\">\n                  <!-- Boolean value: render as check/cross icon -->\n                  ";
if(t_45 === true) {
t_10 += "\n                    <span class=\"comparison-table-icon comparison-table-icon-yes\" aria-hidden=\"true\">\n                      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M20 6L9 17L4 12\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                      </svg>\n                    </span>\n                    <span class=\"comparison-table-sr-only\">Included</span>\n                  ";
;
}
else {
if(t_45 === false) {
t_10 += "\n                    <span class=\"comparison-table-icon comparison-table-icon-no\" aria-hidden=\"true\">\n                      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M18 6L6 18M6 6L18 18\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                      </svg>\n                    </span>\n                    <span class=\"comparison-table-sr-only\">Not included</span>\n                  ";
;
}
else {
t_10 += "\n                    <!-- String or number value -->\n                    ";
t_10 += runtime.suppressValue(t_45, env.opts.autoescape);
t_10 += "\n                  ";
;
}
;
}
t_10 += "\n                </td>\n              ";
;
}
}
frame = frame.pop();
t_10 += "\n            </tr>\n            ";
;
}
;
}
t_10 += "\n          ";
;
}
}
frame = frame.pop();
t_10 += "\n        </tbody>\n      </table>\n    </div>\n  </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_10);
});
context.addExport("comparisonTable");
context.setVariable("comparisonTable", macro_t_9);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/feature-grid/feature-grid.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/organisms/feature-grid/feature-grid.njk -->\n\n";
output += "\n\n";
env.getTemplate("atoms/heading/heading.njk", false, "organisms/feature-grid/feature-grid.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "heading")) {
var t_4 = t_1.heading;
} else {
cb(new Error("cannot import 'heading'")); return;
}
context.setVariable("heading", t_4);
output += "\n";
env.getTemplate("atoms/text/text.njk", false, "organisms/feature-grid/feature-grid.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "text")) {
var t_8 = t_5.text;
} else {
cb(new Error("cannot import 'text'")); return;
}
context.setVariable("text", t_8);
output += "\n";
env.getTemplate("atoms/icon/icon.njk", false, "organisms/feature-grid/feature-grid.njk", false, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
t_9.getExported(function(t_11,t_9) {
if(t_11) { cb(t_11); return; }
if(Object.prototype.hasOwnProperty.call(t_9, "icon")) {
var t_12 = t_9.icon;
} else {
cb(new Error("cannot import 'icon'")); return;
}
context.setVariable("icon", t_12);
output += "\n";
env.getTemplate("molecules/image-text/image-text.njk", false, "organisms/feature-grid/feature-grid.njk", false, function(t_14,t_13) {
if(t_14) { cb(t_14); return; }
t_13.getExported(function(t_15,t_13) {
if(t_15) { cb(t_15); return; }
if(Object.prototype.hasOwnProperty.call(t_13, "imageText")) {
var t_16 = t_13.imageText;
} else {
cb(new Error("cannot import 'imageText'")); return;
}
context.setVariable("imageText", t_16);
output += "\n";
env.getTemplate("molecules/feature-list/feature-list.njk", false, "organisms/feature-grid/feature-grid.njk", false, function(t_18,t_17) {
if(t_18) { cb(t_18); return; }
t_17.getExported(function(t_19,t_17) {
if(t_19) { cb(t_19); return; }
if(Object.prototype.hasOwnProperty.call(t_17, "featureList")) {
var t_20 = t_17.featureList;
} else {
cb(new Error("cannot import 'featureList'")); return;
}
context.setVariable("featureList", t_20);
output += "\n\n";
var macro_t_21 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_22 = "";t_22 += "\n  ";
var t_23;
t_23 = {"heading": "","description": "","headerAlign": "center","features": [],"layout": "grid","columns": 3,"variant": "default","contentAlign": "center","backgroundColor": "","className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_23, true);
if(frame.topLevel) {
context.setVariable("defaults", t_23);
}
if(frame.topLevel) {
context.addExport("defaults", t_23);
}
t_22 += "\n\n  ";
var t_24;
t_24 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_24, true);
if(frame.topLevel) {
context.setVariable("config", t_24);
}
if(frame.topLevel) {
context.addExport("config", t_24);
}
t_22 += "\n\n  <!-- Validate required features array -->\n  ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"features")),"length") == 0) {
t_22 += "\n    <!-- Error: feature-grid requires at least one feature -->\n  ";
;
}
t_22 += "\n\n  <!-- Build class list for main container -->\n  ";
var t_25;
t_25 = env.getFilter("trim").call(context, env.getFilter("join").call(context, env.getFilter("reject").call(context, ["feature-grid",(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"backgroundColor")?"feature-grid-bg-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"backgroundColor"):""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")],"equalto",false)," "));
frame.set("classList", t_25, true);
if(frame.topLevel) {
context.setVariable("classList", t_25);
}
if(frame.topLevel) {
context.addExport("classList", t_25);
}
t_22 += "\n\n  <!-- Build class list for items container -->\n  ";
var t_26;
t_26 = env.getFilter("trim").call(context, env.getFilter("join").call(context, env.getFilter("reject").call(context, ["feature-grid-items","feature-grid-items-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout"),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "grid"?"feature-grid-items-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"columns") + "col":""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") != "default"?"feature-grid-items-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "grid" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"contentAlign") != "center"?"feature-grid-items-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"contentAlign"):"")],"equalto",false)," "));
frame.set("itemsClassList", t_26, true);
if(frame.topLevel) {
context.setVariable("itemsClassList", t_26);
}
if(frame.topLevel) {
context.addExport("itemsClassList", t_26);
}
t_22 += "\n\n  <!-- Build class list for header -->\n  ";
var t_27;
t_27 = env.getFilter("trim").call(context, env.getFilter("join").call(context, env.getFilter("reject").call(context, ["feature-grid-header",(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headerAlign") != "center"?"feature-grid-header-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headerAlign"):"")],"equalto",false)," "));
frame.set("headerClassList", t_27, true);
if(frame.topLevel) {
context.setVariable("headerClassList", t_27);
}
if(frame.topLevel) {
context.addExport("headerClassList", t_27);
}
t_22 += "\n\n  <!-- Main container -->\n  <section\n    class=\"";
t_22 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_22 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_22 += "id=\"";
t_22 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_22 += "\"";
;
}
t_22 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_22 += "aria-label=\"";
t_22 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_22 += "\"";
;
}
t_22 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabelledBy")) {
t_22 += "aria-labelledby=\"";
t_22 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabelledBy"), env.opts.autoescape);
t_22 += "\"";
;
}
t_22 += "\n    ";
frame = frame.push();
var t_30 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_30) {t_30 = runtime.fromIterator(t_30);
var t_28;
if(runtime.isArray(t_30)) {
var t_29 = t_30.length;
for(t_28=0; t_28 < t_30.length; t_28++) {
var t_31 = t_30[t_28][0];
frame.set("[object Object]", t_30[t_28][0]);
var t_32 = t_30[t_28][1];
frame.set("[object Object]", t_30[t_28][1]);
frame.set("loop.index", t_28 + 1);
frame.set("loop.index0", t_28);
frame.set("loop.revindex", t_29 - t_28);
frame.set("loop.revindex0", t_29 - t_28 - 1);
frame.set("loop.first", t_28 === 0);
frame.set("loop.last", t_28 === t_29 - 1);
frame.set("loop.length", t_29);
t_22 += "\n      ";
t_22 += runtime.suppressValue(t_31, env.opts.autoescape);
t_22 += "=\"";
t_22 += runtime.suppressValue(t_32, env.opts.autoescape);
t_22 += "\"\n    ";
;
}
} else {
t_28 = -1;
var t_29 = runtime.keys(t_30).length;
for(var t_33 in t_30) {
t_28++;
var t_34 = t_30[t_33];
frame.set("key", t_33);
frame.set("value", t_34);
frame.set("loop.index", t_28 + 1);
frame.set("loop.index0", t_28);
frame.set("loop.revindex", t_29 - t_28);
frame.set("loop.revindex0", t_29 - t_28 - 1);
frame.set("loop.first", t_28 === 0);
frame.set("loop.last", t_28 === t_29 - 1);
frame.set("loop.length", t_29);
t_22 += "\n      ";
t_22 += runtime.suppressValue(t_33, env.opts.autoescape);
t_22 += "=\"";
t_22 += runtime.suppressValue(t_34, env.opts.autoescape);
t_22 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_22 += "\n  >\n    <div class=\"feature-grid-container\">\n      <!-- Section header (optional) -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"heading") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_22 += "\n        <header class=\"";
t_22 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "headerClassList"), env.opts.autoescape);
t_22 += "\">\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"heading")) {
t_22 += "\n            ";
t_22 += runtime.suppressValue((lineno = 179, colno = 22, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "heading"), "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"heading"),"level": 2,"size": "2xl","className": "feature-grid-heading"}])), env.opts.autoescape);
t_22 += "\n          ";
;
}
t_22 += "\n\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_22 += "\n            ";
t_22 += runtime.suppressValue((lineno = 188, colno = 19, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "text"), "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"),"size": "lg","lineHeight": "relaxed","color": "muted","className": "feature-grid-description"}])), env.opts.autoescape);
t_22 += "\n          ";
;
}
t_22 += "\n        </header>\n      ";
;
}
t_22 += "\n\n      <!-- Features container -->\n      <div class=\"";
t_22 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "itemsClassList"), env.opts.autoescape);
t_22 += "\">\n        ";
frame = frame.push();
var t_37 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"features");
if(t_37) {t_37 = runtime.fromIterator(t_37);
var t_36 = t_37.length;
for(var t_35=0; t_35 < t_37.length; t_35++) {
var t_38 = t_37[t_35];
frame.set("feature", t_38);
frame.set("loop.index", t_35 + 1);
frame.set("loop.index0", t_35);
frame.set("loop.revindex", t_36 - t_35);
frame.set("loop.revindex0", t_36 - t_35 - 1);
frame.set("loop.first", t_35 === 0);
frame.set("loop.last", t_35 === t_36 - 1);
frame.set("loop.length", t_36);
t_22 += "\n          ";
var t_39;
t_39 = {"title": "","description": "","icon": "","image": null,"featureList": null,"imagePosition": "left"};
frame.set("featureDefaults", t_39, true);
if(frame.topLevel) {
context.setVariable("featureDefaults", t_39);
}
if(frame.topLevel) {
context.addExport("featureDefaults", t_39);
}
t_22 += "\n          ";
var t_40;
t_40 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "featureDefaults"),t_38);
frame.set("featureConfig", t_40, true);
if(frame.topLevel) {
context.setVariable("featureConfig", t_40);
}
if(frame.topLevel) {
context.addExport("featureConfig", t_40);
}
t_22 += "\n\n          <!-- Determine feature type and render accordingly -->\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "alternating" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"image")) {
t_22 += "\n            <!-- Alternating layout: Use image-text molecule -->\n            <div class=\"feature-grid-item feature-grid-item-with-image\">\n              ";
t_22 += runtime.suppressValue((lineno = 216, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "imageText"), "imageText", context, [{"imagePosition": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"imagePosition"),"image": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"image"),"headline": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"title"),"description": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"description"),"headingLevel": 3,"ratio": "50-50","gap": "xl","verticalAlign": "center"}])), env.opts.autoescape);
t_22 += "\n            </div>\n\n          ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"image")) {
t_22 += "\n            <!-- Grid layout with image -->\n            <div class=\"feature-grid-item feature-grid-item-with-image\">\n              <div class=\"feature-grid-media\">\n                <img\n                  src=\"";
t_22 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"image")),"src"), env.opts.autoescape);
t_22 += "\"\n                  alt=\"";
t_22 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"image")),"alt"), env.opts.autoescape);
t_22 += "\"\n                  class=\"feature-grid-image\"\n                  loading=\"lazy\"\n                >\n              </div>\n              <div class=\"feature-grid-content\">\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"title")) {
t_22 += "\n                  ";
t_22 += runtime.suppressValue((lineno = 241, colno = 28, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "heading"), "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"title"),"level": 3,"size": "lg","className": "feature-grid-title"}])), env.opts.autoescape);
t_22 += "\n                ";
;
}
t_22 += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"description")) {
t_22 += "\n                  ";
t_22 += runtime.suppressValue((lineno = 249, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "text"), "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"description"),"size": "base","lineHeight": "relaxed","color": "muted","className": "feature-grid-description"}])), env.opts.autoescape);
t_22 += "\n                ";
;
}
t_22 += "\n              </div>\n            </div>\n\n          ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"featureList")) {
t_22 += "\n            <!-- Detailed feature with feature list -->\n            <div class=\"feature-grid-item feature-grid-item-detailed\">\n              ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"icon")) {
t_22 += "\n                <div class=\"feature-grid-icon-wrapper\">\n                  ";
t_22 += runtime.suppressValue((lineno = 265, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "icon"), "icon", context, [{"name": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"icon"),"size": "lg","decorative": true}])), env.opts.autoescape);
t_22 += "\n                </div>\n              ";
;
}
t_22 += "\n              <div class=\"feature-grid-content\">\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"title")) {
t_22 += "\n                  ";
t_22 += runtime.suppressValue((lineno = 274, colno = 28, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "heading"), "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"title"),"level": 3,"size": "lg","className": "feature-grid-title"}])), env.opts.autoescape);
t_22 += "\n                ";
;
}
t_22 += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"description")) {
t_22 += "\n                  ";
t_22 += runtime.suppressValue((lineno = 282, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "text"), "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"description"),"size": "base","lineHeight": "relaxed","color": "muted","className": "feature-grid-description"}])), env.opts.autoescape);
t_22 += "\n                ";
;
}
t_22 += "\n                <!-- Feature list integration -->\n                ";
t_22 += runtime.suppressValue((lineno = 291, colno = 30, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "featureList"), "featureList", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"featureList")])), env.opts.autoescape);
t_22 += "\n              </div>\n            </div>\n\n          ";
;
}
else {
t_22 += "\n            <!-- Icon-based feature (default) -->\n            <div class=\"feature-grid-item\">\n              ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"icon")) {
t_22 += "\n                <div class=\"feature-grid-icon-wrapper\">\n                  ";
t_22 += runtime.suppressValue((lineno = 300, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "icon"), "icon", context, [{"name": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"icon"),"size": "lg","decorative": true}])), env.opts.autoescape);
t_22 += "\n                </div>\n              ";
;
}
t_22 += "\n              <div class=\"feature-grid-content\">\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"title")) {
t_22 += "\n                  ";
t_22 += runtime.suppressValue((lineno = 309, colno = 28, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "heading"), "heading", context, [{"text": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"title"),"level": 3,"size": "lg","className": "feature-grid-title"}])), env.opts.autoescape);
t_22 += "\n                ";
;
}
t_22 += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"description")) {
t_22 += "\n                  ";
t_22 += runtime.suppressValue((lineno = 317, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "text"), "text", context, [{"content": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "featureConfig")),"description"),"size": "base","lineHeight": "relaxed","color": "muted","className": "feature-grid-description"}])), env.opts.autoescape);
t_22 += "\n                ";
;
}
t_22 += "\n              </div>\n            </div>\n          ";
;
}
;
}
;
}
t_22 += "\n        ";
;
}
}
frame = frame.pop();
t_22 += "\n      </div>\n    </div>\n  </section>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_22);
});
context.addExport("featureGrid");
context.setVariable("featureGrid", macro_t_21);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/footer/footer.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n\n";
output += "\n\n";
env.getTemplate("atoms/link/link.njk", false, "organisms/footer/footer.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "link")) {
var t_4 = t_1.link;
} else {
cb(new Error("cannot import 'link'")); return;
}
context.setVariable("link", t_4);
output += "\n";
env.getTemplate("molecules/form-group/form-group.njk", false, "organisms/footer/footer.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "formGroup")) {
var t_8 = t_5.formGroup;
} else {
cb(new Error("cannot import 'formGroup'")); return;
}
context.setVariable("formGroup", t_8);
output += "\n\n";
var macro_t_9 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_10 = "";t_10 += "\n  ";
var t_11;
t_11 = {"variant": "default","layout": "default","withDivider": false,"brand": {},"columns": [],"social": [],"newsletter": {"enabled": false,"title": "Stay Updated","description": "","buttonText": "Subscribe","trustText": ""},"legal": [],"copyright": "","badges": [],"className": "","attributes": {},"a11y": {"ariaLabel": "Site footer"}};
frame.set("defaults", t_11, true);
if(frame.topLevel) {
context.setVariable("defaults", t_11);
}
if(frame.topLevel) {
context.addExport("defaults", t_11);
}
t_10 += "\n\n  ";
var t_12;
t_12 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_12, true);
if(frame.topLevel) {
context.setVariable("config", t_12);
}
if(frame.topLevel) {
context.addExport("config", t_12);
}
t_10 += "\n\n  ";
t_10 += "\n  ";
var t_13;
t_13 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["footer",(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") != "default"?"footer-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") != "default"?"footer-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout"):""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"withDivider")?"footer-divider":""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_10 += "\n\n  ";
t_10 += "\n  <footer\n    class=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_10 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_10 += "id=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_10 += "aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    role=\"contentinfo\"\n    ";
frame = frame.push();
var t_16 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_14;
if(runtime.isArray(t_16)) {
var t_15 = t_16.length;
for(t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14][0];
frame.set("[object Object]", t_16[t_14][0]);
var t_18 = t_16[t_14][1];
frame.set("[object Object]", t_16[t_14][1]);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_17, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_18, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
} else {
t_14 = -1;
var t_15 = runtime.keys(t_16).length;
for(var t_19 in t_16) {
t_14++;
var t_20 = t_16[t_19];
frame.set("key", t_19);
frame.set("value", t_20);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_19, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_20, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_10 += "\n  >\n    ";
t_10 += "\n    <div class=\"footer-main\">\n      <div class=\"footer-grid\">\n        ";
t_10 += "\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"logo") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"tagline") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"social")) {
t_10 += "\n          <div class=\"footer-brand\">\n            ";
t_10 += "\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"logo")) {
t_10 += "\n              <a href=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"logo")),"href") || "/", env.opts.autoescape);
t_10 += "\" class=\"footer-logo\">\n                <img\n                  src=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"logo")),"src"), env.opts.autoescape);
t_10 += "\"\n                  alt=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"logo")),"alt"), env.opts.autoescape);
t_10 += "\"\n                  loading=\"lazy\"\n                >\n              </a>\n            ";
;
}
t_10 += "\n\n            ";
t_10 += "\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"tagline")) {
t_10 += "\n              <p class=\"footer-tagline\">";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"brand")),"tagline"), env.opts.autoescape);
t_10 += "</p>\n            ";
;
}
t_10 += "\n\n            ";
t_10 += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"social")) {
t_10 += "\n              <div class=\"footer-social\">\n                ";
frame = frame.push();
var t_23 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"social");
if(t_23) {t_23 = runtime.fromIterator(t_23);
var t_22 = t_23.length;
for(var t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21];
frame.set("social", t_24);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
t_10 += "\n                  <a\n                    href=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((t_24),"href"), env.opts.autoescape);
t_10 += "\"\n                    class=\"footer-social-link\"\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                    aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((t_24),"platform"), env.opts.autoescape);
t_10 += "\"\n                  >\n                    ";
t_10 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((t_24),"icon")), env.opts.autoescape);
t_10 += "\n                  </a>\n                ";
;
}
}
frame = frame.pop();
t_10 += "\n              </div>\n            ";
;
}
t_10 += "\n          </div>\n        ";
;
}
t_10 += "\n\n        ";
t_10 += "\n        ";
frame = frame.push();
var t_27 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"columns");
if(t_27) {t_27 = runtime.fromIterator(t_27);
var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("column", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
t_10 += "\n          <nav class=\"footer-column\" aria-labelledby=\"footer-";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
t_10 += "\">\n            <h3 id=\"footer-";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
t_10 += "\" class=\"footer-column-title\">\n              ";
t_10 += runtime.suppressValue(runtime.memberLookup((t_28),"title"), env.opts.autoescape);
t_10 += "\n            </h3>\n            ";
if(runtime.memberLookup((t_28),"links")) {
t_10 += "\n              <ul class=\"footer-links\">\n                ";
frame = frame.push();
var t_31 = runtime.memberLookup((t_28),"links");
if(t_31) {t_31 = runtime.fromIterator(t_31);
var t_30 = t_31.length;
for(var t_29=0; t_29 < t_31.length; t_29++) {
var t_32 = t_31[t_29];
frame.set("linkItem", t_32);
frame.set("loop.index", t_29 + 1);
frame.set("loop.index0", t_29);
frame.set("loop.revindex", t_30 - t_29);
frame.set("loop.revindex0", t_30 - t_29 - 1);
frame.set("loop.first", t_29 === 0);
frame.set("loop.last", t_29 === t_30 - 1);
frame.set("loop.length", t_30);
t_10 += "\n                  <li>\n                    ";
t_10 += runtime.suppressValue((lineno = 193, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "link"), "link", context, [{"text": runtime.memberLookup((t_32),"text"),"href": runtime.memberLookup((t_32),"href"),"external": runtime.memberLookup((t_32),"external") || false,"variant": "inherit","className": "footer-link"}])), env.opts.autoescape);
t_10 += "\n                  </li>\n                ";
;
}
}
frame = frame.pop();
t_10 += "\n              </ul>\n            ";
;
}
t_10 += "\n          </nav>\n        ";
;
}
}
frame = frame.pop();
t_10 += "\n\n        ";
t_10 += "\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"newsletter")),"enabled")) {
t_10 += "\n          <div class=\"footer-newsletter\">\n            <h3 class=\"footer-newsletter-title\">\n              ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"newsletter")),"title"), env.opts.autoescape);
t_10 += "\n            </h3>\n\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"newsletter")),"description")) {
t_10 += "\n              <p class=\"footer-newsletter-text\">\n                ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"newsletter")),"description"), env.opts.autoescape);
t_10 += "\n              </p>\n            ";
;
}
t_10 += "\n\n            <div class=\"footer-newsletter-form\">\n              ";
t_10 += runtime.suppressValue((lineno = 221, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "formGroup"), "formGroup", context, [{"label": "Email address","inputId": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"newsletter")),"inputId") || "footer-newsletter-email","input": {"type": "email","placeholder": "your@email.com","required": true,"autocomplete": "email"},"required": true}])), env.opts.autoescape);
t_10 += "\n\n              ";
t_10 += "\n              ";
t_10 += "\n            </div>\n\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"newsletter")),"trustText")) {
t_10 += "\n              <p class=\"footer-trust\">\n                ";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"newsletter")),"trustText"), env.opts.autoescape);
t_10 += "\n              </p>\n            ";
;
}
t_10 += "\n          </div>\n        ";
;
}
t_10 += "\n      </div>\n\n      ";
t_10 += "\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"badges")) {
t_10 += "\n        <div class=\"footer-badges\">\n          ";
frame = frame.push();
var t_35 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"badges");
if(t_35) {t_35 = runtime.fromIterator(t_35);
var t_34 = t_35.length;
for(var t_33=0; t_33 < t_35.length; t_33++) {
var t_36 = t_35[t_33];
frame.set("badge", t_36);
frame.set("loop.index", t_33 + 1);
frame.set("loop.index0", t_33);
frame.set("loop.revindex", t_34 - t_33);
frame.set("loop.revindex0", t_34 - t_33 - 1);
frame.set("loop.first", t_33 === 0);
frame.set("loop.last", t_33 === t_34 - 1);
frame.set("loop.length", t_34);
t_10 += "\n            <div class=\"footer-badge\">\n              ";
if(runtime.memberLookup((t_36),"icon")) {
t_10 += "\n                ";
t_10 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((t_36),"icon")), env.opts.autoescape);
t_10 += "\n              ";
;
}
t_10 += "\n              ";
if(runtime.memberLookup((t_36),"text")) {
t_10 += "\n                <span>";
t_10 += runtime.suppressValue(runtime.memberLookup((t_36),"text"), env.opts.autoescape);
t_10 += "</span>\n              ";
;
}
t_10 += "\n            </div>\n          ";
;
}
}
frame = frame.pop();
t_10 += "\n        </div>\n      ";
;
}
t_10 += "\n    </div>\n\n    ";
t_10 += "\n    <div class=\"footer-bottom\">\n      <div class=\"footer-bottom-container\">\n        <div class=\"footer-bottom-content\">\n          ";
t_10 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"copyright")) {
t_10 += "\n            <p class=\"footer-copyright\">\n              ";
t_10 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"copyright")), env.opts.autoescape);
t_10 += "\n            </p>\n          ";
;
}
t_10 += "\n\n          ";
t_10 += "\n          ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"legal")) {
t_10 += "\n            <nav class=\"footer-legal\" aria-label=\"Legal\">\n              <ul class=\"footer-legal\">\n                ";
frame = frame.push();
var t_39 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"legal");
if(t_39) {t_39 = runtime.fromIterator(t_39);
var t_38 = t_39.length;
for(var t_37=0; t_37 < t_39.length; t_37++) {
var t_40 = t_39[t_37];
frame.set("legalLink", t_40);
frame.set("loop.index", t_37 + 1);
frame.set("loop.index0", t_37);
frame.set("loop.revindex", t_38 - t_37);
frame.set("loop.revindex0", t_38 - t_37 - 1);
frame.set("loop.first", t_37 === 0);
frame.set("loop.last", t_37 === t_38 - 1);
frame.set("loop.length", t_38);
t_10 += "\n                  <li>\n                    ";
t_10 += runtime.suppressValue((lineno = 280, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "link"), "link", context, [{"text": runtime.memberLookup((t_40),"text"),"href": runtime.memberLookup((t_40),"href"),"variant": "inherit","className": "footer-legal-link"}])), env.opts.autoescape);
t_10 += "\n                  </li>\n                ";
;
}
}
frame = frame.pop();
t_10 += "\n              </ul>\n            </nav>\n          ";
;
}
t_10 += "\n        </div>\n      </div>\n    </div>\n  </footer>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_10);
});
context.addExport("footer");
context.setVariable("footer", macro_t_9);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/gallery/gallery.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/organisms/gallery/gallery.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  <!-- Import Card molecule for 'cards' variant -->\n  ";
env.getTemplate("molecules/card/card.njk", false, "organisms/gallery/gallery.njk", false, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
t_3.getExported(function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
if(Object.prototype.hasOwnProperty.call(t_3, "card")) {
var t_6 = t_3.card;
} else {
cb(new Error("cannot import 'card'")); return;
}
context.setVariable("card", t_6);
t_2 += "\n\n  ";
var t_7;
t_7 = {"title": "","description": "","items": [],"columns": 3,"layout": "grid","variant": "default","aspectRatio": "landscape","lazyLoad": true,"lightbox": false,"filters": [],"pagination": {},"id": "","className": "","attributes": {}};
frame.set("defaults", t_7, true);
if(frame.topLevel) {
context.setVariable("defaults", t_7);
}
if(frame.topLevel) {
context.addExport("defaults", t_7);
}
t_2 += "\n\n  ";
var t_8;
t_8 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_8, true);
if(frame.topLevel) {
context.setVariable("config", t_8);
}
if(frame.topLevel) {
context.addExport("config", t_8);
}
t_2 += "\n\n  <!-- Validate required items -->\n  ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"items")),"length") === 0) {
t_2 += "\n    <!-- Gallery requires items array -->\n    <div class=\"gallery-error\">\n      <p>Gallery component requires at least one item in the items array.</p>\n    </div>\n  ";
;
}
else {
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_9;
t_9 = ["gallery"];
frame.set("classList", t_9, true);
if(frame.topLevel) {
context.setVariable("classList", t_9);
}
if(frame.topLevel) {
context.addExport("classList", t_9);
}
t_2 += "\n\n  <!-- Add columns class -->\n  ";
var t_10;
t_10 = ((lineno = 127, colno = 36, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["gallery-columns-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"columns")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_10, true);
if(frame.topLevel) {
context.setVariable("classList", t_10);
}
if(frame.topLevel) {
context.addExport("classList", t_10);
}
t_2 += "\n\n  <!-- Add layout class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "masonry") {
t_2 += "\n    ";
var t_11;
t_11 = ((lineno = 131, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["gallery-masonry"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_11, true);
if(frame.topLevel) {
context.setVariable("classList", t_11);
}
if(frame.topLevel) {
context.addExport("classList", t_11);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Add variant class -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "overlay") {
t_2 += "\n    ";
var t_12;
t_12 = ((lineno = 136, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["gallery-overlay-variant"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_12, true);
if(frame.topLevel) {
context.setVariable("classList", t_12);
}
if(frame.topLevel) {
context.addExport("classList", t_12);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "minimal") {
t_2 += "\n    ";
var t_13;
t_13 = ((lineno = 138, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["gallery-minimal"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "cards") {
t_2 += "\n    ";
var t_14;
t_14 = ((lineno = 140, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["gallery-cards"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_14, true);
if(frame.topLevel) {
context.setVariable("classList", t_14);
}
if(frame.topLevel) {
context.addExport("classList", t_14);
}
t_2 += "\n  ";
;
}
else {
t_2 += "\n    ";
var t_15;
t_15 = ((lineno = 142, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["gallery-default"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_15, true);
if(frame.topLevel) {
context.setVariable("classList", t_15);
}
if(frame.topLevel) {
context.addExport("classList", t_15);
}
t_2 += "\n  ";
;
}
;
}
;
}
t_2 += "\n\n  <!-- Add custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_16;
t_16 = ((lineno = 147, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_16, true);
if(frame.topLevel) {
context.setVariable("classList", t_16);
}
if(frame.topLevel) {
context.addExport("classList", t_16);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
var t_17;
t_17 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_17, true);
if(frame.topLevel) {
context.setVariable("classString", t_17);
}
if(frame.topLevel) {
context.addExport("classString", t_17);
}
t_2 += "\n\n  <!-- Determine aspect ratio class -->\n  ";
var t_18;
t_18 = "gallery-media-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"aspectRatio");
frame.set("aspectClass", t_18, true);
if(frame.topLevel) {
context.setVariable("aspectClass", t_18);
}
if(frame.topLevel) {
context.addExport("aspectClass", t_18);
}
t_2 += "\n\n  <!-- Main gallery container -->\n  <section\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title") || "Image gallery", env.opts.autoescape);
t_2 += "\"\n    ";
frame = frame.push();
var t_21 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_21) {t_21 = runtime.fromIterator(t_21);
var t_19;
if(runtime.isArray(t_21)) {
var t_20 = t_21.length;
for(t_19=0; t_19 < t_21.length; t_19++) {
var t_22 = t_21[t_19][0];
frame.set("[object Object]", t_21[t_19][0]);
var t_23 = t_21[t_19][1];
frame.set("[object Object]", t_21[t_19][1]);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_22, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_23, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_19 = -1;
var t_20 = runtime.keys(t_21).length;
for(var t_24 in t_21) {
t_19++;
var t_25 = t_21[t_24];
frame.set("key", t_24);
frame.set("value", t_25);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_24, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_25, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Header (title + description) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_2 += "\n      <header class=\"gallery-header\">\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title")) {
t_2 += "\n          <h2 class=\"gallery-title\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"title"), env.opts.autoescape);
t_2 += "</h2>\n        ";
;
}
t_2 += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_2 += "\n          <p class=\"gallery-description\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"), env.opts.autoescape);
t_2 += "</p>\n        ";
;
}
t_2 += "\n      </header>\n    ";
;
}
t_2 += "\n\n    <!-- Filters (optional category filtering) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"filters") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"filters")),"length") > 0) {
t_2 += "\n      <div class=\"gallery-filters\" role=\"group\" aria-label=\"Filter gallery by category\">\n        <button\n          type=\"button\"\n          class=\"gallery-filter gallery-filter-active\"\n          data-filter=\"all\"\n        >\n          All\n        </button>\n        ";
frame = frame.push();
var t_28 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"filters");
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("filter", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
t_2 += "\n          <button\n            type=\"button\"\n            class=\"gallery-filter\"\n            data-filter=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_29),"value") || t_29, env.opts.autoescape);
t_2 += "\"\n          >\n            ";
t_2 += runtime.suppressValue(runtime.memberLookup((t_29),"label") || t_29, env.opts.autoescape);
t_2 += "\n          </button>\n        ";
;
}
}
frame = frame.pop();
t_2 += "\n      </div>\n    ";
;
}
t_2 += "\n\n    <!-- Gallery grid/masonry -->\n    <div class=\"gallery-grid\">\n      ";
frame = frame.push();
var t_32 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"items");
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_31 = t_32.length;
for(var t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30];
frame.set("item", t_33);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
t_2 += "\n        ";
var t_34;
t_34 = "gallery-item-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index");
frame.set("itemId", t_34, true);
if(frame.topLevel) {
context.setVariable("itemId", t_34);
}
if(frame.topLevel) {
context.addExport("itemId", t_34);
}
t_2 += "\n\n        <!-- Card variant - use Card molecule -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "cards" && runtime.memberLookup((t_33),"useCard")) {
t_2 += "\n          <div class=\"gallery-item\" data-category=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"category") || "", env.opts.autoescape);
t_2 += "\">\n            ";
var t_35;
t_35 = false;
frame.set("isClickable", t_35, true);
if(frame.topLevel) {
context.setVariable("isClickable", t_35);
}
if(frame.topLevel) {
context.addExport("isClickable", t_35);
}
t_2 += "\n            ";
if(runtime.memberLookup((t_33),"link")) {
t_2 += "\n              ";
var t_36;
t_36 = true;
frame.set("isClickable", t_36, true);
if(frame.topLevel) {
context.setVariable("isClickable", t_36);
}
if(frame.topLevel) {
context.addExport("isClickable", t_36);
}
t_2 += "\n            ";
;
}
t_2 += "\n            ";
t_2 += runtime.suppressValue((lineno = 210, colno = 19, runtime.callWrap(t_6, "card", context, [runtime.memberLookup((t_33),"cardProps") || {"image": runtime.memberLookup((t_33),"image"),"title": runtime.memberLookup((t_33),"title"),"description": runtime.memberLookup((t_33),"description"),"clickable": runtime.contextOrFrameLookup(context, frame, "isClickable"),"href": runtime.memberLookup((t_33),"link") || ""}])), env.opts.autoescape);
t_2 += "\n          </div>\n\n        <!-- Standard image-based gallery items -->\n        ";
;
}
else {
t_2 += "\n          <div\n            class=\"gallery-item\"\n            data-category=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"category") || "", env.opts.autoescape);
t_2 += "\"\n            ";
if(runtime.memberLookup((t_33),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          >\n            ";
if(runtime.memberLookup((t_33),"link")) {
t_2 += "\n              <a\n                href=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"link"), env.opts.autoescape);
t_2 += "\"\n                class=\"gallery-item-link\"\n                ";
if(runtime.memberLookup((t_33),"title")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"title"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n              >\n            ";
;
}
t_2 += "\n\n            <!-- Image container -->\n            <div class=\"gallery-media ";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "aspectClass"), env.opts.autoescape);
t_2 += "\">\n              <!-- Category badge -->\n              ";
if(runtime.memberLookup((t_33),"category") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") !== "overlay") {
t_2 += "\n                <span class=\"gallery-item-category\">";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"category"), env.opts.autoescape);
t_2 += "</span>\n              ";
;
}
t_2 += "\n\n              <!-- Image -->\n              ";
if(runtime.memberLookup((t_33),"image") && runtime.memberLookup((runtime.memberLookup((t_33),"image")),"src")) {
t_2 += "\n                <img\n                  src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_33),"image")),"src"), env.opts.autoescape);
t_2 += "\"\n                  alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_33),"image")),"alt") || runtime.memberLookup((t_33),"title") || "", env.opts.autoescape);
t_2 += "\"\n                  ";
if(runtime.memberLookup((runtime.memberLookup((t_33),"image")),"srcset")) {
t_2 += "srcset=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_33),"image")),"srcset"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"lazyLoad")) {
t_2 += "loading=\"lazy\"";
;
}
t_2 += "\n                  class=\"gallery-image\"\n                  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"lightbox")) {
t_2 += "\n                    data-lightbox=\"true\"\n                    data-lightbox-src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_33),"image")),"src"), env.opts.autoescape);
t_2 += "\"\n                    role=\"button\"\n                    tabindex=\"0\"\n                    aria-label=\"Open ";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"title") || "image", env.opts.autoescape);
t_2 += " in lightbox\"\n                  ";
;
}
t_2 += "\n                />\n              ";
;
}
t_2 += "\n            </div>\n\n            <!-- Content (title + description) -->\n            ";
if(runtime.memberLookup((t_33),"title") || runtime.memberLookup((t_33),"description")) {
t_2 += "\n              <div class=\"gallery-content\">\n                ";
if(runtime.memberLookup((t_33),"category") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant") == "overlay") {
t_2 += "\n                  <span class=\"gallery-item-category\">";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"category"), env.opts.autoescape);
t_2 += "</span>\n                ";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((t_33),"title")) {
t_2 += "\n                  <h3 class=\"gallery-item-title\">";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"title"), env.opts.autoescape);
t_2 += "</h3>\n                ";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((t_33),"description")) {
t_2 += "\n                  <p class=\"gallery-item-description\">";
t_2 += runtime.suppressValue(runtime.memberLookup((t_33),"description"), env.opts.autoescape);
t_2 += "</p>\n                ";
;
}
t_2 += "\n              </div>\n            ";
;
}
t_2 += "\n\n            ";
if(runtime.memberLookup((t_33),"link")) {
t_2 += "\n              </a>\n            ";
;
}
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n      ";
;
}
}
frame = frame.pop();
t_2 += "\n    </div>\n\n    <!-- Pagination (optional) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination")),"total") > 1) {
t_2 += "\n      <nav\n        class=\"gallery-pagination\"\n        role=\"navigation\"\n        aria-label=\"Gallery pagination\"\n      >\n        <button\n          type=\"button\"\n          class=\"gallery-pagination-button\"\n          aria-label=\"Previous page\"\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination")),"current") == 1) {
t_2 += "disabled";
;
}
t_2 += "\n        >\n          &laquo; Prev\n        </button>\n\n        ";
frame = frame.push();
var t_39 = (lineno = 299, colno = 28, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [1,runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination")),"total") + 1]));
if(t_39) {t_39 = runtime.fromIterator(t_39);
var t_38 = t_39.length;
for(var t_37=0; t_37 < t_39.length; t_37++) {
var t_40 = t_39[t_37];
frame.set("page", t_40);
frame.set("loop.index", t_37 + 1);
frame.set("loop.index0", t_37);
frame.set("loop.revindex", t_38 - t_37);
frame.set("loop.revindex0", t_38 - t_37 - 1);
frame.set("loop.first", t_37 === 0);
frame.set("loop.last", t_37 === t_38 - 1);
frame.set("loop.length", t_38);
t_2 += "\n          <button\n            type=\"button\"\n            class=\"gallery-pagination-button ";
if(t_40 == runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination")),"current")) {
t_2 += "gallery-pagination-active";
;
}
t_2 += "\"\n            aria-label=\"Page ";
t_2 += runtime.suppressValue(t_40, env.opts.autoescape);
t_2 += "\"\n            ";
if(t_40 == runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination")),"current")) {
t_2 += "aria-current=\"page\"";
;
}
t_2 += "\n          >\n            ";
t_2 += runtime.suppressValue(t_40, env.opts.autoescape);
t_2 += "\n          </button>\n        ";
;
}
}
frame = frame.pop();
t_2 += "\n\n        <button\n          type=\"button\"\n          class=\"gallery-pagination-button\"\n          aria-label=\"Next page\"\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination")),"current") == runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"pagination")),"total")) {
t_2 += "disabled";
;
}
t_2 += "\n        >\n          Next &raquo;\n        </button>\n      </nav>\n    ";
;
}
t_2 += "\n\n    <!-- Lightbox/Modal (optional - requires JavaScript) -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"lightbox")) {
t_2 += "\n      <div\n        class=\"gallery-lightbox\"\n        id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id") || "gallery", env.opts.autoescape);
t_2 += "-lightbox\"\n        role=\"dialog\"\n        aria-modal=\"true\"\n        aria-label=\"Image lightbox\"\n      >\n        <button\n          type=\"button\"\n          class=\"gallery-lightbox-close\"\n          aria-label=\"Close lightbox\"\n        >\n          &times;\n        </button>\n        <img\n          src=\"\"\n          alt=\"\"\n          class=\"gallery-lightbox-image\"\n        />\n      </div>\n    ";
;
}
t_2 += "\n  </section>\n\n  ";
;
}
t_2 += "\n";
})});
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("gallery");
context.setVariable("gallery", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/header/header.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/organisms/header/header.njk -->\n\n";
output += "\n\n";
env.getTemplate("atoms/button/button.njk", false, "organisms/header/header.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "button")) {
var t_4 = t_1.button;
} else {
cb(new Error("cannot import 'button'")); return;
}
context.setVariable("button", t_4);
output += "\n";
env.getTemplate("atoms/link/link.njk", false, "organisms/header/header.njk", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "link")) {
var t_8 = t_5.link;
} else {
cb(new Error("cannot import 'link'")); return;
}
context.setVariable("link", t_8);
output += "\n\n";
var macro_t_9 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_10 = "";t_10 += "\n  ";
var t_11;
t_11 = {"logo": {},"navigation": [],"actions": {},"variant": "default","sticky": false,"transparent": false,"scrollDetection": false,"mobileBreakpoint": "768","skipToMain": true,"className": "","attributes": {},"a11y": {"navLabel": "Main navigation","menuButtonLabel": "Toggle menu"}};
frame.set("defaults", t_11, true);
if(frame.topLevel) {
context.setVariable("defaults", t_11);
}
if(frame.topLevel) {
context.addExport("defaults", t_11);
}
t_10 += "\n\n  ";
var t_12;
t_12 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_12, true);
if(frame.topLevel) {
context.setVariable("config", t_12);
}
if(frame.topLevel) {
context.addExport("config", t_12);
}
t_10 += "\n\n  <!-- Build class list -->\n  ";
var t_13;
t_13 = env.getFilter("trim").call(context, env.getFilter("join").call(context, ["header","header-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant"),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"sticky")?"header-sticky":""),(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"transparent")?"header-transparent":""),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")]," "));
frame.set("classList", t_13, true);
if(frame.topLevel) {
context.setVariable("classList", t_13);
}
if(frame.topLevel) {
context.addExport("classList", t_13);
}
t_10 += "\n\n  <!-- Generate unique IDs for ARIA relationships -->\n  ";
var t_14;
t_14 = (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id") + "" + "-mobile-menu":"header-mobile-menu");
frame.set("mobileMenuId", t_14, true);
if(frame.topLevel) {
context.setVariable("mobileMenuId", t_14);
}
if(frame.topLevel) {
context.addExport("mobileMenuId", t_14);
}
t_10 += "\n  ";
var t_15;
t_15 = (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id") + "" + "-mobile-backdrop":"header-mobile-backdrop");
frame.set("mobileBackdropId", t_15, true);
if(frame.topLevel) {
context.setVariable("mobileBackdropId", t_15);
}
if(frame.topLevel) {
context.addExport("mobileBackdropId", t_15);
}
t_10 += "\n\n  <!-- Chevron down SVG for dropdown indicators -->\n  ";
var t_16;
t_16 = (function() {
var output = "";
output += "\n    <svg class=\"header-nav-arrow\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n      <path fill-rule=\"evenodd\" d=\"M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06z\" clip-rule=\"evenodd\"/>\n    </svg>\n  ";
;
return output;
})()
;
frame.set("chevronDown", t_16, true);
if(frame.topLevel) {
context.setVariable("chevronDown", t_16);
}
if(frame.topLevel) {
context.addExport("chevronDown", t_16);
}
t_10 += "\n\n  <header\n    class=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_10 += "\"\n    role=\"banner\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_10 += "id=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_10 += "\"";
;
}
t_10 += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"scrollDetection")) {
t_10 += "data-scroll-detection=\"true\"";
;
}
t_10 += "\n    ";
frame = frame.push();
var t_19 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_17;
if(runtime.isArray(t_19)) {
var t_18 = t_19.length;
for(t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17][0];
frame.set("[object Object]", t_19[t_17][0]);
var t_21 = t_19[t_17][1];
frame.set("[object Object]", t_19[t_17][1]);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_20, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_21, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
} else {
t_17 = -1;
var t_18 = runtime.keys(t_19).length;
for(var t_22 in t_19) {
t_17++;
var t_23 = t_19[t_22];
frame.set("key", t_22);
frame.set("value", t_23);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_10 += "\n      ";
t_10 += runtime.suppressValue(t_22, env.opts.autoescape);
t_10 += "=\"";
t_10 += runtime.suppressValue(t_23, env.opts.autoescape);
t_10 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_10 += "\n  >\n    <!-- Skip to main content link for accessibility -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"skipToMain")) {
t_10 += "\n    <a href=\"#main\" class=\"header-skip-link\">Skip to main content</a>\n    ";
;
}
t_10 += "\n\n    <div class=\"header-container\">\n      <!-- Logo -->\n      <div class=\"header-logo\">\n        <a\n          href=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"href") || "/", env.opts.autoescape);
t_10 += "\"\n          class=\"header-logo-link\"\n          aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"alt") || "Home", env.opts.autoescape);
t_10 += "\"\n        >\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"src")) {
t_10 += "\n            <img\n              src=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"src"), env.opts.autoescape);
t_10 += "\"\n              alt=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"alt") || "", env.opts.autoescape);
t_10 += "\"\n              class=\"header-logo-img\"\n            />\n          ";
;
}
t_10 += "\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"text")) {
t_10 += "\n            <span class=\"header-logo-text\">";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"logo")),"text"), env.opts.autoescape);
t_10 += "</span>\n          ";
;
}
t_10 += "\n        </a>\n      </div>\n\n      <!-- Desktop Navigation -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"navigation") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"navigation")),"length") > 0) {
t_10 += "\n      <nav class=\"header-nav\" aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"navLabel"), env.opts.autoescape);
t_10 += "\">\n        <ul class=\"header-nav-list\" role=\"list\">\n          ";
frame = frame.push();
var t_26 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"navigation");
if(t_26) {t_26 = runtime.fromIterator(t_26);
var t_25 = t_26.length;
for(var t_24=0; t_24 < t_26.length; t_24++) {
var t_27 = t_26[t_24];
frame.set("item", t_27);
frame.set("loop.index", t_24 + 1);
frame.set("loop.index0", t_24);
frame.set("loop.revindex", t_25 - t_24);
frame.set("loop.revindex0", t_25 - t_24 - 1);
frame.set("loop.first", t_24 === 0);
frame.set("loop.last", t_24 === t_25 - 1);
frame.set("loop.length", t_25);
t_10 += "\n          <li class=\"header-nav-item ";
t_10 += runtime.suppressValue((runtime.memberLookup((t_27),"active")?"header-nav-item-active":""), env.opts.autoescape);
t_10 += "\">\n            ";
if(runtime.memberLookup((t_27),"children") && runtime.memberLookup((runtime.memberLookup((t_27),"children")),"length") > 0) {
t_10 += "\n              <!-- Dropdown menu -->\n              <button\n                class=\"header-nav-link\"\n                aria-expanded=\"false\"\n                aria-haspopup=\"true\"\n              >\n                ";
t_10 += runtime.suppressValue(runtime.memberLookup((t_27),"text"), env.opts.autoescape);
t_10 += "\n                ";
t_10 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "chevronDown")), env.opts.autoescape);
t_10 += "\n              </button>\n              <ul class=\"header-dropdown\" role=\"menu\">\n                ";
frame = frame.push();
var t_30 = runtime.memberLookup((t_27),"children");
if(t_30) {t_30 = runtime.fromIterator(t_30);
var t_29 = t_30.length;
for(var t_28=0; t_28 < t_30.length; t_28++) {
var t_31 = t_30[t_28];
frame.set("child", t_31);
frame.set("loop.index", t_28 + 1);
frame.set("loop.index0", t_28);
frame.set("loop.revindex", t_29 - t_28);
frame.set("loop.revindex0", t_29 - t_28 - 1);
frame.set("loop.first", t_28 === 0);
frame.set("loop.last", t_28 === t_29 - 1);
frame.set("loop.length", t_29);
t_10 += "\n                <li class=\"header-dropdown-item\" role=\"none\">\n                  <a\n                    href=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((t_31),"href"), env.opts.autoescape);
t_10 += "\"\n                    class=\"header-dropdown-link\"\n                    role=\"menuitem\"\n                    ";
if(runtime.memberLookup((t_31),"active")) {
t_10 += "aria-current=\"page\"";
;
}
t_10 += "\n                  >\n                    ";
t_10 += runtime.suppressValue(runtime.memberLookup((t_31),"text"), env.opts.autoescape);
t_10 += "\n                  </a>\n                </li>\n                ";
;
}
}
frame = frame.pop();
t_10 += "\n              </ul>\n            ";
;
}
else {
t_10 += "\n              <!-- Regular link -->\n              <a\n                href=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((t_27),"href"), env.opts.autoescape);
t_10 += "\"\n                class=\"header-nav-link\"\n                ";
if(runtime.memberLookup((t_27),"active")) {
t_10 += "aria-current=\"page\"";
;
}
t_10 += "\n              >\n                ";
t_10 += runtime.suppressValue(runtime.memberLookup((t_27),"text"), env.opts.autoescape);
t_10 += "\n              </a>\n            ";
;
}
t_10 += "\n          </li>\n          ";
;
}
}
frame = frame.pop();
t_10 += "\n        </ul>\n      </nav>\n      ";
;
}
t_10 += "\n\n      <!-- Desktop Actions -->\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary")) {
t_10 += "\n      <div class=\"header-actions\">\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary")) {
t_10 += "\n          ";
t_10 += runtime.suppressValue((lineno = 215, colno = 17, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "link"), "link", context, [runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary")])), env.opts.autoescape);
t_10 += "\n        ";
;
}
t_10 += "\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary")) {
t_10 += "\n          ";
t_10 += runtime.suppressValue((lineno = 218, colno = 19, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "button"), "button", context, [env.getFilter("merge").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary"),{"size": "sm"})])), env.opts.autoescape);
t_10 += "\n        ";
;
}
t_10 += "\n      </div>\n      ";
;
}
t_10 += "\n\n      <!-- Mobile Menu Toggle -->\n      <button\n        class=\"header-mobile-toggle\"\n        aria-expanded=\"false\"\n        aria-controls=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "mobileMenuId"), env.opts.autoescape);
t_10 += "\"\n        aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"menuButtonLabel"), env.opts.autoescape);
t_10 += "\"\n      >\n        <span class=\"header-mobile-toggle-bar\"></span>\n        <span class=\"header-mobile-toggle-bar\"></span>\n        <span class=\"header-mobile-toggle-bar\"></span>\n      </button>\n    </div>\n\n    <!-- Mobile Menu Panel -->\n    <div\n      id=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "mobileMenuId"), env.opts.autoescape);
t_10 += "\"\n      class=\"header-mobile-menu\"\n      aria-hidden=\"true\"\n    >\n      <!-- Mobile Navigation -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"navigation") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"navigation")),"length") > 0) {
t_10 += "\n      <nav aria-label=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"navLabel"), env.opts.autoescape);
t_10 += "\">\n        <ul class=\"header-mobile-nav-list\" role=\"list\">\n          ";
frame = frame.push();
var t_34 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"navigation");
if(t_34) {t_34 = runtime.fromIterator(t_34);
var t_33 = t_34.length;
for(var t_32=0; t_32 < t_34.length; t_32++) {
var t_35 = t_34[t_32];
frame.set("item", t_35);
frame.set("loop.index", t_32 + 1);
frame.set("loop.index0", t_32);
frame.set("loop.revindex", t_33 - t_32);
frame.set("loop.revindex0", t_33 - t_32 - 1);
frame.set("loop.first", t_32 === 0);
frame.set("loop.last", t_32 === t_33 - 1);
frame.set("loop.length", t_33);
t_10 += "\n          <li class=\"header-mobile-nav-item ";
t_10 += runtime.suppressValue((runtime.memberLookup((t_35),"active")?"header-mobile-nav-item-active":""), env.opts.autoescape);
t_10 += "\">\n            ";
if(runtime.memberLookup((t_35),"children") && runtime.memberLookup((runtime.memberLookup((t_35),"children")),"length") > 0) {
t_10 += "\n              <!-- Dropdown in mobile -->\n              <button\n                class=\"header-mobile-nav-link\"\n                aria-expanded=\"false\"\n                aria-haspopup=\"true\"\n              >\n                <span>";
t_10 += runtime.suppressValue(runtime.memberLookup((t_35),"text"), env.opts.autoescape);
t_10 += "</span>\n                ";
t_10 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "chevronDown")), env.opts.autoescape);
t_10 += "\n              </button>\n              <ul class=\"header-mobile-dropdown\">\n                ";
frame = frame.push();
var t_38 = runtime.memberLookup((t_35),"children");
if(t_38) {t_38 = runtime.fromIterator(t_38);
var t_37 = t_38.length;
for(var t_36=0; t_36 < t_38.length; t_36++) {
var t_39 = t_38[t_36];
frame.set("child", t_39);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
t_10 += "\n                <li class=\"header-mobile-dropdown-item\">\n                  <a\n                    href=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((t_39),"href"), env.opts.autoescape);
t_10 += "\"\n                    class=\"header-mobile-dropdown-link\"\n                    ";
if(runtime.memberLookup((t_39),"active")) {
t_10 += "aria-current=\"page\"";
;
}
t_10 += "\n                  >\n                    ";
t_10 += runtime.suppressValue(runtime.memberLookup((t_39),"text"), env.opts.autoescape);
t_10 += "\n                  </a>\n                </li>\n                ";
;
}
}
frame = frame.pop();
t_10 += "\n              </ul>\n            ";
;
}
else {
t_10 += "\n              <!-- Regular link -->\n              <a\n                href=\"";
t_10 += runtime.suppressValue(runtime.memberLookup((t_35),"href"), env.opts.autoescape);
t_10 += "\"\n                class=\"header-mobile-nav-link\"\n                ";
if(runtime.memberLookup((t_35),"active")) {
t_10 += "aria-current=\"page\"";
;
}
t_10 += "\n              >\n                ";
t_10 += runtime.suppressValue(runtime.memberLookup((t_35),"text"), env.opts.autoescape);
t_10 += "\n              </a>\n            ";
;
}
t_10 += "\n          </li>\n          ";
;
}
}
frame = frame.pop();
t_10 += "\n        </ul>\n      </nav>\n      ";
;
}
t_10 += "\n\n      <!-- Mobile Actions -->\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary") || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary")) {
t_10 += "\n      <div class=\"header-mobile-actions\">\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary")) {
t_10 += "\n          ";
t_10 += runtime.suppressValue((lineno = 291, colno = 17, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "link"), "link", context, [env.getFilter("merge").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"secondary"),{"className": "button button-ghost button-full"})])), env.opts.autoescape);
t_10 += "\n        ";
;
}
t_10 += "\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary")) {
t_10 += "\n          ";
t_10 += runtime.suppressValue((lineno = 294, colno = 19, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "button"), "button", context, [env.getFilter("merge").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"actions")),"primary"),{"fullWidth": true})])), env.opts.autoescape);
t_10 += "\n        ";
;
}
t_10 += "\n      </div>\n      ";
;
}
t_10 += "\n    </div>\n\n    <!-- Mobile Menu Backdrop -->\n    <div\n      id=\"";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "mobileBackdropId"), env.opts.autoescape);
t_10 += "\"\n      class=\"header-mobile-backdrop\"\n      aria-hidden=\"true\"\n    ></div>\n  </header>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_10);
});
context.addExport("header");
context.setVariable("header", macro_t_9);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/hero/hero.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/organisms/hero/hero.njk -->\n\n";
output += "\n\n";
var macro_t_1 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_2 = "";t_2 += "\n  <!-- Import dependencies -->\n  ";
env.getTemplate("atoms/button/button.njk", false, "organisms/hero/hero.njk", false, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
t_3.getExported(function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
if(Object.prototype.hasOwnProperty.call(t_3, "button")) {
var t_6 = t_3.button;
} else {
cb(new Error("cannot import 'button'")); return;
}
context.setVariable("button", t_6);
t_2 += "\n  ";
env.getTemplate("atoms/heading/heading.njk", false, "organisms/hero/hero.njk", false, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
t_7.getExported(function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
if(Object.prototype.hasOwnProperty.call(t_7, "heading")) {
var t_10 = t_7.heading;
} else {
cb(new Error("cannot import 'heading'")); return;
}
context.setVariable("heading", t_10);
t_2 += "\n  ";
env.getTemplate("atoms/input/input.njk", false, "organisms/hero/hero.njk", false, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
t_11.getExported(function(t_13,t_11) {
if(t_13) { cb(t_13); return; }
if(Object.prototype.hasOwnProperty.call(t_11, "input")) {
var t_14 = t_11.input;
} else {
cb(new Error("cannot import 'input'")); return;
}
context.setVariable("input", t_14);
t_2 += "\n  ";
env.getTemplate("molecules/cta-block/cta-block.njk", false, "organisms/hero/hero.njk", false, function(t_16,t_15) {
if(t_16) { cb(t_16); return; }
t_15.getExported(function(t_17,t_15) {
if(t_17) { cb(t_17); return; }
if(Object.prototype.hasOwnProperty.call(t_15, "ctaBlock")) {
var t_18 = t_15.ctaBlock;
} else {
cb(new Error("cannot import 'ctaBlock'")); return;
}
context.setVariable("ctaBlock", t_18);
t_2 += "\n  ";
env.getTemplate("molecules/logo-grid/logo-grid.njk", false, "organisms/hero/hero.njk", false, function(t_20,t_19) {
if(t_20) { cb(t_20); return; }
t_19.getExported(function(t_21,t_19) {
if(t_21) { cb(t_21); return; }
if(Object.prototype.hasOwnProperty.call(t_19, "logoGrid")) {
var t_22 = t_19.logoGrid;
} else {
cb(new Error("cannot import 'logoGrid'")); return;
}
context.setVariable("logoGrid", t_22);
t_2 += "\n\n  ";
var t_23;
t_23 = {"layout": "centered","height": "tall","background": {"type": "default","overlay": "dark"},"headingLevel": 1,"emailCapture": {"enabled": false,"placeholder": "Enter your email","buttonText": "Get Started","privacyText": "No spam. Unsubscribe anytime."},"socialProof": {"enabled": false},"trustSignals": [],"className": "","attributes": {},"a11y": {}};
frame.set("defaults", t_23, true);
if(frame.topLevel) {
context.setVariable("defaults", t_23);
}
if(frame.topLevel) {
context.addExport("defaults", t_23);
}
t_2 += "\n\n  ";
var t_24;
t_24 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_24, true);
if(frame.topLevel) {
context.setVariable("config", t_24);
}
if(frame.topLevel) {
context.addExport("config", t_24);
}
t_2 += "\n\n  <!-- Merge nested objects properly -->\n  ";
var t_25;
t_25 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "config"),{"background": env.getFilter("merge").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "defaults")),"background"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "props")),"background") || {}),"emailCapture": env.getFilter("merge").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "defaults")),"emailCapture"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "props")),"emailCapture") || {}),"socialProof": env.getFilter("merge").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "defaults")),"socialProof"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "props")),"socialProof") || {})});
frame.set("config", t_25, true);
if(frame.topLevel) {
context.setVariable("config", t_25);
}
if(frame.topLevel) {
context.addExport("config", t_25);
}
t_2 += "\n\n  <!-- Build class list -->\n  ";
var t_26;
t_26 = ["hero"];
frame.set("classList", t_26, true);
if(frame.topLevel) {
context.setVariable("classList", t_26);
}
if(frame.topLevel) {
context.addExport("classList", t_26);
}
t_2 += "\n\n  <!-- Layout variant -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout")) {
t_2 += "\n    ";
var t_27;
t_27 = ((lineno = 166, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["hero-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_27, true);
if(frame.topLevel) {
context.setVariable("classList", t_27);
}
if(frame.topLevel) {
context.addExport("classList", t_27);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Height variant -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"height")) {
t_2 += "\n    ";
var t_28;
t_28 = ((lineno = 171, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["hero-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"height")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_28, true);
if(frame.topLevel) {
context.setVariable("classList", t_28);
}
if(frame.topLevel) {
context.addExport("classList", t_28);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  <!-- Background type -->\n  ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "gradient") {
t_2 += "\n    ";
var t_29;
t_29 = ((lineno = 176, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["hero-gradient"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_29, true);
if(frame.topLevel) {
context.setVariable("classList", t_29);
}
if(frame.topLevel) {
context.addExport("classList", t_29);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "gradient-subtle") {
t_2 += "\n    ";
var t_30;
t_30 = ((lineno = 178, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["hero-gradient-subtle"])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_30, true);
if(frame.topLevel) {
context.setVariable("classList", t_30);
}
if(frame.topLevel) {
context.addExport("classList", t_30);
}
t_2 += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "image" || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "video") {
t_2 += "\n    ";
var t_31;
t_31 = ((lineno = 180, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, ["hero-with-background-" + runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_31, true);
if(frame.topLevel) {
context.setVariable("classList", t_31);
}
if(frame.topLevel) {
context.addExport("classList", t_31);
}
t_2 += "\n  ";
;
}
;
}
;
}
t_2 += "\n\n  <!-- Custom classes -->\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_2 += "\n    ";
var t_32;
t_32 = ((lineno = 185, colno = 38, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "classList")),"push"), "classList[\"push\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")])),runtime.contextOrFrameLookup(context, frame, "classList"));
frame.set("classList", t_32, true);
if(frame.topLevel) {
context.setVariable("classList", t_32);
}
if(frame.topLevel) {
context.addExport("classList", t_32);
}
t_2 += "\n  ";
;
}
t_2 += "\n\n  ";
var t_33;
t_33 = env.getFilter("trim").call(context, env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "classList")," "));
frame.set("classString", t_33, true);
if(frame.topLevel) {
context.setVariable("classString", t_33);
}
if(frame.topLevel) {
context.addExport("classString", t_33);
}
t_2 += "\n\n  <!-- Main hero section -->\n  <section\n    class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classString"), env.opts.autoescape);
t_2 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_2 += "id=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_2 += "aria-label=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"landmarkLabel")) {
t_2 += "aria-labelledby=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"landmarkLabel"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n    role=\"region\"\n    ";
frame = frame.push();
var t_36 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_36) {t_36 = runtime.fromIterator(t_36);
var t_34;
if(runtime.isArray(t_36)) {
var t_35 = t_36.length;
for(t_34=0; t_34 < t_36.length; t_34++) {
var t_37 = t_36[t_34][0];
frame.set("[object Object]", t_36[t_34][0]);
var t_38 = t_36[t_34][1];
frame.set("[object Object]", t_36[t_34][1]);
frame.set("loop.index", t_34 + 1);
frame.set("loop.index0", t_34);
frame.set("loop.revindex", t_35 - t_34);
frame.set("loop.revindex0", t_35 - t_34 - 1);
frame.set("loop.first", t_34 === 0);
frame.set("loop.last", t_34 === t_35 - 1);
frame.set("loop.length", t_35);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_37, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_38, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
} else {
t_34 = -1;
var t_35 = runtime.keys(t_36).length;
for(var t_39 in t_36) {
t_34++;
var t_40 = t_36[t_39];
frame.set("key", t_39);
frame.set("value", t_40);
frame.set("loop.index", t_34 + 1);
frame.set("loop.index0", t_34);
frame.set("loop.revindex", t_35 - t_34);
frame.set("loop.revindex0", t_35 - t_34 - 1);
frame.set("loop.first", t_34 === 0);
frame.set("loop.last", t_34 === t_35 - 1);
frame.set("loop.length", t_35);
t_2 += "\n      ";
t_2 += runtime.suppressValue(t_39, env.opts.autoescape);
t_2 += "=\"";
t_2 += runtime.suppressValue(t_40, env.opts.autoescape);
t_2 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_2 += "\n  >\n    <!-- Background layer (image or video) -->\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "image" && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"image")) {
t_2 += "\n      <div class=\"hero-background\" aria-hidden=\"true\">\n        <img\n          src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"image"), env.opts.autoescape);
t_2 += "\"\n          alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"alt") || "", env.opts.autoescape);
t_2 += "\"\n          class=\"hero-background-image\"\n          loading=\"eager\"\n        >\n      </div>\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"overlay") != "none") {
t_2 += "\n        <div class=\"hero-overlay hero-overlay-";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"overlay"), env.opts.autoescape);
t_2 += "\" aria-hidden=\"true\"></div>\n      ";
;
}
t_2 += "\n    ";
;
}
t_2 += "\n\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"type") == "video" && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"video")) {
t_2 += "\n      <div class=\"hero-background\" aria-hidden=\"true\">\n        <video\n          class=\"hero-background-video\"\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"poster")) {
t_2 += "poster=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"poster"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"autoplay")) {
t_2 += "autoplay";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"loop")) {
t_2 += "loop";
;
}
t_2 += "\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"muted")) {
t_2 += "muted";
;
}
t_2 += "\n          playsinline\n        >\n          <source src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"video"), env.opts.autoescape);
t_2 += "\" type=\"video/mp4\">\n        </video>\n      </div>\n      ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"overlay") != "none") {
t_2 += "\n        <div class=\"hero-overlay hero-overlay-";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"background")),"overlay"), env.opts.autoescape);
t_2 += "\" aria-hidden=\"true\"></div>\n      ";
;
}
t_2 += "\n    ";
;
}
t_2 += "\n\n    <!-- Content container -->\n    <div class=\"hero-container\">\n      <!-- Content area -->\n      <div class=\"hero-content\">\n        <!-- Eyebrow text (optional) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"eyebrow")) {
t_2 += "\n          <span class=\"hero-eyebrow\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"eyebrow"), env.opts.autoescape);
t_2 += "</span>\n        ";
;
}
t_2 += "\n\n        <!-- Main heading (required) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headline")) {
t_2 += "\n          <h";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headingLevel"), env.opts.autoescape);
t_2 += " class=\"hero-content-heading\">\n            ";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headline"), env.opts.autoescape);
t_2 += "\n          </h";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"headingLevel"), env.opts.autoescape);
t_2 += ">\n        ";
;
}
t_2 += "\n\n        <!-- Subheading (optional) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subheading")) {
t_2 += "\n          <p class=\"hero-content-subheading\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subheading"), env.opts.autoescape);
t_2 += "</p>\n        ";
;
}
t_2 += "\n\n        <!-- Description (optional) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description")) {
t_2 += "\n          <p class=\"hero-content-description\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"description"), env.opts.autoescape);
t_2 += "</p>\n        ";
;
}
t_2 += "\n\n        <!-- Email capture form -->\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"emailCapture")),"enabled")) {
t_2 += "\n          <form class=\"hero-email-capture\" action=\"/subscribe\" method=\"POST\">\n            ";
t_2 += runtime.suppressValue((lineno = 263, colno = 20, runtime.callWrap(t_14, "input", context, [{"type": "email","name": "email","placeholder": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"emailCapture")),"placeholder"),"required": true,"ariaLabel": "Email address","size": "lg","fullWidth": true}])), env.opts.autoescape);
t_2 += "\n            ";
t_2 += runtime.suppressValue((lineno = 272, colno = 21, runtime.callWrap(t_6, "button", context, [{"text": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"emailCapture")),"buttonText"),"type": "submit","variant": "primary","size": "lg"}])), env.opts.autoescape);
t_2 += "\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"emailCapture")),"privacyText")) {
t_2 += "\n              <p class=\"hero-email-privacy\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"emailCapture")),"privacyText"), env.opts.autoescape);
t_2 += "</p>\n            ";
;
}
t_2 += "\n          </form>\n        ";
;
}
t_2 += "\n\n        <!-- CTA buttons (if no email capture) -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta") && !runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"emailCapture")),"enabled")) {
t_2 += "\n          <div class=\"hero-actions\">\n            <!-- Primary CTA -->\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")) {
t_2 += "\n              ";
t_2 += runtime.suppressValue((lineno = 289, colno = 23, runtime.callWrap(t_6, "button", context, [{"text": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"text"),"href": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"href"),"variant": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"variant") || "primary","size": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"size") || "lg","target": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"target"),"rel": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"primary")),"rel")}])), env.opts.autoescape);
t_2 += "\n            ";
;
}
t_2 += "\n\n            <!-- Secondary CTA -->\n            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")) {
t_2 += "\n              ";
t_2 += runtime.suppressValue((lineno = 301, colno = 23, runtime.callWrap(t_6, "button", context, [{"text": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"text"),"href": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"href"),"variant": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"variant") || "ghost","size": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"size") || "lg","target": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"target"),"rel": runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"cta")),"secondary")),"rel")}])), env.opts.autoescape);
t_2 += "\n            ";
;
}
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n\n        <!-- Trust signals -->\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trustSignals") && env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trustSignals")) > 0) {
t_2 += "\n          <div class=\"hero-trust-signals\">\n            ";
frame = frame.push();
var t_43 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"trustSignals");
if(t_43) {t_43 = runtime.fromIterator(t_43);
var t_42 = t_43.length;
for(var t_41=0; t_41 < t_43.length; t_41++) {
var t_44 = t_43[t_41];
frame.set("signal", t_44);
frame.set("loop.index", t_41 + 1);
frame.set("loop.index0", t_41);
frame.set("loop.revindex", t_42 - t_41);
frame.set("loop.revindex0", t_42 - t_41 - 1);
frame.set("loop.first", t_41 === 0);
frame.set("loop.last", t_41 === t_42 - 1);
frame.set("loop.length", t_42);
t_2 += "\n              <div class=\"hero-trust-stat\">\n                ";
if(runtime.memberLookup((t_44),"icon")) {
t_2 += "\n                  <span class=\"hero-trust-stat-icon\" aria-hidden=\"true\">\n                    <!-- Icon placeholder - would be replaced with actual SVG -->\n                    <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                      <circle cx=\"10\" cy=\"10\" r=\"8\" />\n                    </svg>\n                  </span>\n                ";
;
}
t_2 += "\n                <span class=\"hero-trust-stat-value\">";
t_2 += runtime.suppressValue(runtime.memberLookup((t_44),"value"), env.opts.autoescape);
t_2 += "</span>\n                <span>";
t_2 += runtime.suppressValue(runtime.memberLookup((t_44),"text"), env.opts.autoescape);
t_2 += "</span>\n              </div>\n            ";
;
}
}
frame = frame.pop();
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n\n        <!-- Social proof (Logo Grid) -->\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"socialProof")),"enabled") && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"socialProof")),"logos")) {
t_2 += "\n          <div class=\"hero-social-proof\">\n            ";
var t_45;
t_45 = "left";
frame.set("logoAlign", t_45, true);
if(frame.topLevel) {
context.setVariable("logoAlign", t_45);
}
if(frame.topLevel) {
context.addExport("logoAlign", t_45);
}
t_2 += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "centered") {
t_2 += "\n              ";
var t_46;
t_46 = "center";
frame.set("logoAlign", t_46, true);
if(frame.topLevel) {
context.setVariable("logoAlign", t_46);
}
if(frame.topLevel) {
context.addExport("logoAlign", t_46);
}
t_2 += "\n            ";
;
}
t_2 += "\n            ";
t_2 += runtime.suppressValue((lineno = 340, colno = 23, runtime.callWrap(t_22, "logoGrid", context, [{"title": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"socialProof")),"title"),"logos": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"socialProof")),"logos"),"variant": "grid","colorScheme": "grayscale-hover","gap": "md","align": runtime.contextOrFrameLookup(context, frame, "logoAlign")}])), env.opts.autoescape);
t_2 += "\n          </div>\n        ";
;
}
t_2 += "\n      </div>\n\n      <!-- Media area (for split layouts) -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media") && (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "split" || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"layout") == "split-reverse")) {
t_2 += "\n        <div class=\"hero-media\">\n          ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"type") == "image") {
t_2 += "\n            <img\n              src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"src"), env.opts.autoescape);
t_2 += "\"\n              alt=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"alt") || "", env.opts.autoescape);
t_2 += "\"\n              loading=\"eager\"\n            >\n          ";
;
}
else {
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"type") == "video") {
t_2 += "\n            <div class=\"hero-media-container\">\n              <video\n                ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"poster")) {
t_2 += "poster=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"poster"), env.opts.autoescape);
t_2 += "\"";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"autoplay")) {
t_2 += "autoplay";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"loop")) {
t_2 += "loop";
;
}
t_2 += "\n                ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"muted")) {
t_2 += "muted";
;
}
t_2 += "\n                playsinline\n                controls\n              >\n                <source src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")),"src"), env.opts.autoescape);
t_2 += "\" type=\"video/mp4\">\n                Your browser does not support the video tag.\n              </video>\n            </div>\n          ";
;
}
else {
t_2 += "\n            <!-- Custom markup -->\n            ";
t_2 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"media")), env.opts.autoescape);
t_2 += "\n          ";
;
}
;
}
t_2 += "\n        </div>\n      ";
;
}
t_2 += "\n    </div>\n  </section>\n";
})})})})})})})})})});
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("hero");
context.setVariable("hero", macro_t_1);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["organisms/testimonial-carousel/testimonial-carousel.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!-- components/organisms/testimonial-carousel/testimonial-carousel.njk -->\n\n";
output += "\n\n";
env.getTemplate("molecules/testimonial/testimonial.njk", false, "organisms/testimonial-carousel/testimonial-carousel.njk", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "testimonial")) {
var t_4 = t_1.testimonial;
} else {
cb(new Error("cannot import 'testimonial'")); return;
}
context.setVariable("testimonial", t_4);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
[], 
["props"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("props", Object.prototype.hasOwnProperty.call(kwargs, "props") ? kwargs["props"] : {});var t_6 = "";t_6 += "\n  ";
var t_7;
t_7 = {"testimonials": [],"heading": "","subheading": "","variant": "default","showArrows": true,"showDots": true,"autoplay": false,"className": "","id": "","attributes": {},"a11y": {}};
frame.set("defaults", t_7, true);
if(frame.topLevel) {
context.setVariable("defaults", t_7);
}
if(frame.topLevel) {
context.addExport("defaults", t_7);
}
t_6 += "\n\n  ";
var t_8;
t_8 = env.getFilter("merge").call(context, runtime.contextOrFrameLookup(context, frame, "defaults"),runtime.contextOrFrameLookup(context, frame, "props"));
frame.set("config", t_8, true);
if(frame.topLevel) {
context.setVariable("config", t_8);
}
if(frame.topLevel) {
context.addExport("config", t_8);
}
t_6 += "\n\n  <!-- Build class list (avoid complex filter chains) -->\n  ";
var t_9;
t_9 = "testimonial-carousel testimonial-carousel-" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"variant");
frame.set("classList", t_9, true);
if(frame.topLevel) {
context.setVariable("classList", t_9);
}
if(frame.topLevel) {
context.addExport("classList", t_9);
}
t_6 += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className")) {
t_6 += "\n    ";
var t_10;
t_10 = runtime.contextOrFrameLookup(context, frame, "classList") + " " + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"className");
frame.set("classList", t_10, true);
if(frame.topLevel) {
context.setVariable("classList", t_10);
}
if(frame.topLevel) {
context.addExport("classList", t_10);
}
t_6 += "\n  ";
;
}
t_6 += "\n\n  <!-- Main container -->\n  <section\n    class=\"";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "classList"), env.opts.autoescape);
t_6 += "\"\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id")) {
t_6 += "id=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"id"), env.opts.autoescape);
t_6 += "\"";
;
}
t_6 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role")) {
t_6 += "role=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"role"), env.opts.autoescape);
t_6 += "\"";
;
}
t_6 += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel")) {
t_6 += "aria-label=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"a11y")),"ariaLabel"), env.opts.autoescape);
t_6 += "\"";
;
}
else {
t_6 += "aria-label=\"Customer testimonials\"";
;
}
t_6 += "\n    ";
frame = frame.push();
var t_13 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"attributes");
if(t_13) {t_13 = runtime.fromIterator(t_13);
var t_11;
if(runtime.isArray(t_13)) {
var t_12 = t_13.length;
for(t_11=0; t_11 < t_13.length; t_11++) {
var t_14 = t_13[t_11][0];
frame.set("[object Object]", t_13[t_11][0]);
var t_15 = t_13[t_11][1];
frame.set("[object Object]", t_13[t_11][1]);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
t_6 += "\n      ";
t_6 += runtime.suppressValue(t_14, env.opts.autoescape);
t_6 += "=\"";
t_6 += runtime.suppressValue(t_15, env.opts.autoescape);
t_6 += "\"\n    ";
;
}
} else {
t_11 = -1;
var t_12 = runtime.keys(t_13).length;
for(var t_16 in t_13) {
t_11++;
var t_17 = t_13[t_16];
frame.set("key", t_16);
frame.set("value", t_17);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
t_6 += "\n      ";
t_6 += runtime.suppressValue(t_16, env.opts.autoescape);
t_6 += "=\"";
t_6 += runtime.suppressValue(t_17, env.opts.autoescape);
t_6 += "\"\n    ";
;
}
}
}
frame = frame.pop();
t_6 += "\n  >\n    <!-- Heading Section -->\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"heading")) {
t_6 += "\n      <div class=\"testimonial-carousel-header\">\n        <h2 class=\"testimonial-carousel-heading\">";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"heading"), env.opts.autoescape);
t_6 += "</h2>\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subheading")) {
t_6 += "\n          <p class=\"testimonial-carousel-subheading\">";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"subheading"), env.opts.autoescape);
t_6 += "</p>\n        ";
;
}
t_6 += "\n      </div>\n    ";
;
}
t_6 += "\n\n    <!-- Carousel Container -->\n    <div class=\"testimonial-carousel-container\"\n         data-autoplay=\"";
t_6 += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"autoplay")?"true":"false"), env.opts.autoescape);
t_6 += "\">\n\n      <!-- Testimonials Track -->\n      <div class=\"testimonial-carousel-track\" role=\"list\">\n        ";
frame = frame.push();
var t_20 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"testimonials");
if(t_20) {t_20 = runtime.fromIterator(t_20);
var t_19 = t_20.length;
for(var t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18];
frame.set("item", t_21);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
t_6 += "\n          <div class=\"testimonial-carousel-item\" role=\"listitem\">\n            ";
t_6 += runtime.suppressValue((lineno = 62, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "testimonial"), "testimonial", context, [t_21])), env.opts.autoescape);
t_6 += "\n          </div>\n        ";
;
}
}
frame = frame.pop();
t_6 += "\n      </div>\n\n      <!-- Navigation Arrows -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"showArrows") && env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"testimonials")) > 1) {
t_6 += "\n        <button\n          class=\"testimonial-carousel-arrow testimonial-carousel-arrow-prev\"\n          aria-label=\"Previous testimonial\"\n          type=\"button\"\n        >\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n            <path d=\"M15 18l-6-6 6-6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </button>\n\n        <button\n          class=\"testimonial-carousel-arrow testimonial-carousel-arrow-next\"\n          aria-label=\"Next testimonial\"\n          type=\"button\"\n        >\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n            <path d=\"M9 18l6-6-6-6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </button>\n      ";
;
}
t_6 += "\n\n      <!-- Pagination Dots -->\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"showDots") && env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"testimonials")) > 1) {
t_6 += "\n        <div class=\"testimonial-carousel-dots\" role=\"tablist\" aria-label=\"Testimonial navigation\">\n          ";
frame = frame.push();
var t_24 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "config")),"testimonials");
if(t_24) {t_24 = runtime.fromIterator(t_24);
var t_23 = t_24.length;
for(var t_22=0; t_22 < t_24.length; t_22++) {
var t_25 = t_24[t_22];
frame.set("item", t_25);
frame.set("loop.index", t_22 + 1);
frame.set("loop.index0", t_22);
frame.set("loop.revindex", t_23 - t_22);
frame.set("loop.revindex0", t_23 - t_22 - 1);
frame.set("loop.first", t_22 === 0);
frame.set("loop.last", t_22 === t_23 - 1);
frame.set("loop.length", t_23);
t_6 += "\n            <button\n              class=\"testimonial-carousel-dot";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") == 0) {
t_6 += " testimonial-carousel-dot-active";
;
}
t_6 += "\"\n              role=\"tab\"\n              aria-label=\"Go to testimonial ";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
t_6 += "\"\n              aria-selected=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") == 0) {
t_6 += "true";
;
}
else {
t_6 += "false";
;
}
t_6 += "\"\n              data-index=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
t_6 += "\"\n              type=\"button\"\n            ></button>\n          ";
;
}
}
frame = frame.pop();
t_6 += "\n        </div>\n      ";
;
}
t_6 += "\n    </div>\n  </section>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_6);
});
context.addExport("testimonialCarousel");
context.setVariable("testimonialCarousel", macro_t_5);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

