import { gql } from '@apollo/client'

export const ALL_CATALOG = gql`
    query all_catalog {
        catalog {
            id
            value
            is_active
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
            key
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
            key
            is_active
            value
            slug
        }
    }
`
export const DELETE_CATALOG = gql`
    mutation delete_catalog($id: ID!) {
        deleteCatalog(id: $id) {
            value
        }
    }
`
