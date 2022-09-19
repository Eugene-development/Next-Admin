import { gql } from '@apollo/client'

export const QUERIES = gql`
    query seo {
        seoquery {
            value
            resource {
                value
                position {
                    value
                    created_at
                }
            }
        }
    }
`
// export const QUERIES = gql`
//     query seo {
//         position {
//             date: created_at
//             position: value
//             parentable {
//                 ... on Seoquery {
//                     seoquery: value
//                     parentable {
//                         ... on Resource {
//                             resource: value
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `
// export const QUERIES = gql`
//     query seo {
//         seoquery {
//             id
//             key
//             value
//             parentable {
//                 ... on Resource {
//                     resource: value
//                 }
//             }
//         }
//     }
// `
