'use strict'

const Territory = use("App/Models/Territory");
const Error = use("App/Models/Error");

class DashboardController {
    async showDashboard({ view }) {
        let allTerritories = await Territory.getAll()
        let mostPaitedArea = allTerritories.data
        mostPaitedArea.sort((a, b) => (a.painted_area < b.painted_area) ? 1 : -1)

        let mostProportionalPaintedArea = allTerritories.data.map(territory => {
            if(!territory.painted_area) {
                territory.proportionalPaintedArea = 0
                return territory
            }
            territory.proportionalPaintedArea = territory.painted_area / territory.area
            return territory
        })
        mostProportionalPaintedArea.sort((a, b) => (a.proportionalPaintedArea < b.proportionalPaintedArea) ? 1 : -1)

        let lastFivePaitedSquares = false

        let lastFiveErrors = await Error.query().orderBy('created_at', 'desc').limit(5).fetch()

        return view.render('dashboard', {
            mostPaitedArea,
            mostProportionalPaintedArea,
            lastFiveErrors
        })
    }
}

module.exports = DashboardController
