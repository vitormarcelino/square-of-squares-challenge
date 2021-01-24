'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SquareSchema extends Schema {
  up () {
    this.create('squares', (table) => {
      table.increments()
      table.integer('x')
      table.integer('y')
      table.boolean('painted')
    })
  }

  down () {
    this.drop('squares')
  }
}

module.exports = SquareSchema
