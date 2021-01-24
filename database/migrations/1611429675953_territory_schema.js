'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TerritorySchema extends Schema {
  up () {
    this.create('territories', (table) => {
      table.increments()
      table.string('name')
      table.integer('start_x')
      table.integer('start_y')
      table.integer('end_x')
      table.integer('end_y')
      table.integer('area')
      table.integer('painted_area')
    })
  }

  down () {
    this.drop('territories')
  }
}

module.exports = TerritorySchema
