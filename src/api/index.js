import request from '../utils/request';


/*callme*/
export function findAllCallme(pageNum,pageSize){
    return request({
        url: '/qpi/admin/callMe/findAll',
        method: 'get',
        params: {pageNum: pageNum,pageSize: pageSize}
    });
};

export function search(pageNum,pageSize,value){
    return request({
        url: '/qpi/admin/callMe/search',
        method: 'get',
        params: {pageNum: pageNum,pageSize: pageSize,value:value}
    });
};
export function deleteCallme(ids){
    return request({
        url: '/qpi/admin/callMe/delete',
        method: 'get',
        params: {ids:ids}
    });
};


/*首页编辑*/
export function uploadlun(lunbo){
    return request({
        url: '/qpi/admin/info/updateInfo',
        method: 'post',
        data: {lunbo}
    });
};
export function findlun(){
    return request({
        url: '/qpi/admin/info/findLun',
        method: 'get'
     
    });
};


export function findIntroduce(){
    return request({
        url: '/qpi/admin/info/findIntroduce',
        method: 'post',
	
     
    });
};
export function updateIntroduce(content,type){
    return request({
        url: '/qpi/admin/info/introduce',
        method: 'post',
		data:{ content:content,type:type}
     
    });
};

/*news*/
export function findNews(pageNum,pageSize){
    return request({
        url: '/qpi/admin/news/findNews',
        method: 'get',
        params: {pageNum: pageNum,pageSize: pageSize}
    });
};

export function searchNews(pageNum,pageSize,value){
    return request({
        url: '/qpi/admin/news/searchNews',
        method: 'get',
        params: {pageNum: pageNum,pageSize: pageSize,title:value}
    });
};
export function addNews(title,content,img,type){
    return request({
        url: '/qpi/admin/news/addNews',
        method: 'post',
        params: {title: title,content: content,img:img,type:type}
    });
};
export function updateNews(id,title,content,img,type){
    return request({
        url: '/qpi/admin/news/updateNews',
        method: 'post',
        params: {id:id,title: title,content: content,img:img,type:type}
    });
};
export function deleteNews(id){
    return request({
        url: '/qpi/admin/news/delete',
        method: 'post',
        params: {id:id}
    });
};

/*category*/
export function findcategoryOne(pageNum,pageSize){
    return request({
        url: '/qpi/admin/category/selectOne',
        method: 'post',
        params: {pageNum:pageNum,pageSize:pageSize}
    });
};
export function findcategoryAll(){
    return request({
        url: '/qpi/admin/category/findAll',
        method: 'get',
       
    });
};

export function selectTwo(id){
    return request({
        url: '/qpi/admin/category/selectTwo',
        method: 'post',
        params: {pid:id}
    });
};
export function findByCid(id){
    return request({
        url: '/qpi/admin/category/findByCid',
        method: 'post',
        params: {cid:id}
    });
};
export function insertCategory(id,name,ename,img){
    return request({
        url: '/qpi/admin/category/insertCategory',
        method: 'post',
        params: {pid:id,name:name,ename:ename,img:img}
    });
};
export function updateCategorys(id,name,ename){
    return request({
        url: '/qpi/admin/category/updateCategory',
        method: 'post',
        params: {cid:id,name:name,ename:ename}
    });
};
export function updateTwoCategory(id,name,ename,img){
    return request({
        url: '/qpi/admin/category/updateCategory',
        method: 'post',
        params: {cid:id,name:name,ename:ename,img:img}
    });
};
export function deleteCategorys(id){
    return request({
        url: '/qpi/admin/category/deleteCategory',
        method: 'post',
        params: {cid:id}
    });
};
/*goods*/


export function findGoods(pageNum,pageSize){
    return request({
        url: '/qpi/admin/goods/find',
        method: 'post',
        params: {pageNum:pageNum,pageSize:pageSize}
    });
};


export function Goodsinsert(video,lun,img,title,content,cid,type){
    return request({
        url: '/qpi/admin/goods/insert',
        method: 'post',
        params: {video:video,lun:lun,img:img,title:title,content:content,cid:cid,type:type}
    });
};


export function Goodsupdate(video,lun,img,title,content,cid,type,gid){
    return request({
        url: '/qpi/admin/goods/update',
        method: 'post',
        params: {video:video,lun:lun,img:img,title:title,content:content,cid:cid,type:type,gid:gid}
    });
};



export function deleteGoods(gid){
    return request({
        url: '/qpi/admin/goods/delete',
        method: 'post',
        params: {gid:gid}
    });
};
export function findtypeGoods(pageNum,pageSize,title,cid){
    return request({
        url: '/qpi/admin/goods/findByType',
        method: 'post',
        params: {pageNum:pageNum,pageSize:pageSize,title:title,cid:cid}
    });
};

export function login(username,pwd){
    return request({
        url: '/qpi/admin/login/startLogin',
        method: 'post',
        params: {username:username,pwd:pwd}
    });
};

/*密码修改*/

export function updatepassword(name,pwd){
    return request({
        url: '/qpi/admin/login/update',
        method: 'post',
        params: {name:name,pwd:pwd}
    });
};




