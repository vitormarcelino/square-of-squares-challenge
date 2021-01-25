'use strict'

const Square = use("App/Models/Square");
const Error = use("App/Models/Error");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with squares
 */
class SquareController {
  /**
   * Display a single square by position.
   * GET squares/:x/:y
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showByPosition ({ params, request, response}) {
    let square = await Square.query().where('x', params.x).andWhere('y', params.y).fetch()
    // TODO - Middleware to verify if square exists
    if(!square.rows.length) {
      Error.create({ message: `squares/not-found: x: ${params.x}, y: ${params.y}` })
      return response.status(404).json({
        error: true,
        message: 'squares/not-found'
      })
    }
    return {
      error: false,
      data: square.rows[0]
    }
  }

  /**
   * Paint a Square.
   * GET squares/:x/:y/paint
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async paint ({ params, request, response}) {
    let square = await Square.query().where('x', params.x).andWhere('y', params.y).fetch()
    // TODO - Middleware to verify if square exists
    if(!square.rows.length) {
      Error.create({ message: `squares/not-found: x: ${params.x}, y: ${params.y}` })
      return response.status(404).json({
        error: true,
        message: 'squares/not-found'
      })
    }
    square = square.rows[0]
    square.tooglePainted()
    await square.save()
    return {
      error: false,
      data: square
    }
  }

}

module.exports = SquareController
