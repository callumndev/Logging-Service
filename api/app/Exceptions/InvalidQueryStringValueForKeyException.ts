/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new InvalidQueryStringValueForKeyException('user', '123')
|
*/
import { Exception } from '@adonisjs/core/build/standalone'


export default class InvalidQueryStringValueForKeyException extends Exception
{
    constructor(key: string, value: string)
    {
        const message = 'The value "' + value + '" for the query string key "' + key  + '" is invalid';
        const status = 400;
        const errorCode = 'E_INVALID_QUERY_STRING_VALUE_FOR_KEY';

        super(message, status, errorCode);
    }
}
