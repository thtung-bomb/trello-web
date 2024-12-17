import { deepOrange } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '48px',
    boardBarHeight: '68px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#4db6ac',
          secondary: deepOrange
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#000'
        }
      }
    }
  }
  // ...other properties
})

export default theme
