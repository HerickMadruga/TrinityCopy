// src/App.jsx
import React, { useState, useMemo } from 'react';
// --- 1. IMPORTANDO A LOGO ---
// Importamos a imagem como se fosse um componente. O Vite vai cuidar do resto.
import logoTrinity from './assets/logot.png'; 
import { getCopyModels, getAvailableTechniques, getAvailableNiches } from './services/copywritingService';
import FilterButtons from './components/FilterButtons';
import CopyItem from './components/CopyItem';
import './App.css';

const allModels = getCopyModels();
const techniques = getAvailableTechniques();
const niches = getAvailableNiches();

function App() {
  const [selectedTechnique, setSelectedTechnique] = useState(techniques[0]);
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModels = useMemo(() => {
    return allModels.filter(model => {
      const techniqueMatch = model.type === selectedTechnique;
      const nicheMatch = selectedNiche === 'all' || model.niches.includes(selectedNiche) || model.niches.includes('generic');
      const searchMatch = searchTerm === '' || model.text.toLowerCase().includes(searchTerm.toLowerCase());
      return techniqueMatch && nicheMatch && searchMatch;
    });
  }, [selectedTechnique, selectedNiche, searchTerm]);

  return (
    <div className="App">
      <header>
        {/* --- 2. ADICIONANDO A IMAGEM ---
            Colocamos a tag <img> aqui. O `src` usa a variável que importamos.
            O `alt` é muito importante para acessibilidade. */}
        <img src={logoTrinity} alt="Logo da Trinity" className="app-logo" />

        <h1>Trinity <span>Ultimate Copy Engine</span></h1>
        <p>A ferramenta definitiva para encontrar a copy perfeita para qualquer nicho.</p>
      </header>

      {/* O resto do seu componente continua igual... */}
      <div className="filters-container">
        <div className="search-and-niche">
          <input
            type="text"
            placeholder="Pesquisar por palavras-chave..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="niche-select"
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
          >
            <option value="all">Todos os Nichos</option>
            {niches.map(niche => (
              <option key={niche} value={niche}>
                {niche.charAt(0).toUpperCase() + niche.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <FilterButtons
          items={techniques}
          selectedItem={selectedTechnique}
          onSelectItem={setSelectedTechnique}
          classNamePrefix="technique"
        />
      </div>

      <main>
        <p className="results-header">
          Exibindo {filteredModels.length} modelos para "{selectedTechnique}"
          {selectedNiche !== 'all' && ` no nicho de ${selectedNiche.charAt(0).toUpperCase() + selectedNiche.slice(1)}`}
        </p>
        <div className="copy-list">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <CopyItem key={model.id} text={model.text} />
            ))
          ) : (
            <p>Nenhum modelo encontrado. Tente refinar sua busca.</p>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Trinity. Todos os direitos reservados.</p>
        <p>&copy; Feito por @herick_madruga. </p>
      </footer>
    </div>
  );
}

export default App;