import AdministrationComponent from '../../../components/Administration/Router';
import LevelsTable from './UsersTable';
import NewLevel from './NewUser';
import User from './User';
import EditLevel from './EditUser';

const ParticipantsAddresses = () => {
  return (
    <AdministrationComponent
      renderTable={() => <LevelsTable />}
      renderEditEntity={(onSuccess, texts) => (
        <EditLevel onUpdateSuccess={onSuccess} texts={texts} />
      )}
      renderEntity={(onDeleteSuccess, texts) => (
        <User onDeleteSuccess={onDeleteSuccess} texts={texts} />
      )}
      renderNewEntity={(onCreated, baseUrl, texts) => (
        <NewLevel onLevelCreated={onCreated} baseUrl={baseUrl} texts={texts} />
      )}
      texts={{
        gender: 'm',
        entity: 'Usuario',
        entityPlural: 'Usuarios',
        administrationName: 'Usuarios',
        newEntity: 'Crear Usuario',
        editEntity: 'Editar Usuario',
      }}
    />
  );
};

export default ParticipantsAddresses;
