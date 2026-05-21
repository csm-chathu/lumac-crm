import{w as ut,r as A,l as pt,e as a,a as t,I as R,D as mt,C as I,d as F,F as P,q,v as B,g as gt,u as c,c as Q,p as _,z as xt,m as l,j as W,J as ft}from"./app-BW-ggD68.js";import{u as ht}from"./customers-tmmL6Xxt.js";import{u as yt}from"./solutions-DmUiZ8tp.js";import{f as bt}from"./currency-ox2L4ikb.js";import{h as vt}from"./html2pdf-DjVg0qff.js";function wt(x){if(!x)return;let r=x.replace(/\D/g,"");r.startsWith("0")&&(r="94"+r.substring(1));const n=`https://wa.me/${r}`;window.open(n,"_blank")}function _t(x,r="a4"){const{customer:n,items:f,final_total:j,quote_number:p,discount_rate:S}=x,C=f.some(u=>u.solution_id!==null&&u.solution_id!==void 0),d=f.reduce((u,h)=>u+h.quantity*h.unit_price,0),g=Number(j??d),s=r==="a5"?"11px":"14px",y=`padding: 8px; border-bottom: 1px solid #e0e0e0; font-size: ${s};`,D=f.map((u,h)=>`
    <tr>
      <td style="${y}">${h+1}</td>
      <td style="${y}">${u.item_name||"Item"}</td>
      <td style="${y} text-align: right;">${u.quantity}</td>
      <td style="${y} text-align: right;">LKR ${Number(u.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td style="${y} text-align: right;">LKR ${Number(u.quantity*u.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
    </tr>
  `).join(""),z=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quotation #${p}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: ${r==="a5"?"A5":"A4"};
          margin: 10mm;
        }

        .pdf-footer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          text-align: center;
          font-size: ${r==="a5"?"9px":"11px"};
          color: #999;
          border-top: 1px solid #e0e0e0;
          padding: 4px 0 2px 0;
        }
        
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.4;
          margin: 0;
          padding: 0;
        }

        .page-wrap {
          width: 100%;
          height: ${r==="a5"?"190mm":"277mm"};
          border-collapse: collapse;
        }

        .page-content {
          vertical-align: top;
          padding: 8px;
        }

        .page-footer {
          vertical-align: bottom;
          height: 1px;
          padding: 8px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
          font-size: ${r==="a5"?"9px":"11px"};
          color: #999;
          white-space: nowrap;
        }
        
        .section {
          margin-bottom: 15px;
        }
        
        .section-title {
          font-size: ${s};
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .section-content {
          font-size: ${s};
          line-height: 1.6;
        }
        
        .two-column {
          display: flex;
          width: 100%;
          margin-bottom: 15px;
        }

        .two-column > div {
          flex: 1;
          vertical-align: top;
        }

        .quote-details {
          text-align: right;
          padding-left: 16px;
        }

        .quote-details .section-title {
          text-align: right;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          margin-bottom: 15px;
        }
        
        table th {
          background-color: #1e40af;
          color: white;
          padding: 10px 8px;
          text-align: left;
          font-size: ${s};
          font-weight: 600;
        }

        table th.text-right {
          text-align: right;
        }

        table td {
          padding: 8px;
          border-bottom: 1px solid #e0e0e0;
          font-size: ${s};
        }

        table td.text-right {
          text-align: right;
        }
        
        .items-table {
          margin-bottom: 20px;
        }
        
        .notes {
          margin-top: 15px;
          padding: 10px;
          background-color: #f9fafb;
          border-left: 3px solid #1e40af;
          font-size: ${s};
          line-height: 1.5;
        }

        .payment-schedule {
          margin-top: 20px;
          margin-bottom: 15px;
        }

        .payment-schedule-title {
          font-size: ${s};
          font-weight: 600;
          margin-bottom: 8px;
        }

        .payment-schedule ul {
          list-style: disc;
          padding-left: 20px;
          font-size: ${s};
          line-height: 1.8;
        }

        .terms {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .terms h2 {
          font-size: ${r==="a5"?"14px":"18px"};
          font-weight: 700;
          margin-bottom: 10px;
        }

        .terms ol {
          padding-left: 20px;
          font-size: ${s};
          line-height: 1.8;
        }

        .terms ol li {
          margin-bottom: 4px;
        }

        .signatures {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
          margin-bottom: 20px;
        }

        .signature-block {
          width: 45%;
        }

        .signature-line {
          border-top: 1px solid #333;
          margin-bottom: 8px;
        }

        .signature-label {
          font-size: ${s};
          font-weight: 700;
        }

        
        .print-date {
          font-size: ${s};
          color: #666;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <table class="page-wrap">
        <tr><td class="page-content">
        <!-- Letterhead -->
        <div class="section" style="margin-bottom: 20px; text-align: center; padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
          <div style="font-size: ${r==="a5"?"18px":"24px"}; line-height: 1.6; color: #555; font-weight: 600; margin-bottom: 10px;">
            <strong>LU<span style="color: #60a5fa;">MAC</span> Solutions</strong>
          </div>
          <div style="font-size: ${s}; line-height: 1.6; color: #666;">
            Address: Jayasiripura, Anuradhapura, Sri Lanka<br>
            Email: contact@lumac.lk<br>
            Phone: 076 464 3050
          </div>
        </div>
        
        <!-- Customer & Date Info -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding: 0 8px 0 0;">
              <div style="font-size: ${s}; font-weight: 600; color: #1e40af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Bill To</div>
              <div style="font-size: ${s}; line-height: 1.6;">
                <strong>${(n==null?void 0:n.full_name)||"N/A"}</strong><br>
                ${n!=null&&n.email?`Email: ${n.email}<br>`:""}
                ${n!=null&&n.phone?`Phone: ${n.phone}<br>`:""}
                ${n!=null&&n.address?`Address: ${n.address}`:""}
              </div>
            </td>
            <td style="width: 50%; vertical-align: top; padding: 0 0 0 8px; text-align: right;">
              <div style="font-size: ${s}; font-weight: 600; color: #1e40af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Quote Details</div>
              <div style="font-size: ${s}; line-height: 1.6;">
                <div style="margin-bottom: 5px;"><strong>Date:</strong> ${z}</div>
                <div style="margin-bottom: 5px;"><strong>Status:</strong> Issued</div>
              </div>
            </td>
          </tr>
        </table>
        
        <!-- Items Table -->
        <table style="width: 100%; border-collapse: collapse; table-layout: fixed; margin-bottom: 0;">
          <colgroup>
            <col style="width: 5%;">
            <col style="width: 40%;">
            <col style="width: 15%;">
            <col style="width: 20%;">
            <col style="width: 20%;">
          </colgroup>
          <thead>
            <tr>
              <th style="background-color: #1e40af; color: white; padding: 10px 8px; text-align: left; font-size: ${s};">#</th>
              <th style="background-color: #1e40af; color: white; padding: 10px 8px; text-align: left; font-size: ${s};">Description</th>
              <th style="background-color: #1e40af; color: white; padding: 10px 8px; text-align: right; font-size: ${s};">Quantity</th>
              <th style="background-color: #1e40af; color: white; padding: 10px 8px; text-align: right; font-size: ${s};">Unit Price</th>
              <th style="background-color: #1e40af; color: white; padding: 10px 8px; text-align: right; font-size: ${s};">Total</th>
            </tr>
          </thead>
          <tbody>
            ${D}
          </tbody>
          <!-- Totals inside table for perfect alignment -->
          <tfoot>
            <tr>
              <td colspan="4" style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${s}; text-align: right; font-weight: 600;">Subtotal:</td>
              <td style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${s}; text-align: right;">LKR ${Number(d).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
            <tr>
              <td colspan="4" style="padding: 10px 8px; border-top: 2px solid #1e40af; font-size: ${r==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #1e40af;">TOTAL:</td>
              <td style="padding: 10px 8px; border-top: 2px solid #1e40af; font-size: ${r==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #1e40af;">LKR ${Number(g).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
          </tfoot>
        </table>
        
        <!-- Payment Schedule (solutions only) -->
        ${C?`
        <div class="payment-schedule">
          <div class="payment-schedule-title">Payment Schedule</div>
          <ul>
            <li><strong>Initial Payment (50%):</strong> LKR ${Number(g/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} (Payable upon confirmation)</li>
            <li><strong>Final Payment (50%):</strong> LKR ${Number(g/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} (Payable after one week of system usage)</li>
          </ul>
        </div>

        `:""}

        <!-- Terms and Conditions (always shown) -->
        <div class="terms">
          <h2>Terms and Conditions</h2>
          <ol>
            ${C?"<li><strong>Hosting Renewal:</strong> The hosting and domain service is valid for one (1) year. It must be renewed annually to maintain service.</li>":""}
            <li><strong>Validity:</strong> This quotation is valid for 30 days from the date of issue.</li>
            <li><strong>Warranty:</strong> Hardware items carry a 12-month warranty against manufacturing defects.</li>
          </ol>
        </div>

        <!-- System generated note -->
        <div style="margin-top: 40px; margin-bottom: 10px; text-align: center; font-size: ${s}; color: #888;">
          This is a system generated quotation.
        </div>
        </td></tr>
      </table>
    </body>
    </html>
  `}function G(x,r="a4"){const n=`quotation-${x.quote_number}.pdf`;return J(x,r).then(f=>{const j=URL.createObjectURL(f),p=document.createElement("a");p.href=j,p.download=n,p.click(),URL.revokeObjectURL(j)})}function J(x,r="a4"){const n=_t(x,r),f={margin:10,filename:`quotation-${x.quote_number}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{orientation:"portrait",unit:"mm",format:r==="a5"?"a5":"a4"},pagebreak:{avoid:"div.container",mode:["avoid-all","css","legacy"]}};return vt().set(f).from(n).outputPdf("blob")}const kt={class:"max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6"},$t={class:"card"},Ct={class:"flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4"},jt={class:"flex flex-row flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto"},St={key:0,class:"text-sm text-gray-500"},Lt={key:1,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"},Dt={class:"font-medium text-gray-800"},zt={class:"text-gray-500"},Ft={class:"text-gray-500"},Qt={class:"text-gray-500"},Mt={class:"mt-2"},Pt={class:"flex gap-2 flex-wrap"},qt=["onClick"],Nt=["onClick"],Tt=["onClick"],At={key:2,class:"text-sm text-gray-500"},Rt={key:0,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"},Bt={class:"bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto"},Ut={class:"p-5 md:p-6 space-y-5"},Ot={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},Kt=["value"],Vt={class:"input-field bg-gray-50 text-gray-500 flex items-center gap-2 cursor-not-allowed select-none"},Ht={class:"text-sm"},Et={class:"text-gray-700"},It={key:0,class:"text-xs text-gray-500 -mt-2"},Wt={class:"space-y-3 border border-gray-100 rounded-xl p-4"},Gt={key:0,class:"grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-44 overflow-y-auto pr-1"},Jt=["onClick"],Yt={class:"mb-1.5 h-12 w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200"},Xt=["src","alt"],Zt={key:1,class:"h-full w-full flex items-center justify-center text-xs text-gray-400"},te={class:"text-xs font-semibold leading-tight truncate"},ee={class:"text-xs text-gray-500 leading-tight truncate"},oe={class:"text-xs font-medium mt-0.5"},ie=["onClick"],se={class:"text-xs font-semibold w-5 text-center"},ne=["onClick"],ae={key:1,class:"text-sm text-gray-500"},le={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},re={class:"text-xs text-gray-600"},de={class:"text-xs font-semibold text-gray-800"},ce={class:"space-y-3 border border-gray-100 rounded-xl p-4"},ue={key:0,class:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1"},pe=["onClick"],me={class:"text-sm font-semibold leading-tight"},ge={class:"text-xs text-gray-500 mt-0.5"},xe={key:1,class:"text-sm text-gray-500"},fe={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},he={class:"text-xs text-gray-600"},ye={class:"text-xs font-semibold text-gray-800"},be={class:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1"},ve={class:"text-sm font-semibold text-gray-800"},we={class:"flex flex-col sm:flex-row gap-3"},_e=["disabled"],ke={key:1,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"},$e={class:"bg-white w-full h-full rounded-lg shadow-xl overflow-hidden flex flex-col"},Ce={class:"flex-1 overflow-hidden"},je=["src"],Qe={__name:"QuotationsView",setup(x){const r=ut(),n=ht(),f=yt(),{success:j,error:p}=xt(),S=_([]),C=_([]),d=A({}),g=A({}),s=_(!1),y=_(!1),D=_(!1),z=_(!1),k=_(""),u=_(""),h=_(""),$=Q(()=>r.isAgent),w=A({customer_id:"",discount_rate:$.value?0:35,commission_rate:$.value?30:10}),U=Q(()=>{let i=S.value||[];if(u.value.trim()){const e=u.value.toLowerCase();i=i.filter(o=>{var m,b,v;return((b=(m=o.customer)==null?void 0:m.full_name)==null?void 0:b.toLowerCase().includes(e))||((v=o.quote_number)==null?void 0:v.toLowerCase().includes(e))})}return h.value&&(i=i.filter(e=>e.status===h.value)),i}),O=Q(()=>Object.values(d).reduce((i,{device:e,quantity:o})=>i+Number(e.selling_price||0)*o,0)),K=Q(()=>Object.values(g).reduce((i,{solution:e,quantity:o})=>i+Number(e.base_price||0)*o,0)),Y=Q(()=>K.value+O.value);function X(){u.value="",h.value=""}function L(i){return bt(i)}function Z(){w.customer_id="",w.discount_rate=$.value?0:35,w.commission_rate=$.value?30:10,Object.keys(d).forEach(i=>delete d[i]),Object.keys(g).forEach(i=>delete g[i])}function tt(){D.value=!0}function N(){D.value=!1,Z()}function V(i){return i in g}function et(i){V(i.id)?delete g[i.id]:g[i.id]={solution:i,quantity:1}}function T(i){return i in d}function ot(i){T(i.id)?delete d[i.id]:d[i.id]={device:i,quantity:1}}function it(i){d[i]&&d[i].quantity++}function st(i){d[i]&&(d[i].quantity>1?d[i].quantity--:delete d[i])}async function nt(){try{const{data:i}=await axios.get("/devices");C.value=Array.isArray(i)?i:[]}catch{C.value=[]}}async function H(){var i,e;s.value=!0;try{const{data:o}=await axios.get("/quotations");S.value=o}catch(o){p(((e=(i=o.response)==null?void 0:i.data)==null?void 0:e.message)||"Failed to load quotations.")}finally{s.value=!1}}async function at(){var i,e;y.value=!0;try{const o=Object.entries(g).map(([v,{solution:M,quantity:ct}])=>({solution_id:Number(v),item_name:M.name,quantity:ct,unit_price:Number(M.base_price||0)})),m=Object.values(d).map(({device:v,quantity:M})=>({solution_id:null,item_name:v.model?`${v.name} (${v.model})`:v.name,quantity:M,unit_price:Number(v.selling_price||0)})),b={customer_id:Number(w.customer_id),discount_rate:$.value?0:Number(w.discount_rate),commission_rate:$.value?30:Number(w.commission_rate),status:"issued",items:[...o,...m]};await axios.post("/quotations",b),j("Quotation generated successfully!"),await H(),N()}catch(o){p(((e=(i=o.response)==null?void 0:i.data)==null?void 0:e.message)||"Failed to create quotation. Please try again.")}finally{y.value=!1}}async function lt(i){try{const e=S.value.find(m=>m.id===i);if(!e){p("Quotation not found");return}k.value&&URL.revokeObjectURL(k.value);const o=await J(e,"a4");k.value=URL.createObjectURL(o),z.value=!0}catch{p("Failed to open preview. Please try again.")}}function E(){k.value&&URL.revokeObjectURL(k.value),z.value=!1,k.value=""}function rt(i,e="a4"){try{const o=S.value.find(m=>m.id===i);if(!o){p("Quotation not found");return}G(o,e)}catch{p("Failed to generate PDF. Please try again.")}}function dt(i){try{const e=S.value.find(o=>o.id===i);if(!e){p("Quotation not found");return}G(e,"a4"),e.customer&&e.customer.phone?setTimeout(()=>{wt(e.customer.phone)},800):p("Customer phone number not available")}catch{p("Failed to download and send.")}}return pt(async()=>{await Promise.all([n.fetchCustomers(),f.fetchSolutions(),nt(),H()])}),(i,e)=>(l(),a("div",kt,[t("div",{class:"flex flex-col md:flex-row md:items-start md:justify-between gap-4"},[e[5]||(e[5]=t("div",null,[t("p",{class:"text-xs uppercase tracking-wide text-primary-700 font-semibold"},"Quotation Center"),t("h1",{class:"text-2xl md:text-3xl font-bold text-gray-900"},"Build and Print Quotations"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",onClick:tt},[...e[4]||(e[4]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1),t("span",null,"New Quotation",-1)])])]),t("section",$t,[t("div",Ct,[e[7]||(e[7]=t("h2",{class:"text-lg font-semibold text-gray-800"},"Quotation History",-1)),t("div",jt,[R(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>u.value=o),type:"text",class:"input-field flex-1 min-w-[220px] md:w-64",placeholder:"Search customer..."},null,512),[[mt,u.value]]),R(t("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>h.value=o),class:"input-field w-auto min-w-[150px]"},[...e[6]||(e[6]=[t("option",{value:""},"All statuses",-1),t("option",{value:"issued"},"Issued",-1),t("option",{value:"accepted"},"Accepted",-1),t("option",{value:"rejected"},"Rejected",-1)])],512),[[I,h.value]]),u.value||h.value?(l(),a("button",{key:0,onClick:X,class:"btn-secondary px-4 py-2 w-auto whitespace-nowrap"}," Reset ")):F("",!0)])]),s.value?(l(),a("div",St,"Loading quotations...")):U.value.length?(l(),a("div",Lt,[(l(!0),a(P,null,q(U.value,o=>{var m;return l(),a("div",{key:o.id,class:"border rounded-lg p-4 shadow-sm"},[t("div",Dt,"Quote #: "+c(o.quote_number),1),t("div",zt,"Customer: "+c(((m=o.customer)==null?void 0:m.full_name)||"N/A"),1),t("div",Ft,"Status: "+c(o.status),1),t("div",Qt,"Final Total: "+c(L(o.final_total)),1),t("div",Mt,[t("div",Pt,[t("button",{class:"text-blue-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-blue-800",onClick:b=>lt(o.id),title:"Preview quotation"},[...e[8]||(e[8]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})],-1),t("span",null,"Preview",-1)])],8,qt),t("button",{class:"text-gray-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-gray-900",onClick:b=>rt(o.id),title:"Download PDF"},[...e[9]||(e[9]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"})],-1),t("span",null,"Download",-1)])],8,Nt),t("button",{class:"text-green-700 font-semibold text-xs inline-flex items-center gap-1 hover:text-green-900",onClick:b=>dt(o.id),title:"Download & Send via WhatsApp"},[...e[10]||(e[10]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 3h6m0 0v6m0-6L10 14"})],-1),t("span",null,"Download & Send",-1)])],8,Tt)])])])}),128))])):(l(),a("p",At,"No quotations generated yet."))]),D.value?(l(),a("div",Rt,[t("div",Bt,[t("div",{class:"sticky top-0 bg-white border-b border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between"},[e[12]||(e[12]=t("div",null,[t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"New Quotation"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:N},[...e[11]||(e[11]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Ut,[t("div",Ot,[R(t("select",{"onUpdate:modelValue":e[2]||(e[2]=o=>w.customer_id=o),class:"input-field"},[e[13]||(e[13]=t("option",{value:""},"Select customer",-1)),(l(!0),a(P,null,q(B(n).customers,o=>(l(),a("option",{key:o.id,value:o.id},c(o.full_name),9,Kt))),128))],512),[[I,w.customer_id]]),t("div",Vt,[e[15]||(e[15]=t("svg",{class:"w-4 h-4 flex-shrink-0 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})],-1)),t("span",Ht,[e[14]||(e[14]=gt("Commission: ",-1)),t("strong",Et,c($.value?30:w.commission_rate)+"%",1)]),e[16]||(e[16]=t("span",{class:"ml-auto text-xs text-gray-400"},"Fixed",-1))])]),$.value?(l(),a("p",It,"For agents, commission is fixed at 30% and calculated from solution items only.")):F("",!0),t("div",Wt,[e[17]||(e[17]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Devices"),t("span",{class:"text-xs text-gray-500"},"Click to select devices for this quotation.")],-1)),C.value.length?(l(),a("div",Gt,[(l(!0),a(P,null,q(C.value,o=>{var m;return l(),a("button",{key:o.id,type:"button",class:W(["text-left rounded-lg border px-2 py-2 transition",T(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:b=>ot(o)},[t("div",Yt,[o.image_url?(l(),a("img",{key:0,src:o.image_url,alt:o.name,class:"h-full w-full object-cover"},null,8,Xt)):(l(),a("div",Zt,"No image"))]),t("p",te,c(o.name),1),t("p",ee,c(o.model||"—"),1),t("p",oe,c(L(o.selling_price)),1),T(o.id)?(l(),a("div",{key:0,class:"mt-2 flex items-center gap-1.5",onClick:e[3]||(e[3]=ft(()=>{},["stop"]))},[t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:b=>st(o.id)},"−",8,ie),t("span",se,c(((m=d[o.id])==null?void 0:m.quantity)||1),1),t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:b=>it(o.id)},"+",8,ne)])):F("",!0)],10,Jt)}),128))])):(l(),a("p",ae,"No devices available.")),t("div",le,[t("p",re,"Selected: "+c(Object.keys(d).length),1),t("p",de,"Device Total: "+c(L(O.value)),1)])]),t("div",ce,[e[18]||(e[18]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Solutions"),t("span",{class:"text-xs text-gray-500"},"Click to select solutions for this quotation.")],-1)),B(f).solutions.length?(l(),a("div",ue,[(l(!0),a(P,null,q(B(f).solutions,o=>(l(),a("button",{key:o.id,type:"button",class:W(["text-left rounded-lg border px-3 py-2.5 transition",V(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:m=>et(o)},[t("p",me,c(o.name),1),t("p",ge,c(L(o.base_price)),1)],10,pe))),128))])):(l(),a("p",xe,"No solutions available.")),t("div",fe,[t("p",he,"Selected: "+c(Object.keys(g).length),1),t("p",ye,"Solutions Total: "+c(L(K.value)),1)])]),t("div",be,[t("p",ve,"Estimated Total: "+c(L(Y.value)),1),t("div",we,[t("button",{type:"button",class:"btn-secondary md:w-auto inline-flex items-center gap-2",onClick:N},[...e[19]||(e[19]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Cancel",-1)])]),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",disabled:y.value,onClick:at},[e[20]||(e[20]=t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1)),t("span",null,c(y.value?"Generating...":"Generate Quotation"),1)],8,_e)])])])])])):F("",!0),z.value?(l(),a("div",ke,[t("div",$e,[t("div",{class:"flex items-center justify-between border-b border-gray-100 px-5 md:px-6 py-4 flex-shrink-0"},[e[22]||(e[22]=t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"Quotation Preview",-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:E},[...e[21]||(e[21]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Ce,[t("iframe",{src:k.value,class:"w-full h-full border-0",title:"Quotation Preview"},null,8,je)]),t("div",{class:"border-t border-gray-100 px-5 md:px-6 py-4 flex gap-3 justify-end flex-shrink-0"},[t("button",{type:"button",class:"btn-secondary inline-flex items-center gap-2",onClick:E},[...e[23]||(e[23]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Close",-1)])])])])])):F("",!0)]))}};export{Qe as default};
