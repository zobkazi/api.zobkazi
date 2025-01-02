const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');

const swaggerPlugin = {
  name: 'swaggerPlugin',
  register: async function (server) {
    const filePath = path.join(__dirname, '../docs/Docs.yml');
    console.log('Loading Swagger YAML from:', filePath);

    let swaggerDocument;
    try {
      // Load and parse the Swagger YAML file
      swaggerDocument = jsYaml.load(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error('Error loading Swagger YAML:', error);
      throw error;  // This will show up in the logs if the file cannot be loaded
    }

    // Swagger plugin options
    const swaggerOptions = {
      info: swaggerDocument.info,
      schemes: ['http'],
      grouping: 'tags', // Group routes by tags
      swagger: swaggerDocument, // Integrate the YAML definition directly
      documentationPath: '/documentation',
    };

    // Register required plugins
    await server.register([Inert, Vision]);

    // Register hapi-swagger with options
    await server.register({
      plugin: HapiSwagger,
      options: swaggerOptions,
    });
  },
};

module.exports = swaggerPlugin;
