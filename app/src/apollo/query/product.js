import { gql } from '@apollo/client'

export const ALL_PRODUCT = gql`
    query all_product($key: String!) {
        product(key: $key) {
            id
            value
            is_active
            created_at
            updated_at
            parent: parentable {
                ... on Category {
                    id
                    value
                }
            }
        }
    }
`
export const PRODUCT_PRICE = gql`
    query product_price($key: String!) {
        product: product_price(key: $key) {
            id
            value
            is_active
            created_at
            updated_at
            price {
                value
            }
            parent: parentable {
                ... on Category {
                    id
                    value
                }
            }
        }
    }
`

export const ONE_PRODUCT = gql`
    query product_one($id: ID!) {
        product_one(id: $id) {
            value
            created_at
            updated_at
            parent: parentable {
                ... on Category {
                    value
                }
            }
        }
    }
`

export const CREATE_PRODUCT = gql`
    mutation(
        $key: String!
        $value: String!
        $slug: String!
        $parentableType: String!
        $parentableId: Int!
        $createPrice: CreatePriceInput!
        $createUnit: CreateUnitInput!
        $createImage: CreateImageInput!
    ) {
        createProduct(
            input: {
                key: $key
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
                price: { create: $createPrice }
                unit: { create: $createUnit }
                image: { create: $createImage }
            }
        ) {
            value
            price {
                value
            }
        }
    }
`

// export const CREATE_PRODUCT = gql`
//     mutation create_product(
//         $key: String!
//         $is_active: Boolean
//         $value: String!
//         $slug: String!
//         $parentableType: String
//         $parentableId: Int!
//     ) {
//         createProduct(
//             input: {
//                 key: $key
//                 is_active: $is_active
//                 value: $value
//                 slug: $slug
//                 parentable_type: $parentableType
//                 parentable_id: $parentableId
//             }
//         ) {
//             value
//         }
//     }
// `

export const UPDATE_PRODUCT = gql`
    mutation updateProduct(
        $id: ID!
        $key: String!
        $value: String!
        $parentableId: Int!
        $updatePrice: UpdatePriceInput!
    ) {
        updateProduct(
            input: {
                id: $id
                key: $key
                value: $value
                parentable_id: $parentableId
                price: { update: $updatePrice }
            }
        ) {
            value
        }
    }
`
export const UPDATE_STATUS_PRODUCT = gql`
    mutation updateStatusProduct($id: ID!, $is_active: Boolean) {
        updateStatusProduct(input: { id: $id, is_active: $is_active }) {
            is_active
        }
    }
`
// export const UPDATE_PRODUCT = gql`
//     mutation update_product(
//         $id: ID!
//         $key: String!
//         $is_active: Boolean
//         $value: String!
//         $slug: String
//         $parentableType: String
//         $parentableId: Int
//     ) {
//         updateProduct(
//             input: {
//                 id: $id
//                 key: $key
//                 is_active: $is_active
//                 value: $value
//                 slug: $slug
//                 parentable_type: $parentableType
//                 parentable_id: $parentableId
//             }
//         ) {
//             value
//         }
//     }
// `

export const DELETE_PRODUCT = gql`
    mutation delete_product($id: ID!) {
        deleteProduct(id: $id) {
            value
        }
    }
`
