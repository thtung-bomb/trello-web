
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <p>Nguyen Thanh Tung</p>

      <Typography variant="body2" color="text.secondary">
        Test text Test text
      </Typography>

      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <AccessAlarmIcon />
      <ThreeDRotation />
    </>
  )
}

export default App
