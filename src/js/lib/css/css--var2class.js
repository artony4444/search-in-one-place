

// --- generate (.class) from (--var)

let identifier = "color"
let logs = 0
let info = 1

// ------------------------------------------------------------
//
//    Copyright © Artony4444 2024
//    Repository: https://github.com/artony4444/css--var2class/
//
// ------------------------------------------------------------


/* INFO -------------------------------- */


let info_no_sheet = () => [
    console.log(`add '${identifier}' inside <link ... >`),
    console.log(`<link ${identifier} rel="stylesheet" href="{sheet_loaction}">`)
]

let info_no_rules = () => [
console.log(`.css`),
console.log(`
.background-color
{
    --blue: blue;
    --red: rgb(255, 0, 0);
}

.border-radius
{
    --curve: 10px;
    --round: 100px;
}
`),

console.log(`.html`),
console.log(`
<div class="round blue">
    I am round blue
</div>
`),

console.log(" "),
console.log(`> how it works?`),
console.log(`.[property_name]
{
    --[class_name]: [value];
}`)];


/* ------------------------------------- */


let sheets = document.querySelectorAll(`link[${identifier}]`);

info && !sheets.length ? info_no_sheet() : 0;

sheets.forEach(l => generateClasses(l));

function generateClasses(link)
{
    let sheet = Array.from(document.styleSheets).find(s => s.href == link.href);
    
    let sheet_rules = sheet.cssRules || sheet.rules;
    
    let rules = Array.from(sheet_rules);
    
    /* log */  cprint(link, "before");
    
    /* info */ info && !rules.length ? info_no_rules() : 0;
    
    rules.forEach((r, i) => {
        
        let selector = r.selectorText;
        let cssText = selector != ":root" ? r.cssText.replace(selector, ':root') : r.cssText;
        let param = selector == ":root" ? "background-color" : selector.slice(1);
        
        sheet.deleteRule(0);
        sheet.insertRule(cssText, rules.length - 1);
        
        for(let c of (r ? r.style : []))
        {
            sheet.insertRule(`.${c.slice(2)} { ${param} : var(${c}) }`, sheet_rules.length);
        }
    })
    
    /* log */ cprint(link, "after");
}



function cprint(link, display="css")
{
    if(!logs) return;
    
    console.log(display, ":")
    
    let sheet = Array.from(document.styleSheets).find(s => s.href == link.href)
    let rules = Array.from(sheet.cssRules || sheet.rules);
    let txt = ""
    rules.forEach(r => txt += (r.cssText + "\n"))
    
    console.log(txt)
}
