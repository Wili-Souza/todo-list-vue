export default class UserService {
    constructor(resource) { // resource comes from VueResource
        this._resource = resource
    }

    login (user) {
        return this._resource("api/auth/login")
            .save(user)
            .catch(err => {
                throw new Error(err.body.error)
            })
       
    }

    register (user) {
        return this._resource("api/auth/signup")
            .save(user)
            .catch(err => {
                throw new Error(
                    err.body.error ? err.body.error : err.body.message
                )
            })
    }

    recover_password (user) {
        return this._resource("api/auth/forgot")
            .save(user)
    } 

    reset_password (data) {
        return this._resource("api/auth/reset")
            .save(data)
            .catch(err => {
                if (err.status == 500) {
                    throw new Error('This link has expired, access your account to get a new one.')
                } 
                
                throw new Error(
                    err.body.error ? err.body.error : err.body.message
                )
            })
    } 
}