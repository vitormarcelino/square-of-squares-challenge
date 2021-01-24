'use strict'

const Territory = use("App/Models/Territory");

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
      return {
        error: true,
        message: "territories/not-found"
      }
    }

    return {
      error: false,
      data: territory.getJSON()
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
