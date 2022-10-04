import { gql } from '@apollo/client'

export const ALL_HEADS = gql`
    query all_heads {
        head {
            value
            is_active
        }
    }
`
