import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ru from "date-fns/locale/ru";


export default function DateTime() {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  
    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
          <DateTimePicker
            label="срок"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params}
            sx={{width:240}}
             />
        }
          />
      </LocalizationProvider>
    );
  }

