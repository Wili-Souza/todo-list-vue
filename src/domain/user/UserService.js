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
}