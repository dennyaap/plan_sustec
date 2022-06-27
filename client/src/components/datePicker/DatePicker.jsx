import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import ru from "date-fns/locale/ru";
import { COLORS } from '../../consts/consts';

const DatePicker = ({ dateCompletion }) => {
  const [ date, setDate ] = useState(dateCompletion);

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru} >
      <DateTimePicker
        value={date}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        renderInput={(params) => <TextField
          variant="standard"
          sx={{
            borderRadius: 60,
                        width: 180,
                        
                        padding: '5px 15px',
            borderRadius: 20,
            backgroundColor: COLORS.BLUE,
            input: {
              color: '#fff',
              fontSize: 14,
            }
          }}
          {...params}
          InputProps={{
            disableUnderline: true,
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

export default DatePicker;