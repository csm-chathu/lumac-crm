<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Quotation {{ $quotation->quote_number }}</title>
    <style>
        body { font-family: Arial, sans-serif; color: #111; }
        .container { max-width: {{ $printMode === 'thermal' ? '280px' : '860px' }}; margin: 0 auto; }
        h1, h2, p { margin: 0 0 8px; }
        .meta { margin: 16px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
        .totals { margin-top: 16px; text-align: right; }
        .small { font-size: 11px; color: #666; }
        @media print {
            @page { size: {{ $printMode === 'thermal' ? '80mm auto' : 'A4' }}; margin: 10mm; }
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Lumac Solution</h1>
    <p class="small">Official Quotation</p>

    <div class="meta">
        <p><strong>Quote #:</strong> {{ $quotation->quote_number }}</p>
        <p><strong>Date:</strong> {{ optional($quotation->created_at)->format('Y-m-d') }}</p>
        <p><strong>Agent:</strong> {{ $quotation->user->name }}</p>
        <p><strong>Customer:</strong> {{ $quotation->customer->full_name }}</p>
    </div>

    <table>
        <thead>
        <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Total</th>
        </tr>
        </thead>
        <tbody>
        @foreach($quotation->items as $item)
            <tr>
                <td>{{ $item->item_name }}</td>
                <td>{{ $item->quantity }}</td>
                <td>LKR {{ number_format((float) $item->unit_price, 2) }}</td>
                <td>LKR {{ number_format((float) $item->line_total, 2) }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div class="totals">
        <p>Subtotal: LKR {{ number_format((float) $quotation->subtotal, 2) }}</p>
        <p>Discount ({{ number_format((float) $quotation->discount_rate, 2) }}%): -LKR {{ number_format((float) $quotation->subtotal * ((float) $quotation->discount_rate / 100), 2) }}</p>
        <h2>Final Total: LKR {{ number_format((float) $quotation->final_total, 2) }}</h2>
    </div>
</div>
</body>
</html>
