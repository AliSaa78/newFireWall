const options = {
definition:{
    openapi:'3.0.0',
    info: {
     title: 'Clincal Managment System',
     version:'1.0.0',
     description:'This is the documentation for the CMS project'
    },
    servers:[
        {
            url:'http://localhost:4000',
        },
    ],
 components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
},
apis:['./routes/*.js'],

};

export default options;