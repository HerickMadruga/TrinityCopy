// src/App.jsx

import React, { useState, useMemo } from 'react';
import { getCopyModels, getAvailableTechniques, getAvailableNiches } from './services/copywritingService';
import FilterButtons from './components/FilterButtons';
import CopyItem from './components/CopyItem';
import logoTrinity from './assets/logot.png';
import './App.css';

const allModels = getCopyModels();
const techniques = getAvailableTechniques();
const niches = getAvailableNiches();

function App() {
  const [selectedTechnique, setSelectedTechnique] = useState(techniques[0]);
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTechniqueChange = (technique) => {
    setSelectedTechnique(technique);
    setSelectedNiche('all');
    setSearchTerm('');
  };

  const filteredModels = useMemo(() => {
    return allModels.filter(model => {
      const techniqueMatch = model.type === selectedTechnique;

      // --- A CORREÇÃO ESTÁ AQUI ---
      // Removemos a parte '|| model.niches.includes('generic')' que causava o bug.
      // Agora a lógica é simples e correta: o nicho bate se for 'todos' OU
      // se o nicho selecionado estiver na lista de nichos do modelo.
      const nicheMatch = selectedNiche === 'all' || model.niches.includes(selectedNiche);

      const searchMatch = model.text.toLowerCase().includes(searchTerm.toLowerCase());
      
      return techniqueMatch && nicheMatch && searchMatch;
    });
  }, [selectedTechnique, selectedNiche, searchTerm]);

  return (
    <div className="App">
      <header>
        <img src={logoTrinity} alt="Logo da Trinity" className="app-logo" />
        <h1>Trinity <span>Ultimate Copy Engine</span></h1>
        <p>A ferramenta definitiva para encontrar a copy perfeita para qualquer nicho.</p>
      </header>

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
          onSelectItem={handleTechniqueChange}
          classNamePrefix="technique"
        />
      </div>

      <main>
        <p className="results-header">
          Exibindo {filteredModels.length} modelos para "{selectedTechnique}"
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
        <p>&copy; {new Date().getFullYear()} Trinity. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;