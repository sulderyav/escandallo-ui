export const parseJobTitleIntoJob = (jobProfile: string): string => {
  switch (jobProfile) {
    case 'SUPER ADMIN':
      return 'SUPER_ADMIN';
    case 'ADMIN':
      return 'Administrador';
    case 'AGENT':
      return 'Agente';
    case 'WATCHER':
      return 'Observador';
    default:
      return 'Colaborador';
  }
};
