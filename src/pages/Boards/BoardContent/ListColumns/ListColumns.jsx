
import Box from '@mui/material/Box'
import Columns from './Column/Columns'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  return (
    // SortableContext yêu cầu items dạng [id-1, id-2,...] chứ không phải [{id1: 'id-1'}, {id2: 'id-2'}...]
    // Nếu không đúng thì vẫn kéo thả được NHƯNG không có animation
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>

        {columns?.map(column => (
          <Columns key={column._id} column={column} />
        ))}

        {/* Add new column CTA */}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}>
          <Button startIcon={<NoteAddIcon />}
            sx={{
              color: 'white',
              width: '100%',
              borderColor: 'white',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}
          >Add New Column</Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
