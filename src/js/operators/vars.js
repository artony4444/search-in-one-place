var operator = {
    'match':   (w) => `"${w}"`,
    'or':  (...ws) => `(${ws.join(" OR ")})`, // (|)
    'and': (...ws) => `(${ws.join(" AND ")})`,
    'not':     (w) => `-${w}`,
    'any':      () => `*`,
    'group':   (w) => `(${w})`,
    'file':    (w) => `filetype:${w}`,
    'site':    (w) => `site:${w}`,
    'same':    (w) => `related:${w}`,
    'title':   (w) => `intitle:${w}`,  // allintitle
    'inurl':   (w) => `inurl:${w}`,    // allinurl
    'intext':  (w) => `intext:${w}`,   // allintext
    'before':  (w) => `before:${w}`,
    'after':   (w) => `after:${w}`
}

function operators(op, wds)
{
    if(op == "or" || op == "and") { return operator[op](...wds.split(", ")) }
    return wds.split(", ").map(wd => operator[op](wd) ).join(" ")
}

var google = {
    'url': 'https://google.com/search?igu=1&q=',
    'op': operators,
}

var bing = {
    'url': 'https://bing.com/search?q=',
    'op': operators,
}

var yahoo = {
    'url': 'https://search.yahoo.com/search?p=',
    'op': operators,
}

var duck = {
    'url': 'https://duckduckgo.com/?q=',
    'op': operators,
}

var engines = {
    "google": google,
    "bing": bing,
    "yahoo": yahoo,
    "duck": duck
}