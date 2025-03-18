import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Student: a
    .model({
      username: a.string().required(), 
      email: a.string().required(), 
      avatar: a.string(),
      studentId: a.string().required(), // Add this field
      items: a.hasMany("Item", "studentId"), 
    })
    .authorization(allow => [allow.owner()]),

  Item: a
    .model({
      title: a.string().required(),
      description: a.string(),
      cost: a.float().required(),
      image: a.string(),
      studentId: a.string(), // Add this field
      student: a.belongsTo("Student", "studentId"),
    })
    .authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});