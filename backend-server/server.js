"use strict";

const path = require("path");
const chalk = require("chalk");
const fs = require("node:fs");
const AutoLoad = require("@fastify/autoload");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function (fastify, opts) {
	const dir = path.join(__dirname, "logs");
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	// Do not touch the following lines

	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, "plugins"),
		options: Object.assign({}, opts),
	});

	// This loads all plugins defined in routes
	// define your routes in one of these
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, "routes"),
		options: Object.assign({}, opts),
	});


};

module.exports.options = {
	trustProxy: true,
};