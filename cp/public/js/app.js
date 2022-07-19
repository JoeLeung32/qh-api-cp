/* 7/19/2022, 4:38:40 PM */
const core={lng:{changeTo:t=>{let n="";const{pathname:o}=window.location,e=o.split("/").filter((t=>t.length));e[0]=t,n="/"+e.join("/"),window.history.replaceState({},"",n)}}};
class Dialog{#t=null;#e=null;#s=null;#o=null;#i=null;#n=null;constructor(t,e){const s=this;this.#t=t,e.parent&&(this.#e=e.parent),this.#o=e,"visualViewport"in window&&window.visualViewport.addEventListener("resize",(function(t){s.#l(t)}))}init(){if(this.#s=document.querySelector(this.#e),!this.#s)return;let t=this,e=null;const s=this.#o.title,o=this.#o.content,i=this.#o.buttons,n=this.#o.canBeCloseByOverlay,l=this.#o.overlayOnClick,a=this.#o.minSize,c=document.createElement("div"),d=document.createElement("div"),r=document.createElement("div"),h=document.createElement("div"),p=document.createElement("div"),u=document.createElement("div");return c.className="dialog",d.className="dialog--overlay",r.className="dialog--container",h.className="dialog--title",p.className="dialog--body",u.className="dialog--footer",this.#t&&("object"==typeof this.#t?c.classList.add(...this.#t):this.#t.search(" ")>=0?c.classList.add(...this.#t.split(" ")):c.classList.add(this.#t)),i&&i.length&&(i.forEach((function(s){var o=document.createElement("button");o.className=s.className,s.text&&s.text.length&&(o.innerHTML=s.text),o.addEventListener("click",(function(o){s.onClick&&"function"==typeof s.onClick&&(e=t.#n,s.onClick(o,t,e)),s.close&&"boolean"==typeof s.close&&t.hide()})),u.appendChild(o)})),u.classList.add("hasContent")),"boolean"==typeof n&&n&&d.addEventListener("click",(function(s){l&&"function"==typeof l&&(e=t.#n,l(s,t,e)),t.hide()})),"boolean"==typeof a&&a&&r.classList.add("minSize"),r.appendChild(h),r.appendChild(p),r.appendChild(u),c.appendChild(d),c.appendChild(r),this.#s.appendChild(c),this.#i=c,this.content(o,s),this}show(){this.#i&&(this.#i.classList.add("show"),document.body.style.overflow="hidden")}hide(){this.#i&&(this.#i.classList.remove("show"),document.body.style.overflow="")}toggle(){this.#i&&(this.#i.classList.toggle("show"),this.#i.classList.contains("show")?document.body.style.overflow="hidden":document.body.style.overflow="")}store(t){return this.#n=t,this}content(t,e){if(!this.#i)return;const s=this.#i.querySelector(".dialog--title"),o=this.#i.querySelector(".dialog--body");return s.classList.remove("hasContent"),o.classList.remove("hasContent"),s.innerText="",o.innerHTML="",t&&("string"==typeof t&&t.length?o.innerHTML=t:"object"==typeof t&&(o.innerHTML="",o.appendChild(t)),o.classList.add("hasContent")),e&&e.length&&(s.innerText=e,s.classList.add("hasContent")),this}callback(t){"function"==typeof t&&t()}#l(t){if(!this.#i)return;const e=this.#i.querySelector(".dialog--container"),s=window.innerHeight-t.target.height;let o,i=e.querySelector(":focus");this.#i.classList.contains("show")?(i=e.querySelector(":focus"),e.style.paddingBottom=s+"px",i&&(o=i.getBoundingClientRect().top-50,e.scrollTo({top:o,behavior:"smooth"}))):e.style.paddingBottom=""}}
const __evtOL=[],__evtOR=[],eventListener={onload:{add:(e,_=0)=>{__evtOL.push({c:e,p:_}),__evtOL.sort(((e,_)=>_.p-e.p))}},resize:{add:(e,_=0)=>{__evtOR.push({c:e,p:_}),__evtOR.sort(((e,_)=>_.p-e.p))}}};window.onload=e=>{__evtOL&&__evtOL.length&&__evtOL.forEach((_=>{"function"==typeof _.c&&_.c(e)}))},window.onresize=e=>{__evtOR&&__evtOR.length&&__evtOR.forEach((_=>{"function"==typeof _.c&&_.c(e)}))};
class Paginator{#e=null;#t=null;#a=null;#n=null;#i=null;#r=null;#s=null;#l=1;#g=null;#o=5;#c=10;#h=null;#d=null;#p=null;#m=null;#P=" / Page";constructor(e,t){this.#e=e,t.parent&&(this.#t=t.parent),t.firstPageString&&(this.#n=t.firstPageString),t.lastPageString&&(this.#i=t.lastPageString),t.prevPageString&&(this.#r=t.prevPageString),t.nextPageString&&(this.#s=t.nextPageString),t.startForm&&(this.#l=t.startForm),t.maxPage&&(this.#g=t.maxPage),t.displayLength&&(this.#o=t.displayLength),t.eachPageMaxItems&&(this.#c=t.eachPageMaxItems),t.pageWording&&(this.#P=t.pageWording),t.onClick&&(this.#h=t.onClick)}init(){this.initNavBasic(),this.initController()}initNavBasic(){if(this.#a=document.querySelector(this.#t),!this.#a)return;const e=document.createElement("nav"),t=document.createElement("ul");e.className="paginator--main",this.#u(t,this.#l),e.appendChild(t),this.#a.appendChild(e),this.#p=e,this.#S()}initController(){if(this.#a=document.querySelector(this.#t),!this.#a)return;const e=document.createElement("div");e.className="paginator--prepage",this.#a.appendChild(this.#b(e)),this.#m=e}updateController(e){this.#c=e,this.#b(this.#m)}#b(e){const t=document.createElement("span"),a=document.createElement("span");return t.innerHTML=this.#c,a.innerHTML=this.#P,e.innerHTML="",e.appendChild(t),e.appendChild(a),e}#v(e,t,a){const n=this,i=document.createElement("li");return i.dataset.type=t,a&&(i.dataset.number=a),i.innerHTML=e,i.addEventListener("click",(function(){switch(!0){case"first"===t:a=1;break;case"last"===t:a=n.#g;break;case"prev"===t:a=n.#d-1;break;case"next"===t:a=n.#d+1}n.#x(t,a),n.#h&&"function"==typeof n.#h&&n.#h(t,a||null)})),i}#u(e,t){let a=2*Number(this.#o),n=Number(t)-Number(this.#o),i=0;n<=0&&(n=1),this.#g&&n+a>this.#g&&(n+=this.#g-(n+a)),n<=0&&(n=1),i=n+a,this.#g&&i>this.#g&&(i=this.#g),t!==n&&(this.#n&&e.appendChild(this.#v(this.#n,"first")),this.#r&&e.appendChild(this.#v(this.#r,"prev")));for(let t=n;t<=i;t++)e.appendChild(this.#v(t,"indicator",t));t!==i&&(this.#s&&e.appendChild(this.#v(this.#s,"next")),this.#i&&e.appendChild(this.#v(this.#i,"last"))),this.#d=t}#S(){const e=this.#d,t=this.#p.querySelectorAll('[data-type="indicator"]'),a=this.#p.querySelector('[data-type="indicator"][data-number="'+e+'"]');t.forEach((function(e){e.classList.remove("active")})),a&&a.classList.add("active")}#x(e,t){const a=this.#p.querySelector("ul");this.#p.querySelectorAll("li[data-type]").forEach((function(e){e.remove()})),this.#u(a,t),this.#S()}}
class Table{#e=null;#t=null;#a=null;#n=null;#s=null;#i=null;#d='<i class="fa-solid fa-spinner fa-spin"></i> Loading...';constructor(e,t){this.#e=e,t.parent&&(this.#t=t.parent),t.header&&(this.#n=t.header),t.dataCell&&(this.#s=t.dataCell)}init(){if(this.#a=document.querySelector(this.#t),!this.#a)return;const e=document.createElement("table"),t=document.createElement("thead"),a=document.createElement("tbody"),n=document.createElement("tfoot");if(e.className="hyper-responsive-table",this.#e&&("object"==typeof this.#e?e.classList.add(...this.#e):this.#e.search(" ")>=0?e.classList.add(...this.#e.split(" ")):e.classList.add(this.#e)),this.#n&&this.#n.length){const e=document.createElement("tr");this.#n.forEach((function(t){const a=document.createElement("th");a.innerText=t.plainText,e.appendChild(a)})),t.appendChild(e)}return e.appendChild(t),e.appendChild(a),e.appendChild(n),this.#a.appendChild(e),this.#i=e,this}isLoading(e){return this.#l(e||this.#d),this}data(e){const t=this.#i.querySelector("tbody");if(!e||!e.length)return void this.#l("No Data.");const a=this.#n,n=this.#s;return t.innerHTML="",e.forEach((function(e){const s=document.createElement("tr");a.forEach((function(t){const{key:a,plainText:i,className:d,width:l}=t,r=document.createElement("td"),c=document.createElement("span"),h=document.createElement("div");switch(r.dataset.header=i,r.dataset.key=a,!0){case["number","string"].includes(typeof n[a]):c.innerHTML=n[a],r.appendChild(c);break;case["function"].includes(typeof n[a]):r.appendChild(h),n[a](e,h)}["number","string"].includes(typeof e[a])&&(r.innerHTML="",c.innerHTML=e[a],r.appendChild(c)),s.appendChild(r)})),t.appendChild(s)})),this}#l(e){const t=this.#i.querySelector("tbody"),a=document.createElement("tr"),n=document.createElement("td");n.setAttribute("colspan",this.#n.length),n.className="text-center message py-5",n.innerHTML=e,a.appendChild(n),t.innerHTML="",t.appendChild(a)}}