import {
    AddPost, Home
} from '../../containers'

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
    }
]