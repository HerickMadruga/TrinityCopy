// src/services/copywritingService.js

// 1. Importamos os dados brutos de cada arquivo JSON.
import headlinesData from '../data/headlines.json';
import subHeadlinesData from '../data/sub-headlines.json';
import bulletPointsData from '../data/bullet-points.json';
import ctasData from '../data/ctas.json';
import emailSubjectsData from '../data/email-subjects.json';
import hooksData from '../data/hooks.json';
import promisesData from '../data/promises.json';

// Função de verificação para garantir que os arquivos foram carregados
function checkData(data, fileName) {
  if (!data || !Array.isArray(data)) {
    // ESTE LOG VAI TE AJUDAR A ACHAR ERROS DE NOME DE ARQUIVO!
    console.error(`ERRO FATAL: O arquivo '${fileName}' não foi carregado corretamente. Verifique se o nome do arquivo está EXATAMENTE correto em 'src/data/' e se o conteúdo é um JSON válido.`);
    return []; // Retorna um array vazio para não quebrar a aplicação
  }
  console.log(`[Serviço de Dados] Sucesso: ${data.length} modelos carregados de ${fileName}`);
  return data;
}

// 2. Definimos um "mapa" das nossas categorias, verificando cada arquivo.
const copyTypesMap = {
  "Headlines": checkData(headlinesData, 'headlines.json'),
  "Sub-headlines": checkData(subHeadlinesData, 'sub-headlines.json'),
  "Bullet Points": checkData(bulletPointsData, 'bullet-points.json'),
  "CTAs": checkData(ctasData, 'ctas.json'),
  "Email Subjects": checkData(emailSubjectsData, 'email-subjects.json'),
  "Hooks": checkData(hooksData, 'hooks.json'),
  "Promises": checkData(promisesData, 'promises.json'),
};

// 3. Criamos um grande array com TODOS os modelos, adicionando a propriedade "type" a cada um.
const allModels = Object.entries(copyTypesMap).flatMap(([techniqueName, models]) => {
  return models.map(model => ({
    ...model,
    type: techniqueName 
  }));
});
console.log(`[Serviço de Dados] Array 'allModels' criado com sucesso. Total: ${allModels.length} modelos.`);

// 4. Extraímos as categorias e nichos disponíveis para os filtros.
const availableTechniques = Object.keys(copyTypesMap);
const allNiches = [...new Set(allModels.flatMap(model => model.niches))];
const availableNiches = allNiches.filter(niche => niche !== 'generic').sort();

// 5. Exportamos as funções que o App.jsx usará.
export const getCopyModels = () => allModels;
export const getAvailableTechniques = () => availableTechniques;
export const getAvailableNiches = () => availableNiches;