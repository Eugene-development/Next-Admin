import { gql } from '@apollo/client'

export const ALL_CATEGORY = gql`
    query all_category($key: String) {
        category(key: $key) {
            id
            seoTitle {
                id
                value
            }
            seoDescription {
                id
                value
            }
            value
            is_active
            created_at
            updated_at
            parent: parentable {
                ... on Rubric {
                    id
                    value
                }
            }
        }
    }
`

export const ONE_CATEGORY = gql`
    query category_one($id: ID!, $key: String!) {
        category_one_id(id: $id, key: $key) {
            id
            value
            created_at
            updated_at
            product {
                id
                is_active
                value
                price {
                    id
                    value
                }
                unit {
                    value
                }
                created_at
                updated_at
            }
            parent: parentable {
                ... on Rubric {
                    value
                }
            }
        }
    }
`

export const CREATE_CATEGORY = gql`
    mutation create_category(
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String!
        $parentableType: String
        $parentableId: Int!
    ) {
        createCategory(
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
export const UPDATE_CATEGORY = gql`
    mutation update_category(
        $id: ID!
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String
        $parentableType: String
        $parentableId: Int
        $updateSeoTitle: UpdateSeoTitleInput!
        $updateSeoDescription: UpdateSeoDescriptionInput!
    ) {
        updateCategory(
            input: {
                id: $id
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
                seoTitle: { update: $updateSeoTitle }
                seoDescription: { update: $updateSeoDescription }
            }
        ) {
            value
        }
    }
`
export const DELETE_CATEGORY = gql`
    mutation delete_category($id: ID!) {
        deleteCategory(id: $id) {
            value
        }
    }
`
