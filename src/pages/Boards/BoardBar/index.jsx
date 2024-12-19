import { Chip, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FlashAutoIcon from '@mui/icons-material/FlashAuto'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'


const MENU_STYLE = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary'
  }
}
function BoardBar() {

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2'),
      borderTop: '1px solid #0bbfa5',
      borderBottom: '1px solid #fff',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon sx={{ color: 'white' }} />}
          label="thanhtung space" clickable />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace" clickable />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Driver" clickable />
        <Chip
          sx={MENU_STYLE}
          icon={<FlashAutoIcon />}
          label="Automation" clickable />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Fiters" clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>

        <AvatarGroup max={6} sx={{
          gap: '10px',
          '& .MuiAvatar-root': {
            width: 34,
            height: 34,
            fontSize: 16
          }
        }}>
          <Tooltip title="ngthtung">
            <Avatar
              alt="Remy Sharp"
              src="https://v5.mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="ngthtung">
            <Avatar
              alt="Remy Sharp"
              src="https://v5.mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="ngthtung">
            <Avatar
              alt="Remy Sharp"
              src="https://v5.mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="ngthtung">
            <Avatar
              alt="Remy Sharp"
              src="https://v5.mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="ngthtung">
            <Avatar
              alt="Remy Sharp"
              src="https://v5.mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="ngthtung">
            <Avatar
              alt="Remy Sharp"
              src="https://v5.mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="ngthtung">
            <Avatar
              alt="Remy Sharp"
              src="https://v5.mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
