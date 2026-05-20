import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
  IdentificationIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
  RectangleGroupIcon,
} from '@heroicons/vue/24/outline';
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  CircleStackIcon as CircleStackIconSolid,
  IdentificationIcon as IdentificationIconSolid,
  BanknotesIcon as BanknotesIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid,
  ArrowsRightLeftIcon as ArrowsRightLeftIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  RectangleGroupIcon as RectangleGroupIconSolid,
} from '@heroicons/vue/24/solid';

const descriptions = {
  Dashboard: 'Overview',
  Solutions: 'Catalog setup',
  Agents: 'Agent directory',
  Expenses: 'Cost control',
  Payments: 'Advance receipts',
  Devices: 'Quotation hardware',
  Transactions: 'Cashflow',
  Profile: 'My account',
  Portal: 'Customer access',
  Customers: 'Client records',
  Quotations: 'Price offers',
};

function withDescriptions(items) {
  return items.map((item) => ({
    ...item,
    description: descriptions[item.label] || item.label,
  }));
}

export function getNavItemsForRole({ isAdmin, isCustomer }) {
  if (isAdmin) {
    return withDescriptions([
      { name: 'master-data', to: '/master-data/solutions', label: 'Solutions', icon: CircleStackIcon, activeIcon: CircleStackIconSolid },
      { name: 'admin-agents', to: '/admin/agents', label: 'Agents', icon: IdentificationIcon, activeIcon: IdentificationIconSolid },
      { name: 'customers', to: '/customers', label: 'Customers', icon: UserGroupIcon, activeIcon: UserGroupIconSolid },
      { name: 'finance-expenses', to: '/finance/expenses', label: 'Expenses', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
      { name: 'devices', to: '/devices', label: 'Devices', icon: RectangleGroupIcon, activeIcon: RectangleGroupIconSolid },
      { name: 'transactions', to: '/transactions', label: 'Transactions', icon: ArrowsRightLeftIcon, activeIcon: ArrowsRightLeftIconSolid },
      { name: 'profile', to: '/profile', label: 'Profile', icon: UserCircleIcon, activeIcon: UserCircleIconSolid },
    ]);
  }

  if (isCustomer) {
    return withDescriptions([
      { name: 'client-portal', to: '/client/portal', label: 'Portal', icon: RectangleGroupIcon, activeIcon: RectangleGroupIconSolid },
      { name: 'profile', to: '/profile', label: 'Profile', icon: UserCircleIcon, activeIcon: UserCircleIconSolid },
    ]);
  }

  return withDescriptions([
    { name: 'dashboard', to: '/', label: 'Dashboard', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'customers', to: '/customers', label: 'Customers', icon: UserGroupIcon, activeIcon: UserGroupIconSolid },
    { name: 'quotations', to: '/quotations', label: 'Quotations', icon: ClipboardDocumentListIcon, activeIcon: ClipboardDocumentListIconSolid },
    { name: 'finance-expenses', to: '/finance/expenses', label: 'Expenses', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
    { name: 'finance-payments', to: '/finance/payments', label: 'Payments', icon: BanknotesIcon, activeIcon: BanknotesIconSolid },
    { name: 'devices', to: '/devices', label: 'Devices', icon: RectangleGroupIcon, activeIcon: RectangleGroupIconSolid },
    { name: 'transactions', to: '/transactions', label: 'Transactions', icon: ArrowsRightLeftIcon, activeIcon: ArrowsRightLeftIconSolid },
    { name: 'profile', to: '/profile', label: 'Profile', icon: UserCircleIcon, activeIcon: UserCircleIconSolid },
  ]);
}