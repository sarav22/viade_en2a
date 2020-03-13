/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'map',
    icon: '/img/icon/map.svg',
    label: 'navBar.map',
    to: '/map'
  },
  {
    id: "seeRoutes",
    icon: "/img/icon/seeRoutes.svg",
    label: "navBar.seeRoutes",
    to: "/seeRoutes" //Specify here the address of the See Routes view
  },
  {
    id: "createRoutes",
    icon: "/img/icon/createRoute.svg",
    label: "navBar.createRoutes",
    to: "/404" //Specify here the address of the Create Routes view
  },
  {
    id: "friendRoutes",
    icon: "/img/icon/manageFriends.svg",
    label: "navBar.friendRoutes",
    to: "/friendRoutes" //Specify here the address of the Create Routes view
  },
  {
    id: 'manageFriends',
    icon: '/img/icon/manageFriends.svg',
    label: 'navBar.manageFriends',
    to: '/manageFriends' //Specify here the address of the Create Routes view
  }
];

export const ProfileOptions = [
  {
    label: "navBar.logOut",
    onClick: "logOut",
    icon: "lock"
  }
];
