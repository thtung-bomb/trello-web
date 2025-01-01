import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Card({ temporaryHideMedia }) {

  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          p: 1.5, '&.last-child': { p: 1.5 }
        }}>
          <Typography>
            Card 01
          </Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{
          cursor: 'pointer',
          height: 140
        }}
        image="https://th.bing.com/th/id/OIP.s08bNq8BPNABdU3eOkdBQgHaFj?rs=1&pid=ImgDetMain"
        title="green iguana"
      />
      {/* trong card content co overflow hidden */}
      <CardContent sx={{
        p: 1.5, '&.last-child': { p: 1.5 }
      }}>
        <Typography>
          Tung Practice MERN Stack
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<InsertCommentIcon />}>25</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>30</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
