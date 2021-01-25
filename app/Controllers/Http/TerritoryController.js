'use strict'

const Territory = use("App/Models/Territory");
const Error = use("App/Models/Error");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with territories
 */
class TerritoryController {
  /**
   * Show a list of all territories.
   * GET territories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return Territory.getAll()
  }

  /**
   * Create/save a new territory.
   * POST territories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'start', 'end'])
    let territory = await Territory.createFromRequest(data)
    if(!territory) {
      Error.create({ message: 'territories/territory-overlay: start: ' + JSON.stringify(data.start) + ' end: ' + JSON.stringify(data.end) })
      return response.status(406).json({
        error: true,
        message: "territories/territory-overlay"
      })
    }
    return {
      error: false,
      data: territory
    }
  }

  /**
   * Display a single territory.
   * GET territories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response}) {
    let territory = await Territory.find(params.id)
    if(!territory) {
      response.status(404)
      Error.create({ message: `territories/not-found: id: ${params.id}` })
      return {
        error: true,
        message: "territories/not-found"
      }
    }
    let reqParams = request.get('withpainted')
    let withpainted = (reqParams.withpainted == 'true') ? true : false

    return {
      error: false,
      data: await territory.getJSON(withpainted)
    }
  }

  /**
   * Delete a territory with id.
   * DELETE territories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let territory = await Territory.find(params.id)
    if(!territory) {
      response.status(404)
      Error.create({ message: `territories/not-found: id: ${params.id}` })
      return {
        error: true,
        message: "territories/not-found"
      }
    }
    territory.delete()
    return {error: false}
  }
}

module.exports = TerritoryController
