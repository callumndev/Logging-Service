import type { APIState } from './Info/APIState'
import type { APINetwork } from './Info/APINetwork'
import type { APILicense } from './Info/APILicense'
import type { APIContact } from './Info/APIContact'
import type { APIRoutes } from './Info/APIRoutes'


export interface APIInfoResponse {
    state: APIState,
    network: APINetwork,
    license: APILicense,
    contact: APIContact,
    routes: APIRoutes,
    flattened: Record<string, any>
}
