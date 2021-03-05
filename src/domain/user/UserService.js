export default class NoteService {
    constructor(resource) { // resource comes from VueResource
        this._resource = resource("api/user")
    }

    get () {
        return this._resource
            .query()
            .then(res => res.json(), error => {
                console.log(error)
            })
    }

    update (data) {
        return this._resource
            .update(data)
            .then(res => res.json(), error => {
                console.log(error)
            })
    }

    remove () {
        return this._resource
            .delete()
    }

}