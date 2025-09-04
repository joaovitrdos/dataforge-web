import React, { useState } from 'react';
import { FaRegClipboard, FaCheck } from 'react-icons/fa';
import './CopyButton.css'; // Ou dentro do seu Started.css

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <button className="copy-button" onClick={handleCopy} title="Copiar conteúdo">
      {copied ? <FaCheck /> : <FaRegClipboard />}
    </button>
  );
};

export default CopyButton;
