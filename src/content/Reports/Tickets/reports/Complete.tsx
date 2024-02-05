import React, { FC } from 'react';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  GridToolbar,
  DataGridPremiumProps,
  DataGridPremium,
} from '@mui/x-data-grid-premium';
import { format } from 'date-fns';

const tableColumns2: GridColDef[] = [
  {
    field: 'participant_activated_at',
    headerName: 'Fecha de Activación',
    valueGetter: (params: GridValueGetterParams) => {
      const { participant_activated_at } = params.row;
      return participant_activated_at
        ? format(new Date(participant_activated_at.value), 'yyyy-MM-dd')
        : participant_activated_at;
    },
  },
];

const tableColumns: GridColDef[] = [
  {
    field: 'ticket_code',
    headerName: 'Código',
  },
  // {
  //   field: 'ticket_priority',
  //   headerName: 'Prioridad de Ticket',
  // },
  // {
  //   field: 'ticket_priority_low_at.value',
  //   headerName: 'Fecha de Prioridad Baja',
  // },
  // {
  //   field: 'ticket_priority_medium_at.value',
  //   headerName: 'Fecha de Prioridad Media',
  // },
  // {
  //   field: 'ticket_priority_high_at.value',
  //   headerName: 'Fecha de Prioridad Alta',
  // },
  {
    field: 'ticket_status',
    headerName: 'Estado',
  },
  {
    field: 'ticket_status_open_at',
    headerName: 'Fecha de Solicitud',
    valueGetter: (params: GridValueGetterParams) => {
      const { ticket_status_open_at } = params.row;
      return ticket_status_open_at
        ? format(new Date(ticket_status_open_at.value), 'yyyy-MM-dd HH:mm')
        : ticket_status_open_at;
    },
    width: 150,
  },
  {
    field: 'ticket_status_in_progress_at',
    headerName: 'Fecha de En Proceso',
    valueGetter: (params: GridValueGetterParams) => {
      const { ticket_status_in_progress_at } = params.row;
      return ticket_status_in_progress_at
        ? format(
            new Date(ticket_status_in_progress_at.value),
            'yyyy-MM-dd HH:mm'
          )
        : ticket_status_in_progress_at;
    },
    width: 150,
  },
  {
    field: 'ticket_status_on_hold_at',
    headerName: 'Fecha de En Espera',
    valueGetter: (params: GridValueGetterParams) => {
      const { ticket_status_on_hold_at } = params.row;
      return ticket_status_on_hold_at
        ? format(new Date(ticket_status_on_hold_at.value), 'yyyy-MM-dd HH:mm')
        : ticket_status_on_hold_at;
    },
    width: 150,
  },
  {
    field: 'ticket_status_resolved_at',
    headerName: 'Fecha de Resolución',
    valueGetter: (params: GridValueGetterParams) => {
      const { ticket_status_resolved_at } = params.row;
      return ticket_status_resolved_at
        ? format(new Date(ticket_status_resolved_at.value), 'yyyy-MM-dd HH:mm')
        : ticket_status_resolved_at;
    },
    width: 150,
  },
  {
    field: 'ticket_status_closed_at',
    headerName: 'Fecha de Cierre',
    valueGetter: (params: GridValueGetterParams) => {
      const { ticket_status_closed_at } = params.row;
      return ticket_status_closed_at
        ? format(new Date(ticket_status_closed_at.value), 'yyyy-MM-dd HH:mm')
        : ticket_status_closed_at;
    },
    width: 150,
  },
  {
    field: 'ticket_full_name',
    headerName: 'Nombre Registrado en Ticket',
    width: 200,
  },
  {
    field: 'ticket_subject',
    headerName: 'Asunto',
    width: 200,
  },
  {
    field: 'ticket_body',
    headerName: 'Cuerpo',
    renderCell: (params: GridValueGetterParams) => {
      const { ticket_body } = params.row;
      return <p dangerouslySetInnerHTML={{ __html: ticket_body }}></p>;
    },
    width: 300,
  },
  // {
  //   field: 'ticket_created_at.value',
  //   headerName: 'Fecha de Creación de Ticket',
  // },
  // {
  //   field: 'ticket_updated_at.value',
  //   headerName: 'Fecha de Actualización de Ticket',
  // },
  {
    field: 'user_email',
    headerName: 'Email solicitante',
  },
  {
    field: 'assigned_to_full_name',
    headerName: 'Asignado a',
  },
  {
    field: 'assigned_to_email',
    headerName: 'Email asignado a',
  },
  {
    field: 'ticket_category_id',
    headerName: 'ID Categoría',
    width: 10,
  },
  {
    field: 'category_slug',
    headerName: 'Slug Categoría',
  },
  {
    field: 'category_code',
    headerName: 'Código Categoría',
  },
  {
    field: 'category_name',
    headerName: 'Categoría',
  },
  // {
  //   field: 'category_in_charged_of_id',
  //   headerName: 'ID de Encargado de Categoría',
  // },
  // {
  //   field: 'in_charged_of_avatar',
  //   headerName: 'Avatar de Encargado de Categoría',
  // },
  // {
  //   field: 'in_charged_of_full_name',
  //   headerName: 'Nombre Completo de Encargado de Categoría',
  // },
  // {
  //   field: 'in_charged_of_email',
  //   headerName: 'Correo Electrónico de Encargado de Categoría',
  // },
  // {
  //   field: 'in_charged_of_job_title',
  //   headerName: 'Cargo de Encargado de Categoría',
  // },
  // {
  //   field: 'category_group_id',
  //   headerName: 'ID de Grupo de Categoría',
  // },
  // {
  //   field: 'category_group_level',
  //   headerName: 'Nivel de Grupo de Categoría',
  // },
  // {
  //   field: 'category_group_level_name',
  //   headerName: 'Nombre de Nivel de Grupo de Categoría',
  // },
  // {
  //   field: 'category_group_slug',
  //   headerName: 'Slug de Grupo de Categoría',
  // },
  // {
  //   field: 'category_group_name',
  //   headerName: 'Nombre de Grupo de Categoría',
  // },
  // {
  //   field: 'category_group_parent_id',
  //   headerName: 'ID de Grupo Padre de Categoría',
  // },
  // {
  //   field: 'category_group_parent_name',
  //   headerName: 'Nombre de Grupo Padre de Categoría',
  // },
  // {
  //   field: 'category_group_parent_level_name',
  //   headerName: 'Nombre de Nivel de Grupo Padre de Categoría',
  // },
  // {
  //   field: 'ticket_assigned_to_id',
  //   headerName: 'ID de Asignado a Ticket',
  // },
  {
    field: 'ticket_group_id',
    headerName: 'ID Grupo',
  },
  {
    field: 'group_level',
    headerName: 'Nivel de Grupo',
  },
  {
    field: 'group_level_name',
    headerName: 'Nombre de Nivel de Grupo',
  },
  {
    field: 'group_name',
    headerName: 'Grupo',
  },
  {
    field: 'group_parent_id',
    headerName: 'ID Grupo Padre',
  },
  {
    field: 'group_parent_name',
    headerName: 'Grupo Pagre',
  },
  {
    field: 'group_parent_level_name',
    headerName: 'Nivel Grupo Padre',
  },
  {
    field: 'ticket_requester_id',
    headerName: 'ID Solicitante',
  },
  {
    field: 'user_full_name',
    headerName: 'Solicitante',
  },
];

const Tickets: FC<{
  tableProps: DataGridPremiumProps<any>;
}> = ({ tableProps }) => {
  return (
    <DataGridPremium
      {...tableProps}
      columns={tableColumns}
      getRowId={(row) => row.ticket_id}
    />
  );
};

export default Tickets;
