import pkg from '../../../package.json'

import InvalidQueryStringValueForKeyException from 'App/Exceptions/InvalidQueryStringValueForKeyException'

import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { flatten } from '@poppinss/utils'

import type { APIInfoResponse } from 'types/APIInfo/APIInfoResponse'
import type { APIState } from 'types/APIInfo/Info/APIState'
import type { APINetwork } from 'types/APIInfo/Info/APINetwork'
import type { APILicense } from 'types/APIInfo/Info/APILicense'
import type { APIContact } from 'types/APIInfo/Info/APIContact'


export default class APIInfoController
{
    public async handle({ request }: HttpContextContract)
    {
        // Get API info
        const info: APIInfoResponse = this.getAPIInfo();

        // If request has a 'key' in the query string, return that key's value from the flattened APIInfoResponse object
        // Otherwise, return the entire APIInfoResponse object
        const infoKey = request.qs()['key'];
        if (infoKey)
        {
            if (Object.hasOwnProperty.call(info.flattened, infoKey))
                return info.flattened[infoKey];
            else
                throw new InvalidQueryStringValueForKeyException('key', infoKey);
        }

        // Return the entire APIInfoResponse object
        return info;
    }


    private getAPIInfo(): APIInfoResponse
    {
        const info: APIInfoResponse = {
            state: this.getAPIState(),
            network: this.getAPINetwork(),
            license: this.getAPILicense(),
            contact: this.getAPIContact(),
            routes: Route.toJSON(),

            // Flattened APIInfo
            flattened: {}
        }

        // Flatten the APIInfoResponse object
        info.flattened = flatten(info, '.', true);

        // Return the APIInfoResponse object
        return info;
    }


    private getAPIState(): APIState
    {
        return {
            name: pkg.name,
            version: pkg.version,
            environment: Env.get('NODE_ENV')
        }
    }

    private getAPINetwork(): APINetwork
    {
        return {
            host: Env.get('HOST'),
            port: Env.get('PORT')
        }
    }

    private getAPILicense(): APILicense
    {
        return {
            name: 'MIT',
            url: 'https://opensource.org/license/mit'
        }
    }

    private getAPIContact(): APIContact
    {
        return {
            github: 'https://github.com/callumndev'
        }
    }
}
