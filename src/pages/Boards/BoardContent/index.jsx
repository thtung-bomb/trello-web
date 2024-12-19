
import { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { ContentCopy, ContentPaste } from '@mui/icons-material'
import AddCardIcon from '@mui/icons-material/AddCard'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import InsertCommentIcon from '@mui/icons-material/InsertComment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarContentHeight,
      p: '10px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Box Column 01*/}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardBarContentHeight} - ${theme.spacing(5)})`
        }}>

          {/* Header Column */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Column Title</Typography>
            <Box>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu-column"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DeleteForeverOutlinedIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List Cards */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
          ${theme.trelloCustom.boardBarContentHeight} - 
          ${theme.spacing(5)} - 
          ${COLUMN_HEADER_HEIGHT} - 
          ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}>
            <Card sx={{
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
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                {/* typography có varian h1 -> h6*/}
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'grab' }} />
            </Tooltip>
          </Box>
        </Box>

        {/* Box Column 02*/}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardBarContentHeight} - ${theme.spacing(5)})`
        }}>

          {/* Header Column */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Column Title</Typography>
            <Box>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu-column"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DeleteForeverOutlinedIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List Cards */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
          ${theme.trelloCustom.boardBarContentHeight} - 
          ${theme.spacing(5)} - 
          ${COLUMN_HEADER_HEIGHT} - 
          ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}>
            <Card sx={{
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
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5, '&.last-child': { p: 1.5 }
              }}>
                <Typography>
                  Card Demo 1
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'grab' }} />
            </Tooltip>
          </Box>
        </Box>

      </Box>

    </Box>
  )
}

export default BoardContent
