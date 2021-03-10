import Home from "../pages/home/Home"
import Login from "../pages/login/Login"

// 公共路由，不需要权限的
export const mainRouter = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
    
]

// 权限路由
export const adminRouter = [
    
]