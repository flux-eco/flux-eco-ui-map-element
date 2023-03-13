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
                    "/**/*.css": {
                        "contentType": "text/css"
                    },
                    "/**/*.mjs": {
                        "contentType": "application/javascript"
                    },
                    "/**/*.map": {
                        "contentType": "application/javascript"
                    },
                    "/settings.json": {
                        "contentType": "application/json"
                    },
                }
            },
            api: {}
        }
    };
    const server = await FluxEcoNodeHttpServer.new(httpServerConfig, null)
    // Start the server
    server.start();
}

app();