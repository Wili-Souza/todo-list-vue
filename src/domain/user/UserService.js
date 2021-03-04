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

    update (id, note) {
        //
    }

    remove (id) {
       //
    }

}