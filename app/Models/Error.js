'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const moment = require('moment')

class Error extends Model {
    getCreatedAtFormated() {
        return moment(this.created_at).format("DD/MM/YYYY HH:mm:ss")
    }
}

module.exports = Error
