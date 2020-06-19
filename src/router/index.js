import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


//vue路由地址
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/table'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/info',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/info.vue'),
                    meta: { title: '公司信息' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '客户信息' }
                },
               
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
				{
				    path: '/news',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/news.vue'),
				    meta: { title: '新闻' }
				},
				{
				    path: '/newsAdd',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/newsAdd.vue'),
				    meta: { title: '新闻添加' }
				},
				{
				    path: '/newsUpdate',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/newsUpdate.vue'),
				    meta: { title: '新闻编辑' }
				},
				{
				    path: '/goods',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/goodsTable.vue'),
				    meta: { title: '商品信息' }
				},
				{
				    path: '/goodsAdd',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/goodsForm.vue'),
				    meta: { title: '商品添加' }
				},
				{
				    path: '/goodsUpdate',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/goodsFormUpdate.vue'),
				    meta: { title: '商品编辑' }
				},
				
				{
				    path: '/category',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/category.vue'),
				    meta: { title: '分类管理' }
				},
 
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
				{
				    path: '/password',
				    component: () => import(/* webpackChunkName: "login" */ '../components/page/password.vue'),
				    meta: { title: '密码修改' }
				}
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
	
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
