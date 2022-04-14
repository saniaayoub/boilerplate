import {SignIn, Splash, SignUp} from '../../containers';

export const AuthStack = [
  {
    name: 'Splash',
    component: Splash,
    key: 'Splash',
  },
  {
    name: 'SignIn',
    component: SignIn,
    key: 'SignIn',
  },
  {
    name: 'SignUp',
    component: SignUp,
    key: 'SignUp',
  },
];
