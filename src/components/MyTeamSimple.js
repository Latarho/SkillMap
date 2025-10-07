import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const MyTeamSimple = () => {
  const [teamMembers] = useState([
    { id: 1, name: 'Иван Петров', position: 'Frontend Developer', skills: 'React, JavaScript' },
    { id: 2, name: 'Мария Сидорова', position: 'Backend Developer', skills: 'Node.js, Python' },
    { id: 3, name: 'Алексей Козлов', position: 'DevOps Engineer', skills: 'Docker, AWS' },
  ]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Моя команда
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Управление навыками команды разработчиков
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Должность</TableCell>
                <TableCell>Навыки</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.skills}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      Оценить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MyTeamSimple;
