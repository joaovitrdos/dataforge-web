import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Docs.css';

const curlCode = `curl -X POST http://localhost:8080/api/json/generate-ai \\
  -H "Content-Type: application/json" \\
  -d '{
    "tableName": "usuarios",
    "fields": [
      { "name": "nome",  "type": "nome_completo" },
      { "name": "email", "type": "email" }
    ],
    "count": 2
  }'`;

const jsonRequest = `{
  "tableName": "usuarios",
  "fields": [
    { "name": "id",           "type": "uuid" },
    { "name": "nome",         "type": "nome_completo" },
    { "name": "idade",        "type": "inteiro:18-60" },
    { "name": "criado_em",    "type": "data_passada" }
  ],
  "count": 2
}`;

const jsonResponse = `{
  "tableName": "usuarios",
  "data": [
    { "id": "a1b2c3...", "nome": "João Santos", "idade": 34, "criado_em": "2023-04-12" },
    { "id": "d4e5f6...", "nome": "Maria Silva", "idade": 27, "criado_em": "2022-11-08" }
  ],
  "sql": "INSERT INTO usuarios (id, nome, idade, criado_em) VALUES\\n  ('a1b2c3...', 'João Santos', 34, '2023-04-12'),\\n  ('d4e5f6...', 'Maria Silva', 27, '2022-11-08');"
}`;

const tiposData = [
  { categoria: 'Pessoal', tipos: 'nome_completo, email, telefone, cpf, cnpj, data_nascimento', exemplo: '"nome": "nome_completo"' },
  { categoria: 'Profissional', tipos: 'cargo, empresa, universidade, ocupacao', exemplo: '"cargo": "cargo"' },
  { categoria: 'Localização', tipos: 'endereco, cidade, estado, cep, latitude, longitude, pais, estado_sigla', exemplo: '"cidade": "cidade"' },
  { categoria: 'Financeiro', tipos: 'valor_monetario, preco, cartao_credito, moeda', exemplo: '"preco": "preco"' },
  { categoria: 'Data / Hora', tipos: 'data_passada, data_futura, timestamp, mes, ano, dia_da_semana', exemplo: '"criado_em": "data_passada"' },
  { categoria: 'Técnico', tipos: 'uuid, booleano, url, dominio, ip, http_status', exemplo: '"id": "uuid"' },
  { categoria: 'Customizado', tipos: 'inteiro:min-max, enum:val1,val2, texto:min-max', exemplo: '"idade": "inteiro:18-60"' },
];

const statusData = [
  { code: '200 OK', desc: 'Requisição processada com sucesso. Retorna JSON + SQL.' },
  { code: '400 Bad Request', desc: 'Corpo da requisição inválido ou campo obrigatório ausente.' },
  { code: '500 Internal Server Error', desc: 'Erro interno — geralmente falha na geração pela IA.' },
];

const Docs: React.FC = () => {
  return (
    <div className="docs-page">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="docs-hero">
        <div className="docs-hero-badge">
          <span className="docs-hero-dot" />
          Documentação
        </div>
        <h1>DataForge <span className="docs-highlight">API</span></h1>
        <p>Referência completa para gerar dados de teste brasileiros com JSON e SQL em uma única requisição.</p>
      </section>

      <div className="docs-body">

        {/* ── Começando ────────────────────────────────── */}
        <section className="docs-section">
          <div className="docs-section-label">01 — Começando</div>
          <h2>Exemplo rápido com cURL</h2>
          <p>Faça uma requisição POST para o endpoint principal com o schema desejado.</p>
          <SyntaxHighlighter language="shell" style={nord} showLineNumbers customStyle={{ borderRadius: '12px', fontSize: '13px', margin: '16px 0' }}>
            {curlCode}
          </SyntaxHighlighter>
        </section>

        {/* ── Endpoint ─────────────────────────────────── */}
        <section className="docs-section">
          <div className="docs-section-label">02 — Endpoint</div>
          <h2>POST /api/json/generate-ai</h2>
          <p>Único endpoint da API. Recebe o schema e retorna dados fictícios em JSON e SQL.</p>

          <div className="docs-endpoint-info">
            <div className="docs-endpoint-row">
              <span className="docs-endpoint-key">URL</span>
              <code className="docs-code">http://localhost:8080/api/json/generate-ai</code>
            </div>
            <div className="docs-endpoint-row">
              <span className="docs-endpoint-key">Método</span>
              <code className="docs-code docs-code-purple">POST</code>
            </div>
            <div className="docs-endpoint-row">
              <span className="docs-endpoint-key">Header</span>
              <code className="docs-code">Content-Type: application/json</code>
            </div>
          </div>

          <h3>Campos do request</h3>
          <div className="docs-table-wrapper">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Tipo</th>
                  <th>Obrigatório</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code className="docs-code">tableName</code></td>
                  <td><code className="docs-code-muted">string</code></td>
                  <td><span className="docs-badge-sim">Sim</span></td>
                  <td>Nome da tabela usada no INSERT gerado.</td>
                </tr>
                <tr>
                  <td><code className="docs-code">fields</code></td>
                  <td><code className="docs-code-muted">array</code></td>
                  <td><span className="docs-badge-sim">Sim</span></td>
                  <td>Lista de objetos com <code className="docs-code">name</code> e <code className="docs-code">type</code>.</td>
                </tr>
                <tr>
                  <td><code className="docs-code">count</code></td>
                  <td><code className="docs-code-muted">int</code></td>
                  <td><span className="docs-badge-nao">Não</span></td>
                  <td>Quantidade de registros a gerar. Padrão: <code className="docs-code">1</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Exemplo de request / response</h3>
          <div className="docs-code-grid">
            <div className="docs-code-block">
              <div className="docs-code-block-header">
                <span className="docs-tag">Request</span>
              </div>
              <SyntaxHighlighter language="json" style={nord} showLineNumbers customStyle={{ margin: 0, borderRadius: '0 0 12px 12px', fontSize: '13px' }}>
                {jsonRequest}
              </SyntaxHighlighter>
            </div>
            <div className="docs-code-block">
              <div className="docs-code-block-header">
                <span className="docs-tag docs-tag-response">Response</span>
              </div>
              <SyntaxHighlighter language="json" style={nord} showLineNumbers customStyle={{ margin: 0, borderRadius: '0 0 12px 12px', fontSize: '13px' }}>
                {jsonResponse}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* ── Tipos de dados ────────────────────────────── */}
        <section className="docs-section">
          <div className="docs-section-label">03 — Tipos de dados</div>
          <h2>Tipos suportados</h2>
          <p>Use qualquer um dos tipos abaixo no campo <code className="docs-code">type</code> dos seus fields.</p>
          <div className="docs-table-wrapper">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Tipos disponíveis</th>
                  <th>Exemplo</th>
                </tr>
              </thead>
              <tbody>
                {tiposData.map((row, i) => (
                  <tr key={i}>
                    <td><span className="docs-categoria">{row.categoria}</span></td>
                    <td><code className="docs-code-muted">{row.tipos}</code></td>
                    <td><code className="docs-code">{row.exemplo}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Status HTTP ───────────────────────────────── */}
        <section className="docs-section">
          <div className="docs-section-label">04 — Status HTTP</div>
          <h2>Códigos de resposta</h2>
          <div className="docs-table-wrapper">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {statusData.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <code className={`docs-code ${row.code.startsWith('200') ? 'docs-code-green' : row.code.startsWith('400') ? 'docs-code-amber' : 'docs-code-red'}`}>
                        {row.code}
                      </code>
                    </td>
                    <td>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

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
};

export default Docs;