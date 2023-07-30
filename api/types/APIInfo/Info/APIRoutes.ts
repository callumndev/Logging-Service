import type { RouteNode } from '@ioc:Adonis/Core/Route'


export type APIRoutes = {
    [domain: string]: (RouteNode & {
        methods: string[];
    })[];
}
