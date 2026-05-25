import{w as pt,r as E,l as mt,e as r,a as t,I as C,D as I,C as A,d as R,F as B,q as K,v as W,f as gt,u as c,j as N,c as M,p as k,z as xt,m as d,J as ft}from"./app-Cafew_Bn.js";import{u as yt}from"./customers-OR0CZ64r.js";import{u as ht}from"./solutions-MOdjKvEP.js";import{f as bt}from"./currency-ox2L4ikb.js";import{h as vt}from"./html2pdf-DjVg0qff.js";function wt(x){if(!x)return;let l=x.replace(/\D/g,"");l.startsWith("0")&&(l="94"+l.substring(1));const a=`https://wa.me/${l}`;window.open(a,"_blank")}function _t(x,l="a4"){const{customer:a,items:f,final_total:P,quote_number:p,discount_rate:S,warranty_months:$,validity_days:u,discount_amount:b,discount_reason:L,show_terms:D}=x,j=f.some(g=>g.solution_id!==null&&g.solution_id!==void 0),Q=$?`Hardware items carry a ${$}-month warranty against manufacturing defects.`:"Hardware items carry a 12-month warranty against manufacturing defects.",y=Number(b||0),_=f.reduce((g,F)=>g+F.quantity*F.unit_price,0),v=_-y,i=l==="a5"?"11px":"14px",s=`padding: 8px; border-bottom: 1px solid #e0e0e0; font-size: ${i};`,q=f.map((g,F)=>`
    <tr>
      <td style="${s}">${F+1}</td>
      <td style="${s}">
        <div>${g.item_name||"Item"}</div>
        ${g.description?`<div style="font-size: ${l==="a5"?"9px":"11px"}; color: #666; margin-top: 2px; line-height: 1.6;">${g.description.replace(/\n/g,"<br>")}</div>`:""}
      </td>
      <td style="${s} text-align: right;">${g.quantity}</td>
      <td style="${s} text-align: right;">LKR ${Number(g.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td style="${s} text-align: right;">LKR ${Number(g.quantity*g.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
    </tr>
  `).join(""),T=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});return`
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
          size: ${l==="a5"?"A5":"A4"};
          margin: 10mm;
        }

        .pdf-footer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          text-align: center;
          font-size: ${l==="a5"?"9px":"11px"};
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
          height: ${l==="a5"?"190mm":"277mm"};
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
          font-size: ${l==="a5"?"9px":"11px"};
          color: #999;
          white-space: nowrap;
        }
        
        .section {
          margin-bottom: 15px;
        }
        
        .section-title {
          font-size: ${i};
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .section-content {
          font-size: ${i};
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
          font-size: ${i};
          font-weight: 600;
        }

        table th.text-right {
          text-align: right;
        }

        table td {
          padding: 8px;
          border-bottom: 1px solid #e0e0e0;
          font-size: ${i};
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
          font-size: ${i};
          line-height: 1.5;
        }

        .payment-schedule {
          margin-top: 20px;
          margin-bottom: 15px;
        }

        .payment-schedule-title {
          font-size: ${i};
          font-weight: 600;
          margin-bottom: 8px;
        }

        .payment-schedule ul {
          list-style: disc;
          padding-left: 20px;
          font-size: ${i};
          line-height: 1.8;
        }

        .terms {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .terms h2 {
          font-size: ${l==="a5"?"16px":"22px"};
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }

        .terms ol {
          padding-left: 20px;
          font-size: ${i};
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
          font-size: ${i};
          font-weight: 700;
        }

        
        .print-date {
          font-size: ${i};
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
          <div style="font-size: ${l==="a5"?"18px":"24px"}; line-height: 1.6; color: #555; font-weight: 600; margin-bottom: 10px;">
            <strong>LU<span style="color: #60a5fa;">MAC</span> Solutions</strong>
          </div>
          <div style="font-size: ${i}; line-height: 1.6; color: #666;">
            Address: Jayasiripura, Anuradhapura, Sri Lanka<br>
            Email: contact@lumac.lk<br>
            Phone: 076 464 3050
          </div>
        </div>
        
        <!-- Customer & Date Info -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding: 0 8px 0 0;">
              <div style="font-size: ${i}; font-weight: 600; color: #1e40af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Bill To</div>
              <div style="font-size: ${i}; line-height: 1.6;">
                <strong>${(a==null?void 0:a.full_name)||"N/A"}</strong><br>
                ${a!=null&&a.email?`Email: ${a.email}<br>`:""}
                ${a!=null&&a.phone?`Phone: ${a.phone}<br>`:""}
                ${a!=null&&a.address?`Address: ${a.address}`:""}
              </div>
            </td>
            <td style="width: 50%; vertical-align: top; padding: 0 0 0 8px; text-align: right;">
              <div style="font-size: ${i}; font-weight: 600; color: #1e40af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Quote Details</div>
              <div style="font-size: ${i}; line-height: 1.6;">
                <div style="margin-bottom: 5px;"><strong>Date:</strong> ${T}</div>
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
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: left; font-size: ${i};">#</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: left; font-size: ${i};">Description</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${i};">Quantity</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${i};">Unit Price</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${i};">Total</th>
            </tr>
          </thead>
          <tbody>
            ${q}
          </tbody>
          <!-- Totals inside table for perfect alignment -->
          <tfoot>
            ${y>0?`
            <tr>
              <td colspan="4" style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${i}; text-align: right; font-weight: 600;">Subtotal:</td>
              <td style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${i}; text-align: right;">LKR ${Number(_).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
            <tr>
              <td colspan="4" style="padding: 8px; font-size: ${i}; text-align: right; font-weight: 600; color: #dc2626;">Discount${L?` (${L})`:""}:</td>
              <td style="padding: 8px; font-size: ${i}; text-align: right; color: #dc2626;">- LKR ${Number(y).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
            `:""}
            <tr>
              <td colspan="4" style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${l==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #172554;">TOTAL:</td>
              <td style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${l==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #172554;">LKR ${Number(v).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
          </tfoot>
        </table>
        
        <!-- Payment Schedule (solutions only) -->
        ${j?`
        <div class="payment-schedule">
          <div class="payment-schedule-title">Payment Schedule</div>
          <ul>
            <li><strong>Initial Payment (50%):</strong> LKR ${Number(v/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} <span style="color:#666;">(Payable upon confirmation)</span></li>
            <li><strong>Final Payment (50%):</strong> LKR ${Number(v/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} <span style="color:#666;">(Payable after one week of system usage)</span></li>
          </ul>
        </div>

        `:""}

        <!-- Terms and Conditions -->
        ${D==!1?"":`
        <div class="terms">
          <h2>Terms and Conditions</h2>
          <ol>
            ${j?"<li><strong>Hosting Renewal:</strong> The hosting and domain service is valid for one (1) year. It must be renewed annually to maintain service.</li>":""}
            <li><strong>Validity:</strong> This quotation is valid for ${u||30} days from the date of issue.</li>
            <li><strong>Warranty:</strong> ${Q}</li>
          </ol>
        </div>
        `}

        <!-- Footer note -->
        <div style="margin-top: 40px; margin-bottom: 10px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 16px;">
          <div style="font-size: ${i}; font-weight: 600; color: #333; margin-bottom: 6px;">Thank you for your business! | LUMAC Solutions</div>
          <div style="font-size: ${i}; color: #666;">For more details about the order, please use reference number: <strong>${p}</strong></div>
        </div>
        </td></tr>
      </table>
    </body>
    </html>
  `}async function X(x,l="a4"){const a=`quotation-${x.quote_number}.pdf`,f=await Z(x,l),P=URL.createObjectURL(f),p=document.createElement("a");p.href=P,p.download=a,p.click(),URL.revokeObjectURL(P)}function Z(x,l="a4"){const a=_t(x,l),f={margin:10,filename:`quotation-${x.quote_number}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{orientation:"portrait",unit:"mm",format:l==="a5"?"a5":"a4"},pagebreak:{avoid:"div.container",mode:["avoid-all","css","legacy"]}};return vt().set(f).from(a).outputPdf("blob")}const kt={class:"max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6"},$t={class:"card"},Ct={class:"flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4"},St={class:"flex flex-row flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto"},Lt={key:0,class:"text-sm text-gray-500"},Dt={key:1,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"},jt={class:"font-medium text-gray-800"},Ft={class:"text-gray-500"},zt={class:"text-gray-500"},Nt={class:"text-gray-500"},Pt={class:"mt-2"},Qt={class:"flex gap-2 flex-wrap"},Mt=["onClick"],qt=["onClick"],Tt=["onClick"],Ut={key:2,class:"text-sm text-gray-500"},At={key:0,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"},Rt={class:"bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto"},Bt={class:"p-5 md:p-6 space-y-5"},Kt={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},Vt=["value"],Ot={class:"space-y-3 border border-gray-100 rounded-xl p-4"},Ht={key:0,class:"grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-44 overflow-y-auto pr-1"},Et=["onClick"],It={class:"mb-1.5 h-12 w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200"},Wt=["src","alt"],Gt={key:1,class:"h-full w-full flex items-center justify-center text-xs text-gray-400"},Jt={class:"text-xs font-semibold leading-tight truncate"},Yt={class:"text-xs text-gray-500 leading-tight truncate"},Xt={class:"text-xs font-medium mt-0.5"},Zt=["onClick"],te={class:"text-xs font-semibold w-5 text-center"},ee=["onClick"],oe={key:1,class:"text-sm text-gray-500"},ne={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},se={class:"text-xs text-gray-600"},ie={class:"text-xs font-semibold text-gray-800"},ae={class:"space-y-3 border border-gray-100 rounded-xl p-4"},le={key:0,class:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1"},re=["onClick"],de={class:"text-sm font-semibold leading-tight"},ue={class:"text-xs text-gray-500 mt-0.5"},ce={key:1,class:"text-sm text-gray-500"},pe={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},me={class:"text-xs text-gray-600"},ge={class:"text-xs font-semibold text-gray-800"},xe={class:"flex flex-wrap items-center gap-5"},fe={class:"flex items-center gap-2 cursor-pointer select-none"},ye={class:"flex items-center gap-2 cursor-pointer select-none"},he={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},be={class:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1"},ve={class:"text-sm font-semibold text-gray-800"},we={class:"flex flex-col sm:flex-row gap-3"},_e=["disabled"],ke={key:1,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"},$e={class:"bg-white w-full h-full rounded-lg shadow-xl overflow-hidden flex flex-col"},Ce={class:"flex-1 overflow-hidden"},Se=["src"],Ne={__name:"QuotationsView",setup(x){const l=pt(),a=yt(),f=ht(),{success:P,error:p}=xt(),S=k([]),$=k([]),u=E({}),b=E({}),L=k(!1),D=k(!1),j=k(!1),Q=k(!1),y=k(""),_=k(""),v=k(""),i=M(()=>l.isAgent),s=E({customer_id:"",validity_days:30,warranty_months:"",discount_amount:"",discount_reason:"",show_descriptions:!0,show_terms:!0,discount_rate:i.value?0:35}),q=M(()=>{let n=S.value||[];if(_.value.trim()){const e=_.value.toLowerCase();n=n.filter(o=>{var m,w,h;return((w=(m=o.customer)==null?void 0:m.full_name)==null?void 0:w.toLowerCase().includes(e))||((h=o.quote_number)==null?void 0:h.toLowerCase().includes(e))})}return v.value&&(n=n.filter(e=>e.status===v.value)),n}),T=M(()=>Object.values(u).reduce((n,{device:e,quantity:o})=>n+Number(e.selling_price||0)*o,0)),V=M(()=>Object.values(b).reduce((n,{solution:e,quantity:o})=>n+Number(e.base_price||0)*o,0)),g=M(()=>V.value+T.value-(Number(s.discount_amount)||0));function F(){_.value="",v.value=""}function z(n){return bt(n)}function tt(){s.customer_id="",s.validity_days=30,s.warranty_months="",s.discount_amount="",s.discount_reason="",s.show_descriptions=!0,s.show_terms=!0,s.discount_rate=i.value?0:35,Object.keys(u).forEach(n=>delete u[n]),Object.keys(b).forEach(n=>delete b[n])}function et(){j.value=!0}function O(){j.value=!1,tt()}function G(n){return n in b}function ot(n){G(n.id)?delete b[n.id]:b[n.id]={solution:n,quantity:1}}function H(n){return n in u}function nt(n){H(n.id)?delete u[n.id]:u[n.id]={device:n,quantity:1}}function st(n){u[n]&&u[n].quantity++}function it(n){u[n]&&(u[n].quantity>1?u[n].quantity--:delete u[n])}async function at(){try{const{data:n}=await axios.get("/devices");$.value=Array.isArray(n)?n:[]}catch{$.value=[]}}async function J(){var n,e;L.value=!0;try{const{data:o}=await axios.get("/quotations");S.value=o}catch(o){p(((e=(n=o.response)==null?void 0:n.data)==null?void 0:e.message)||"Failed to load quotations.")}finally{L.value=!1}}async function lt(){var n,e;D.value=!0;try{const o=Object.entries(b).map(([h,{solution:U,quantity:ct}])=>({solution_id:Number(h),item_name:U.name,quantity:ct,unit_price:Number(U.base_price||0)})),m=Object.values(u).map(({device:h,quantity:U})=>({solution_id:null,item_name:h.model?`${h.name} (${h.model})`:h.name,description:s.show_descriptions&&h.description||null,quantity:U,unit_price:Number(h.selling_price||0)})),w={customer_id:Number(s.customer_id),validity_days:Number(s.validity_days)||30,show_terms:s.show_terms,warranty_months:s.warranty_months?Number(s.warranty_months):null,discount_amount:s.discount_amount?Number(s.discount_amount):0,discount_reason:s.discount_reason||null,discount_rate:i.value?0:Number(s.discount_rate),commission_rate:0,status:"issued",items:[...o,...m]};await axios.post("/quotations",w),P("Quotation generated successfully!"),await J(),O()}catch(o){p(((e=(n=o.response)==null?void 0:n.data)==null?void 0:e.message)||"Failed to create quotation. Please try again.")}finally{D.value=!1}}async function rt(n){try{const e=S.value.find(m=>m.id===n);if(!e){p("Quotation not found");return}y.value&&URL.revokeObjectURL(y.value);const o=await Z(e,"a4");y.value=URL.createObjectURL(o),Q.value=!0}catch{p("Failed to open preview. Please try again.")}}function Y(){y.value&&URL.revokeObjectURL(y.value),Q.value=!1,y.value=""}function dt(n,e="a4"){try{const o=S.value.find(m=>m.id===n);if(!o){p("Quotation not found");return}X(o,e)}catch{p("Failed to generate PDF. Please try again.")}}function ut(n){try{const e=S.value.find(o=>o.id===n);if(!e){p("Quotation not found");return}X(e,"a4"),e.customer&&e.customer.phone?setTimeout(()=>{wt(e.customer.phone)},800):p("Customer phone number not available")}catch{p("Failed to download and send.")}}return mt(async()=>{await Promise.all([a.fetchCustomers(),f.fetchSolutions(),at(),J()])}),(n,e)=>(d(),r("div",kt,[t("div",{class:"flex flex-col md:flex-row md:items-start md:justify-between gap-4"},[e[11]||(e[11]=t("div",null,[t("p",{class:"text-xs uppercase tracking-wide text-primary-700 font-semibold"},"Quotation Center"),t("h1",{class:"text-2xl md:text-3xl font-bold text-gray-900"},"Build and Print Quotations"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",onClick:et},[...e[10]||(e[10]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1),t("span",null,"New Quotation",-1)])])]),t("section",$t,[t("div",Ct,[e[13]||(e[13]=t("h2",{class:"text-lg font-semibold text-gray-800"},"Quotation History",-1)),t("div",St,[C(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>_.value=o),type:"text",class:"input-field flex-1 min-w-[220px] md:w-64",placeholder:"Search customer..."},null,512),[[I,_.value]]),C(t("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>v.value=o),class:"input-field w-auto min-w-[150px]"},[...e[12]||(e[12]=[t("option",{value:""},"All statuses",-1),t("option",{value:"issued"},"Issued",-1),t("option",{value:"accepted"},"Accepted",-1),t("option",{value:"rejected"},"Rejected",-1)])],512),[[A,v.value]]),_.value||v.value?(d(),r("button",{key:0,onClick:F,class:"btn-secondary px-4 py-2 w-auto whitespace-nowrap"}," Reset ")):R("",!0)])]),L.value?(d(),r("div",Lt,"Loading quotations...")):q.value.length?(d(),r("div",Dt,[(d(!0),r(B,null,K(q.value,o=>{var m;return d(),r("div",{key:o.id,class:"border rounded-lg p-4 shadow-sm"},[t("div",jt,"Quote #: "+c(o.quote_number),1),t("div",Ft,"Customer: "+c(((m=o.customer)==null?void 0:m.full_name)||"N/A"),1),t("div",zt,"Status: "+c(o.status),1),t("div",Nt,"Final Total: "+c(z(o.final_total)),1),t("div",Pt,[t("div",Qt,[t("button",{class:"text-blue-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-blue-800",onClick:w=>rt(o.id),title:"Preview quotation"},[...e[14]||(e[14]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})],-1),t("span",null,"Preview",-1)])],8,Mt),t("button",{class:"text-gray-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-gray-900",onClick:w=>dt(o.id),title:"Download PDF"},[...e[15]||(e[15]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"})],-1),t("span",null,"Download",-1)])],8,qt),t("button",{class:"text-green-700 font-semibold text-xs inline-flex items-center gap-1 hover:text-green-900",onClick:w=>ut(o.id),title:"Download & Send via WhatsApp"},[...e[16]||(e[16]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 3h6m0 0v6m0-6L10 14"})],-1),t("span",null,"Download & Send",-1)])],8,Tt)])])])}),128))])):(d(),r("p",Ut,"No quotations generated yet."))]),j.value?(d(),r("div",At,[t("div",Rt,[t("div",{class:"sticky top-0 bg-white border-b border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between"},[e[18]||(e[18]=t("div",null,[t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"New Quotation"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:O},[...e[17]||(e[17]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Bt,[t("div",Kt,[C(t("select",{"onUpdate:modelValue":e[2]||(e[2]=o=>s.customer_id=o),class:"input-field"},[e[19]||(e[19]=t("option",{value:""},"Select customer",-1)),(d(!0),r(B,null,K(W(a).customers,o=>(d(),r("option",{key:o.id,value:o.id},c(o.full_name),9,Vt))),128))],512),[[A,s.customer_id]]),C(t("select",{"onUpdate:modelValue":e[3]||(e[3]=o=>s.validity_days=o),class:"input-field"},[...e[20]||(e[20]=[t("option",{value:"7"},"Valid for 7 days",-1),t("option",{value:"30"},"Valid for 30 days",-1)])],512),[[A,s.validity_days]]),C(t("select",{"onUpdate:modelValue":e[4]||(e[4]=o=>s.warranty_months=o),class:"input-field"},[...e[21]||(e[21]=[gt('<option value="">No warranty</option><option value="3">3 months warranty</option><option value="6">6 months warranty</option><option value="12">12 months warranty</option><option value="24">24 months warranty</option><option value="36">36 months warranty</option>',6)])],512),[[A,s.warranty_months]])]),t("div",Ot,[e[22]||(e[22]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Devices"),t("span",{class:"text-xs text-gray-500"},"Click to select devices for this quotation.")],-1)),$.value.length?(d(),r("div",Ht,[(d(!0),r(B,null,K($.value,o=>{var m;return d(),r("button",{key:o.id,type:"button",class:N(["text-left rounded-lg border px-2 py-2 transition",H(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:w=>nt(o)},[t("div",It,[o.image_url?(d(),r("img",{key:0,src:o.image_url,alt:o.name,class:"h-full w-full object-cover"},null,8,Wt)):(d(),r("div",Gt,"No image"))]),t("p",Jt,c(o.name),1),t("p",Yt,c(o.model||"—"),1),t("p",Xt,c(z(o.selling_price)),1),H(o.id)?(d(),r("div",{key:0,class:"mt-2 flex items-center gap-1.5",onClick:e[5]||(e[5]=ft(()=>{},["stop"]))},[t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:w=>it(o.id)},"−",8,Zt),t("span",te,c(((m=u[o.id])==null?void 0:m.quantity)||1),1),t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:w=>st(o.id)},"+",8,ee)])):R("",!0)],10,Et)}),128))])):(d(),r("p",oe,"No devices available.")),t("div",ne,[t("p",se,"Selected: "+c(Object.keys(u).length),1),t("p",ie,"Device Total: "+c(z(T.value)),1)])]),t("div",ae,[e[23]||(e[23]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Solutions"),t("span",{class:"text-xs text-gray-500"},"Click to select solutions for this quotation.")],-1)),W(f).solutions.length?(d(),r("div",le,[(d(!0),r(B,null,K(W(f).solutions,o=>(d(),r("button",{key:o.id,type:"button",class:N(["text-left rounded-lg border px-3 py-2.5 transition",G(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:m=>ot(o)},[t("p",de,c(o.name),1),t("p",ue,c(z(o.base_price)),1)],10,re))),128))])):(d(),r("p",ce,"No solutions available.")),t("div",pe,[t("p",me,"Selected: "+c(Object.keys(b).length),1),t("p",ge,"Solutions Total: "+c(z(V.value)),1)])]),t("div",xe,[t("label",fe,[t("button",{type:"button",class:N(["relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",s.show_descriptions?"bg-primary-600":"bg-gray-300"]),onClick:e[6]||(e[6]=o=>s.show_descriptions=!s.show_descriptions)},[t("span",{class:N(["pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200",s.show_descriptions?"translate-x-4":"translate-x-0"])},null,2)],2),e[24]||(e[24]=t("span",{class:"text-sm text-gray-700"},"Show device descriptions",-1))]),t("label",ye,[t("button",{type:"button",class:N(["relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",s.show_terms?"bg-primary-600":"bg-gray-300"]),onClick:e[7]||(e[7]=o=>s.show_terms=!s.show_terms)},[t("span",{class:N(["pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200",s.show_terms?"translate-x-4":"translate-x-0"])},null,2)],2),e[25]||(e[25]=t("span",{class:"text-sm text-gray-700"},"Show terms & conditions",-1))])]),t("div",he,[t("div",null,[e[26]||(e[26]=t("label",{class:"block text-xs font-medium text-gray-600 mb-1"},"Discount Amount (LKR)",-1)),C(t("input",{"onUpdate:modelValue":e[8]||(e[8]=o=>s.discount_amount=o),type:"number",min:"0",step:"0.01",class:"input-field",placeholder:"0.00"},null,512),[[I,s.discount_amount]])]),t("div",null,[e[27]||(e[27]=t("label",{class:"block text-xs font-medium text-gray-600 mb-1"},"Reason for Discount",-1)),C(t("input",{"onUpdate:modelValue":e[9]||(e[9]=o=>s.discount_reason=o),type:"text",class:"input-field",placeholder:"e.g. Loyalty discount, Promotional offer..."},null,512),[[I,s.discount_reason]])])]),t("div",be,[t("p",ve,"Estimated Total: "+c(z(g.value)),1),t("div",we,[t("button",{type:"button",class:"btn-secondary md:w-auto inline-flex items-center gap-2",onClick:O},[...e[28]||(e[28]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Cancel",-1)])]),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",disabled:D.value,onClick:lt},[e[29]||(e[29]=t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1)),t("span",null,c(D.value?"Generating...":"Generate Quotation"),1)],8,_e)])])])])])):R("",!0),Q.value?(d(),r("div",ke,[t("div",$e,[t("div",{class:"flex items-center justify-between border-b border-gray-100 px-5 md:px-6 py-4 flex-shrink-0"},[e[31]||(e[31]=t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"Quotation Preview",-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:Y},[...e[30]||(e[30]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Ce,[t("iframe",{src:y.value,class:"w-full h-full border-0",title:"Quotation Preview"},null,8,Se)]),t("div",{class:"border-t border-gray-100 px-5 md:px-6 py-4 flex gap-3 justify-end flex-shrink-0"},[t("button",{type:"button",class:"btn-secondary inline-flex items-center gap-2",onClick:Y},[...e[32]||(e[32]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Close",-1)])])])])])):R("",!0)]))}};export{Ne as default};
