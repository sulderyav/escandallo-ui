import AdministrationNewEntity from 'src/components/Administration/NewEntity';
import SubjectForm from './UsersForm';
import { useApiAuth } from 'src/hooks';
import { TextsType } from 'src/components/Administration/Router';

function NewLevel({
  onLevelCreated,
  baseUrl,
  texts,
}: {
  onLevelCreated: (message: string) => void;
  baseUrl: string;
  texts: TextsType;
}) {
  const { post } = useApiAuth();

  async function createLevel(values: any) {
    await post('/levels', {
      ...values,
    });
  }

  return (
    <>
      <AdministrationNewEntity
        baseUrl={baseUrl}
        createEntity={createLevel}
        onCreateSuccess={onLevelCreated}
        successMessage="Nivel creado"
        renderForm={(formProps) => <SubjectForm {...formProps} texts={texts} />}
        texts={texts}
      />
    </>
  );
}

export default NewLevel;
