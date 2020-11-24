import service from '@/utils/request';
export default {
    getLoginInfo(params) {
        return service.post('/user/userInfo', params);
    }
};
