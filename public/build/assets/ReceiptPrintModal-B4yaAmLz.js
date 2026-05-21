import{h as I}from"./html2pdf-DjVg0qff.js";import{f as H}from"./currency-ox2L4ikb.js";import{m as l,e as d,a as t,u as s,h as R,v as F,g as a,d as u,p as m}from"./app-BW-ggD68.js";function O(V,g){return l(),d("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"})])}const $={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"},q={class:"bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"},Z={class:"sticky top-0 bg-white border-b p-4 flex justify-between items-center"},J={class:"text-lg font-bold text-gray-900"},W={class:"flex gap-2"},Y={class:"text-center mb-6"},G={class:"text-2xl font-bold text-primary-900"},K={style:{width:"100%","border-collapse":"collapse","margin-bottom":"2rem","padding-bottom":"1.25rem","border-bottom":"1px solid #e5e7eb","table-layout":"fixed"}},Q={style:{width:"33.33%","vertical-align":"top",padding:"1rem 1.25rem",border:"1px solid #f3f4f6","border-radius":"0.5rem"}},X={style:{"font-size":"0.75rem",color:"#6b7280","text-transform":"uppercase"}},tt={style:{"font-weight":"600","font-size":"0.875rem",color:"#111827","margin-top":"0.25rem"}},et={style:{width:"33.33%","vertical-align":"top",padding:"1rem 1.25rem",border:"1px solid #f3f4f6","border-radius":"0.5rem"}},ot={style:{"font-weight":"600",color:"#111827","margin-top":"0.25rem"}},rt={style:{width:"33.33%","vertical-align":"top",padding:"1rem 1.25rem",border:"1px solid #f3f4f6","border-radius":"0.5rem"}},st={style:{"font-weight":"600",color:"#111827","margin-top":"0.25rem"}},nt={key:0,style:{"font-size":"0.875rem",color:"#4b5563","margin-top":"0.25rem"}},it={key:1,style:{"font-size":"0.875rem",color:"#4b5563","margin-top":"0.25rem"}},at={class:"bg-gray-50 rounded-lg p-4 mb-6"},lt={class:"grid grid-cols-2 gap-4"},dt={class:"text-2xl font-bold text-primary-700"},mt={class:"text-right"},ct={class:"font-semibold text-gray-900"},pt={class:"mb-6"},ut={class:"text-sm min-w-[22rem]"},gt={key:0,class:"border-b"},bt={class:"text-gray-900 font-semibold py-2 text-left"},ft={class:"border-b"},xt={class:"text-gray-900 font-semibold py-2 text-left"},vt={class:"text-gray-900 font-semibold py-2 text-left"},yt={class:"border-t pt-4 mt-8 text-center text-xs text-gray-500"},ht={class:"mt-2"},Ct={__name:"ReceiptPrintModal",setup(V,{expose:g}){function P(){var n;const o=p.value;if(!o)return Promise.resolve();const e={margin:10,filename:`${i.value}-${((n=r.value)==null?void 0:n.receipt_number)||"receipt"}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{orientation:"portrait",unit:"mm",format:"a4"},pagebreak:{avoid:"div.container",mode:["avoid-all","css","legacy"]}};return I().set(e).from(o).save()}async function L(){await P()}const c=m(!1),r=m(null),i=m("receipt"),p=m(null);function j(o){return o?new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"N/A"}function B(o){return o?new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A"}function D(o){return H(o)}function b(o){return o?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}function U(){var e;const o=window.open("","","width=800,height=600");if(o){const n=((e=p.value)==null?void 0:e.innerHTML)||"";o.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${b(i.value)}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              padding: 20px;
              color: #333;
            }
            @media print {
              body { padding: 0; }
              .print-break { page-break-after: always; }
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            .font-semibold { font-weight: 600; }
            .text-2xl { font-size: 1.5rem; }
            .text-lg { font-size: 1.125rem; }
            .text-sm { font-size: 0.875rem; }
            .text-xs { font-size: 0.75rem; }
            .text-gray-900 { color: #111827; }
            .text-gray-600 { color: #4b5563; }
            .text-gray-500 { color: #6b7280; }
            .bg-gray-50 { background-color: #f9fafb; }
            .p-4 { padding: 1rem; }
            .p-8 { padding: 2rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .pb-4 { padding-bottom: 1rem; }
            .pt-4 { padding-top: 1rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-8 { margin-top: 2rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .border-b { border-bottom: 1px solid #e5e7eb; }
            .border-t { border-top: 1px solid #e5e7eb; }
            .uppercase { text-transform: uppercase; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 0.5rem 0; }
            td:first-child { color: #4b5563; }
          </style>
        </head>
        <body>
          ${n}
        </body>
      </html>
    `),o.document.close(),o.focus(),setTimeout(()=>o.print(),250)}}function E(o,e="receipt",n=null){r.value={...o,customer:(o==null?void 0:o.customer)||n||null},i.value=e,c.value=!0}function f(){c.value=!1,r.value=null}return g({open:E,close:f}),(o,e)=>{var n,x,v,y,h,_,w,k,C,z,A,M,N,S,T;return c.value?(l(),d("div",$,[t("div",q,[t("div",Z,[t("h2",J,s(i.value==="invoice"?"Invoice":"Receipt"),1),t("div",W,[t("button",{onClick:U,class:"btn-primary px-4 py-2 text-sm"},[R(F(O),{class:"w-4 h-4 inline mr-1"}),e[0]||(e[0]=a(" Print ",-1))]),t("button",{onClick:L,class:"btn-primary px-4 py-2 text-sm inline-flex items-center justify-center gap-1 whitespace-nowrap"},[...e[1]||(e[1]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",class:"w-4 h-4"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"})],-1),a(" Download ",-1)])]),t("button",{onClick:f,class:"btn-secondary px-4 py-2 text-sm"},"Close")])]),t("div",{ref_key:"printContent",ref:p,class:"p-8 bg-white"},[e[10]||(e[10]=t("div",{class:"section",style:{"margin-bottom":"20px","text-align":"center",padding:"15px 0","border-bottom":"1px solid #e0e0e0"}},[t("div",{style:{"font-size":"24px","line-height":"1.6",color:"#555","font-weight":"600","margin-bottom":"10px"}},[t("strong",null,[a("LU"),t("span",{style:{color:"#60a5fa"}},"MAC"),a(" Solutions")])]),t("div",{style:{"font-size":"14px","line-height":"1.6",color:"#666"}},[a(" Address: Jayasiripura, Anuradhapura, Sri Lanka"),t("br"),a(" Email: contact@lumac.lk"),t("br"),a(" Phone: 076 464 3050 ")])],-1)),t("div",Y,[t("div",G,s(i.value==="invoice"?"INVOICE":"RECEIPT"),1)]),t("table",K,[t("tr",null,[t("td",Q,[t("div",X,s(i.value==="invoice"?"Invoice":"Receipt")+" #",1),t("div",tt,s(((n=r.value)==null?void 0:n.receipt_number)||"N/A"),1)]),t("td",et,[e[2]||(e[2]=t("div",{style:{"font-size":"0.75rem",color:"#6b7280","text-transform":"uppercase"}},"Date",-1)),t("div",ot,s(j((x=r.value)==null?void 0:x.payment_date)),1)]),t("td",rt,[e[3]||(e[3]=t("div",{style:{"font-size":"0.75rem",color:"#6b7280","text-transform":"uppercase"}},"Bill To",-1)),t("div",st,s(((y=(v=r.value)==null?void 0:v.customer)==null?void 0:y.full_name)||"N/A"),1),(_=(h=r.value)==null?void 0:h.customer)!=null&&_.phone||(k=(w=r.value)==null?void 0:w.customer)!=null&&k.phone_number?(l(),d("div",nt,s(r.value.customer.phone||r.value.customer.phone_number),1)):(z=(C=r.value)==null?void 0:C.customer)!=null&&z.email?(l(),d("div",it,s(r.value.customer.email),1)):u("",!0)])])]),t("div",at,[t("div",lt,[t("div",null,[e[4]||(e[4]=t("div",{class:"text-xs text-gray-500 uppercase"},"Amount",-1)),t("div",dt,s(D((A=r.value)==null?void 0:A.amount)),1)]),t("div",mt,[e[5]||(e[5]=t("div",{class:"text-xs text-gray-500 uppercase"},"Payment Method",-1)),t("div",ct,s(b((M=r.value)==null?void 0:M.payment_method)),1)])])]),t("div",pt,[t("table",ut,[t("tbody",null,[(N=r.value)!=null&&N.notes?(l(),d("tr",gt,[e[6]||(e[6]=t("td",{class:"text-gray-600 py-2 pr-4 text-right"},"Notes:",-1)),t("td",bt,s(r.value.notes),1)])):u("",!0),t("tr",ft,[e[7]||(e[7]=t("td",{class:"text-gray-600 py-2 pr-4 text-right"},"Status:",-1)),t("td",xt,s(((S=r.value)==null?void 0:S.status)||"Completed"),1)]),t("tr",null,[e[8]||(e[8]=t("td",{class:"text-gray-600 py-2 pr-4 text-right"},"Created:",-1)),t("td",vt,s(B((T=r.value)==null?void 0:T.created_at)),1)])])])]),t("div",yt,[e[9]||(e[9]=t("p",null,"Thank you for your business!",-1)),t("p",ht,"This is a system-generated "+s(i.value)+". No signature is required.",1)])],512)])])):u("",!0)}}};export{Ct as _};
