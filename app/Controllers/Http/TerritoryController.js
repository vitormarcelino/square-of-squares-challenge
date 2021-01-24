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
    return Territory.teste()
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
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update territory details.
   * PUT or PATCH territories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
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
  }
}

module.exports = TerritoryController
