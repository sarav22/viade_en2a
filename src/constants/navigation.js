/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'seeRoutes',
    icon: '/img/icon/seeRoutes.svg',
    label: 'navBar.seeRoutes',
    to: '/404' //Specify here the address of the See Routes view
  },
  {
    id: 'createRoutes',
    icon: '/img/icon/createRoute.svg',
    label: 'navBar.createRoutes',
    to: '/404' //Specify here the address of the Create Routes view
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
