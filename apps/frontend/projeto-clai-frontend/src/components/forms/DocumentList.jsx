import "./FormControls.css";

export default function DocumentosLista({ documentos, onChange }) {
  
  const handleAdicionar = () => {
    const novoDocumento = { descricao: "", data: "", profissional: "" };
    onChange([...documentos, novoDocumento]);
  };

  const handleChangeCampo = (index, campo, valor) => {
    const novaLista = [...documentos];
    novaLista[index] = { ...novaLista[index], [campo]: valor };
    onChange(novaLista);
  };

  // Remove um item da lista pelo seu índice
  const handleRemover = (indexParaRemover) => {
    const novaLista = documentos.filter((_, index) => index !== indexParaRemover);
    onChange(novaLista);
  };

  return (
    <fieldset className="form-section documentos-lista-container">
      <legend>Documentos Associados</legend>
      <span className="section-desc">
        Adicione os laudos, atestados ou relatórios relacionados.
      </span>

      {documentos.map((doc, index) => (
        <div key={index} className="documento-item-card" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
          
          <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4>Documento #{index + 1}</h4>
            <button 
              type="button" 
              onClick={() => handleRemover(index)}
              style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Remover este documento
            </button>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Descrição do Documento *</label>
              <input
                type="text"
                placeholder="Ex.: Laudo A"
                value={doc.descricao}
                onChange={(e) => handleChangeCampo(index, "descricao", e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Data do Documento *</label>
              <input
                type="date"
                value={doc.data}
                onChange={(e) => handleChangeCampo(index, "data", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Profissional Responsável *</label>
              <input
                type="text"
                placeholder="Ex.: Dr. Roberto"
                value={doc.profissional}
                onChange={(e) => handleChangeCampo(index, "profissional", e.target.value)}
                required
              />
            </div>
          </div>
          
        </div>
      ))}

      <button 
        type="button" 
        className="btn-add" 
        onClick={handleAdicionar}
        style={{ marginTop: '8px' }}
      >
        + Adicionar Documento
      </button>
    </fieldset>
  );
}