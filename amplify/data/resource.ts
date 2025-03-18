import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Student: a
    .model({
      username: a.string().required(), 
      email: a.string().required(), 
      avatar: a.string(), 
      items: a.hasMany("Item", "studentId"), // Explicitly defining the relation field
    })
    .authorization(allow => [allow.owner()]),

  Item: a
    .model({
      title: a.string().required(),
      description: a.string(),
      cost: a.float().required(),
      image: a.string(), 
      student: a.belongsTo("Student", "studentId"), // Correcting the belongsTo relationship
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