import AdministrationComponent from '../../../components/Administration/Router';
import SubjectsTable from './SubjectsTable';
import NewSubject from './NewSubject';
import Subject from './Subject';
import EditSubject from './EditSubject';

const ParticipantsAddresses = () => {
  return (
    <AdministrationComponent
      renderTable={() => <SubjectsTable />}
      renderEditEntity={(onSuccess, texts) => (
        <EditSubject onUpdateSuccess={onSuccess} texts={texts} />
      )}
      renderEntity={(onDeleteSuccess, texts) => (
        <Subject onDeleteSuccess={onDeleteSuccess} texts={texts} />
      )}
      renderNewEntity={(onCreated, baseUrl, texts) => (
        <NewSubject
          onSubjectCreated={onCreated}
          baseUrl={baseUrl}
          texts={texts}
        />
      )}
      texts={{
        gender: 'f',
        entity: 'Materia',
        entityPlural: 'Materias',
        administrationName: 'Materias',
        newEntity: 'Crear Materia',
        editEntity: 'Editar Materia',
      }}
    />
  );
};

export default ParticipantsAddresses;
