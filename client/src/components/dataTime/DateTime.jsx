import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import ru from "date-fns/locale/ru";
import './style.css';


export default function DateTime() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru} id='dtp'>
      <DateTimePicker
        value={value}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        renderInput={(params) => <TextField
        id='ddd'
          sx={{
            width:'200px',
            borderRadius:20,
            backgroundColor:'#109CF1',
            fontSize:'14px'
          }}
          {...params}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleOpen}>
                  <EventIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          
        />
        }
      />
    </LocalizationProvider>
  );
}

