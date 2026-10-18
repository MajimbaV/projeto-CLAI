import AlunoForm from "./AlunoForm";

function CreateAlunoPage() {
  function handleCreate(payload) {
    console.log("Novo aluno (mock):", payload);
  }

  return (
    <AlunoForm
      mode="create"
      onSubmit={handleCreate}
      isPending={false}
      isLoading={false}
      error={null}
    />
  );
}

export default CreateAlunoPage;