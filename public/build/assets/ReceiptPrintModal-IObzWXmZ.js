import{f as U}from"./currency-ox2L4ikb.js";import{k as i,e as a,a as t,t as r,h as B,u as I,g as P,d,l as c}from"./app-widUkANZ.js";function E(A,u){return i(),a("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"})])}const H={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"},R={class:"bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"},O={class:"sticky top-0 bg-white border-b p-4 flex justify-between items-center"},j={class:"text-lg font-bold text-gray-900"},F={class:"flex gap-2"},Z={class:"text-center mb-6"},$={class:"text-sm text-gray-600"},q={class:"grid grid-cols-2 gap-4 mb-6 pb-4 border-b"},W={class:"text-xs text-gray-500 uppercase"},Y={class:"font-semibold text-lg"},G={class:"text-right"},J={class:"font-semibold"},K={class:"mb-6"},Q={class:"text-gray-900"},X={class:"font-semibold"},tt={key:0,class:"text-sm text-gray-600"},et={key:1,class:"text-sm text-gray-600"},st={class:"bg-gray-50 rounded-lg p-4 mb-6"},ot={class:"grid grid-cols-2 gap-4"},rt={class:"text-2xl font-bold text-primary-700"},nt={class:"text-right"},it={class:"font-semibold text-gray-900"},at={class:"mb-6"},lt={class:"w-full text-sm"},dt={key:0,class:"border-b"},ct={class:"text-gray-900 font-semibold py-2"},mt={class:"border-b"},ut={class:"text-gray-900 font-semibold py-2"},pt={class:"text-gray-900 font-semibold py-2"},gt={class:"border-t pt-4 mt-8 text-center text-xs text-gray-500"},xt={class:"mt-2"},vt={__name:"ReceiptPrintModal",setup(A,{expose:u}){const m=c(!1),o=c(null),n=c("receipt"),p=c(null);function D(s){return s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"N/A"}function L(s){return s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A"}function M(s){return U(s)}function g(s){return s?s.charAt(0).toUpperCase()+s.slice(1).toLowerCase():""}function S(){var e;const s=window.open("","","width=800,height=600");if(s){const l=((e=p.value)==null?void 0:e.innerHTML)||"";s.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${g(n.value)}</title>
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
          ${l}
        </body>
      </html>
    `),s.document.close(),s.focus(),setTimeout(()=>s.print(),250)}}function z(s,e="receipt"){o.value=s,n.value=e,m.value=!0}function x(){m.value=!1,o.value=null}return u({open:z,close:x}),(s,e)=>{var l,b,y,v,f,_,h,w,k,C,N,T,V;return m.value?(i(),a("div",H,[t("div",R,[t("div",O,[t("h2",j,r(n.value==="invoice"?"Invoice":"Receipt"),1),t("div",F,[t("button",{onClick:S,class:"btn-primary px-4 py-2 text-sm"},[B(I(E),{class:"w-4 h-4 inline mr-1"}),e[0]||(e[0]=P(" Print ",-1))]),t("button",{onClick:x,class:"btn-secondary px-4 py-2 text-sm"},"Close")])]),t("div",{ref_key:"printContent",ref:p,class:"p-8 bg-white"},[t("div",Z,[e[1]||(e[1]=t("div",{class:"text-2xl font-bold text-primary-900"},"LUMAC",-1)),t("div",$,r(n.value==="invoice"?"INVOICE":"RECEIPT"),1)]),t("div",q,[t("div",null,[t("div",W,r(n.value==="invoice"?"Invoice":"Receipt")+" #",1),t("div",Y,r(((l=o.value)==null?void 0:l.receipt_number)||"N/A"),1)]),t("div",G,[e[2]||(e[2]=t("div",{class:"text-xs text-gray-500 uppercase"},"Date",-1)),t("div",J,r(D((b=o.value)==null?void 0:b.payment_date)),1)])]),t("div",K,[e[3]||(e[3]=t("div",{class:"text-xs text-gray-500 uppercase font-semibold mb-2"},"Bill To",-1)),t("div",Q,[t("div",X,r(((v=(y=o.value)==null?void 0:y.customer)==null?void 0:v.full_name)||"N/A"),1),(_=(f=o.value)==null?void 0:f.customer)!=null&&_.email?(i(),a("div",tt,r(o.value.customer.email),1)):d("",!0),(w=(h=o.value)==null?void 0:h.customer)!=null&&w.phone_number?(i(),a("div",et,r(o.value.customer.phone_number),1)):d("",!0)])]),t("div",st,[t("div",ot,[t("div",null,[e[4]||(e[4]=t("div",{class:"text-xs text-gray-500 uppercase"},"Amount",-1)),t("div",rt,r(M((k=o.value)==null?void 0:k.amount)),1)]),t("div",nt,[e[5]||(e[5]=t("div",{class:"text-xs text-gray-500 uppercase"},"Payment Method",-1)),t("div",it,r(g((C=o.value)==null?void 0:C.payment_method)),1)])])]),t("div",at,[t("table",lt,[t("tbody",null,[(N=o.value)!=null&&N.notes?(i(),a("tr",dt,[e[6]||(e[6]=t("td",{class:"text-gray-600 py-2"},"Notes:",-1)),t("td",ct,r(o.value.notes),1)])):d("",!0),t("tr",mt,[e[7]||(e[7]=t("td",{class:"text-gray-600 py-2"},"Status:",-1)),t("td",ut,r(((T=o.value)==null?void 0:T.status)||"Completed"),1)]),t("tr",null,[e[8]||(e[8]=t("td",{class:"text-gray-600 py-2"},"Created:",-1)),t("td",pt,r(L((V=o.value)==null?void 0:V.created_at)),1)])])])]),t("div",gt,[e[9]||(e[9]=t("p",null,"Thank you for your business!",-1)),t("p",xt,"This is a system-generated "+r(n.value)+". No signature is required.",1)])],512)])])):d("",!0)}}};export{vt as _};
