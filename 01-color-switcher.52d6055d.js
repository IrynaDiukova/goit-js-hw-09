const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let o=null;t.addEventListener("click",(()=>{o=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(()=>{clearInterval(o),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.52d6055d.js.map
