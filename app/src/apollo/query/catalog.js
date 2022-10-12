import { gql } from '@apollo/client'

export const ALL_CATALOG = gql`
    query all_catalog($key: String) {
        catalog(key: $key) {
            id
            value
            is_active
        }
    }
`

export const ONE_CATALOG = gql`
    query catalog_one($id: ID!) {
        catalog_one(id: $id) {
            value
            created_at
            updated_at
            parent: parentable {
                ... on Menu {
                    value
                }
            }
        }
    }
`

export const CREATE_CATALOG = gql`
    mutation create_catalog(
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String!
        $parentableType: String
        $parentableId: Int
    ) {
        createCatalog(
            input: {
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
            }
        ) {
            id
            is_active
            value
            slug
        }
    }
`
export const UPDATE_CATALOG = gql`
    mutation update_catalog(
        $id: ID!
        $key: String!
        $is_active: Boolean
        $value: String!
    ) {
        updateCatalog(
            input: { id: $id, key: $key, is_active: $is_active, value: $value }
        ) {
            id
            is_active
            value
            slug
        }
    }
`
export const DELETE_CATALOG = gql`
    mutation delete_catalog($id: ID!) {
        deleteCatalog(id: $id) {
            id
            value
        }
    }
`
