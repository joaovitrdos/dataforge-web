import React, { useState } from 'react';
import './Started.css';
import { FaTrash } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './../../components/CopyButton/CopyButton.tsx'; // ajuste o caminho conforme necessário


interface Campo {
  chave: string;
  valor: string;
}

interface DataForgeResponse {
  data: Record<string, any>[];
}

const tiposDisponiveis = [
  "nome_completo", "email", "telefone", "cpf", "cnpj",
  "cargo", "empresa", "universidade", "ocupacao",
  "endereco", "cidade", "estado", "cep", "latitude", "longitude",
  "pais", "estado_sigla", "fuso_horario", "nome_rua", "numero_predio", "prefixo_cidade",
  "uuid", "booleano", "valor_monetario", "preco", "cartao_credito", "moeda",
  "data_passada", "data_futura", "timestamp", "data_nascimento", "mes", "ano", "dia_da_semana",
  "url", "dominio", "ip", "http_status",
  "inteiro:1-100", "enum:val1,val2", "texto:5-50"
];

const Started: React.FC = () => {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [novoCampo, setNovoCampo] = useState('');
  const [novoTipo, setNovoTipo] = useState('');
  const [count, setCount] = useState<number>(1);
  const [data, setData] = useState<DataForgeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdicionarCampo = () => {
    if (novoCampo && novoTipo) {
      setCampos([...campos, { chave: novoCampo, valor: novoTipo }]);
      setNovoCampo('');
      setNovoTipo('');
    }
  };

  const handleRemoverCampo = (index: number) => {
    setCampos(campos.filter((_, i) => i !== index));
  };

  const schemaGerado = campos.reduce<Record<string, string>>((acc, campo) => {
    acc[campo.chave] = campo.valor;
    return acc;
  }, {});

  const handleSubmit = async () => {
  setLoading(true);
  setError(null);
  setData(null);

  try {
    const requestBody = {
      schema: { user: schemaGerado }, // camada "user"
      count: count
    };

    const response = await fetch('https://dataforgeapi.up.railway.app/api/dataforge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição da API: ${response.status} ${response.statusText}`);
    }

    const responseData: DataForgeResponse = await response.json();
    setData(responseData);
  } catch (err: any) {
    console.error(err);
    setError(err.message || 'Erro desconhecido');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="started-container">
      <div className="criador-schema">
        <h2>Modele seu Objeto de Dados</h2>
        <p>Defina a estrutura e os tipos de dados que sua API precisa.</p>

        <div className="grupo-input">
          <input
            type="text"
            placeholder="Nome do Campo "
            value={novoCampo}
            onChange={(e) => setNovoCampo(e.target.value)}
          />
          <select
            value={novoTipo}
            onChange={(e) => setNovoTipo(e.target.value)}
          >
            <option value="" disabled>Tipo de Dado</option>
            {tiposDisponiveis.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
          <button onClick={handleAdicionarCampo}>Adicionar Campo</button>
        </div>

        <div className="lista-campos">
          <label htmlFor="count">Campos:</label>
          {campos.map((campo, index) => (
            <div key={index} className="item-campo">
              <span className="chave-campo">{campo.chave}</span>
              <span className="valor-campo">{campo.valor}</span>
              <button
                onClick={() => handleRemoverCampo(index)}
                title="Remover campo"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="controles-api">
          <label htmlFor="count">Quantidade:</label>
          <input
            id="count"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={1}
            max={100}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || campos.length === 0}
          >
            {loading ? 'Gerando...' : 'Gerar Dados'}
          </button>
        </div>
      </div>

      <h3>Preview do Schema JSON</h3>
      <div className="visualizacao-schema">
         <CopyButton textToCopy={JSON.stringify(schemaGerado, null, 2)} />
  <SyntaxHighlighter language="json" style={nord} showLineNumbers={true}>
    {JSON.stringify(schemaGerado, null, 2)}
  </SyntaxHighlighter>
</div>

      {error && <div className="error-message">Erro: {error}</div>}

      {data && (
        <div>
          <h3>Dados Gerados</h3>
          <div className="dados-gerados">
             <CopyButton textToCopy={JSON.stringify(schemaGerado, null, 2)} />
            <SyntaxHighlighter language="json" style={nord} showLineNumbers={true}>
      {JSON.stringify(data, null, 2)}
    </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

export default Started;

