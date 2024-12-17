var dom = (html) => document.createRange().createContextualFragment(html)


class filters
{
    constructor()
    {
        this.filters = document.getElementById("filters");
        this.container = document.getElementById("filtersContainer");
        this.searchInput = document.getElementById("searchInput");
        this.clearSearch = document.getElementById("searchClear");
        this.searchEngines = document.getElementById("searchEngine");
        this.setFiltersDisplay()
        
        this.workingEngines = ["google", "bing", ""];
        this.addSearchEngines()
        
        this.currentEngine = "google"
        this.currentQ = ""
    }
    
    /* Display */
    
    getFiltersDisplay()
    {
        return {
            'match':   ['Exact words',     'Exact match'],
            'or':      ['Any words',       'email, phone, contact'],
            'and':     ['All words',       'email, @gamil.com'],
            'not':     ['Negative words',  'Exclude'],
            'file':    ['File type',       'pdf, xls, xlsx, csv, json'],
            'site':    ['Site',            'gov.us, x.com, wiki.org'],
            'title':   ['Title',           'book name, file name'],
            'inurl':   ['In url',          '/contact, /about, .github.io'],
            'intext':  ['In text',         'Description'],
            'before':  ['Before',          'YYYY-MM-DD'],
            'after':   ['After',           'YYYY-MM-DD'],
        }
    }
    
    getFilterBox(id, name, ph)
    {
        return dom(`
            <div class="filterBox">
                <div class="filterName">${name}</div>
                <input id="filter_${id}" type="text" class="filterInput" placeholder="${ph}"></input>
            </div>
        `)
    }
    
    setFiltersDisplay()
    {
        let fd = this.getFiltersDisplay();
        for(let f in fd) { this.container.appendChild( this.getFilterBox(f, ...fd[f]) ) }
    }
    
    /* Buttons */
    
    toggleFilter()
    {
        this.filters.classList.toggle("hide")
    }
    
    clearInputs()
    {
        let inputs = this.container.querySelectorAll('input')
        inputs.forEach(i => i.value = '')
    }
    
    applyFilters()
    {
        let filter = []
        
        let inputs = this.container.querySelectorAll('input')
        
        inputs.forEach(i => { if(i.value) filter.push( operators(i.id.split("filter_")[1], i.value) ) })
        
        this.searchInput.value = filter.join(" ")
        this.toggleClearSearch()
    }
    
    toggleClearSearch()
    {
        if(this.searchInput.value) this.clearSearch.classList.remove("hide")
        else this.clearSearch.classList.add("hide")
    }
    
    clearSearchInput()
    {
        this.searchInput.value = "";
        this.toggleClearSearch();
    }
    
    searchEngine(engine)
    {
        if(engine) return dom(`
            <div class="engine full relative ofHide hide" id="${engine}">
                <div class="absolute full" style="z-index: 1; pointer-events: none; box-shadow: inset 0 calc(var(--space) * .5) calc(var(--space) * .5) calc(var(--space) * -.5) rgba(0,0,0,0.5);"></div>
                <iframe src="" width="100%" height="100%" style="border:none;"></iframe>
            </div>`) // src= ${engines[engine].url}
        else return dom(`
            <div id="engine_blank" class="full">
                <div class="flex col aCenter full paddingAround borderBox">
                    <div class="flex aCenter wfit padding marginT borderBox centerFont curve"  style="box-shadow: 0 0 0 1px var(--b2-c) inset">
                        <div class="b4-txt material-symbols-outlined" style="font-size: 1.3em;">info</div>
                        <div class="b4-txt">&nbsp;search something to get started! &nbsp;</div>
                    </div>
                </div>
            </div>`)
    }
    
    addSearchEngines()
    {
        this.workingEngines.forEach(e => { this.searchEngines.appendChild(this.searchEngine(e)) })
    }
    
    search(engine)
    {
        this.currentEngine = engine = engine ? engine : this.currentEngine
        
        let q = encodeURIComponent(this.searchInput.value);
        
        let selected = this.searchEngines.querySelectorAll(":scope > *:not(.hide)");
        selected.forEach(e => e.classList.add("hide"));
        
        if(!q)
        {
            this.searchEngines.querySelector("#engine_blank").classList.remove("hide")
            this.searchInput.focus();
            return;
        }
        
        this.searchInput.blur();
        
        if(this.workingEngines.includes(engine))
        {
            let e = this.searchEngines.querySelector(`#${engine}`)
            let f = e.querySelector("iframe")
            if(f.src != engines[engine].url + q) f.src = engines[engine].url + q;
            e.classList.remove("hide");
        }
        else
        {
            window.open(engines[engine].url + q, "_blank");
        }
    }
}



















