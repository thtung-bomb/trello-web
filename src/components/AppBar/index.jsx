import ModeSelect from '../ModeSelect'
import Box from '@mui/material/Box'

function AppBar() {
  return (
    <Box sx={{
      backgroundColor: 'parimary.light',
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box>
  )
}

export default AppBar
