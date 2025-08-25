// src/components/CopyItem.jsx
import React, { useState, useCallback } from 'react';

const CopyItem = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <div className="copy-item">
      <p>{text}</p>
      <button 
        onClick={handleCopy} 
        className={`copy-button ${copied ? 'copied' : ''}`}
      >
        {copied ? 'Copiado!' : 'Copiar'}
      </button>
    </div>
  );
};

export default React.memo(CopyItem);