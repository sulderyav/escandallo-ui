import { useApiAuth } from 'src/hooks';
import AdministrationEdit from 'src/components/Administration/Edit';
import ParticipantAddressForm from './SubjectForm';
import { TextsType } from 'src/components/Administration/Router';
import { EditSubject as EditSubjectType, Subject } from 'src/utils/types';

function EditSubject({
  onUpdateSuccess,
  texts,
}: {
  onUpdateSuccess: (message: string) => void;
  texts: TextsType;
}) {
  const { get, put } = useApiAuth();
  async function loadSubjects(id: string) {
    const subject = await get<Subject>(`/subjects/${id}`);
    const editSubject: EditSubjectType = {
      id: subject.id,
      name: subject.name,
    };
    return editSubject;
  }

  async function updateSubject(subject: any, id: string) {
    await put(`/subject/${id}`, {
      ...subject,
    });
  }

  return (
    <AdministrationEdit
      onUpdateSuccess={onUpdateSuccess}
      updateEntity={updateSubject}
      loadEntity={loadSubjects}
      renderForm={(formProps) => (
        <ParticipantAddressForm {...formProps} texts={texts} sendJustChanged />
      )}
      successMessage="Materia actualizada"
    />
  );
}

export default EditSubject;
