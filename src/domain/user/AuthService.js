export default class UserService {
    constructor(resource) { // resource comes from VueResource
        this._resource = resource
    }

    login (user) {
        return this._resource("api/auth/login")
            .save(user)
    }

    register (user) {
        return this._resource("api/auth/signup")
            .save(user)
    }

    recover_password (user) {
        return this._resource("api/auth/forgot")
            .save(user)
    } 

    reset_password (data) {
        return this._resource("api/auth/reset")
            .save(data)
    } 
}