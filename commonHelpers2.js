import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as t}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form"),n=document.querySelector('input[name="delay"]'),u=document.querySelector('input[value="fulfilled"]');document.querySelector('input[value="rejected"]');i.addEventListener("submit",m);function m(s){s.preventDefault();const o=Number(n.value),l=u.checked?"fulfilled":"rejected";new Promise((e,r)=>{setTimeout(()=>{l==="fulfilled"?e(o):r(o)},o)}).then(e=>{t.show({message:`✅ Fulfilled promise in ${e}ms`,messageColor:"white",backgroundColor:"#24d183",position:"topRight",iconColor:"white",close:!1,displayMode:1,timeout:3e3})},e=>{t.show({message:`❌ Rejected promise in ${e}ms`,messageColor:"white",backgroundColor:"#e03434",position:"topRight",iconColor:"white",close:!1,displayMode:1,timeout:3e3})}),i.reset()}
//# sourceMappingURL=commonHelpers2.js.map