import AdministrationNewEntity from 'src/components/Administration/NewEntity';
import SubjectForm from './SubjectForm';
import { useApiAuth } from 'src/hooks';
import { TextsType } from 'src/components/Administration/Router';

function NewSubject({
  onSubjectCreated,
  baseUrl,
  texts,
}: {
  onSubjectCreated: (message: string) => void;
  baseUrl: string;
  texts: TextsType;
}) {
  const { post } = useApiAuth();

  async function createSubject(values: any) {
    await post('/subjects', {
      ...values,
    });
  }

  return (
    <>
      <AdministrationNewEntity
        baseUrl={baseUrl}
        createEntity={createSubject}
        onCreateSuccess={onSubjectCreated}
        successMessage="Materia creada"
        renderForm={(formProps) => <SubjectForm {...formProps} texts={texts} />}
        texts={texts}
      />
    </>
  );
}

export default NewSubject;
