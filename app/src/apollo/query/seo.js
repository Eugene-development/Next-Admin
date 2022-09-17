import { gql } from '@apollo/client'

export const QUERIES = gql`
    query seo {
        seoquery {
            id
            key
            value
        }
    }
`
