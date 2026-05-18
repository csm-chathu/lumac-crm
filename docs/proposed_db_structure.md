# Proposed Database Structure for System Update (2026-05-17)

## 1. Marketing Agent Module
- agents (id, user_id, profile_fields, status, commission_rate, ...)
- software_solutions (id, name, description, retail_price, demo_url, demo_username, demo_password, ...)
- agent_software_discounts (id, agent_id, software_solution_id, discount_rate)
- requirements (id, agent_id, client_id, notes, checklist_json, ...)
- leads (id, agent_id, client_id, status, notes, ...)
- quotations (id, agent_id, client_id, total_price, margin, pdf_path, ...)
- quotation_items (id, quotation_id, software_solution_id, price, ...)
- commissions (id, agent_id, quotation_id, amount, status, ...)

## 2. Expense & Financial Management Module
- expenses (id, user_id, category, amount, date, notes, receipt_path, ...)
- advance_payments (id, client_id, amount, date, receipt_path, ...)
- ledgers (id, client_id, contract_value, paid, unpaid, ...)

## 3. Client Portal Module
- clients (id, user_id, name, email, password, ...)
- projects (id, client_id, name, status, progress, ...)
- receipts (id, client_id, payment_id, file_path, ...)

## 4. Admin Management Dashboard
- roles (id, name, ...)
- role_user (role_id, user_id)
- audit_logs (id, action, user_id, target_id, target_type, ...)
- global_settings (id, key, value, ...)

# Notes
- All tables include timestamps and soft deletes where appropriate.
- Foreign keys and indexes to be defined for relational integrity and performance.
- RBAC via roles/role_user tables.
- PDF/receipt paths are for file storage.

---
This structure is designed to support all requested modules and features. Next, I’ll scaffold the migrations and models for the Marketing Agent Module.
