import { useApiAuth } from 'src/hooks';
import AdministrationEdit from 'src/components/Administration/Edit';
import ParticipantAddressForm from './UsersForm';
import { TextsType } from 'src/components/Administration/Router';
import { EditSubject as EditSubjectType, User } from 'src/utils/types';

function EditUser({
  onUpdateSuccess,
  texts,
}: {
  onUpdateSuccess: (message: string) => void;
  texts: TextsType;
}) {
  const { get, put } = useApiAuth();
  async function loadUsers(id: string) {
    const user = await get<User>(`/users/${id}`);
    const editUser: EditSubjectType = {
      ...user,
    };
    return editUser;
  }

  async function updateUser(subject: any, id: string) {
    await put(`/users/${id}`, {
      ...subject,
    });
  }

  return (
    <AdministrationEdit
      onUpdateSuccess={onUpdateSuccess}
      updateEntity={updateUser}
      loadEntity={loadUsers}
      renderForm={(formProps) => (
        <ParticipantAddressForm {...formProps} texts={texts} sendJustChanged />
      )}
      successMessage="Materia actualizada"
    />
  );
}

export default EditUser;
