import { useApiAuth } from 'src/hooks';
import AdministrationEdit from 'src/components/Administration/Edit';
import ParticipantAddressForm from './LevelForm';
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
      ...subject,
    };
    return editSubject;
  }

  async function updateSubject(subject: any, id: string) {
    await put(`/subjects/${id}`, {
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
