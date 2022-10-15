import { gql } from '@apollo/client'

export const ALL_RUBRIC = gql`
    query all_rubric($key: String!) {
        rubric(key: $key) {
            id
            value
            is_active
            created_at
            updated_at
            parent: parentable {
                ... on Catalog {
                    id
                    value
                }
            }
        }
    }
`

export const ONE_RUBRIC = gql`
    query rubric_one($id: ID!) {
        rubric_one(id: $id) {
            value
            created_at
            updated_at
            parent: parentable {
                ... on Catalog {
                    value
                }
            }
        }
    }
`

export const CREATE_RUBRIC = gql`
    mutation create_rubric(
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String!
        $parentableType: String
        $parentableId: Int!
    ) {
        createRubric(
            input: {
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
            }
        ) {
            value
        }
    }
`
export const UPDATE_RUBRIC = gql`
    mutation update_rubric(
        $id: ID!
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String
        $parentableType: String
        $parentableId: Int
    ) {
        updateRubric(
            input: {
                id: $id
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
            }
        ) {
            value
        }
    }
`
export const DELETE_RUBRIC = gql`
    mutation delete_rubric($id: ID!) {
        deleteRubric(id: $id) {
            value
        }
    }
`
