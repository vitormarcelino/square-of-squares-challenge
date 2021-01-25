'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Square = use("App/Models/Square");


class Territory extends Model {

    static async getAll() {
        let all = await Territory.all()
        let territories = await all.rows.map(territory => territory.getJSON())
        return {
            count: territories.length,
            data: territories
        }
    }

    static async createFromRequest(data) {
        let area = (data.end.x - data.start.x) * (data.end.y - data.start.y)
        let insetData = {
            name: data.name,
            start_x: data.start.x,
            start_y: data.start.y,
            end_x: data.end.x,
            end_y: data.end.y,
            area: area,
        }

        let all = await this.all()
        let overlayItens = all.rows.filter(item => item.checkOverlay(insetData))

        if(overlayItens.length > 0) {
            return false
        }

        let territory = await this.create(insetData)
        await territory.createSquares();
        return territory.getJSON()
    }

    async createSquares() {
        for (let x = this.start_x; x <= this.end_x; x++) {
            for (let y = this.start_y; y <= this.end_y; y++) {
                // Create a Square
                await Square.findOrCreate(
                    {x, y},
                    {x, y, territory_id: this.id, painted: false}
                )
            }
        }
    }

    static get createdAtColumn () {
        return null
    }

    static get updatedAtColumn () {
        return null
    }

    checkOverlay(element) {
        if (this.start_x == this.end_x || this.start_y == this.end_y ||
            element.start_x == element.end_x || element.start_y == element.end_y) {
            return false;
        }

        return !(this.end_x <= element.start_x ||
                 this.end_y <= element.start_y ||
                 this.start_x >= element.end_x ||
                 this.start_y >= element.end_y); 
    }

    async getJSON(withpainted = false) {
        let json = {
            id: this.id,
            name: this.name,
            start: {
                x: this.start_x,
                y: this.start_y
            },
            end: {
                x: this.end_x,
                y: this.end_y
            },
            area: this.getArea(),
            painted_area: await this.getPaintedArea()
        }
        if(withpainted) {
            json.painted_squares = await this.getPaintedSquares()
        }
        return json
    }

    getArea() {
        return (this.end_x- this.start_x) * (this.end_y - this.start_y)
    }

    async getPaintedArea() {
        let paintedSquares = await this.getPaintedSquares()
        return paintedSquares.length
    }

    async getPaintedSquares() {
        let paintedSquares = await Square.query().where('territory_id', this.id).andWhere('painted', 1).fetch()
        return paintedSquares.rows.map(square => {
            return {
                x: square.x,
                y: square.y
            }
        })
    }
}

module.exports = Territory
