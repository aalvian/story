import HomePage from "../pages/home/home-page";
import AddPage from "../pages/add/add-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";

const routes = {
  "/": {
    page: new HomePage(),
    requiresAuth: true, 
  },
  "/add": {
    page: new AddPage(),
    requiresAuth: true,
  },
  "/login": {
    page: new LoginPage(),
    requiresAuth: false,
  },
  "/register": {
    page: new RegisterPage(),
    requiresAuth: false,
  },
};

export default routes;
