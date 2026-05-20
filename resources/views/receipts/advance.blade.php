<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ $documentTitle ?? 'Advance Payment Receipt' }} {{ $payment->receipt_number }}</title>
    <style>
        body { font-family: Arial, sans-serif; color: #111; }
        .container { max-width: {{ $printMode === 'thermal' ? '280px' : '860px' }}; margin: 0 auto; }
        h1, h2, p { margin: 0 0 8px; }
        .box { border: 1px solid #ccc; border-radius: 8px; padding: 12px; margin-top: 12px; }
        @media print {
            @page { size: {{ $printMode === 'thermal' ? '80mm auto' : 'A4' }}; margin: 10mm; }
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Lumac Solution</h1>
    <p>{{ $documentTitle ?? 'Advance Payment Receipt' }}</p>

    <div class="box">
        <p><strong>Receipt #:</strong> {{ $payment->receipt_number }}</p>
        <p><strong>Date:</strong> {{ optional($payment->payment_date)->format('Y-m-d') }}</p>
        <p><strong>Customer:</strong> {{ $payment->customer->full_name }}</p>
        <p><strong>Handled By:</strong> {{ $payment->user?->name ?? 'System' }}</p>
        <p><strong>Method:</strong> {{ $payment->payment_method }}</p>
        <p><strong>Paid Now:</strong> LKR {{ number_format((float) $payment->amount, 2) }}</p>
        <p><strong>Total Paid:</strong> LKR {{ $totalPaid }}</p>
        <p><strong>Remaining Balance:</strong> LKR {{ $remaining }}</p>
    </div>

    @if($payment->notes)
        <div class="box">
            <p><strong>Notes</strong></p>
            <p>{{ $payment->notes }}</p>
        </div>
    @endif
</div>
</body>
</html>
