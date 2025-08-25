// src/services/copywritingService.js

// Importa todos os nossos bancos de dados JSON
import headlines from '../data/headlines.json';
import subHeadlines from '../data/sub-headlines.json';
import bulletPoints from '../data/bullet-points.json';
import ctas from '../data/ctas.json';
import emailSubjects from '../data/email-subjects.json';
import hooks from '../data/hooks.json';
import promises from '../data/promises.json';

// Define os tipos de copy e associa aos dados importados
const copyTypes = {
  "Headlines": headlines,
  "Sub-headlines": subHeadlines,
  "Bullet Points": bulletPoints,
  "CTAs": ctas,
  "Email Subjects": emailSubjects,
  "Hooks": hooks,
  "Promises": promises,
};

// Adiciona o tipo a cada objeto de copy para podermos filtrar depois
const allModels = Object.entries(copyTypes).flatMap(([type, models]) => 
  models.map(model => ({ ...model, type }))
);

// Extrai todos os nichos únicos de todos os modelos para o nosso dropdown
const allNiches = [...new Set(allModels.flatMap(model => model.niches))];
// Garante que 'generic' não apareça como opção, pois é um fallback
const availableNiches = allNiches.filter(niche => niche !== 'generic').sort();


export const getCopyModels = () => allModels;
export const getAvailableTechniques = () => Object.keys(copyTypes);
export const getAvailableNiches = () => availableNiches;