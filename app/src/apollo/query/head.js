import { gql } from '@apollo/client'

export const ALL_HEADS = gql`
    query all_heads {
        head {
            value
            is_active
        }
    }
`

export const CREATE_HEAD = gql`
    mutation create_head(
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String!
        $parentableId: Int
    ) {
        createHead(
            input: {
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
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
export const UPDATE_HEAD = gql`
    mutation update_head(
        $id: ID!
        $key: String!
        $is_active: Boolean
        $value: String!
    ) {
        updateHead(
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
export const DELETE_HEAD = gql`
    mutation delete_head($id: ID!) {
        deleteHead(id: $id) {
            value
        }
    }
`
