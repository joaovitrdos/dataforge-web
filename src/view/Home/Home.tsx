import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Home.css';

const codeRequest = `{
  "tableName": "usuarios",
  "fields": [
    { "name": "nome",  "type": "nome_completo" },
    { "name": "email", "type": "email" },
    { "name": "cpf",   "type": "cpf" }
  ],
  "count": 2
}`;

const codeResponse = `{
  "tableName": "usuarios",
  "data": [
    { "nome": "João Santos", "email": "joao@example.com", "cpf": "123.456.789-00" },
    { "nome": "Maria Silva", "email": "maria@example.com", "cpf": "987.654.321-00" }
  ],
  "sql": "INSERT INTO usuarios (nome, email, cpf) VALUES\\n  ('João Santos', ...);"
}`;

const codeRecursos = `{
  "nome": "Lucas Andrade",
  "email": "lucas.andrade@example.com",
  "cpf": "012.345.678-90",
  "telefone": "(11) 91234-5678",
  "endereco": {
    "rua": "Rua das Flores",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-000"
  }
}`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className={`copy-btn${copied ? ' copy-btn--copied' : ''}`} onClick={handleCopy} title="Copiar código">
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  );

}
function Home() {
  return (
    <div className="home-page">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          API de dados de teste
        </div>

        <h1>
          Geração de Dados de Teste<br />
          <span className="highlight">Autênticos</span> para o Desenvolvimento.
        </h1>

        <p>
          Chega de dados manuais. A DataForge gera dados fictícios e realistas
          em JSON e SQL, para você focar no que importa: o seu código.
        </p>

        <div className="hero-code">
          <span>$</span> dataforge schema.json data
        </div>

        <div className="hero-buttons">
          <Link to="/started" className="btn-primary">Começar agora</Link>
          <a
            href="https://github.com/joaovitrdos/dataforge-api"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FontAwesomeIcon icon={faGithub} /> Ver no GitHub
          </a>
        </div>
      </section>

      {/* ── Info Cards ───────────────────────────────── */}
      <section className="info-section">
        <span className="section-label">Por que usar DataForge?</span>
        <div className="info-cards-grid">
          <div className="info-card">
            <div className="info-card-icon">&lt;/&gt;</div>
            <h3>Simples de usar</h3>
            <p>
              Um JSON simples com o schema desejado e a API retorna dados
              completos e realistas, prontos para uso no seu projeto.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">⚓</div>
            <h3>Dados de Teste</h3>
            <p>
              CPFs, CNPJs, endereços, cidades e nomes reais do contexto
              . Nada de dados genéricos em inglês.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🛡</div>
            <h3>Seguro por padrão</h3>
            <p>
              Evite dados de produção sensíveis em ambientes de teste.
              Crie cenários realistas sem comprometer a segurança.
            </p>
          </div>
        </div>
      </section>

      {/* ── Código ───────────────────────────────────── */}
      <section className="codigo-section">
        <span className="section-label">Como funciona</span>
        <div className="codigo-grid">
          <div className="codigo-block">
            <div className="codigo-block-header">
              <CopyButton text={codeRequest} />
              <span className="codigo-tag">Request</span>
            </div>
            <SyntaxHighlighter language="json" style={nord} showLineNumbers customStyle={{ margin: 0, borderRadius: '0 0 ', fontSize: '13px' }}>
              {codeRequest}
            </SyntaxHighlighter>
            <div className="codigo-hints">
              <p><span>tableName</span> → nome da tabela alvo</p>
              <p><span>fields</span> → campos e tipos a gerar</p>
              <p><span>count</span> → quantidade de registros</p>
            </div>
          </div>

          <div className="codigo-separator" />

          <div className="codigo-block">
            <div className="codigo-block-header">
              <CopyButton text={codeRequest} />
              <span className="codigo-tag codigo-tag-response">Response</span>
            </div>
            <SyntaxHighlighter language="json" style={nord} showLineNumbers customStyle={{ margin: 0, borderRadius: '0 0', fontSize: '13px' }}>
              {codeResponse}
            </SyntaxHighlighter>
            <div className="codigo-hints">
               <p><span>tableName</span> → nome da tabela alvo</p>
              <p><span>data</span> → lista de registros gerados</p>
              <p><span>sql</span> → INSERT pronto para o banco</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recursos ─────────────────────────────────── */}
      <section className="recursos-section">
        <span className="section-label">Tipos de dados disponíveis</span>
        <div className="recursos-grid">
          <div className="recursos-lista">
            {[
              { titulo: 'Dados Pessoais', desc: 'Nomes, e-mails, telefones, CPFs e CNPJs realistas.' },
              { titulo: 'Localização', desc: 'Endereços, cidades, estados, CEPs e coordenadas geográficas.' },
              { titulo: 'Financeiro', desc: 'Valores monetários, preços, cartões de crédito e moedas.' },
              { titulo: 'Data e Hora', desc: 'Datas passadas, futuras, timestamps e dias da semana.' },
              { titulo: 'Técnico', desc: 'UUIDs, booleanos, URLs, IPs e status HTTP.' },
              { titulo: 'Customizável', desc: 'Ranges numéricos, enums e textos com tamanho definido.' },
            ].map((r, i) => (
              <div key={i} className="recurso-item">
                <div className="recurso-index">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="recurso-titulo">{r.titulo}</div>
                  <div className="recurso-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="codigo-block">
            <div className="codigo-block-header">
              <CopyButton text={codeRecursos} />
            </div>
            <SyntaxHighlighter language="json" style={nord} showLineNumbers customStyle={{ margin: 0, borderRadius: '0 0 12px 12px', fontSize: '13px', height: '100%', flex: 1 }}>
              {codeRecursos}
            </SyntaxHighlighter>
          </div>

        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-logo">✦DF</span>
          <span className="footer-copy">© Data Forge, Inc. 2025</span>
        </div>
        <div className="footer-right">
          <a href="https://www.notion.so/SUPPORT-2637b168d75a80a0bedbf1734532313c" target="_blank" rel="noopener noreferrer">Support</a>
          <a href="https://www.notion.so/PRIVACY-24c7b168d75a8008a130eed80a10502b" target="_blank" rel="noopener noreferrer">Privacy</a>
          <a href="https://github.com/joaovitrdos/dataforge-api" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>
      </footer>

    </div>
  );
}

export default Home;