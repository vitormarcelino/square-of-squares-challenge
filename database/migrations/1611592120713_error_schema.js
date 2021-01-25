'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ErrorSchema extends Schema {
  up () {
    this.create('errors', (table) => {
      table.increments()
      table.string('message')
      table.timestamps()
    })
  }

  down () {
    this.drop('errors')
  }
}

module.exports = ErrorSchema
