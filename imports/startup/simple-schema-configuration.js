/******************************************
 *  Author : Jake   
 *  Created On : Thu Oct 25 2018
 *  File : simple-schema-configuration.js
 *******************************************/


import { Meteor }                   from 'meteor/meteor';

import SimpleSchema                 from 'simpl-schema';


SimpleSchema.defineValidationErrorTransform(error => {

  return new Meteor.Error(400, error.message);

});



/*** Scripts end... */