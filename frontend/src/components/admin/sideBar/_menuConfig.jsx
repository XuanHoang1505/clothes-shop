import { 
  DashboardOutlined, 
  ShoppingOutlined, 
  MessageOutlined, 
  SettingOutlined,
  SafetyOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BellOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

export const menuConfig = {
  pages: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: DashboardOutlined,
      children: [
        { label: 'Main', path: '/' },
        { label: 'Analytics', path: 'admin/users' },
        { label: 'Fintech', path: '/dashboard/fintech' }
      ]
    },
    {
      id: 'ecommerce',
      label: 'E-Commerce',
      icon: ShoppingOutlined,
      children: [
        { label: 'Customers', path: '/ecommerce/customers' },
        { label: 'Orders', path: '/ecommerce/orders' },
        { label: 'Invoices', path: '/ecommerce/invoices' },
        { label: 'Shop', path: '/ecommerce/shop' },
        { label: 'Shop 2', path: '/ecommerce/shop-2' },
        { label: 'Single Product', path: '/ecommerce/product' },
        { label: 'Cart', path: '/ecommerce/cart' },
        { label: 'Cart 2', path: '/ecommerce/cart-2' },
        { label: 'Cart 3', path: '/ecommerce/cart-3' },
        { label: 'Pay', path: '/ecommerce/pay' }
      ]
    },
    {
      id: 'community',
      label: 'Community',
      icon: TeamOutlined,
      children: [
        { label: 'Users - Tabs', path: '/community/users-tabs' },
        { label: 'Users - Tiles', path: '/community/users-tiles' },
        { label: 'Profile', path: '/community/profile' },
        { label: 'Feed', path: '/community/feed' }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: DollarOutlined,
      children: [
        { label: 'Cards', path: '/finance/cards' },
        { label: 'Transactions', path: '/finance/transactions' },
        { label: 'Transaction Details', path: '/finance/details' }
      ]
    },
    {
      id: 'messages',
      label: 'Messages',
      path: '/messages',
      badge: 4,
      icon: MessageOutlined
    },
    {
      id: 'inbox',
      label: 'Inbox',
      path: '/inbox',
      icon: FileTextOutlined
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '/calendar',
      icon: CalendarOutlined
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      path: '/campaigns',
      icon: BellOutlined
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingOutlined,
      children: [
        { label: 'My Account', path: '/settings/account' },
        { label: 'My Notifications', path: '/settings/notifications' },
        { label: 'Connected Apps', path: '/settings/apps' },
        { label: 'Plans', path: '/settings/plans' },
        { label: 'Billing & Invoices', path: '/settings/billing' }
      ]
    }
  ],
  more: [
    {
      id: 'authentication',
      label: 'Authentication',
      icon: SafetyOutlined,
      children: [
        { label: 'Sign in', path: '/auth/signin' },
        { label: 'Sign up', path: '/auth/signup' },
        { label: 'Reset Password', path: '/auth/reset' }
      ]
    },
    {
      id: 'components',
      label: 'Components',
      icon: AppstoreOutlined,
      children: [
        { label: 'Button', path: '/components/button' },
        { label: 'Input Form', path: '/components/form' },
        { label: 'Dropdown', path: '/components/dropdown' },
        { label: 'Modal', path: '/components/modal' }
      ]
    }
  ]
};