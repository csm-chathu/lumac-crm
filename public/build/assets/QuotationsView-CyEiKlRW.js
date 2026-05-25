import{w as pt,r as E,l as mt,e as l,a as t,I as C,D as I,C as R,d as Q,F as B,q as V,v as W,f as gt,g as xt,u,j as N,c as T,p as k,z as ft,m as r,J as yt}from"./app-BJ8O4tC7.js";import{u as ht}from"./customers-DEr3oiJt.js";import{u as bt}from"./solutions-Cjh6GkGJ.js";import{f as vt}from"./currency-ox2L4ikb.js";import{h as wt}from"./html2pdf-DjVg0qff.js";function _t(x){if(!x)return;let d=x.replace(/\D/g,"");d.startsWith("0")&&(d="94"+d.substring(1));const a=`https://wa.me/${d}`;window.open(a,"_blank")}function kt(x,d="a4"){const{customer:a,items:f,final_total:P,quote_number:p,discount_rate:S,warranty_months:$,validity_days:c,discount_amount:b,discount_reason:L,show_terms:j}=x,D=f.some(g=>g.solution_id!==null&&g.solution_id!==void 0),M=$?`Hardware items carry a ${$}-month warranty against manufacturing defects.`:"Hardware items carry a 12-month warranty against manufacturing defects.",y=Number(b||0),_=f.reduce((g,F)=>g+F.quantity*F.unit_price,0),v=_-y,i=d==="a5"?"11px":"14px",s=`padding: 8px; border-bottom: 1px solid #e0e0e0; font-size: ${i};`,q=f.map((g,F)=>`
    <tr>
      <td style="${s}">${F+1}</td>
      <td style="${s}">
        <div>${g.item_name||"Item"}</div>
        ${g.description?`<div style="font-size: ${d==="a5"?"9px":"11px"}; color: #666; margin-top: 2px; line-height: 1.6;">${g.description.replace(/\n/g,"<br>")}</div>`:""}
      </td>
      <td style="${s} text-align: right;">${g.quantity}</td>
      <td style="${s} text-align: right;">LKR ${Number(g.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td style="${s} text-align: right;">LKR ${Number(g.quantity*g.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
    </tr>
  `).join(""),U=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});return`
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
          font-size: ${d==="a5"?"16px":"22px"};
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
          <div style="font-size: ${d==="a5"?"18px":"24px"}; line-height: 1.6; color: #555; font-weight: 600; margin-bottom: 10px;">
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
                <div style="margin-bottom: 5px;"><strong>Date:</strong> ${U}</div>
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
              <td colspan="4" style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${d==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #172554;">TOTAL:</td>
              <td style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${d==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #172554;">LKR ${Number(v).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
          </tfoot>
        </table>
        
        <!-- Payment Schedule (solutions only) -->
        ${D?`
        <div class="payment-schedule">
          <div class="payment-schedule-title">Payment Schedule</div>
          <ul>
            <li><strong>Initial Payment (50%):</strong> LKR ${Number(v/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} <span style="color:#666;">(Payable upon confirmation)</span></li>
            <li><strong>Final Payment (50%):</strong> LKR ${Number(v/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} <span style="color:#666;">(Payable after one week of system usage)</span></li>
          </ul>
        </div>

        `:""}

        <!-- Terms and Conditions -->
        ${j?`
        <div class="terms">
          <h2>Terms and Conditions</h2>
          <ol>
            ${D?"<li><strong>Hosting Renewal:</strong> The hosting and domain service is valid for one (1) year. It must be renewed annually to maintain service.</li>":""}
            <li><strong>Validity:</strong> This quotation is valid for ${c||30} days from the date of issue.</li>
            <li><strong>Warranty:</strong> ${M}</li>
          </ol>
        </div>
        `:""}

        <!-- Footer note -->
        <div style="margin-top: 40px; margin-bottom: 10px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 16px;">
          <div style="font-size: ${i}; font-weight: 600; color: #333; margin-bottom: 6px;">Thank you for your business! | LUMAC Solutions</div>
          <div style="font-size: ${i}; color: #666;">For more details about the order, please use reference number: <strong>${p}</strong></div>
        </div>
        </td></tr>
      </table>
    </body>
    </html>
  `}async function X(x,d="a4"){const a=`quotation-${x.quote_number}.pdf`,f=await Z(x,d),P=URL.createObjectURL(f),p=document.createElement("a");p.href=P,p.download=a,p.click(),URL.revokeObjectURL(P)}function Z(x,d="a4"){const a=kt(x,d),f={margin:10,filename:`quotation-${x.quote_number}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{orientation:"portrait",unit:"mm",format:d==="a5"?"a5":"a4"},pagebreak:{avoid:"div.container",mode:["avoid-all","css","legacy"]}};return wt().set(f).from(a).outputPdf("blob")}const $t={class:"max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6"},Ct={class:"card"},St={class:"flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4"},Lt={class:"flex flex-row flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto"},jt={key:0,class:"text-sm text-gray-500"},Dt={key:1,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"},Ft={class:"font-medium text-gray-800"},zt={class:"text-gray-500"},Nt={class:"text-gray-500"},Pt={class:"text-gray-500"},Mt={class:"mt-2"},Qt={class:"flex gap-2 flex-wrap"},Tt=["onClick"],qt=["onClick"],Ut=["onClick"],At={key:2,class:"text-sm text-gray-500"},Rt={key:0,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"},Bt={class:"bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto"},Vt={class:"p-5 md:p-6 space-y-5"},Kt={class:"grid grid-cols-1 md:grid-cols-4 gap-4"},Ot=["value"],Ht={class:"input-field bg-gray-50 text-gray-500 flex items-center gap-2 cursor-not-allowed select-none"},Et={class:"text-sm"},It={class:"text-gray-700"},Wt={key:0,class:"text-xs text-gray-500 -mt-2"},Gt={class:"space-y-3 border border-gray-100 rounded-xl p-4"},Jt={key:0,class:"grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-44 overflow-y-auto pr-1"},Yt=["onClick"],Xt={class:"mb-1.5 h-12 w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200"},Zt=["src","alt"],te={key:1,class:"h-full w-full flex items-center justify-center text-xs text-gray-400"},ee={class:"text-xs font-semibold leading-tight truncate"},oe={class:"text-xs text-gray-500 leading-tight truncate"},ne={class:"text-xs font-medium mt-0.5"},se=["onClick"],ie={class:"text-xs font-semibold w-5 text-center"},ae=["onClick"],le={key:1,class:"text-sm text-gray-500"},re={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},de={class:"text-xs text-gray-600"},ue={class:"text-xs font-semibold text-gray-800"},ce={class:"space-y-3 border border-gray-100 rounded-xl p-4"},pe={key:0,class:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1"},me=["onClick"],ge={class:"text-sm font-semibold leading-tight"},xe={class:"text-xs text-gray-500 mt-0.5"},fe={key:1,class:"text-sm text-gray-500"},ye={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},he={class:"text-xs text-gray-600"},be={class:"text-xs font-semibold text-gray-800"},ve={class:"flex flex-wrap items-center gap-5"},we={class:"flex items-center gap-2 cursor-pointer select-none"},_e={class:"flex items-center gap-2 cursor-pointer select-none"},ke={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},$e={class:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1"},Ce={class:"text-sm font-semibold text-gray-800"},Se={class:"flex flex-col sm:flex-row gap-3"},Le=["disabled"],je={key:1,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"},De={class:"bg-white w-full h-full rounded-lg shadow-xl overflow-hidden flex flex-col"},Fe={class:"flex-1 overflow-hidden"},ze=["src"],qe={__name:"QuotationsView",setup(x){const d=pt(),a=ht(),f=bt(),{success:P,error:p}=ft(),S=k([]),$=k([]),c=E({}),b=E({}),L=k(!1),j=k(!1),D=k(!1),M=k(!1),y=k(""),_=k(""),v=k(""),i=T(()=>d.isAgent),s=E({customer_id:"",validity_days:30,warranty_months:"",discount_amount:"",discount_reason:"",show_descriptions:!0,show_terms:!0,discount_rate:i.value?0:35,commission_rate:i.value?30:10}),q=T(()=>{let n=S.value||[];if(_.value.trim()){const e=_.value.toLowerCase();n=n.filter(o=>{var m,w,h;return((w=(m=o.customer)==null?void 0:m.full_name)==null?void 0:w.toLowerCase().includes(e))||((h=o.quote_number)==null?void 0:h.toLowerCase().includes(e))})}return v.value&&(n=n.filter(e=>e.status===v.value)),n}),U=T(()=>Object.values(c).reduce((n,{device:e,quantity:o})=>n+Number(e.selling_price||0)*o,0)),K=T(()=>Object.values(b).reduce((n,{solution:e,quantity:o})=>n+Number(e.base_price||0)*o,0)),g=T(()=>K.value+U.value-(Number(s.discount_amount)||0));function F(){_.value="",v.value=""}function z(n){return vt(n)}function tt(){s.customer_id="",s.validity_days=30,s.warranty_months="",s.discount_amount="",s.discount_reason="",s.show_descriptions=!0,s.show_terms=!0,s.discount_rate=i.value?0:35,s.commission_rate=i.value?30:10,Object.keys(c).forEach(n=>delete c[n]),Object.keys(b).forEach(n=>delete b[n])}function et(){D.value=!0}function O(){D.value=!1,tt()}function G(n){return n in b}function ot(n){G(n.id)?delete b[n.id]:b[n.id]={solution:n,quantity:1}}function H(n){return n in c}function nt(n){H(n.id)?delete c[n.id]:c[n.id]={device:n,quantity:1}}function st(n){c[n]&&c[n].quantity++}function it(n){c[n]&&(c[n].quantity>1?c[n].quantity--:delete c[n])}async function at(){try{const{data:n}=await axios.get("/devices");$.value=Array.isArray(n)?n:[]}catch{$.value=[]}}async function J(){var n,e;L.value=!0;try{const{data:o}=await axios.get("/quotations");S.value=o}catch(o){p(((e=(n=o.response)==null?void 0:n.data)==null?void 0:e.message)||"Failed to load quotations.")}finally{L.value=!1}}async function lt(){var n,e;j.value=!0;try{const o=Object.entries(b).map(([h,{solution:A,quantity:ct}])=>({solution_id:Number(h),item_name:A.name,quantity:ct,unit_price:Number(A.base_price||0)})),m=Object.values(c).map(({device:h,quantity:A})=>({solution_id:null,item_name:h.model?`${h.name} (${h.model})`:h.name,description:s.show_descriptions&&h.description||null,quantity:A,unit_price:Number(h.selling_price||0)})),w={customer_id:Number(s.customer_id),validity_days:Number(s.validity_days)||30,show_terms:s.show_terms,warranty_months:s.warranty_months?Number(s.warranty_months):null,discount_amount:s.discount_amount?Number(s.discount_amount):0,discount_reason:s.discount_reason||null,discount_rate:i.value?0:Number(s.discount_rate),commission_rate:i.value?30:Number(s.commission_rate),status:"issued",items:[...o,...m]};await axios.post("/quotations",w),P("Quotation generated successfully!"),await J(),O()}catch(o){p(((e=(n=o.response)==null?void 0:n.data)==null?void 0:e.message)||"Failed to create quotation. Please try again.")}finally{j.value=!1}}async function rt(n){try{const e=S.value.find(m=>m.id===n);if(!e){p("Quotation not found");return}y.value&&URL.revokeObjectURL(y.value);const o=await Z(e,"a4");y.value=URL.createObjectURL(o),M.value=!0}catch{p("Failed to open preview. Please try again.")}}function Y(){y.value&&URL.revokeObjectURL(y.value),M.value=!1,y.value=""}function dt(n,e="a4"){try{const o=S.value.find(m=>m.id===n);if(!o){p("Quotation not found");return}X(o,e)}catch{p("Failed to generate PDF. Please try again.")}}function ut(n){try{const e=S.value.find(o=>o.id===n);if(!e){p("Quotation not found");return}X(e,"a4"),e.customer&&e.customer.phone?setTimeout(()=>{_t(e.customer.phone)},800):p("Customer phone number not available")}catch{p("Failed to download and send.")}}return mt(async()=>{await Promise.all([a.fetchCustomers(),f.fetchSolutions(),at(),J()])}),(n,e)=>(r(),l("div",$t,[t("div",{class:"flex flex-col md:flex-row md:items-start md:justify-between gap-4"},[e[11]||(e[11]=t("div",null,[t("p",{class:"text-xs uppercase tracking-wide text-primary-700 font-semibold"},"Quotation Center"),t("h1",{class:"text-2xl md:text-3xl font-bold text-gray-900"},"Build and Print Quotations"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",onClick:et},[...e[10]||(e[10]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1),t("span",null,"New Quotation",-1)])])]),t("section",Ct,[t("div",St,[e[13]||(e[13]=t("h2",{class:"text-lg font-semibold text-gray-800"},"Quotation History",-1)),t("div",Lt,[C(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>_.value=o),type:"text",class:"input-field flex-1 min-w-[220px] md:w-64",placeholder:"Search customer..."},null,512),[[I,_.value]]),C(t("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>v.value=o),class:"input-field w-auto min-w-[150px]"},[...e[12]||(e[12]=[t("option",{value:""},"All statuses",-1),t("option",{value:"issued"},"Issued",-1),t("option",{value:"accepted"},"Accepted",-1),t("option",{value:"rejected"},"Rejected",-1)])],512),[[R,v.value]]),_.value||v.value?(r(),l("button",{key:0,onClick:F,class:"btn-secondary px-4 py-2 w-auto whitespace-nowrap"}," Reset ")):Q("",!0)])]),L.value?(r(),l("div",jt,"Loading quotations...")):q.value.length?(r(),l("div",Dt,[(r(!0),l(B,null,V(q.value,o=>{var m;return r(),l("div",{key:o.id,class:"border rounded-lg p-4 shadow-sm"},[t("div",Ft,"Quote #: "+u(o.quote_number),1),t("div",zt,"Customer: "+u(((m=o.customer)==null?void 0:m.full_name)||"N/A"),1),t("div",Nt,"Status: "+u(o.status),1),t("div",Pt,"Final Total: "+u(z(o.final_total)),1),t("div",Mt,[t("div",Qt,[t("button",{class:"text-blue-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-blue-800",onClick:w=>rt(o.id),title:"Preview quotation"},[...e[14]||(e[14]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})],-1),t("span",null,"Preview",-1)])],8,Tt),t("button",{class:"text-gray-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-gray-900",onClick:w=>dt(o.id),title:"Download PDF"},[...e[15]||(e[15]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"})],-1),t("span",null,"Download",-1)])],8,qt),t("button",{class:"text-green-700 font-semibold text-xs inline-flex items-center gap-1 hover:text-green-900",onClick:w=>ut(o.id),title:"Download & Send via WhatsApp"},[...e[16]||(e[16]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 3h6m0 0v6m0-6L10 14"})],-1),t("span",null,"Download & Send",-1)])],8,Ut)])])])}),128))])):(r(),l("p",At,"No quotations generated yet."))]),D.value?(r(),l("div",Rt,[t("div",Bt,[t("div",{class:"sticky top-0 bg-white border-b border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between"},[e[18]||(e[18]=t("div",null,[t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"New Quotation"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:O},[...e[17]||(e[17]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Vt,[t("div",Kt,[C(t("select",{"onUpdate:modelValue":e[2]||(e[2]=o=>s.customer_id=o),class:"input-field"},[e[19]||(e[19]=t("option",{value:""},"Select customer",-1)),(r(!0),l(B,null,V(W(a).customers,o=>(r(),l("option",{key:o.id,value:o.id},u(o.full_name),9,Ot))),128))],512),[[R,s.customer_id]]),C(t("select",{"onUpdate:modelValue":e[3]||(e[3]=o=>s.validity_days=o),class:"input-field"},[...e[20]||(e[20]=[t("option",{value:"7"},"Valid for 7 days",-1),t("option",{value:"30"},"Valid for 30 days",-1)])],512),[[R,s.validity_days]]),C(t("select",{"onUpdate:modelValue":e[4]||(e[4]=o=>s.warranty_months=o),class:"input-field"},[...e[21]||(e[21]=[gt('<option value="">No warranty</option><option value="3">3 months warranty</option><option value="6">6 months warranty</option><option value="12">12 months warranty</option><option value="24">24 months warranty</option><option value="36">36 months warranty</option>',6)])],512),[[R,s.warranty_months]]),t("div",Ht,[e[23]||(e[23]=t("svg",{class:"w-4 h-4 flex-shrink-0 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})],-1)),t("span",Et,[e[22]||(e[22]=xt("Commission: ",-1)),t("strong",It,u(i.value?30:s.commission_rate)+"%",1)]),e[24]||(e[24]=t("span",{class:"ml-auto text-xs text-gray-400"},"Fixed",-1))])]),i.value?(r(),l("p",Wt,"For agents, commission is fixed at 30% and calculated from solution items only.")):Q("",!0),t("div",Gt,[e[25]||(e[25]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Devices"),t("span",{class:"text-xs text-gray-500"},"Click to select devices for this quotation.")],-1)),$.value.length?(r(),l("div",Jt,[(r(!0),l(B,null,V($.value,o=>{var m;return r(),l("button",{key:o.id,type:"button",class:N(["text-left rounded-lg border px-2 py-2 transition",H(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:w=>nt(o)},[t("div",Xt,[o.image_url?(r(),l("img",{key:0,src:o.image_url,alt:o.name,class:"h-full w-full object-cover"},null,8,Zt)):(r(),l("div",te,"No image"))]),t("p",ee,u(o.name),1),t("p",oe,u(o.model||"—"),1),t("p",ne,u(z(o.selling_price)),1),H(o.id)?(r(),l("div",{key:0,class:"mt-2 flex items-center gap-1.5",onClick:e[5]||(e[5]=yt(()=>{},["stop"]))},[t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:w=>it(o.id)},"−",8,se),t("span",ie,u(((m=c[o.id])==null?void 0:m.quantity)||1),1),t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:w=>st(o.id)},"+",8,ae)])):Q("",!0)],10,Yt)}),128))])):(r(),l("p",le,"No devices available.")),t("div",re,[t("p",de,"Selected: "+u(Object.keys(c).length),1),t("p",ue,"Device Total: "+u(z(U.value)),1)])]),t("div",ce,[e[26]||(e[26]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Solutions"),t("span",{class:"text-xs text-gray-500"},"Click to select solutions for this quotation.")],-1)),W(f).solutions.length?(r(),l("div",pe,[(r(!0),l(B,null,V(W(f).solutions,o=>(r(),l("button",{key:o.id,type:"button",class:N(["text-left rounded-lg border px-3 py-2.5 transition",G(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:m=>ot(o)},[t("p",ge,u(o.name),1),t("p",xe,u(z(o.base_price)),1)],10,me))),128))])):(r(),l("p",fe,"No solutions available.")),t("div",ye,[t("p",he,"Selected: "+u(Object.keys(b).length),1),t("p",be,"Solutions Total: "+u(z(K.value)),1)])]),t("div",ve,[t("label",we,[t("button",{type:"button",class:N(["relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",s.show_descriptions?"bg-primary-600":"bg-gray-300"]),onClick:e[6]||(e[6]=o=>s.show_descriptions=!s.show_descriptions)},[t("span",{class:N(["pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200",s.show_descriptions?"translate-x-4":"translate-x-0"])},null,2)],2),e[27]||(e[27]=t("span",{class:"text-sm text-gray-700"},"Show device descriptions",-1))]),t("label",_e,[t("button",{type:"button",class:N(["relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",s.show_terms?"bg-primary-600":"bg-gray-300"]),onClick:e[7]||(e[7]=o=>s.show_terms=!s.show_terms)},[t("span",{class:N(["pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200",s.show_terms?"translate-x-4":"translate-x-0"])},null,2)],2),e[28]||(e[28]=t("span",{class:"text-sm text-gray-700"},"Show terms & conditions",-1))])]),t("div",ke,[t("div",null,[e[29]||(e[29]=t("label",{class:"block text-xs font-medium text-gray-600 mb-1"},"Discount Amount (LKR)",-1)),C(t("input",{"onUpdate:modelValue":e[8]||(e[8]=o=>s.discount_amount=o),type:"number",min:"0",step:"0.01",class:"input-field",placeholder:"0.00"},null,512),[[I,s.discount_amount]])]),t("div",null,[e[30]||(e[30]=t("label",{class:"block text-xs font-medium text-gray-600 mb-1"},"Reason for Discount",-1)),C(t("input",{"onUpdate:modelValue":e[9]||(e[9]=o=>s.discount_reason=o),type:"text",class:"input-field",placeholder:"e.g. Loyalty discount, Promotional offer..."},null,512),[[I,s.discount_reason]])])]),t("div",$e,[t("p",Ce,"Estimated Total: "+u(z(g.value)),1),t("div",Se,[t("button",{type:"button",class:"btn-secondary md:w-auto inline-flex items-center gap-2",onClick:O},[...e[31]||(e[31]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Cancel",-1)])]),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",disabled:j.value,onClick:lt},[e[32]||(e[32]=t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1)),t("span",null,u(j.value?"Generating...":"Generate Quotation"),1)],8,Le)])])])])])):Q("",!0),M.value?(r(),l("div",je,[t("div",De,[t("div",{class:"flex items-center justify-between border-b border-gray-100 px-5 md:px-6 py-4 flex-shrink-0"},[e[34]||(e[34]=t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"Quotation Preview",-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:Y},[...e[33]||(e[33]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Fe,[t("iframe",{src:y.value,class:"w-full h-full border-0",title:"Quotation Preview"},null,8,ze)]),t("div",{class:"border-t border-gray-100 px-5 md:px-6 py-4 flex gap-3 justify-end flex-shrink-0"},[t("button",{type:"button",class:"btn-secondary inline-flex items-center gap-2",onClick:Y},[...e[35]||(e[35]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Close",-1)])])])])])):Q("",!0)]))}};export{qe as default};
