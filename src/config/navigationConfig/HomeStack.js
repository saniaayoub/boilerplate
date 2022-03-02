import {AddPost, Home, ImageUpload} from '../../containers';

export const HomeStack = [
  {
    name: 'Home',
    component: Home,
    key: 'Home',
  },
  //   {
  //     name: 'AddPost',
  //     component: AddPost,
  //     key: 'AddPost',
  //   },
  {
    name: 'ImageUpload',
    component: ImageUpload,
    key: 'ImageUpload',
  },
];
