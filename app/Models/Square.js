'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Square extends Model {

    static get createdAtColumn () {
        return null
    }

    static get updatedAtColumn () {
        return null
    }

    getPainted() {
        return !!+this.painted
    }

    tooglePainted() {
        this.painted = !+this.painted
    }
}

module.exports = Square
