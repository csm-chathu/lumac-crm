<?php

namespace Database\Seeders;

use App\Models\Solution;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SolutionSeeder extends Seeder
{
    public function run(): void
    {
        $solutions = [
            [
                'name' => 'Lumac CRM Suite',
                'description' => 'A customer lifecycle platform with sales pipelines, lead scoring, and campaign automation.',
                'base_price' => 1499.00,
                'demo_url' => 'https://demo.lumac.test/crm',
                'demo_username' => 'crm-agent-demo',
                'demo_email' => 'demo-crm@lumac.test',
                'demo_password' => 'Demo@123',
                'features' => [
                    ['feature_key' => 'pipeline_management', 'label' => 'Pipeline Management', 'description' => 'Custom pipeline stages and progress tracking.'],
                    ['feature_key' => 'lead_scoring', 'label' => 'Lead Scoring', 'description' => 'Rules-based scoring for lead qualification.'],
                    ['feature_key' => 'email_automation', 'label' => 'Email Automation', 'description' => 'Event-based drip and nurture campaigns.'],
                    ['feature_key' => 'team_permissions', 'label' => 'Team Permissions', 'description' => 'Role-based access controls for agents and managers.'],
                    ['feature_key' => 'reports_dashboards', 'label' => 'Reports & Dashboards', 'description' => 'Weekly and monthly KPI insights.'],
                ],
            ],
            [
                'name' => 'Lumac Support Desk',
                'description' => 'A ticketing and help center product built for multi-channel customer support teams.',
                'base_price' => 999.00,
                'demo_url' => 'https://demo.lumac.test/support',
                'demo_username' => 'support-agent-demo',
                'demo_email' => 'demo-support@lumac.test',
                'demo_password' => 'Support@123',
                'features' => [
                    ['feature_key' => 'omni_channel_inbox', 'label' => 'Omni-Channel Inbox', 'description' => 'Handle email, chat, and social support in one place.'],
                    ['feature_key' => 'sla_management', 'label' => 'SLA Management', 'description' => 'Configure response and resolution deadlines.'],
                    ['feature_key' => 'knowledge_base', 'label' => 'Knowledge Base', 'description' => 'Self-service help articles and guides.'],
                    ['feature_key' => 'agent_macros', 'label' => 'Agent Macros', 'description' => 'Reusable responses and workflows.'],
                    ['feature_key' => 'csat_surveys', 'label' => 'CSAT Surveys', 'description' => 'Collect support experience feedback.'],
                ],
            ],
            [
                'name' => 'Lumac Commerce Cloud',
                'description' => 'An ecommerce operations solution with order management, promotions, and analytics.',
                'base_price' => 1899.00,
                'demo_url' => 'https://demo.lumac.test/commerce',
                'demo_username' => 'commerce-agent-demo',
                'demo_email' => 'demo-commerce@lumac.test',
                'demo_password' => 'Commerce@123',
                'features' => [
                    ['feature_key' => 'product_catalog', 'label' => 'Product Catalog', 'description' => 'Structured catalog with variants and inventory.'],
                    ['feature_key' => 'coupon_promotions', 'label' => 'Coupon & Promotions', 'description' => 'Campaign discount codes and promo rules.'],
                    ['feature_key' => 'payment_gateways', 'label' => 'Payment Gateway Integrations', 'description' => 'Multiple payment provider setup.'],
                    ['feature_key' => 'shipping_rules', 'label' => 'Shipping Rules', 'description' => 'Region-based shipping and fulfillment options.'],
                    ['feature_key' => 'conversion_analytics', 'label' => 'Conversion Analytics', 'description' => 'Track sales funnels and checkout drop-offs.'],
                ],
            ],
        ];

        foreach ($solutions as $index => $item) {
            $solution = Solution::updateOrCreate(
                ['slug' => Str::slug($item['name'])],
                [
                    'name' => $item['name'],
                    'description' => $item['description'],
                    'base_price' => $item['base_price'],
                    'demo_url' => $item['demo_url'],
                    'demo_username' => $item['demo_username'],
                    'demo_email' => $item['demo_email'],
                    'demo_password' => $item['demo_password'],
                    'is_active' => true,
                ]
            );

            foreach ($item['features'] as $featureIndex => $feature) {
                $solution->features()->updateOrCreate(
                    ['feature_key' => $feature['feature_key']],
                    [
                        'label' => $feature['label'],
                        'description' => $feature['description'],
                        'sort_order' => $featureIndex + 1,
                    ]
                );
            }
        }
    }
}
