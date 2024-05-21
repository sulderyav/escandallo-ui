import { useApiAuth } from 'src/hooks';
import AdministrationEdit from 'src/components/Administration/Edit';
import ParticipantAddressForm from './UsersForm';
import { TextsType } from 'src/components/Administration/Router';
import { EditUser as EditUserType, User } from 'src/utils/types';

function EditUser({
  onUpdateSuccess,
  texts,
}: {
  onUpdateSuccess: (message: string) => void;
  texts: TextsType;
}) {
  const { get, put } = useApiAuth();
  async function loadUser(id: string) {
    const user = await get<User>(`/users/${id}`);
    const editUser: EditUserType = {
      ...user,
      roleIds: user.roles.map((role) => role.id),
      levelIds: user.levels.map((level) => level.id),
      password: '',
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
      loadEntity={loadUser}
      renderForm={(formProps) => (
        <ParticipantAddressForm {...formProps} texts={texts} sendJustChanged />
      )}
      successMessage="Usuario actualizado"
    />
  );
}

export default EditUser;
