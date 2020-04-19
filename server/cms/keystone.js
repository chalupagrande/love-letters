const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, Float, File, Relationship } = require('@keystonejs/fields');
const { S3Adapter } = require('@keystonejs/file-adapters');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'love letters';
const DEV = process.env.NODE_ENV !== 'production'

/*

S3*/
const accessKey = process.env.S3_ACCESS_KEY
const secretKey = process.env.S3_SECRET_KEY
const bucketName = process.env.S3_BUCKET_NAME
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost/keystone-cms'
const adapterConfig = { mongoUri: mongoURL };

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
  secureCookies: !DEV,
  cookieSecret: process.env.COOKIE_SECRET || 'very-secret'
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

const photoAdapter = new S3Adapter({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: 'us-east-2',
  bucket: bucketName,
  folder: 'photos',
  publicUrl: ({ id, filename, _meta }) =>
    `https://love-letters-uploads.s3.us-east-2.amazonaws.com/photos/${filename}`,
  s3Options: {
    apiVersion: '2006-03-01',
  },
  uploadParams: ({ filename, id, mimetype, encoding }) => ({
    Metadata: {
      keystone_id: id.toString(),
    },
  }),
});


const audioAdapter = new S3Adapter({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: 'us-east-2',
  bucket: bucketName,
  folder: 'audio',
  publicUrl: ({ id, filename, _meta }) =>
    `https://love-letters-uploads.s3.us-east-2.amazonaws.com/audio/${filename}`,
  s3Options: {
    apiVersion: '2006-03-01',
  },
  uploadParams: ({ filename, id, mimetype, encoding }) => ({
    Metadata: {
      keystone_id: id.toString(),
    },
  }),
});


keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

keystone.createList('Photo', {
  fields: {
    tag: {type: Text},
    file: {
      require: true,
      type: File,
      adapter: photoAdapter,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await photoAdapter.delete(existingItem.file);
          }
        },
      }
    }
  },
  hooks: {
    afterDelete: async ({existingItem}) => {
      if(existingItem.file){
        await photoAdapter.delete(existingItem.file);
      }
    },
  },
  labelResolver: (item) => `${item.file.originalFilename}`
})

keystone.createList('Sound', {
  fields: {
    file: {
      require: true,
      type: File,
      adapter: audioAdapter,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await audioAdapter.delete(existingItem.file);
          }
        },
      }
    }
  },
  hooks: {
    afterDelete: async ({existingItem}) => {
      if(existingItem.file){
        await audioAdapter.delete(existingItem.file);
      }
    },
  },
  labelResolver: (item) => `${item.file.originalFilename}`
})


keystone.createList('Post', {
  fields: {
    city: {type: Text},
    lat: {type: Float},
    lng: {type: Float},
    photo: {
      type: Relationship,
      ref: 'Photo',
      many: true
    },
    audio: {
      type: Relationship,
      ref: 'Sound'
    },
  },
  labelName: 'city'
})

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

const exportObject = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy
    }),
  ]
};

if(!DEV) {
  exportObject.configureExpress = app => {
    app.set('trust proxy', 1);
  }
}


module.exports = exportObject
