'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const moment = require('moment')

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
        this.painted_at = null
        if(this.painted) {
            this.painted_at = moment().format("YYYY-MM-DD HH:mm:ss")
        }
    }
}

module.exports = Square
