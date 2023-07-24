import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Route, { RouteNode } from '@ioc:Adonis/Core/Route'
import { flatten } from '@poppinss/utils'
import pkg from '../../../package.json'

interface APIInfo {
    api: {
        name: string,
        version: string,
        environment: string
    },
    network: {
        host: string,
        port: number
    },
    license: {
        name: string,
        url: string
    },
    contact: {
        github: string
    },
    routes: {
        [domain: string]: (RouteNode & {
            methods: string[];
        })[];
    },
    flattened: Record<string, any>
}

export default class APIInfoController {
    public async handle({ request }: HttpContextContract) {
        /**
         * API info
         */
        // Name
        const name = pkg.name;

        // Version
        const version = pkg.version;

        // Environment
        const environment = Env.get('NODE_ENV');


        /**
         * Network info
         */
        // Host
        const host = Env.get('HOST');

        // Port
        const port = Env.get('PORT');


        /**
         * Response
         */
        const info: APIInfo = {
            // API Info
            api: {
                name,
                version,
                environment
            },
            // Network Info
            network: {
                host,
                port
            },
            // License Info
            license: {
                name: 'MIT',
                url: 'https://opensource.org/license/mit'
            },
            // Contact Info
            contact: {
                github: 'https://github.com/callumndev'
            },
            // Routes
            routes: Route.toJSON(),
            // Flattened
            flattened: {}
        };

        // Flatten the APIInfo object
        info.flattened = flatten(info, '.', true);

        // If request has a 'key' in the query string, return that key's value from the flattened APIInfo object
        // Otherwise, return the entire APIInfo object
        const query = request.qs();
        const key = query['key'];
        if (key) {
            if (Object.hasOwnProperty.call(info.flattened, key)) {
                return info.flattened[key];
            }
        }

        // Return the entire APIInfo object
        return info;
    }
}
