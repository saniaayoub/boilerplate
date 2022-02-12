import {
    SignIn,
    Splash
} from '../../containers'

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
    }
]