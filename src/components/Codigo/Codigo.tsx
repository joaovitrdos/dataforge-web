import React, { FC } from "react";
import "./Codigo.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Codigo: FC = () => {

  const codeRequest = `{
  "schema": {
    "user": {
      "name": "full_name",
      "email": "email_address",
      "cpf": "cpf"
    }
  },
  "count": 2
}`;
  
   const codeResponse = `{ 
  "data": [
    { 
        "name": "João Santos", 
        "email": "joao@example.com", 
        "cpf": "123.456.789-00" 
     },

    { 
        "name": "Maria Silva", 
        "email": "maria@example.com", 
        "cpf": "987.654.321-00" }
  ]
}`;

  return (
    <div className="codigo-container">
    <section className="Codigo-request">
      
      {/* Lado direito: Bloco de código JSON */}

      <h1>Request</h1>
      <div className="codigo-json">
      <SyntaxHighlighter language="json" style={nord} showLineNumbers={true}>
        {codeRequest}
      </SyntaxHighlighter>
    </div>
    <p className="p"><span>schema </span> → define quais campos e tipos gerar</p>
    <p className="p"><span>count </span>→ quantidade de registros a gerar</p>

    </section>
<div className="codigo-separator"></div>
    <section className="Codigo-response">
      
      {/* Lado direito: Bloco de código JSON */}

      <h1>Response</h1>
      <div className="codigo-json">
      <SyntaxHighlighter language="json" style={nord} showLineNumbers={true}>
        {codeResponse}
      </SyntaxHighlighter>
    </div>
    <p className="p"><span>data</span> → é uma lista de registros</p>
    </section>
    </div>
  );
};

export default Codigo;
