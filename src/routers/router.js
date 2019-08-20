//各组件
import Index from '../components/Index/index';
import Detail from '../components/Detail/detail';

const routers = [
    { path: '/',
        exact: true,
        component: Index,
    },
    {
        path: '/Detail',
        component: Detail,
    }
]
export default routers