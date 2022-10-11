import { gql } from '@apollo/client'

export const ALL_MENU = gql`
    query all_menu($key: Int) {
        menu(key: $key) {
            id
            value
            is_active
        }
    }
`
