var graphql = require('graphql');
var graphqldate = require('graphql-date');
var DevModel = require('../models/Dev');

// graphql object type for dev models
var devType = new graphql.GraphQLObjectType({
	name: 'dev',
	fields: function() {
		return {
			_id: {
				type: graphql.GraphQLString
			},
			name: {
				type: graphql.GraphQLString
			},
			username: {
				type: graphql.GraphQLString
			},
			timestamp: {
				type: graphqldate
			}
		};
	}
});

// graphql queries
var queryType = new graphql.GraphQLObjectType({
	name: 'Query',
	fields: function() {
		return {
			devs: {
				type: new graphql.GraphQLList(devType),
				resolve: function() {
					var devs = DevModel.find().exec();
					if (!devs) {
						throw new Error('Error :: When retrieving Developers');
					}

					return devs;
				}
			},
			dev: {
				type: devType,
				args: {
					id: {
						name: '_id',
						type: graphql.GraphQLString
					}
				},
				resolve: function(root, params) {
					var dev = DevModel.findById(params.id).exec();
					if (!dev) {
						throw new Error('Error :: When retrieving Developer of ID ' + params.id);
					}

					return dev;
				}
			}
		};
	}
});

// graphql mutations
var mutationType = new graphql.GraphQLObjectType({
	name: 'Mutation',
	fields: function() {
		return {
			addDev: {
				type: devType,
				args: {
					name: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString)
					},
					username: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString)
					}
				},
				resolve: function(root, params) {
					var dev = new DevModel(params).save();
					if (!dev) {
						throw new Error('Error :: When creating new Developer');
					}

					return dev;
				}
			},
			updateDev: {
				type: devType,
				args: {
					id: {
						name: 'id',
						type: new graphql.GraphQLNonNull(graphql.GraphQLString)
					},
					name: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString)
					},
					username: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString)
					}
				},
				resolve: function(root, params) {
					return DevModel.findByIdAndUpdate(
						params.id,
						{
							name: params.name,
							username: params.username
						},
						(err) => {
							if (err) {
								return next(err);
							}
						}
					);
				}
			},
			deleteDev: {
				type: devType,
				args: {
					id: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString)
					}
				},
				resolve: function(root, params) {
					var dev = DevModel.findByIdAndRemove(params.id).exec();
					if (!dev) {
						throw new Error('Error :: When removing Developer of ID ' + params.id);
					}

					return dev;
				}
			}
		};
	}
});

module.exports = new graphql.GraphQLSchema({
	query: queryType,
	mutation: mutationType
});
