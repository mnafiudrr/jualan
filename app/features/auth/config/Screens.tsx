import ScreenData from '~/app/core/class/ScreenData';

const AuthScreen = {
  LOGIN: new ScreenData<any>({
    KEY: 'Login',
    TITLE: 'Login',
  }),
  REGISTER: new ScreenData<any>({
    KEY: 'Register',
    TITLE: 'Register',
  }),
};

export default AuthScreen;
