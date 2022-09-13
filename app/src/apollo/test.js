import { gql } from '@apollo/client'

export const ALL_TEST = gql`
    query test {
        property {
            value
            parentable {
                ... on Product {
                    value
                }
            }
        }
    }
`
