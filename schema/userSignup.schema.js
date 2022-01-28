const userSignupSchema = {
  type: "object",
  title: "User",
  description: "User profile",
  properties: {
    "username": { "type": "string", "maxLength": 25, "minLength": 5 },
    "password": { "type": "string", "maxLength": 10, "minLength": 8 },
    "confirmPassword" : { "type": "string", "maxLength": 10, "minLength": 8 },
    "email": { "type": "string" },
    "fullname": { "type": "string", "maxLength": 255, "minLength": 3 },
    "address": { "type": "string", "maxLength": 255, "minLength": 4 },
  },
  required: ["username","password","fullname","address","email"],
  additionalProperties: false
};
module.exports = userSignupSchema;