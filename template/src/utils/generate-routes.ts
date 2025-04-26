import * as AdminRoutes from "../routes/admin";
import * as CustomerRoutes from "../routes/customer";
import { Express } from "express";

const adminRouteList = [
  { path: "/admin-route-1", router: AdminRoutes.route1Router },
];

const customerRouteList = [
  { path: "/customer-route-1", router: CustomerRoutes.route1Router },
];

export const generateRoutes = (app: Express) => {
  const basePath = "/api/v1";
  const adminBasePath = `${basePath}/admin`;

  adminRouteList.forEach(route => {
    app.use(`${adminBasePath}${route.path}`, route.router);
  });

  customerRouteList.forEach(route => {
    app.use(`${basePath}${route.path}`, route.router);
  });
};
