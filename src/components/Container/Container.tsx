import React, { FC } from "react";
import "./Container.css";
import { Link } from "react-router-dom";

const Container: FC = () => {
  return (
    <div className="container">
      <div className="content-overlay">
        <h1>Geração de Dados de Teste Autênticos para o Desenvolvimento.</h1>
        <p>
           Chega de dados de teste manuais e demorados. A DataForge API gera dados de teste realistas e fictícios para o seu desenvolvimento.
            Tudo com um simples JSON, para você focar no que realmente importa: o seu código.
        </p>

        <div className="code-box">
          <span> $ dataforge</span> --schema schema.json --count 10
        </div>

        <div className="buttons">
          <Link to="/started" className="btn">Começar</Link>

        </div>
      </div>
    </div>
  );
};

export default Container;
