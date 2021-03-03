export default class NoteService {
    constructor(resource, token=null) { // resource comes from VueResource
        this._resource = resource("api/notes{/id}")
    }

    get_all () {
        return this._resource
            .query()
            .then(res => res.json(), error => {
                console.log(error)
            })
    }

    add (note) {
        return this._resource
            .save(note)
    }

    update (id, note) {
        if (id) {
            return this._resource
                .update({ id }, note)
        }
    }

    remove (id) {
        console.log(id)
        return this._resource
            .delete({ id })
            .then(null, error => {
                console.log(error)
            })
    }

}