const userLoginSchema = {
  type: "object",
  title: "User",
  description: "User profile",
  properties: {
    "username": { "type": "string", "maxLength": 25, "minLength": 5 },
    "password": { "type": "string", "maxLength": 10, "minLength": 8 },
  },
  required: ["username","password"],
  additionalProperties: false
};
module.exports = userLoginSchema;