import service from '@/utils/request';
export default {
    createUser(params) {
        return service.post('/user/createUser', params);
    }
};
