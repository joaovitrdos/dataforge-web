import React from 'react';
import './Docs.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Footer from '../../components/Footer/Footer';

// Não há props para tipar, então usamos uma interface vazia.
// Isso é uma boa prática para manter o código limpo e escalável.
interface DocsProps { }

// Usamos React.FC (Functional Component) com a interface que definimos.
const Docs: React.FC<DocsProps> = () => {

  // Bloco de código para o exemplo do CURL
  const curlCode = `curl -X POST http://localhost:8080/generate-data \\
  "Content-Type: application/json" \\
  '{
    "count": 1,
    "schema": {
        "full_name": "full_name",
        "email_address": "email_address"
    }
}'`;

  // Bloco de código para o exemplo do JSON
  const jsonCode = `{
  "count": 2,
  "schema": {
    "id": "uuid",
    "nome_completo": "full_name",
    "idade": "integer:18-60",
    "data_criacao": "date_past"
  }
}`;

  return (
    <div>
    <div className="docs-container">
      <header className="docs-header">
        <h1>DataForge API: Geração de Dados de Teste para Desenvolvedores</h1>
        <p>A DataForge API é uma ferramenta poderosa para gerar dados de teste realistas e fictícios. Com uma simples requisição HTTP, você obtém dados estruturados e autênticos em segundos.</p>
        <p className="docs-value-prop">Passe menos tempo criando dados e mais tempo desenvolvendo sua aplicação.</p>
      </header>

      <section className="docs-section">
        <h2>1. Começando</h2>
        <p>Para começar a usar a DataForge, você só precisa fazer uma requisição HTTP para o endpoint principal. Você pode usar qualquer cliente HTTP ou biblioteca de sua preferência.</p>
        <h3>Exemplo Rápido com `CURL`</h3>
        <SyntaxHighlighter language="shell" style={nord} showLineNumbers={true}>
          {curlCode}
        </SyntaxHighlighter>
      </section>

      <section className="docs-section">
        <h2>2. Endpoints</h2>
        <h3>POST /generate-data</h3>
        <p>Este endpoint é o principal e único da API. Ele aceita um schema JSON e um número para gerar uma lista de dados.</p>
        <ul>
          <li><strong>URL:</strong> <code>http://localhost:8080/generate-data</code></li>
          <li><strong>Método:</strong> <code>POST</code></li>
          <li><strong>Headers:</strong> <code>Content-Type: application/json</code></li>
        </ul>

        <h4>Corpo da Requisição (Request Body)</h4>
        <p>O corpo da requisição deve ser um objeto JSON contendo o <code>schema</code> e a <code>count</code>.</p>
        <table>
          <thead>
            <tr>
              <th>Propriedade</th>
              <th>Tipo</th>
              <th>Obrigatório</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>schema</code></td>
              <td><code>JSON Object</code></td>
              <td>Sim</td>
              <td>Um objeto onde a chave é o nome do campo e o valor é o tipo de dado.</td>
            </tr>
            <tr>
              <td><code>count</code></td>
              <td><code>int</code></td>
              <td>Não</td>
              <td>O número de objetos a serem gerados. O padrão é <code>1</code>.</td>
            </tr>
          </tbody>
        </table>

        <h4>Exemplo de Corpo da Requisição:</h4>
        <SyntaxHighlighter language="json" style={nord} showLineNumbers={true}>
          {jsonCode}
        </SyntaxHighlighter>
      </section>

      <section className="docs-section">
        <h2>3. Tipos de Dados Suportados</h2>
        <p>A DataForge suporta uma vasta gama de tipos de dados. Abaixo, uma lista completa para você usar em seu <code>schema</code>.</p>
        <table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Tipo de Schema</th>
              <th>Descrição</th>
              <th>Exemplo de Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Identificação</strong></td>
              <td><code>full_name</code>, <code>email_address</code>, <code>phone_number</code>, <code>cpf</code>, <code>cnpj</code></td>
              <td>Nome completo, e-mail, telefone, CPF e CNPJ.</td>
              <td><code>"nome": "full_name"</code></td>
            </tr>
            <tr>
              <td><strong>Numéricos</strong></td>
              <td><code>integer:min-max</code>, <code>money_value</code></td>
              <td>Números inteiros em um intervalo, valores monetários.</td>
              <td><code>"idade": "integer:20-50"</code></td>
            </tr>
            <tr>
              <td><strong>Endereço</strong></td>
              <td><code>address</code>, <code>city</code>, <code>state</code>, <code>zip_code</code>, <code>latitude</code>, <code>longitude</code></td>
              <td>Endereço, cidade, estado, CEP, coordenadas geográficas.</td>
              <td><code>"cidade": "city"</code></td>
            </tr>
            <tr>
              <td><strong>Tempo</strong></td>
              <td><code>date_past</code>, <code>date_future</code>, <code>timestamp</code></td>
              <td>Data no passado ou no futuro, timestamp Unix.</td>
              <td><code>"aniversario": "date_past"</code></td>
            </tr>
            <tr>
              <td><strong>Internet</strong></td>
              <td><code>url</code>, <code>domain_name</code>, <code>ip_address</code></td>
              <td>URLs, nomes de domínio, endereços IP públicos.</td>
              <td><code>"website": "url"</code></td>
            </tr>
            <tr>
              <td><strong>Conteúdo</strong></td>
              <td><code>sentence</code>, <code>paragraph</code></td>
              <td>Uma frase aleatória, um parágrafo de texto.</td>
              <td><code>"resumo": "paragraph"</code></td>
            </tr>
            <tr>
              <td><strong>Diversos</strong></td>
              <td><code>uuid</code>, <code>boolean</code>, <code>enum:val1,val2</code></td>
              <td>Identificador único, valor booleano, seleciona um valor de uma lista.</td>
              <td><code>"id": "uuid"</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="docs-section">
        <h2>4. Códigos de Status HTTP</h2>
        <p>Os códigos de status indicam o resultado da sua requisição.</p>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>200 OK</code></td>
              <td>A requisição foi processada com sucesso.</td>
            </tr>
            <tr>
              <td><code>400 Bad Request</code></td>
              <td>A requisição contém um erro de sintaxe JSON ou um tipo de dado não suportado.</td>
            </tr>
            <tr>
              <td><code>500 Internal Server Error</code></td>
              <td>Ocorreu um erro no servidor.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default Docs;