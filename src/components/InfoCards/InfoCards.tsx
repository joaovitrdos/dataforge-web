import React, { FC } from "react";
import "./InfoCards.css";

const InfoCards: FC = () => {
  return (
    <div className="info-cards">
      <div className="info-card">
        <div className="icon">&#x3C;/&#x3E;</div>
        <p>
          Diga adeus aos dados de teste manuais. Com um JSON simples, nossa API entrega dados completos e realistas,
          <span className="highlight"> prontos para uso em seu projeto.</span>
        </p>
      </div>

      <div className="info-card">
        <div className="icon">&#x2693;</div>
        <p>
          Gere dados para usuários, produtos, pedidos e mais. Nossa API oferece suporte a diversos tipos de dados, 
          como nomes, CPFs, endereços e até dados financeiros.
        </p>
      </div>

      <div className="info-card">
        <div className="icon">&#x1F6E1;</div>
        <p>
          Evite o uso de dados de produção sensíveis em ambientes de desenvolvimento e teste. Crie cenários de teste realistas
          <span className="highlight"> e confiáveis sem comprometer a segurança.</span>
        </p>
      </div>
    </div>
  );
};

export default InfoCards;
