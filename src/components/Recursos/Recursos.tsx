import React, { FC } from "react";
import "./Recursos.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Recursos: FC = () => {

  const codeString = `{
  "name": "Lucas Andrade",
  "email": "lucas.andrade@example.com",
  "cpf": "012.345.678-90",
  "phone": "(11) 91234-5678",
  "address": {
    "street": "Rua das Flores",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": "01310-000"
  }
}`;
  

  return (
    <section className="recursos-container">
      {/* Lado esquerdo: Lista de recursos */}
      <div className="recursos-lista">
        <div className="recurso-item">
          <div className="titulo">Geração de Dados Pessoais</div>
          <div className="descricao">Crie nomes completos, e-mails, telefones, CPFs e CNPJs realistas para usuários fictícios.</div>
        </div>

        <div className="recurso-item">
          <div className="titulo">Dados de Localização</div>
          <div className="descricao">Gere endereços, cidades, estados, CEPs e coordenadas geográficas (latitude e longitude).</div>
        </div>

        <div className="recurso-item">
          <div className="titulo">Dados Financeiros e de Produto</div>
          <div className="descricao">Crie valores monetários, nomes de produtos, códigos de barras e outros dados comerciais.</div>
        </div>

        <div className="recurso-item">
          <div className="titulo">Tipos de Dados Especiais</div>
          <div className="descricao">Inclua UUIDs, valores booleanos, e-mails e senhas geradas aleatoriamente.</div>
        </div>

        <div className="recurso-item">
          <div className="titulo">Dados Customizáveis</div>
          <div className="descricao">Defina ranges numéricos e listas de valores para dados que se encaixam no seu sistema.</div>
        </div>
      </div>

      {/* Lado direito: Bloco de código JSON */}
      <div className="codigo-json">
      <SyntaxHighlighter language="json" style={nord} showLineNumbers={true}>
        {codeString}
      </SyntaxHighlighter>
    </div>
    </section>
  );
};

export default Recursos;
