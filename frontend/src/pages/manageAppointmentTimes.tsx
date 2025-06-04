import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useScheduleAppointment } from "../hooks/useScheduleAppointment";

const ManageAppointmentTimesPage: React.FC = () => {
  const {
    appointmentTimes,
    loading,
    addAppointmentTime,
    deleteAppointmentTime,
  } = useScheduleAppointment();
  const [newDate, setNewDate] = useState<Dayjs | null>(null);

  const columns: GridColDef[] = [
    {
      field: "startTime",
      headerName: "Horário",
      flex: 1,
      valueFormatter: (params: any) => {
        console.log("Value Formatter Params:", params);
        return dayjs(params).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <Button
          color='error'
          startIcon={<DeleteIcon />}
          onClick={() => deleteAppointmentTime(params.row.id)}
        >
          Excluir
        </Button>
      ),
      width: 150,
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <h2 className='text-3xl font-bold mb-6'>Gerenciar Agenda</h2>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <DateTimePicker
          label='Novo horário'
          value={newDate}
          onChange={setNewDate}
          minDateTime={dayjs()}
          slotProps={{ textField: { fullWidth: true } }}
          format='DD/MM/YYYY - HH:mm'
          views={["year", "month", "day", "hours"]}
          ampm={false}
          ampmInClock={false}
        />
        <Button
          variant='contained'
          onClick={() => addAppointmentTime(newDate)}
          disabled={!newDate}
        >
          Adicionar
        </Button>
      </Box>
      <div className='w-full h-[400px]'>
        <DataGrid
          rows={appointmentTimes}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          loading={loading}
          getRowId={(row: { id: any }) => row.id}
        />
      </div>
    </Box>
  );
};

export default ManageAppointmentTimesPage;
