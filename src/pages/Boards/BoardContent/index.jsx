
import { useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'



function BoardContent() {

  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarContentHeight,
      p: '10px 0'
    }}>

      {/* Box Column 01*/}
      <ListColumns />

    </Box>
  )
}

export default BoardContent
