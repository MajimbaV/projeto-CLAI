import { useState } from "react";

import CursoForm from "./CursoForm";
import { postCurso } from "../../../services/CursoServiceMock";

function CreateCursoPage() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(data) {
    setIsPending(true);

    try {
      await postCurso(data);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <CursoForm onSubmit={handleSubmit} isPending={isPending} mode="create" />
  );
}

export default CreateCursoPage;
