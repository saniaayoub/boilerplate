import {AddPost, Home, ImageUpload, Profile} from '../../containers';

export const HomeStack = [
  {
    name: 'Home',
    component: Home,
    key: 'Home',
  },
  {
    name: 'AddPost',
    component: AddPost,
    key: 'AddPost',
  },
  {
    name: 'ImageUpload',
    component: ImageUpload,
    key: 'ImageUpload',
  },
  {
    name: 'Profile',
    component: Profile,
    key: 'Profile',
  },
];
