import path from "path";
import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Setting = lazy(() => import("../pages/Setting"));
const Chats = lazy(() => import("../pages/Chats"));
const NFT = lazy(() => import("../pages/NFT"));
const Assets = lazy(() => import("../pages/Assets"));
const Resell = lazy(() => import("../pages/Resell"));
const NFTDashboard = lazy(() => import("../pages/NFTDashboard"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const Finance = lazy(() => import("../pages/Finance"));
const Storage = lazy(() => import("../pages/Storage"));
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: "/favorite",
  //   component: Favorite,
  // },
  {
    path: "/storage",
    component: Storage,
  },
  {
    path: "/finance",
    component: Finance,
  },
  {
    path: "/setting",
    component: Setting,
  },
  {
    path: "/chat",
    component: Chats,
  },
  {
    path: "/nft",
    component: NFT,
  },
  {
    path: "/my-assets",
    component: Assets,
  },
  {
    path: "/resell-assets",
    component: Resell,
  },
  {
    path: "/nft-dashboard",
    component: NFTDashboard,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
