'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'square-of-squares-challenge' }
})
Route.resource('territories', 'TerritoryController').except(['create', 'edit'])
.validator(new Map([
  [['territories.store'], ['StoreTerritory']],
]))

Route.get('/squares/:x/:y', 'SquareController.showByPosition')
Route.patch('/squares/:x/:y/paint', 'SquareController.paint')
Route.get('/dashboard', 'DashboardController.showDashboard')