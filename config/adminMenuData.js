const menuData = [
  {
    title: 'Merchant Management',
    path: '/admin/merchantManagement',
    icon: 'shop',
    children: [
      {
        title: 'Merchant List',
        path: '/admin/merchantManagement/merchantList',
      },
    ],
  }, {
    title: 'User Management',
    path: '/admin/userManagement',
    icon: 'team',
    children: [
      {
        title: 'User List',
        path: '/admin/userManagement/userList',
      },
    ],
  },
];
export default menuData;
