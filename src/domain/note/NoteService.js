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

    add_or_update (note) {
        if (note._id) {
            return this._resource
                .update({id: note._id}, note)
        } else {
            return this._resource
                .save(note)
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