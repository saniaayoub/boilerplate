import {
  AddPost,
  Home,
  ImageUpload,
  Profile,
  Weather,
  Spotify,
} from '../../containers';

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
  {
    name: 'Weather',
    component: Weather,
    key: 'Weather',
  },
  {
    name: 'Spotify',
    component: Spotify,
    key: 'Spotify',
  },
];
