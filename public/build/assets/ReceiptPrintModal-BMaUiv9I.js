import{h as R,o as F}from"./quotationGenerator-3HfPkgdk.js";import{m as c,e as m,a as t,u as r,h as O,v as W,g as a,d as x,p as u,z as $}from"./app-Biqdapyi.js";import{f as q}from"./currency-ox2L4ikb.js";function Z(V,b){return c(),m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"})])}const J={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"},Y={class:"bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"},G={class:"sticky top-0 bg-white border-b p-4 flex justify-between items-center"},K={class:"text-lg font-bold text-gray-900"},Q={class:"flex gap-2"},X={class:"text-center mb-6"},tt={class:"text-2xl font-bold text-primary-900"},et={class:"grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 pb-5 border-b"},ot={class:"rounded-lg border border-gray-100 px-5 py-4"},st={class:"text-xs text-gray-500 uppercase"},rt={class:"font-semibold text-sm text-gray-900 mt-1"},nt={class:"rounded-lg border border-gray-100 px-5 py-4"},it={class:"font-semibold text-gray-900 mt-1"},at={class:"rounded-lg border border-gray-100 px-5 py-4"},lt={class:"font-semibold text-gray-900 mt-1"},dt={key:0,class:"text-sm text-gray-600 mt-1"},ct={key:1,class:"text-sm text-gray-600 mt-1"},mt={class:"bg-gray-50 rounded-lg p-4 mb-6"},ut={class:"grid grid-cols-2 gap-4"},pt={class:"text-2xl font-bold text-primary-700"},gt={class:"text-right"},xt={class:"font-semibold text-gray-900"},bt={class:"mb-6 flex justify-center"},ft={class:"text-sm min-w-[22rem]"},yt={key:0,class:"border-b"},vt={class:"text-gray-900 font-semibold py-2 text-left"},ht={class:"border-b"},_t={class:"text-gray-900 font-semibold py-2 text-left"},wt={class:"text-gray-900 font-semibold py-2 text-left"},kt={class:"border-t pt-4 mt-8 text-center text-xs text-gray-500"},Ct={class:"mt-2"},Tt={__name:"ReceiptPrintModal",setup(V,{expose:b}){function L(){var n;const o=g.value;if(!o)return Promise.resolve();const e={margin:10,filename:`${i.value}-${((n=s.value)==null?void 0:n.receipt_number)||"receipt"}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{orientation:"portrait",unit:"mm",format:"a4"},pagebreak:{avoid:"div.container",mode:["avoid-all","css","legacy"]}};return R().set(e).from(o).save()}function M(){var e,n,l,d;const o=((n=(e=s.value)==null?void 0:e.customer)==null?void 0:n.phone)||((d=(l=s.value)==null?void 0:l.customer)==null?void 0:d.phone_number);if(!o){B("No phone number found for this customer.");return}F(o)}async function j(){await L(),M()}const{success:B}=$(),p=u(!1),s=u(null),i=u("receipt"),g=u(null);function D(o){return o?new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"N/A"}function U(o){return o?new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A"}function E(o){return q(o)}function f(o){return o?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}function I(){var e;const o=window.open("","","width=800,height=600");if(o){const n=((e=g.value)==null?void 0:e.innerHTML)||"";o.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${f(i.value)}</title>
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
    `),o.document.close(),o.focus(),setTimeout(()=>o.print(),250)}}function H(o,e="receipt",n=null){s.value={...o,customer:(o==null?void 0:o.customer)||n||null},i.value=e,p.value=!0}function y(){p.value=!1,s.value=null}return b({open:H,close:y}),(o,e)=>{var n,l,d,v,h,_,w,k,C,A,N,S,T,z,P;return p.value?(c(),m("div",J,[t("div",Y,[t("div",G,[t("h2",K,r(i.value==="invoice"?"Invoice":"Receipt"),1),t("div",Q,[t("button",{onClick:I,class:"btn-primary px-4 py-2 text-sm"},[O(W(Z),{class:"w-4 h-4 inline mr-1"}),e[0]||(e[0]=a(" Print ",-1))]),t("button",{onClick:j,class:"btn-primary min-w-[9.5rem] px-4 py-2 text-sm inline-flex items-center justify-center gap-1 whitespace-nowrap"},[...e[1]||(e[1]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",class:"w-4 h-4"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M16.862 13.487c-.272-.136-1.607-.793-1.856-.883-.249-.09-.43-.136-.611.136-.181.272-.7.883-.858 1.064-.158.181-.317.204-.589.068-.272-.136-1.148-.423-2.187-1.35-.809-.721-1.355-1.612-1.515-1.884-.158-.272-.017-.419.12-.555.123-.122.272-.317.408-.476.136-.158.181-.272.272-.453.09-.181.045-.34-.022-.476-.068-.136-.611-1.477-.837-2.027-.221-.53-.447-.457-.611-.466l-.52-.009c-.181 0-.476.068-.726.34-.249.272-.953.933-.953 2.27 0 1.337.977 2.63 1.113 2.81.136.181 1.924 2.939 4.668 3.999.653.225 1.162.36 1.56.461.655.167 1.252.144 1.724.087.526-.062 1.607-.656 1.834-1.289.227-.633.227-1.176.159-1.289-.068-.113-.249-.181-.521-.317z"}),t("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor","stroke-width":"2"})],-1),a(" Download & Send ",-1)])]),t("button",{onClick:y,class:"btn-secondary px-4 py-2 text-sm"},"Close")])]),t("div",{ref_key:"printContent",ref:g,class:"p-8 bg-white"},[e[10]||(e[10]=t("div",{class:"section",style:{"margin-bottom":"20px","text-align":"center",padding:"15px 0","border-bottom":"1px solid #e0e0e0"}},[t("div",{style:{"font-size":"24px","line-height":"1.6",color:"#555","font-weight":"600","margin-bottom":"10px"}},[t("strong",null,[a("LU"),t("span",{style:{color:"#60a5fa"}},"MAC"),a(" Solutions")])]),t("div",{style:{"font-size":"14px","line-height":"1.6",color:"#666"}},[a(" Address: Jayasiripura, Anuradhapura, Sri Lanka"),t("br"),a(" Email: contact@lumac.lk"),t("br"),a(" Phone: 076 464 3050 ")])],-1)),t("div",X,[t("div",tt,r(i.value==="invoice"?"INVOICE":"RECEIPT"),1)]),t("div",et,[t("div",ot,[t("div",st,r(i.value==="invoice"?"Invoice":"Receipt")+" #",1),t("div",rt,r(((n=s.value)==null?void 0:n.receipt_number)||"N/A"),1)]),t("div",nt,[e[2]||(e[2]=t("div",{class:"text-xs text-gray-500 uppercase"},"Date",-1)),t("div",it,r(D((l=s.value)==null?void 0:l.payment_date)),1)]),t("div",at,[e[3]||(e[3]=t("div",{class:"text-xs text-gray-500 uppercase"},"Bill To",-1)),t("div",lt,r(((v=(d=s.value)==null?void 0:d.customer)==null?void 0:v.full_name)||"N/A"),1),(_=(h=s.value)==null?void 0:h.customer)!=null&&_.phone||(k=(w=s.value)==null?void 0:w.customer)!=null&&k.phone_number?(c(),m("div",dt,r(s.value.customer.phone||s.value.customer.phone_number),1)):(A=(C=s.value)==null?void 0:C.customer)!=null&&A.email?(c(),m("div",ct,r(s.value.customer.email),1)):x("",!0)])]),t("div",mt,[t("div",ut,[t("div",null,[e[4]||(e[4]=t("div",{class:"text-xs text-gray-500 uppercase"},"Amount",-1)),t("div",pt,r(E((N=s.value)==null?void 0:N.amount)),1)]),t("div",gt,[e[5]||(e[5]=t("div",{class:"text-xs text-gray-500 uppercase"},"Payment Method",-1)),t("div",xt,r(f((S=s.value)==null?void 0:S.payment_method)),1)])])]),t("div",bt,[t("table",ft,[t("tbody",null,[(T=s.value)!=null&&T.notes?(c(),m("tr",yt,[e[6]||(e[6]=t("td",{class:"text-gray-600 py-2 pr-4 text-right"},"Notes:",-1)),t("td",vt,r(s.value.notes),1)])):x("",!0),t("tr",ht,[e[7]||(e[7]=t("td",{class:"text-gray-600 py-2 pr-4 text-right"},"Status:",-1)),t("td",_t,r(((z=s.value)==null?void 0:z.status)||"Completed"),1)]),t("tr",null,[e[8]||(e[8]=t("td",{class:"text-gray-600 py-2 pr-4 text-right"},"Created:",-1)),t("td",wt,r(U((P=s.value)==null?void 0:P.created_at)),1)])])])]),t("div",kt,[e[9]||(e[9]=t("p",null,"Thank you for your business!",-1)),t("p",Ct,"This is a system-generated "+r(i.value)+". No signature is required.",1)])],512)])])):x("",!0)}}};export{Tt as _};
