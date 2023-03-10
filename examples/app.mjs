#!/usr/bin/env node

import {FluxEcoNodeHttpServer} from "../../flux-eco-node-http-server/app/server/FluxEcoNodeHttpServer.mjs";

async function app() {


    const httpServerConfig = /** @type FluxEcoHttpServerConfig */ {
        server: {
            port: '8500',
            host: 'localhost'
        },
        policies: null,
        routes: {
            "static": {
                "/public": {
                    "/favicon.ico":{
                        "contentType": "image/x-icon"
                    },
                    "/index.html": {
                        "contentType": "text/html"
                    },
                    "/main.mjs": {
                        "contentType": "application/javascript"
                    },
                    "/**/*.mjs": {
                        "contentType": "application/javascript"
                    },
                    "/**/*.map": {
                        "contentType": "application/javascript"
                    },
                    "/component.json": {
                        "contentType": "application/json"
                    },
                },
                "/src": {
                    "/**/*.mjs": {
                        "contentType": "application/javascript"
                    },
                },
                "/definitions": {
                    "/types.mjs": {
                        "contentType": "application/javascript"
                    },
                    "/**/*.css": {
                        "contentType": "text/css"
                    },
                },
                "/libs": {
                    "/**/*.js": {
                        "contentType": "application/javascript"
                    },
                    "/**/*.png": {
                        "contentType": "image/png"
                    },
                    "/**/*.css": {
                        "contentType": "text/css"
                    },
                    "/**/*.map": {
                        "contentType":  "application/javascript"
                    },
                    "/**/*.mjs": {
                        "contentType": "application/javascript"
                    },
                },
            },
            api: {}
        }
    };
    const server = await FluxEcoNodeHttpServer.new(httpServerConfig, null)
    // Start the server
    server.start();
}

app();