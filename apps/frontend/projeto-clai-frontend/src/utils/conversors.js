export function stringParaArray (str){
  if (!str) return [];
  return String(str).split(',').map(item => item.trim()).filter(item => item !== "");
};

export function extrairListaCondicional (condicao, valorStr){
    return condicao === "sim" ? stringParaArray(valorStr) : [];
};

/**
 * Converte uma string do formulário para o formato de Enum do Java.
 * Ex: "Libras/intérprete" -> "LIBRAS_INTERPRETE"
 */
export function stringParaEnum(valor) {
  if (!valor) return null;
  return valor
    .trim()
    .normalize("NFD") // Separa os caracteres dos acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .replace(/[\s/]+/g, "_") // Substitui espaços e barras por underline
    .toUpperCase();
}

export function adaptarListaParaEnums(lista) {
  if (!Array.isArray(lista)) return [];

  return lista
    .filter(item => item && item.toLowerCase() !== "outro") // Remove a opção "Outro" da lista de enums
    .map(item => stringParaEnum(item));
}



export function formatarParaYYYYMMDD(dataInput) {
  if (!dataInput) return null;

  // 1. Se já for um objeto Date válido
  if (dataInput instanceof Date) {
    if (isNaN(dataInput.getTime())) return null; 
    
    const ano = dataInput.getFullYear();
    const mes = String(dataInput.getMonth() + 1).padStart(2, '0');
    const dia = String(dataInput.getDate()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
  }

  // 2. Se for String, limpamos os espaços em branco
  const str = String(dataInput).trim();

  // 2.1. Se já está no formato YYYY-MM-DD (ou ISO completo YYYY-MM-DDTHH:mm:ss)
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.substring(0, 10);
  }

  // 2.2. Se vier no formato brasileiro DD/MM/YYYY ou DD-MM-YYYY
  if (/^\d{2}[/-]\d{2}[/-]\d{4}$/.test(str)) {
    // Quebra a string usando a barra ou o traço como separador
    const partes = str.split(/[/-]/);
    // partes[0] = DD, partes[1] = MM, partes[2] = YYYY
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  // 3. Fallback: Tenta converter outras strings genéricas (ex: "Oct 29, 2026")
  const parsedDate = new Date(str);
  if (!isNaN(parsedDate.getTime())) {
    const ano = parsedDate.getFullYear();
    const mes = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const dia = String(parsedDate.getDate()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
  }

  // Retorna null se for um formato completamente desconhecido
  return null;
}


