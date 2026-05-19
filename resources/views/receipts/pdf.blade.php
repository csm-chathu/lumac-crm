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
            border-bottom: 2px solid #28a745;
            padding-bottom: 15px;
        }
        .company-info h1 { font-size: 24px; color: #28a745; margin-bottom: 5px; }
        .company-info p { font-size: 11px; color: #666; }
        .receipt-info {
            text-align: right;
            font-size: 12px;
        }
        .receipt-info div { margin-bottom: 3px; }
        .receipt-number { font-size: 18px; font-weight: bold; color: #28a745; }
        .stamp { font-size: 13px; font-weight: bold; color: #28a745; margin-top: 5px; }
        .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            color: #28a745;
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
        .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }
        .detail-box {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 11px;
        }
        .detail-box strong { display: block; color: #28a745; margin-bottom: 5px; }
        .amount-box {
            text-align: center;
            padding: 20px;
            background-color: #f5f5f5;
            border: 2px solid #28a745;
            border-radius: 4px;
            margin-top: 20px;
            font-size: 13px;
        }
        .amount-box .label { font-size: 12px; color: #666; }
        .amount-box .value { font-size: 28px; font-weight: bold; color: #28a745; }
        .notes {
            margin-top: 30px;
            padding: 15px;
            background-color: #f9f9f9;
            border-left: 3px solid #28a745;
            font-size: 10px;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 9px;
            color: #999;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="company-info">
                <h1>{{ config('app.name', 'Lumac') }}</h1>
                <p>{{ $documentTitle ?? 'Advance Payment Receipt' }}</p>
            </div>
            <div class="receipt-info">
                <div class="receipt-number">{{ $payment->receipt_number }}</div>
                <div><strong>Date:</strong> {{ $payment->payment_date->format('M d, Y') }}</div>
                <div><strong>Agent:</strong> {{ $payment->user->name }}</div>
                <div class="stamp">✓ RECEIVED</div>
            </div>
        </div>

        <!-- Customer Info -->
        <div class="section-title">Received From</div>
        <div class="info-block">
            <div class="info-row">
                <span class="label">Customer:</span>
                <span class="value">{{ $payment->customer->full_name }}</span>
            </div>
            <div class="info-row">
                <span class="label">Company:</span>
                <span class="value">{{ $payment->customer->company ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">{{ $payment->customer->email ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">{{ $payment->customer->phone ?? 'N/A' }}</span>
            </div>
        </div>

        <!-- Payment Details -->
        <div class="details-grid">
            <div class="detail-box">
                <strong>Payment Method</strong>
                {{ ucfirst($payment->payment_method) }}
            </div>
            <div class="detail-box">
                <strong>Transaction Date</strong>
                {{ $payment->payment_date->format('M d, Y') }}
            </div>
        </div>

        <!-- Amount -->
        <div class="amount-box">
            <div class="label">Amount Received</div>
            <div class="value">${{ number_format($payment->amount, 2) }}</div>
        </div>

        <!-- Notes -->
        @if ($payment->notes)
            <div class="notes">
                <strong>Notes:</strong><br>
                {!! nl2br(e($payment->notes)) !!}
            </div>
        @endif

        <!-- Footer -->
        <div class="footer">
            <p>This receipt confirms that the above advance payment has been received.</p>
            <p>Generated on {{ now()->format('F d, Y \a\t H:i') }}</p>
            <p>Receipt ID: {{ $payment->id }}</p>
        </div>
    </div>
</body>
</html>
