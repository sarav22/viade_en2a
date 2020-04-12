/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
   {
    id: "seeRoutes",
    icon: "/img/icon/seeRoutes.svg",
    label: "navBar.seeRoutes",
    to: "/seeRoutes"
  },
  {
    id: "createRoute",
    icon: "/img/icon/createRoute.svg",
    label: "navBar.createRoute",
    to: "/createRoute"
  },
  {
    id: "importRoute",
    icon: "/img/icon/importRoute.svg",
    label: "navBar.importRoute",
    to: "/importRoute"
  },
  {
    id: 'manageFriends',
    icon: '/img/icon/manageFriends.svg',
    label: 'navBar.manageFriends',
    to: '/manageFriends'
  }
];

export const ProfileOptions = [
  {
    label: "navBar.logOut",
    onClick: "logOut",
    icon: "lock"
  }
];
