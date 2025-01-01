
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'


function BoardContent({ board }) {

  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarContentHeight,
      p: '10px 0'
    }}>

      {/* Box Column 01*/}
      <ListColumns columns={orderedColumns} />

    </Box>
  )
}

export default BoardContent
