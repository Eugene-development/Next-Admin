import { gql } from '@apollo/client'

export const PRODUCT_W = gql`
    query WhereProducts($key: Int, $active: Boolean) {
        product_w(key: $key, active: $active) {
            key
            text: value
            property {
                value
            }
            parentable {
                ... on Category {
                    value
                }
            }
        }
    }
`
