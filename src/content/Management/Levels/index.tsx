import AdministrationComponent from '../../../components/Administration/Router';
import LevelsTable from './LevelsTable';
import NewLevel from './NewLevel';
import Level from './Level';
import EditLevel from './EditLevel';

const ParticipantsAddresses = () => {
  return (
    <AdministrationComponent
      renderTable={() => <LevelsTable />}
      renderEditEntity={(onSuccess, texts) => (
        <EditLevel onUpdateSuccess={onSuccess} texts={texts} />
      )}
      renderEntity={(onDeleteSuccess, texts) => (
        <Level onDeleteSuccess={onDeleteSuccess} texts={texts} />
      )}
      renderNewEntity={(onCreated, baseUrl, texts) => (
        <NewLevel onLevelCreated={onCreated} baseUrl={baseUrl} texts={texts} />
      )}
      texts={{
        gender: 'm',
        entity: 'Nivel',
        entityPlural: 'Niveles',
        administrationName: 'Niveles',
        newEntity: 'Crear Nivel',
        editEntity: 'Editar Nivel',
      }}
    />
  );
};

export default ParticipantsAddresses;
