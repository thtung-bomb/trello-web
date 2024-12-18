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
  color: 'primary.main',
  backgroundColor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
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
      borderTop: '1px solid #0bbfa5'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
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
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <AvatarGroup max={6} sx={{
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
