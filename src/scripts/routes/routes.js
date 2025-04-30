import HomePage from '../pages/home/home-page';
import AddPage from '../pages/add/add-page';
import AboutPage from '../pages/about/about-page';

import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';

const routes = {
  '/': new HomePage(),
  '/add': new AddPage(),
  '/about': new AboutPage(),

  '/login': new LoginPage(),
  '/register': new RegisterPage(),
};

export default routes;
