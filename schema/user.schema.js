const userSignupSchema = {
  type: "object",
  title: "User",
  description: "User profile",
  properties: {
    "id": {
      "description": "positive integer or string of digits",
      "type": ["string", "integer"],
      "pattern": "^[1-9][0-9]*$",
      "minimum": 1
    },
    "username": { "type": "string", "maxLength": 25, "minLength": 5 },
    "password": { "type": "string", "maxLength": 10, "minLength": 8 },
    "confirm password" : { "type": "string", "maxLength": 10, "minLength": 8 },
    "email": { "type": "string", "format": "email" },
    "fullname": { "type": "string", "maxLength": 255, "minLength": 3 },
    "address": { "type": "string", "maxLength": 255, "minLength": 4 },
  },
  required: ["username","password","fullname","address","email"],
  additionalProperties: false
}
const userLoginSchema = {
  type: "object",
  title: "User",
  description: "User profile",
  properties: {
    "id": {
      "description": "positive integer or string of digits",
      "type": ["string", "integer"],
      "pattern": "^[1-9][0-9]*$",
      "minimum": 1
    },
    "username": { "type": "string", "maxLength": 25, "minLength": 5 },
    "password": { "type": "string", "maxLength": 10, "minLength": 8 },
    "email": { "type": "string", "format": "email" },
    "fullname": { "type": "string", "maxLength": 255, "minLength": 3 },
    "address": { "type": "string", "maxLength": 255, "minLength": 4 },
  },
  required: ["username","password","fullname","address","email"],
  additionalProperties: false
}

module.exports = userLoginSchema;
module.exports = userSignupSchema;