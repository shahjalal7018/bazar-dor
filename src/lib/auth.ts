
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is missing from environment variables."
  );
}

// Better Auth secret
const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret || authSecret.length < 32) {
  throw new Error(
    "BETTER_AUTH_SECRET must contain at least 32 characters."
  );
}

// MongoDB client
const mongoClient = new MongoClient(MONGODB_URI);

const database = mongoClient.db(
  process.env.MONGODB_DB_NAME || "bazardor"
);

// Google OAuth credentials
const googleClientId =
  process.env.BETTER_AUTH_GOOGLE_CLIENT_ID;

const googleClientSecret =
  process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET;

// GitHub OAuth credentials
const githubClientId =
  process.env.BETTER_AUTH_GITHUB_CLIENT_ID;

const githubClientSecret =
  process.env.BETTER_AUTH_GITHUB_SECRET;

// Configure available social providers
const socialProviders = {
  ...(googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : {}),

  ...(githubClientId && githubClientSecret
    ? {
        github: {
          clientId: githubClientId,
          clientSecret: githubClientSecret,
        },
      }
    : {}),
};

// Better Auth configuration
export const auth = betterAuth({
  database: mongodbAdapter(database, {
    client: mongoClient,
    disableAutoCreateIndex: true, 
  }),

  baseURL:
    process.env.BETTER_AUTH_URI ||
    "http://localhost:3000",

  secret: authSecret,

   

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders,

  advanced: {
    database: {
      generateId: false,
    },
   
  }
});

