import AdministrationNewEntity from 'src/components/Administration/NewEntity';
import SubjectForm from './UsersForm';
import { useApiAuth } from 'src/hooks';
import { TextsType } from 'src/components/Administration/Router';

function NewUser({
  onUserCreated,
  baseUrl,
  texts,
}: {
  onUserCreated: (message: string) => void;
  baseUrl: string;
  texts: TextsType;
}) {
  const { post } = useApiAuth();

  async function createUser(values: any) {
    await post('/users', {
      ...values,
    });
  }

  return (
    <>
      <AdministrationNewEntity
        baseUrl={baseUrl}
        createEntity={createUser}
        onCreateSuccess={onUserCreated}
        successMessage="Usuario creado"
        renderForm={(formProps) => <SubjectForm {...formProps} texts={texts} />}
        texts={texts}
      />
    </>
  );
}

export default NewUser;
