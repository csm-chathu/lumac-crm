<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 15px;
        }
        .company-info h1 { font-size: 24px; color: #007bff; margin-bottom: 5px; }
        .company-info p { font-size: 11px; color: #666; }
        .quote-info {
            text-align: right;
            font-size: 12px;
        }
        .quote-info div { margin-bottom: 3px; }
        .quote-number { font-size: 18px; font-weight: bold; color: #007bff; }
        .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            color: #007bff;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 5px;
        }
        .info-block {
            margin-bottom: 15px;
            font-size: 11px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
        }
        .label { font-weight: bold; width: 30%; }
        .value { width: 70%; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 11px;
        }
        table th {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-weight: bold;
            color: #333;
        }
        table td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        table tr:nth-child(even) { background-color: #fafafa; }
        .totals-section {
            margin-top: 15px;
            float: right;
            width: 250px;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px solid #ddd;
            font-size: 11px;
        }
        .total-row.final {
            border-bottom: 2px solid #007bff;
            font-weight: bold;
            font-size: 13px;
            margin-top: 5px;
            color: #007bff;
        }
        .notes {
            clear: both;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            font-size: 10px;
            color: #666;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 9px;
            color: #999;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .currency { text-align: right; }
        .qty-align { text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="company-info">
                <h1>{{ config('app.name', 'Lumac') }}</h1>
                <p>Quotation</p>
            </div>
            <div class="quote-info">
                <div class="quote-number">{{ $quotation->quote_number }}</div>
                <div><strong>Date:</strong> {{ $quotation->issued_at->format('M d, Y') ?? now()->format('M d, Y') }}</div>
                <div><strong>Agent:</strong> {{ $quotation->user->name }}</div>
            </div>
        </div>

        <!-- Customer Info -->
        <div class="section-title">Bill To</div>
        <div class="info-block">
            <div class="info-row">
                <span class="label">Customer:</span>
                <span class="value">{{ $quotation->customer->full_name }}</span>
            </div>
            <div class="info-row">
                <span class="label">Company:</span>
                <span class="value">{{ $quotation->customer->company ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">{{ $quotation->customer->email ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">{{ $quotation->customer->phone ?? 'N/A' }}</span>
            </div>
        </div>

        <!-- Line Items -->
        <div class="section-title">Quotation Items</div>
        <table>
            <thead>
                <tr>
                    <th style="width: 35%;">Item Description</th>
                    <th style="width: 15%; text-align: center;">Qty</th>
                    <th style="width: 25%; text-align: right;">Unit Price</th>
                    <th style="width: 25%; text-align: right;">Line Total</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($quotation->items as $item)
                    <tr>
                        <td>{{ $item->item_name }}</td>
                        <td class="qty-align">{{ $item->quantity }}</td>
                        <td class="currency">LKR {{ number_format($item->unit_price, 2) }}</td>
                        <td class="currency"><strong>LKR {{ number_format($item->line_total, 2) }}</strong></td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" style="text-align: center; color: #999;">No items</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <!-- Totals -->
        <div class="totals-section">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>LKR {{ number_format($quotation->subtotal, 2) }}</span>
            </div>
            <div class="total-row">
                <span>Discount ({{ $quotation->discount_rate }}%):</span>
                <span>-LKR {{ number_format($quotation->subtotal * ($quotation->discount_rate / 100), 2) }}</span>
            </div>
            <div class="total-row final">
                <span>Net Total:</span>
                <span>LKR {{ number_format($quotation->final_total, 2) }}</span>
            </div>
            @if ($quotation->commission_amount > 0)
                <div class="total-row" style="margin-top: 10px; font-size: 10px;">
                    <span>Commission ({{ $quotation->commission_rate }}%):</span>
                    <span>LKR {{ number_format($quotation->commission_amount, 2) }}</span>
                </div>
            @endif
        </div>

        <!-- Notes -->
        @if ($quotation->notes)
            <div class="notes">
                <strong>Notes:</strong><br>
                {!! nl2br(e($quotation->notes)) !!}
            </div>
        @endif

        <!-- Footer -->
        <div class="footer">
            <p>This is an automatically generated quotation. Please contact {{ $quotation->user->name }} for inquiries.</p>
            <p>Generated on {{ now()->format('F d, Y \a\t H:i') }}</p>
        </div>
    </div>
</body>
</html>
