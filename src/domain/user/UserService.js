export default class NoteService {
    constructor(resource) { // resource comes from VueResource
        this._resource = resource("api/user")
    }

    get () {
        return this._resource
            .query()
            .then(res => res.json())
    }

    update (data) {
        return this._resource
            .update(data)
            .then(res => res.json(), err => {
                console.log(err.status)
                throw new Error(err)
            })
    }

    remove () {
        return this._resource
            .delete()
    }

}