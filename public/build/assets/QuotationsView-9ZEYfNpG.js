import{w as mt,r as O,l as pt,e as l,a as t,I as S,D as H,C as U,d as M,F as A,q as R,v as E,f as gt,g as xt,u,c as Q,p as k,z as ft,m as r,j as J,J as yt}from"./app-DhJD9pi-.js";import{u as ht}from"./customers-Bcu1DgDw.js";import{u as bt}from"./solutions-Du8i1pYE.js";import{f as vt}from"./currency-ox2L4ikb.js";import{h as wt}from"./html2pdf-DjVg0qff.js";function _t(f){if(!f)return;let d=f.replace(/\D/g,"");d.startsWith("0")&&(d="94"+d.substring(1));const a=`https://wa.me/${d}`;window.open(a,"_blank")}function kt(f,d="a4"){const{customer:a,items:y,final_total:N,quote_number:m,discount_rate:j,warranty_months:$,validity_days:c,discount_amount:h,discount_reason:D}=f,C=y.some(x=>x.solution_id!==null&&x.solution_id!==void 0),P=$?`Hardware items carry a ${$}-month warranty against manufacturing defects.`:"Hardware items carry a 12-month warranty against manufacturing defects.",L=Number(h||0),b=y.reduce((x,F)=>x+F.quantity*F.unit_price,0),v=b-L,i=d==="a5"?"11px":"14px",g=`padding: 8px; border-bottom: 1px solid #e0e0e0; font-size: ${i};`,s=y.map((x,F)=>`
    <tr>
      <td style="${g}">${F+1}</td>
      <td style="${g}">${x.item_name||"Item"}</td>
      <td style="${g} text-align: right;">${x.quantity}</td>
      <td style="${g} text-align: right;">LKR ${Number(x.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td style="${g} text-align: right;">LKR ${Number(x.quantity*x.unit_price||0).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
    </tr>
  `).join(""),T=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});return`
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
            ${s}
          </tbody>
          <!-- Totals inside table for perfect alignment -->
          <tfoot>
            ${L>0?`
            <tr>
              <td colspan="4" style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${i}; text-align: right; font-weight: 600;">Subtotal:</td>
              <td style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${i}; text-align: right;">LKR ${Number(b).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
            <tr>
              <td colspan="4" style="padding: 8px; font-size: ${i}; text-align: right; font-weight: 600; color: #dc2626;">Discount${D?` (${D})`:""}:</td>
              <td style="padding: 8px; font-size: ${i}; text-align: right; color: #dc2626;">- LKR ${Number(L).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
            `:""}
            <tr>
              <td colspan="4" style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${d==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #172554;">TOTAL:</td>
              <td style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${d==="a5"?"13px":"16px"}; text-align: right; font-weight: 700; color: #172554;">LKR ${Number(v).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
            </tr>
          </tfoot>
        </table>
        
        <!-- Payment Schedule (solutions only) -->
        ${C?`
        <div class="payment-schedule">
          <div class="payment-schedule-title">Payment Schedule</div>
          <ul>
            <li><strong>Initial Payment (50%):</strong> LKR ${Number(v/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} <span style="color:#666;">(Payable upon confirmation)</span></li>
            <li><strong>Final Payment (50%):</strong> LKR ${Number(v/2).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2})} <span style="color:#666;">(Payable after one week of system usage)</span></li>
          </ul>
        </div>

        `:""}

        <!-- Terms and Conditions (always shown) -->
        <div class="terms">
          <h2>Terms and Conditions</h2>
          <ol>
            ${C?"<li><strong>Hosting Renewal:</strong> The hosting and domain service is valid for one (1) year. It must be renewed annually to maintain service.</li>":""}
            <li><strong>Validity:</strong> This quotation is valid for ${c||30} days from the date of issue.</li>
            <li><strong>Warranty:</strong> ${P}</li>
          </ol>
        </div>

        <!-- Footer note -->
        <div style="margin-top: 40px; margin-bottom: 10px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 16px;">
          <div style="font-size: ${i}; font-weight: 600; color: #333; margin-bottom: 6px;">Thank you for your business! | LUMAC Solutions</div>
          <div style="font-size: ${i}; color: #666;">For more details about the order, please use reference number: <strong>${m}</strong></div>
        </div>
        </td></tr>
      </table>
    </body>
    </html>
  `}async function Y(f,d="a4"){const a=`quotation-${f.quote_number}.pdf`,y=await X(f,d),N=URL.createObjectURL(y),m=document.createElement("a");m.href=N,m.download=a,m.click(),URL.revokeObjectURL(N)}function X(f,d="a4"){const a=kt(f,d),y={margin:10,filename:`quotation-${f.quote_number}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{orientation:"portrait",unit:"mm",format:d==="a5"?"a5":"a4"},pagebreak:{avoid:"div.container",mode:["avoid-all","css","legacy"]}};return wt().set(y).from(a).outputPdf("blob")}const $t={class:"max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6"},Ct={class:"card"},Lt={class:"flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4"},St={class:"flex flex-row flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto"},jt={key:0,class:"text-sm text-gray-500"},Dt={key:1,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"},Ft={class:"font-medium text-gray-800"},zt={class:"text-gray-500"},Nt={class:"text-gray-500"},Pt={class:"text-gray-500"},Mt={class:"mt-2"},Qt={class:"flex gap-2 flex-wrap"},Tt=["onClick"],qt=["onClick"],Ut=["onClick"],At={key:2,class:"text-sm text-gray-500"},Rt={key:0,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"},Bt={class:"bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto"},Vt={class:"p-5 md:p-6 space-y-5"},Kt={class:"grid grid-cols-1 md:grid-cols-4 gap-4"},Ot=["value"],Ht={class:"input-field bg-gray-50 text-gray-500 flex items-center gap-2 cursor-not-allowed select-none"},Et={class:"text-sm"},It={class:"text-gray-700"},Wt={key:0,class:"text-xs text-gray-500 -mt-2"},Gt={class:"space-y-3 border border-gray-100 rounded-xl p-4"},Jt={key:0,class:"grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-44 overflow-y-auto pr-1"},Yt=["onClick"],Xt={class:"mb-1.5 h-12 w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200"},Zt=["src","alt"],te={key:1,class:"h-full w-full flex items-center justify-center text-xs text-gray-400"},ee={class:"text-xs font-semibold leading-tight truncate"},oe={class:"text-xs text-gray-500 leading-tight truncate"},ne={class:"text-xs font-medium mt-0.5"},ie=["onClick"],se={class:"text-xs font-semibold w-5 text-center"},ae=["onClick"],le={key:1,class:"text-sm text-gray-500"},re={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},de={class:"text-xs text-gray-600"},ue={class:"text-xs font-semibold text-gray-800"},ce={class:"space-y-3 border border-gray-100 rounded-xl p-4"},me={key:0,class:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1"},pe=["onClick"],ge={class:"text-sm font-semibold leading-tight"},xe={class:"text-xs text-gray-500 mt-0.5"},fe={key:1,class:"text-sm text-gray-500"},ye={class:"rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-2"},he={class:"text-xs text-gray-600"},be={class:"text-xs font-semibold text-gray-800"},ve={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},we={class:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1"},_e={class:"text-sm font-semibold text-gray-800"},ke={class:"flex flex-col sm:flex-row gap-3"},$e=["disabled"],Ce={key:1,class:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"},Le={class:"bg-white w-full h-full rounded-lg shadow-xl overflow-hidden flex flex-col"},Se={class:"flex-1 overflow-hidden"},je=["src"],Me={__name:"QuotationsView",setup(f){const d=mt(),a=ht(),y=bt(),{success:N,error:m}=ft(),j=k([]),$=k([]),c=O({}),h=O({}),D=k(!1),C=k(!1),P=k(!1),L=k(!1),b=k(""),v=k(""),i=k(""),g=Q(()=>d.isAgent),s=O({customer_id:"",validity_days:30,warranty_months:"",discount_amount:"",discount_reason:"",discount_rate:g.value?0:35,commission_rate:g.value?30:10}),T=Q(()=>{let n=j.value||[];if(v.value.trim()){const e=v.value.toLowerCase();n=n.filter(o=>{var p,w,_;return((w=(p=o.customer)==null?void 0:p.full_name)==null?void 0:w.toLowerCase().includes(e))||((_=o.quote_number)==null?void 0:_.toLowerCase().includes(e))})}return i.value&&(n=n.filter(e=>e.status===i.value)),n}),B=Q(()=>Object.values(c).reduce((n,{device:e,quantity:o})=>n+Number(e.selling_price||0)*o,0)),x=Q(()=>Object.values(h).reduce((n,{solution:e,quantity:o})=>n+Number(e.base_price||0)*o,0)),F=Q(()=>x.value+B.value-(Number(s.discount_amount)||0));function Z(){v.value="",i.value=""}function z(n){return vt(n)}function tt(){s.customer_id="",s.validity_days=30,s.warranty_months="",s.discount_amount="",s.discount_reason="",s.discount_rate=g.value?0:35,s.commission_rate=g.value?30:10,Object.keys(c).forEach(n=>delete c[n]),Object.keys(h).forEach(n=>delete h[n])}function et(){P.value=!0}function V(){P.value=!1,tt()}function I(n){return n in h}function ot(n){I(n.id)?delete h[n.id]:h[n.id]={solution:n,quantity:1}}function K(n){return n in c}function nt(n){K(n.id)?delete c[n.id]:c[n.id]={device:n,quantity:1}}function it(n){c[n]&&c[n].quantity++}function st(n){c[n]&&(c[n].quantity>1?c[n].quantity--:delete c[n])}async function at(){try{const{data:n}=await axios.get("/devices");$.value=Array.isArray(n)?n:[]}catch{$.value=[]}}async function W(){var n,e;D.value=!0;try{const{data:o}=await axios.get("/quotations");j.value=o}catch(o){m(((e=(n=o.response)==null?void 0:n.data)==null?void 0:e.message)||"Failed to load quotations.")}finally{D.value=!1}}async function lt(){var n,e;C.value=!0;try{const o=Object.entries(h).map(([_,{solution:q,quantity:ct}])=>({solution_id:Number(_),item_name:q.name,quantity:ct,unit_price:Number(q.base_price||0)})),p=Object.values(c).map(({device:_,quantity:q})=>({solution_id:null,item_name:_.model?`${_.name} (${_.model})`:_.name,quantity:q,unit_price:Number(_.selling_price||0)})),w={customer_id:Number(s.customer_id),validity_days:Number(s.validity_days)||30,warranty_months:s.warranty_months?Number(s.warranty_months):null,discount_amount:s.discount_amount?Number(s.discount_amount):0,discount_reason:s.discount_reason||null,discount_rate:g.value?0:Number(s.discount_rate),commission_rate:g.value?30:Number(s.commission_rate),status:"issued",items:[...o,...p]};await axios.post("/quotations",w),N("Quotation generated successfully!"),await W(),V()}catch(o){m(((e=(n=o.response)==null?void 0:n.data)==null?void 0:e.message)||"Failed to create quotation. Please try again.")}finally{C.value=!1}}async function rt(n){try{const e=j.value.find(p=>p.id===n);if(!e){m("Quotation not found");return}b.value&&URL.revokeObjectURL(b.value);const o=await X(e,"a4");b.value=URL.createObjectURL(o),L.value=!0}catch{m("Failed to open preview. Please try again.")}}function G(){b.value&&URL.revokeObjectURL(b.value),L.value=!1,b.value=""}function dt(n,e="a4"){try{const o=j.value.find(p=>p.id===n);if(!o){m("Quotation not found");return}Y(o,e)}catch{m("Failed to generate PDF. Please try again.")}}function ut(n){try{const e=j.value.find(o=>o.id===n);if(!e){m("Quotation not found");return}Y(e,"a4"),e.customer&&e.customer.phone?setTimeout(()=>{_t(e.customer.phone)},800):m("Customer phone number not available")}catch{m("Failed to download and send.")}}return pt(async()=>{await Promise.all([a.fetchCustomers(),y.fetchSolutions(),at(),W()])}),(n,e)=>(r(),l("div",$t,[t("div",{class:"flex flex-col md:flex-row md:items-start md:justify-between gap-4"},[e[9]||(e[9]=t("div",null,[t("p",{class:"text-xs uppercase tracking-wide text-primary-700 font-semibold"},"Quotation Center"),t("h1",{class:"text-2xl md:text-3xl font-bold text-gray-900"},"Build and Print Quotations"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",onClick:et},[...e[8]||(e[8]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1),t("span",null,"New Quotation",-1)])])]),t("section",Ct,[t("div",Lt,[e[11]||(e[11]=t("h2",{class:"text-lg font-semibold text-gray-800"},"Quotation History",-1)),t("div",St,[S(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>v.value=o),type:"text",class:"input-field flex-1 min-w-[220px] md:w-64",placeholder:"Search customer..."},null,512),[[H,v.value]]),S(t("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>i.value=o),class:"input-field w-auto min-w-[150px]"},[...e[10]||(e[10]=[t("option",{value:""},"All statuses",-1),t("option",{value:"issued"},"Issued",-1),t("option",{value:"accepted"},"Accepted",-1),t("option",{value:"rejected"},"Rejected",-1)])],512),[[U,i.value]]),v.value||i.value?(r(),l("button",{key:0,onClick:Z,class:"btn-secondary px-4 py-2 w-auto whitespace-nowrap"}," Reset ")):M("",!0)])]),D.value?(r(),l("div",jt,"Loading quotations...")):T.value.length?(r(),l("div",Dt,[(r(!0),l(A,null,R(T.value,o=>{var p;return r(),l("div",{key:o.id,class:"border rounded-lg p-4 shadow-sm"},[t("div",Ft,"Quote #: "+u(o.quote_number),1),t("div",zt,"Customer: "+u(((p=o.customer)==null?void 0:p.full_name)||"N/A"),1),t("div",Nt,"Status: "+u(o.status),1),t("div",Pt,"Final Total: "+u(z(o.final_total)),1),t("div",Mt,[t("div",Qt,[t("button",{class:"text-blue-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-blue-800",onClick:w=>rt(o.id),title:"Preview quotation"},[...e[12]||(e[12]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})],-1),t("span",null,"Preview",-1)])],8,Tt),t("button",{class:"text-gray-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-gray-900",onClick:w=>dt(o.id),title:"Download PDF"},[...e[13]||(e[13]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"})],-1),t("span",null,"Download",-1)])],8,qt),t("button",{class:"text-green-700 font-semibold text-xs inline-flex items-center gap-1 hover:text-green-900",onClick:w=>ut(o.id),title:"Download & Send via WhatsApp"},[...e[14]||(e[14]=[t("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 3h6m0 0v6m0-6L10 14"})],-1),t("span",null,"Download & Send",-1)])],8,Ut)])])])}),128))])):(r(),l("p",At,"No quotations generated yet."))]),P.value?(r(),l("div",Rt,[t("div",Bt,[t("div",{class:"sticky top-0 bg-white border-b border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between"},[e[16]||(e[16]=t("div",null,[t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"New Quotation"),t("p",{class:"text-sm text-gray-500 mt-1"},"Select customer, packages, and pricing margins to generate formal quotes.")],-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:V},[...e[15]||(e[15]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Vt,[t("div",Kt,[S(t("select",{"onUpdate:modelValue":e[2]||(e[2]=o=>s.customer_id=o),class:"input-field"},[e[17]||(e[17]=t("option",{value:""},"Select customer",-1)),(r(!0),l(A,null,R(E(a).customers,o=>(r(),l("option",{key:o.id,value:o.id},u(o.full_name),9,Ot))),128))],512),[[U,s.customer_id]]),S(t("select",{"onUpdate:modelValue":e[3]||(e[3]=o=>s.validity_days=o),class:"input-field"},[...e[18]||(e[18]=[t("option",{value:"7"},"Valid for 7 days",-1),t("option",{value:"30"},"Valid for 30 days",-1)])],512),[[U,s.validity_days]]),S(t("select",{"onUpdate:modelValue":e[4]||(e[4]=o=>s.warranty_months=o),class:"input-field"},[...e[19]||(e[19]=[gt('<option value="">No warranty</option><option value="3">3 months warranty</option><option value="6">6 months warranty</option><option value="12">12 months warranty</option><option value="24">24 months warranty</option><option value="36">36 months warranty</option>',6)])],512),[[U,s.warranty_months]]),t("div",Ht,[e[21]||(e[21]=t("svg",{class:"w-4 h-4 flex-shrink-0 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})],-1)),t("span",Et,[e[20]||(e[20]=xt("Commission: ",-1)),t("strong",It,u(g.value?30:s.commission_rate)+"%",1)]),e[22]||(e[22]=t("span",{class:"ml-auto text-xs text-gray-400"},"Fixed",-1))])]),g.value?(r(),l("p",Wt,"For agents, commission is fixed at 30% and calculated from solution items only.")):M("",!0),t("div",Gt,[e[23]||(e[23]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Devices"),t("span",{class:"text-xs text-gray-500"},"Click to select devices for this quotation.")],-1)),$.value.length?(r(),l("div",Jt,[(r(!0),l(A,null,R($.value,o=>{var p;return r(),l("button",{key:o.id,type:"button",class:J(["text-left rounded-lg border px-2 py-2 transition",K(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:w=>nt(o)},[t("div",Xt,[o.image_url?(r(),l("img",{key:0,src:o.image_url,alt:o.name,class:"h-full w-full object-cover"},null,8,Zt)):(r(),l("div",te,"No image"))]),t("p",ee,u(o.name),1),t("p",oe,u(o.model||"—"),1),t("p",ne,u(z(o.selling_price)),1),K(o.id)?(r(),l("div",{key:0,class:"mt-2 flex items-center gap-1.5",onClick:e[5]||(e[5]=yt(()=>{},["stop"]))},[t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:w=>st(o.id)},"−",8,ie),t("span",se,u(((p=c[o.id])==null?void 0:p.quantity)||1),1),t("button",{type:"button",class:"w-5 h-5 rounded border border-primary-300 bg-white text-primary-700 text-xs flex items-center justify-center hover:bg-primary-50",onClick:w=>it(o.id)},"+",8,ae)])):M("",!0)],10,Yt)}),128))])):(r(),l("p",le,"No devices available.")),t("div",re,[t("p",de,"Selected: "+u(Object.keys(c).length),1),t("p",ue,"Device Total: "+u(z(B.value)),1)])]),t("div",ce,[e[24]||(e[24]=t("div",{class:"flex items-center justify-between gap-3 flex-wrap"},[t("p",{class:"text-sm font-semibold text-gray-800"},"Solutions"),t("span",{class:"text-xs text-gray-500"},"Click to select solutions for this quotation.")],-1)),E(y).solutions.length?(r(),l("div",me,[(r(!0),l(A,null,R(E(y).solutions,o=>(r(),l("button",{key:o.id,type:"button",class:J(["text-left rounded-lg border px-3 py-2.5 transition",I(o.id)?"border-primary-600 bg-primary-50 text-primary-900":"border-gray-200 hover:border-primary-300 hover:bg-gray-50"]),onClick:p=>ot(o)},[t("p",ge,u(o.name),1),t("p",xe,u(z(o.base_price)),1)],10,pe))),128))])):(r(),l("p",fe,"No solutions available.")),t("div",ye,[t("p",he,"Selected: "+u(Object.keys(h).length),1),t("p",be,"Solutions Total: "+u(z(x.value)),1)])]),t("div",ve,[t("div",null,[e[25]||(e[25]=t("label",{class:"block text-xs font-medium text-gray-600 mb-1"},"Discount Amount (LKR)",-1)),S(t("input",{"onUpdate:modelValue":e[6]||(e[6]=o=>s.discount_amount=o),type:"number",min:"0",step:"0.01",class:"input-field",placeholder:"0.00"},null,512),[[H,s.discount_amount]])]),t("div",null,[e[26]||(e[26]=t("label",{class:"block text-xs font-medium text-gray-600 mb-1"},"Reason for Discount",-1)),S(t("input",{"onUpdate:modelValue":e[7]||(e[7]=o=>s.discount_reason=o),type:"text",class:"input-field",placeholder:"e.g. Loyalty discount, Promotional offer..."},null,512),[[H,s.discount_reason]])])]),t("div",we,[t("p",_e,"Estimated Total: "+u(z(F.value)),1),t("div",ke,[t("button",{type:"button",class:"btn-secondary md:w-auto inline-flex items-center gap-2",onClick:V},[...e[27]||(e[27]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Cancel",-1)])]),t("button",{type:"button",class:"btn-primary md:w-auto inline-flex items-center gap-2",disabled:C.value,onClick:lt},[e[28]||(e[28]=t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})],-1)),t("span",null,u(C.value?"Generating...":"Generate Quotation"),1)],8,$e)])])])])])):M("",!0),L.value?(r(),l("div",Ce,[t("div",Le,[t("div",{class:"flex items-center justify-between border-b border-gray-100 px-5 md:px-6 py-4 flex-shrink-0"},[e[30]||(e[30]=t("h2",{class:"text-lg md:text-xl font-semibold text-gray-800"},"Quotation Preview",-1)),t("button",{type:"button",class:"text-gray-400 hover:text-gray-600",onClick:G},[...e[29]||(e[29]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",Se,[t("iframe",{src:b.value,class:"w-full h-full border-0",title:"Quotation Preview"},null,8,je)]),t("div",{class:"border-t border-gray-100 px-5 md:px-6 py-4 flex gap-3 justify-end flex-shrink-0"},[t("button",{type:"button",class:"btn-secondary inline-flex items-center gap-2",onClick:G},[...e[31]||(e[31]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1),t("span",null,"Close",-1)])])])])])):M("",!0)]))}};export{Me as default};
