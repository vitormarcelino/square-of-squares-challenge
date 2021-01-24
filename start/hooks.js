const { ioc } = require("@adonisjs/fold")
const { hooks } = require("@adonisjs/ignitor")
const Validator = require('jsonschema').Validator

const position = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
        return
    }
    
    var v = new Validator()

    var schema = {
        "id": "/Position",
        "type": "object",
        "properties": {
            "x": {"type": "integer", "minimum": 0},
            "y": {"type": "integer", "minimum": 0}
        },
        "required": ["x", "y"]
    }

    let res = v.validate(value, schema)
    if (!res.valid)
        throw message ||
        `Object does not match with schema`
}

hooks.after.providersRegistered(() => {
  const Validator = ioc.use("Validator")
  Validator.extend("position", position)
})