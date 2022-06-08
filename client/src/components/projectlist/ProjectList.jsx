import { useContext } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import Context from '../../index';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';

const ProjectList = observer(() => {
  const { project } = useContext(Context);


  const [status, setStatus] = React.useState('');

  const changeStatus = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Название</TableCell>
            <TableCell align="center">Дата создания</TableCell>
            <TableCell align="center">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {project.projects.map((project) => (
            <TableRow
              key={project.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {project.name}
              </TableCell>
              <TableCell align="center">{project.createdAt}</TableCell>
              {/* <TableCell align="right">{project.statusId}</TableCell> */}
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: 140, }}>
                  <FormControl fullWidth >
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select sx={{ borderRadius: 60, fontSize: '12pt' }} labelId='status-label' label='Status' value={status} onChange={changeStatus}>
                      {
                        [
                          {
                            statusName:'Выполнено',
                            statusValue:1
                          },
                          {
                            statusName:'Активно',
                            statusValue:0
                          },
                          {
                            statusName:'Завершено',
                            statusValue:-1
                          }
                        ].map(({statusName,statusValue})=>(
                          <MenuItem value={statusValue}>{statusName}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ProjectList;
