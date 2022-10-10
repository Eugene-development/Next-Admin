import { gql } from '@apollo/client'

export const ALL_MENU = gql`
    query all_menu {
        menu {
            id
            value
            is_active
        }
    }
`
