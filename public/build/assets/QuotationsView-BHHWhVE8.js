import{w as ct,r as R,l as mt,e as l,a as t,I as M,D as pt,C as T,d as P,F as q,q as U,v as O,g as gt,u,c as Q,p as w,z as xt,m as r,j as W,J as ft}from"./app-Dhc0HGY0.js";import{u as yt}from"./customers-DBWuRY00.js";import{u as ht}from"./solutions-D_xOWp6k.js";import{f as bt}from"./currency-ox2L4ikb.js";import{h as vt}from"./html2pdf-DjVg0qff.js";function wt(x){if(!x)return;let d=x.replace(/\D/g,"");d.startsWith("0")&&(d="94"+d.substring(1));const a=`https://wa.me/${d}`;window.open(a,"_blank")}function _t(x,d="a4"){const{customer:a,items:f,final_total:L,quote_number:m,discount_rate:D,warranty_months:$,validity_days:c}=x,y=f.some(n=>n.solution_id!==null&&n.solution_id!==void 0),z=$?`Hardware items carry a ${$}-month warranty against manufacturing defects.`:"Hardware items carry a 12-month warranty against manufacturing defects.",C=f.reduce((n,S)=>n+S.quantity*S.unit_price,0),j=Number(L??C),s=d==="a5"?"11px":"14px",g=`padding: 8px; border-bottom: 1px solid #e0e0e0; font-size: ${s};`,_=f.map((n,S)=>`
    <tr>
      <td style="${g}">${S+1}</td>
      <td style="${g}">${n.item_name||"Item"}</td>
      <td style="${g} text-align: right;">${n.quantity}</td>
      <td style="${g} text-align: right;">LKR ${Number(n.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td style="${g} text-align: right;">LKR ${Number(n.quantity*n.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
    </tr>
  `).join(""),k=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quotation #${m}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: ${d==="a5"?"A5":"A4"};
          margin: 10mm;
        }

        .pdf-footer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          text-align: center;
          font-size: ${d==="a5"?"9px":"11px"};
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
          height: ${d==="a5"?"190mm":"277mm"};
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
          font-size: ${d==="a5"?"9px":"11px"};
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
          font-size: ${d==="a5"?"16px":"22px"};
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
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
          <div style="font-size: ${d==="a5"?"18px":"24px"}; line-height: 1.6; color: #555; font-weight: 600; margin-bottom: 10px;">
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
                <strong>${(a==null?void 0:a.full_name)||"N/A"}</strong><br>
                ${a!=null&&a.email?`Email: ${a.email}<br>`:""}
                ${a!=null&&a.phone?`Phone: ${a.phone}<br>`:""}
                ${a!=null&&a.address?`Address: ${a.address}`:""}
              </div>
            </td>
            <td style="width: 50%; vertical-align: top; padding: 0 0 0 8px; text-align: right;">
              <div style="font-size: ${s}; font-weight: 600; color: #1e40af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Quote Details</div>
              <div style="font-size: ${s}; line-height: 1.6;">
                <div style="margin-bottom: 5px;"><strong>Date:</strong> ${k}</div>
                <div style="margin-bottom: 5px;"><strong>Status:</strong> Issued</div>
                <div style="margin-bottom: 5px;"><strong>Payment:</strong> Unpaid</div>
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
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: left; font-size: ${s};">#</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: left; font-size: ${s};">Description</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${s};">Quantity</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${s};">Unit Price</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${s};">Total</th>
            </tr>
          </thead>
          <tbody>
            ${_}
          </tbody>
          <!-- Totals inside table for perfect alignment -->
          <tfoot>
            <tr>
              <td colspan="4" style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${s}; text-align: right; font-weight: 600;">Subtotal:</td>
              <td style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${s}; text-align: right;">LKR ${Number(C).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
            <tr>
              <td colspan="4" style="padding: 10px 8px; border-top: 2px solid #1e40af; font-size: ${d==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #1e40af;">TOTAL:</td>
              <td style="padding: 10px 8px; border-top: 2px solid #1e40af; font-size: ${d==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #1e40af;">LKR ${Number(j).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
          </tfoot>
        </table>
        
        <!-- Payment Schedule (solutions only) -->
        ${y?`
        <div class="payment-schedule">
          <div class="payment-schedule-title">Payment Schedule</div>
          <ul>
            <li><strong>Initial Payment (50%):</strong> LKR ${Number(j/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} (Payable upon confirmation)</li>
            <li><strong>Final Payment (50%):</strong> LKR ${Number(j/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} (Payable after one week of system usage)</li>
          </ul>
        </div>

        `:""}

        <!-- Terms and Conditions (always shown) -->
        <div class="terms">
          <h2>Terms and Conditions</h2>
          <ol>
            ${y?"<li><strong>Hosting Renewal:</strong> The hosting and domain service is valid for one (1) year. It must be renewed annually to maintain service.</li>":""}
            <li><strong>Validity:</strong> This quotation is valid for ${c||30} days from the date of issue.</li>
            <li><strong>Warranty:</strong> ${z}</li>
          </ol>
        </div>

        <!-- Footer note -->
        <div style="margin-top: 40px; margin-bottom: 10px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 16px;">
          <div style="font-size: ${s}; font-weight: 600; color: #333; margin-bottom: 6px;">Thank you for your business! | LUMAC Solutions</div>
          <div style="font-size: ${s}; color: #666;">For more details about the order, please use reference number: <strong>${m}</strong></div>
        </div>
        </td></tr>
      </table>
    </body>
    </html>
  `}async function G(x,d="a4"){const a=`quotation-${x.quote_number}.pdf`,f=await J(x,d),L=URL.createObjectURL(f),m=document.createElement("a");m.href=L,m.download=a,m.click(),URL.revokeObjectURL(L)}function J(x,d="a4"){const a=_t(x,d),f={margin:10,filename:`quotation-${x.quote_number}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{orientation:"portrait",unit:"mm",format:d==="a5"?"a5":"a4"},pagebreak:{avoid:"div.container",mode:["avoid-all","css","legacy"]}};return vt().set(f).from(a).outputPdf("blob")}const kt={class:"max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6"},$t={class:"card"},Ct={class:"flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4"},jt={class:"flex flex-row flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto"},St={key:0,class:"text-sm text-gray-500"},Lt={key:1,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"},Dt={class:"font-medium text-gray-800"},Ft={class:"text-gray-500"},zt={class:"text-gray-500"},Mt={class:"text-gray-500"},Pt={class:"mt-2"},Qt={class:"flex gap-2 flex-wrap"},Nt=["onClick"],Tt=["onClick"],qt=["onClick"],Ut={key:2,class:"text-sm text-gray-500"},At={key:0,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"},Bt={class:"bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto"},Rt={class:"p-5 md:p-6 space-y-5"},Ot={class:"grid grid-cols-1 md:grid-cols-4 gap-4"},Vt=["value"],Kt={class:"input-field bg-gray-50 text-gray-500 flex items-center gap-2 cursor-not-allowed select-none"},Ht={class:"text-sm"},Et={class:"text-gray-700"},It={key:0,class:"text-xs text-gray-500 -mt-2"},Wt={class:"space-y-3 border border-gray-100 rounded-xl p-4"},Gt={key:0,class:"grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-44 overflow-y-auto pr-1"},Jt=["onClick"],Yt={class:"mb-1.5 h-12 w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200"},Xt=["src","alt"],Zt={key:1,class:"h-full w-full flex items-center justify-center text-xs text-gray-400"},te={class:"text-xs font-semibold leading-tight truncate"},ee={class:"text-xs text-gray-500 leading-tight truncate"},oe={class:"text-xs font-medium mt-0.5"},ie=["onClick"],se={class:"text-xs font-semibold w-5 text-center"},ne=["onClick"],ae={key:1,class:"text-sm text-gray-500"},le={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},re={class:"text-xs text-gray-600"},de={class:"text-xs font-semibold text-gray-800"},ue={class:"space-y-3 border border-gray-100 rounded-xl p-4"},ce={key:0,class:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1"},me=["onClick"],pe={class:"text-sm font-semibold leading-tight"},ge={class:"text-xs text-gray-500 mt-0.5"},xe={key:1,class:"text-sm text-gray-500"},fe={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},ye={class:"text-xs text-gray-600"},he={class:"text-xs font-semibold text-gray-800"},be={class:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1"},ve={class:"text-sm font-semibold text-gray-800"},we={class:"flex flex-col sm:flex-row gap-3"},_e=["disabled"],ke={key:1,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"},$e={class:"bg-white w-full h-full rounded-lg shadow-xl overflow-hidden flex flex-col"},Ce={class:"flex-1 overflow-hidden"},je=["src"],Me={__name:"QuotationsView",setup(x){const d=ct(),a=yt(),f=ht(),{success:L,error:m}=xt(),D=w([]),$=w([]),c=R({}),y=R({}),z=w(!1),C=w(!1),j=w(!1),s=w(!1),g=w(""),_=w(""),k=w(""),v=Q(()=>d.isAgent),n=R({customer_id:"",validity_days:30,warranty_months:"",discount_rate:v.value?0:35,commission_rate:v.value?30:10}),S=Q(()=>{let i=D.value||[];if(_.value.trim()){const e=_.value.toLowerCase();i=i.filter(o=>{var p,h,b;return((h=(p=o.customer)==null?void 0:p.full_name)==null?void 0:h.toLowerCase().includes(e))||((b=o.quote_number)==null?void 0:b.toLowerCase().includes(e))})}return k.value&&(i=i.filter(e=>e.status===k.value)),i}),V=Q(()=>Object.values(c).reduce((i,{device:e,quantity:o})=>i+Number(e.selling_price||0)*o,0)),K=Q(()=>Object.values(y).reduce((i,{solution:e,quantity:o})=>i+Number(e.base_price||0)*o,0)),Y=Q(()=>K.value+V.value);function X(){_.value="",k.value=""}function F(i){return bt(i)}function Z(){n.customer_id="",n.validity_days=30,n.warranty_months="",n.discount_rate=v.value?0:35,n.commission_rate=v.value?30:10,Object.keys(c).forEach(i=>delete c[i]),Object.keys(y).forEach(i=>delete y[i])}function tt(){j.value=!0}function A(){j.value=!1,Z()}function H(i){return i in y}function et(i){H(i.id)?delete y[i.id]:y[i.id]={solution:i,quantity:1}}function B(i){return i in c}function ot(i){B(i.id)?delete c[i.id]:c[i.id]={device:i,quantity:1}}function it(i){c[i]&&c[i].quantity++}function st(i){c[i]&&(c[i].quantity>1?c[i].quantity--:delete c[i])}async function nt(){try{const{data:i}=await axios.get("/devices");$.value=Array.isArray(i)?i:[]}catch{$.value=[]}}async function E(){var i,e;z.value=!0;try{const{data:o}=await axios.get("/quotations");D.value=o}catch(o){m(((e=(i=o.response)==null?void 0:i.data)==null?void 0:e.message)||"Failed to load quotations.")}finally{z.value=!1}}async function at(){var i,e;C.value=!0;try{const o=Object.entries(y).map(([b,{solution:N,quantity:ut}])=>({solution_id:Number(b),item_name:N.name,quantity:ut,unit_price:Number(N.base_price||0)})),p=Object.values(c).map(({device:b,quantity:N})=>({solution_id:null,item_name:b.model?`${b.name} (${b.model})`:b.name,quantity:N,unit_price:Number(b.selling_price||0)})),h={customer_id:Number(n.customer_id),validity_days:Number(n.validity_days)||30,warranty_months:n.warranty_months?Number(n.warranty_months):null,discount_rate:v.value?0:Number(n.discount_rate),commission_rate:v.value?30:Number(n.commission_rate),status:"issued",items:[...o,...p]};await axios.post("/quotations",h),L("Quotation generated successfully!"),await E(),A()}catch(o){m(((e=(i=o.response)==null?void 0:i.data)==null?void 0:e.message)||"Failed to create quotation. Please try again.")}finally{C.value=!1}}async function lt(i){try{const e=D.value.find(p=>p.id===i);if(!e){m("Quotation not found");return}g.value&&URL.revokeObjectURL(g.value);const o=await J(e,"a4");g.value=URL.createObjectURL(o),s.value=!0}catch{m("Failed to open preview. Please try again.")}}function I(){g.value&&URL.revokeObjectURL(g.value),s.value=!1,g.value=""}function rt(i,e="a4"){try{const o=D.value.find(p=>p.id===i);if(!o){m("Quotation not found");return}G(o,e)}catch{m("Failed to generate PDF. Please try again.")}}function dt(i){try{const e=D.value.find(o=>o.id===i);if(!e){m("Quotation not found");return}G(e,"a4"),e.customer&&e.customer.phone?setTimeout(()=>{wt(e.customer.phone)},800):m("Customer phone number not available")}catch{m("Failed to download and send.")}}return mt(async()=>{await Promise.all([a.fetchCustomers(),f.fetchSolutions(),nt(),E()])}),(i,e)=>(r(),l("div",kt,[t("div",{class:"flex flex-col md:flex-row md:items-start md:justify-between gap-4"},[e[7]||(e[7]=t("div",null,[t("p",{class:"text-xs uppercase tracking-wide text-primary-700 font-semibold"},"Quotation Center"),t("h1",{class:"text-2xl md:text-3xl font-bold text-gray-900"},"Build and Print Quotations"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",onClick:tt},[...e[6]||(e[6]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1),t("span",null,"New Quotation",-1)])])]),t("section",$t,[t("div",Ct,[e[9]||(e[9]=t("h2",{class:"text-lg font-semibold text-gray-800"},"Quotation History",-1)),t("div",jt,[M(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>_.value=o),type:"text",class:"input-field flex-1 min-w-[220px] md:w-64",placeholder:"Search customer..."},null,512),[[pt,_.value]]),M(t("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>k.value=o),class:"input-field w-auto min-w-[150px]"},[...e[8]||(e[8]=[t("option",{value:""},"All statuses",-1),t("option",{value:"issued"},"Issued",-1),t("option",{value:"accepted"},"Accepted",-1),t("option",{value:"rejected"},"Rejected",-1)])],512),[[T,k.value]]),_.value||k.value?(r(),l("button",{key:0,onClick:X,class:"btn-secondary px-4 py-2 w-auto whitespace-nowrap"}," Reset ")):P("",!0)])]),z.value?(r(),l("div",St,"Loading quotations...")):S.value.length?(r(),l("div",Lt,[(r(!0),l(q,null,U(S.value,o=>{var p;return r(),l("div",{key:o.id,class:"border rounded-lg p-4 shadow-sm"},[t("div",Dt,"Quote #: "+u(o.quote_number),1),t("div",Ft,"Customer: "+u(((p=o.customer)==null?void 0:p.full_name)||"N/A"),1),t("div",zt,"Status: "+u(o.status),1),t("div",Mt,"Final Total: "+u(F(o.final_total)),1),t("div",Pt,[t("div",Qt,[t("button",{class:"text-blue-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-blue-800",onClick:h=>lt(o.id),title:"Preview quotation"},[...e[10]||(e[10]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})],-1),t("span",null,"Preview",-1)])],8,Nt),t("button",{class:"text-gray-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-gray-900",onClick:h=>rt(o.id),title:"Download PDF"},[...e[11]||(e[11]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"})],-1),t("span",null,"Download",-1)])],8,Tt),t("button",{class:"text-green-700 font-semibold text-xs inline-flex items-center gap-1 hover:text-green-900",onClick:h=>dt(o.id),title:"Download & Send via WhatsApp"},[...e[12]||(e[12]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 3h6m0 0v6m0-6L10 14"})],-1),t("span",null,"Download & Send",-1)])],8,qt)])])])}),128))])):(r(),l("p",Ut,"No quotations generated yet."))]),j.value?(r(),l("div",At,[t("div",Bt,[t("div",{class:"sticky top-0 bg-white border-b border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between"},[e[14]||(e[14]=t("div",null,[t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"New Quotation"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:A},[...e[13]||(e[13]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Rt,[t("div",Ot,[M(t("select",{"onUpdate:modelValue":e[2]||(e[2]=o=>n.customer_id=o),class:"input-field"},[e[15]||(e[15]=t("option",{value:""},"Select customer",-1)),(r(!0),l(q,null,U(O(a).customers,o=>(r(),l("option",{key:o.id,value:o.id},u(o.full_name),9,Vt))),128))],512),[[T,n.customer_id]]),M(t("select",{"onUpdate:modelValue":e[3]||(e[3]=o=>n.validity_days=o),class:"input-field"},[...e[16]||(e[16]=[t("option",{value:"7"},"Valid for 7 days",-1),t("option",{value:"30"},"Valid for 30 days",-1)])],512),[[T,n.validity_days]]),M(t("select",{"onUpdate:modelValue":e[4]||(e[4]=o=>n.warranty_months=o),class:"input-field"},[...e[17]||(e[17]=[t("option",{value:""},"No warranty",-1),t("option",{value:"3"},"3 months warranty",-1),t("option",{value:"6"},"6 months warranty",-1),t("option",{value:"12"},"12 months warranty",-1)])],512),[[T,n.warranty_months]]),t("div",Kt,[e[19]||(e[19]=t("svg",{class:"w-4 h-4 flex-shrink-0 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})],-1)),t("span",Ht,[e[18]||(e[18]=gt("Commission: ",-1)),t("strong",Et,u(v.value?30:n.commission_rate)+"%",1)]),e[20]||(e[20]=t("span",{class:"ml-auto text-xs text-gray-400"},"Fixed",-1))])]),v.value?(r(),l("p",It,"For agents, commission is fixed at 30% and calculated from solution items only.")):P("",!0),t("div",Wt,[e[21]||(e[21]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Devices"),t("span",{class:"text-xs text-gray-500"},"Click to select devices for this quotation.")],-1)),$.value.length?(r(),l("div",Gt,[(r(!0),l(q,null,U($.value,o=>{var p;return r(),l("button",{key:o.id,type:"button",class:W(["text-left rounded-lg border px-2 py-2 transition",B(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:h=>ot(o)},[t("div",Yt,[o.image_url?(r(),l("img",{key:0,src:o.image_url,alt:o.name,class:"h-full w-full object-cover"},null,8,Xt)):(r(),l("div",Zt,"No image"))]),t("p",te,u(o.name),1),t("p",ee,u(o.model||"—"),1),t("p",oe,u(F(o.selling_price)),1),B(o.id)?(r(),l("div",{key:0,class:"mt-2 flex items-center gap-1.5",onClick:e[5]||(e[5]=ft(()=>{},["stop"]))},[t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:h=>st(o.id)},"−",8,ie),t("span",se,u(((p=c[o.id])==null?void 0:p.quantity)||1),1),t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:h=>it(o.id)},"+",8,ne)])):P("",!0)],10,Jt)}),128))])):(r(),l("p",ae,"No devices available.")),t("div",le,[t("p",re,"Selected: "+u(Object.keys(c).length),1),t("p",de,"Device Total: "+u(F(V.value)),1)])]),t("div",ue,[e[22]||(e[22]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Solutions"),t("span",{class:"text-xs text-gray-500"},"Click to select solutions for this quotation.")],-1)),O(f).solutions.length?(r(),l("div",ce,[(r(!0),l(q,null,U(O(f).solutions,o=>(r(),l("button",{key:o.id,type:"button",class:W(["text-left rounded-lg border px-3 py-2.5 transition",H(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:p=>et(o)},[t("p",pe,u(o.name),1),t("p",ge,u(F(o.base_price)),1)],10,me))),128))])):(r(),l("p",xe,"No solutions available.")),t("div",fe,[t("p",ye,"Selected: "+u(Object.keys(y).length),1),t("p",he,"Solutions Total: "+u(F(K.value)),1)])]),t("div",be,[t("p",ve,"Estimated Total: "+u(F(Y.value)),1),t("div",we,[t("button",{type:"button",class:"btn-secondary md:w-auto inline-flex items-center gap-2",onClick:A},[...e[23]||(e[23]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Cancel",-1)])]),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",disabled:C.value,onClick:at},[e[24]||(e[24]=t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1)),t("span",null,u(C.value?"Generating...":"Generate Quotation"),1)],8,_e)])])])])])):P("",!0),s.value?(r(),l("div",ke,[t("div",$e,[t("div",{class:"flex items-center justify-between border-b border-gray-100 px-5 md:px-6 py-4 flex-shrink-0"},[e[26]||(e[26]=t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"Quotation Preview",-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:I},[...e[25]||(e[25]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Ce,[t("iframe",{src:g.value,class:"w-full h-full border-0",title:"Quotation Preview"},null,8,je)]),t("div",{class:"border-t border-gray-100 px-5 md:px-6 py-4 flex gap-3 justify-end flex-shrink-0"},[t("button",{type:"button",class:"btn-secondary inline-flex items-center gap-2",onClick:I},[...e[27]||(e[27]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Close",-1)])])])])])):P("",!0)]))}};export{Me as default};
