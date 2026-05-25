/**
 * Open WhatsApp chat with a given phone number (in international format, e.g. 94761234567 for Sri Lanka)
 * Usage: openWhatsAppWithNumber(customer.phone)
 */
export function openWhatsAppWithNumber(phone) {
  if (!phone) return;
  // Remove non-digits and leading zeros, add country code if needed
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '94' + cleaned.substring(1); // Sri Lanka country code
  }
  // Open WhatsApp Web or app
  const url = `https://wa.me/${cleaned}`;
  window.open(url, '_blank');
}
import html2pdf from 'html2pdf.js';

/**
 * Generate quotation HTML
 */
export function generateQuotationHTML(quotation, size = 'a4') {
  const { customer, items, final_total, quote_number, discount_rate, warranty_months, validity_days, discount_amount, discount_reason, show_terms } = quotation;
  const hasSolutions = items.some((item) => item.solution_id !== null && item.solution_id !== undefined);
  const warrantyText = warranty_months ? `Hardware items carry a ${warranty_months}-month warranty against manufacturing defects.` : 'Hardware items carry a 12-month warranty against manufacturing defects.';
  const discountAmt = Number(discount_amount || 0);
  
  // Calculate subtotal and totals
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const total = subtotal - discountAmt;

  const pageWidth = size === 'a5' ? '148mm' : '210mm';
  const pageHeight = size === 'a5' ? '210mm' : '297mm';
  const fontSize = size === 'a5' ? '11px' : '14px';
  const headerSize = size === 'a5' ? '14px' : '18px';

  const tdBase = `padding: 8px; border-bottom: 1px solid #e0e0e0; font-size: ${fontSize};`;
  const itemsHTML = items.map((item, idx) => `
    <tr>
      <td style="${tdBase}">${idx + 1}</td>
      <td style="${tdBase}">
        <div>${item.item_name || 'Item'}</div>
        ${item.description ? `<div style="font-size: ${size === 'a5' ? '9px' : '11px'}; color: #666; margin-top: 2px; line-height: 1.6;">${item.description.replace(/\n/g, '<br>')}</div>` : ''}
      </td>
      <td style="${tdBase} text-align: right;">${item.quantity}</td>
      <td style="${tdBase} text-align: right;">LKR ${Number(item.unit_price || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td style="${tdBase} text-align: right;">LKR ${Number(item.quantity * item.unit_price || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
  `).join('');

  const currentDate = new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quotation #${quote_number}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: ${size === 'a5' ? 'A5' : 'A4'};
          margin: 10mm;
        }

        .pdf-footer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          text-align: center;
          font-size: ${size === 'a5' ? '9px' : '11px'};
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
          height: ${size === 'a5' ? '190mm' : '277mm'};
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
          font-size: ${size === 'a5' ? '9px' : '11px'};
          color: #999;
          white-space: nowrap;
        }
        
        .section {
          margin-bottom: 15px;
        }
        
        .section-title {
          font-size: ${fontSize};
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .section-content {
          font-size: ${fontSize};
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
          font-size: ${fontSize};
          font-weight: 600;
        }

        table th.text-right {
          text-align: right;
        }

        table td {
          padding: 8px;
          border-bottom: 1px solid #e0e0e0;
          font-size: ${fontSize};
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
          font-size: ${fontSize};
          line-height: 1.5;
        }

        .payment-schedule {
          margin-top: 20px;
          margin-bottom: 15px;
        }

        .payment-schedule-title {
          font-size: ${fontSize};
          font-weight: 600;
          margin-bottom: 8px;
        }

        .payment-schedule ul {
          list-style: disc;
          padding-left: 20px;
          font-size: ${fontSize};
          line-height: 1.8;
        }

        .terms {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .terms h2 {
          font-size: ${size === 'a5' ? '16px' : '22px'};
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }

        .terms ol {
          padding-left: 20px;
          font-size: ${fontSize};
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
          font-size: ${fontSize};
          font-weight: 700;
        }

        
        .print-date {
          font-size: ${fontSize};
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
          <div style="font-size: ${size === 'a5' ? '18px' : '24px'}; line-height: 1.6; color: #555; font-weight: 600; margin-bottom: 10px;">
            <strong>LU<span style="color: #60a5fa;">MAC</span> Solutions</strong>
          </div>
          <div style="font-size: ${fontSize}; line-height: 1.6; color: #666;">
            Address: Jayasiripura, Anuradhapura, Sri Lanka<br>
            Email: contact@lumac.lk<br>
            Phone: 076 464 3050
          </div>
        </div>
        
        <!-- Customer & Date Info -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding: 0 8px 0 0;">
              <div style="font-size: ${fontSize}; font-weight: 600; color: #1e40af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Bill To</div>
              <div style="font-size: ${fontSize}; line-height: 1.6;">
                <strong>${customer?.full_name || 'N/A'}</strong><br>
                ${customer?.email ? `Email: ${customer.email}<br>` : ''}
                ${customer?.phone ? `Phone: ${customer.phone}<br>` : ''}
                ${customer?.address ? `Address: ${customer.address}` : ''}
              </div>
            </td>
            <td style="width: 50%; vertical-align: top; padding: 0 0 0 8px; text-align: right;">
              <div style="font-size: ${fontSize}; font-weight: 600; color: #1e40af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Quote Details</div>
              <div style="font-size: ${fontSize}; line-height: 1.6;">
                <div style="margin-bottom: 5px;"><strong>Date:</strong> ${currentDate}</div>
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
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: left; font-size: ${fontSize};">#</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: left; font-size: ${fontSize};">Description</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${fontSize};">Quantity</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${fontSize};">Unit Price</th>
              <th style="background-color: #172554; color: white; padding: 10px 8px; text-align: right; font-size: ${fontSize};">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
          <!-- Totals inside table for perfect alignment -->
          <tfoot>
            ${discountAmt > 0 ? `
            <tr>
              <td colspan="4" style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${fontSize}; text-align: right; font-weight: 600;">Subtotal:</td>
              <td style="padding: 8px; border-top: 1px solid #e0e0e0; font-size: ${fontSize}; text-align: right;">LKR ${Number(subtotal).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td colspan="4" style="padding: 8px; font-size: ${fontSize}; text-align: right; font-weight: 600; color: #dc2626;">Discount${discount_reason ? ` (${discount_reason})` : ''}:</td>
              <td style="padding: 8px; font-size: ${fontSize}; text-align: right; color: #dc2626;">- LKR ${Number(discountAmt).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            ` : ''}
            <tr>
              <td colspan="4" style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${size === 'a5' ? '13px' : '16px'}; text-align: right; font-weight: 700; color: #172554;">TOTAL:</td>
              <td style="padding: 10px 8px; border-top: 2px solid #172554; font-size: ${size === 'a5' ? '13px' : '16px'}; text-align: right; font-weight: 700; color: #172554;">LKR ${Number(total).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tfoot>
        </table>
        
        <!-- Payment Schedule (solutions only) -->
        ${hasSolutions ? `
        <div class="payment-schedule">
          <div class="payment-schedule-title">Payment Schedule</div>
          <ul>
            <li><strong>Initial Payment (50%):</strong> LKR ${Number(total / 2).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="color:#666;">(Payable upon confirmation)</span></li>
            <li><strong>Final Payment (50%):</strong> LKR ${Number(total / 2).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="color:#666;">(Payable after one week of system usage)</span></li>
          </ul>
        </div>

        ` : ''}

        <!-- Terms and Conditions -->
        ${show_terms == false ? '' : `
        <div class="terms">
          <h2>Terms and Conditions</h2>
          <ol>
            ${hasSolutions ? `<li><strong>Hosting Renewal:</strong> The hosting and domain service is valid for one (1) year. It must be renewed annually to maintain service.</li>` : ''}
            <li><strong>Validity:</strong> This quotation is valid for ${validity_days || 30} days from the date of issue.</li>
            <li><strong>Warranty:</strong> ${warrantyText}</li>
          </ol>
        </div>
        `}

        <!-- Footer note -->
        <div style="margin-top: 40px; margin-bottom: 10px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 16px;">
          <div style="font-size: ${fontSize}; font-weight: 600; color: #333; margin-bottom: 6px;">Thank you for your business! | LUMAC Solutions</div>
          <div style="font-size: ${fontSize}; color: #666;">For more details about the order, please use reference number: <strong>${quote_number}</strong></div>
        </div>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  return html;
}

/**
 * Generate and download PDF
 */
export async function generateQuotationPDF(quotation, size = 'a4') {
  const filename = `quotation-${quotation.quote_number}.pdf`;
  const pdfBlob = await generateQuotationPDFBlob(quotation, size);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Generate quotation PDF as blob for consistent preview/download rendering
 */
export function generateQuotationPDFBlob(quotation, size = 'a4') {
  const html = generateQuotationHTML(quotation, size);

  const options = {
    margin: 10,
    filename: `quotation-${quotation.quote_number}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      orientation: 'portrait',
      unit: 'mm',
      format: size === 'a5' ? 'a5' : 'a4'
    },
    pagebreak: { avoid: 'div.container', mode: ['avoid-all', 'css', 'legacy'] }
  };

  return html2pdf().set(options).from(html).outputPdf('blob');
}

/**
 * Open quotation in a new window for printing
 */
export function openQuotationPreview(quotation, size = 'a4') {
  const html = generateQuotationHTML(quotation, size);
  
  const newWindow = window.open('', '_blank', 'noopener,noreferrer');
  newWindow.document.write(html);
  newWindow.document.close();
  
  // Auto-trigger print dialog after content loads
  newWindow.addEventListener('load', () => {
    setTimeout(() => {
      newWindow.print();
    }, 250);
  });
}

/**
 * Export quotation as HTML
 */
export function exportQuotationHTML(quotation, size = 'a4') {
  const html = generateQuotationHTML(quotation, size);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `quotation-${quotation.quote_number}.html`;
  link.click();
  URL.revokeObjectURL(url);
}
