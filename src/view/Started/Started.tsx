import React, { useState } from 'react';
import './Started.css';
import { FaTrash, FaPlus, FaCode, FaDatabase, FaBolt } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './../../components/CopyButton/CopyButton.tsx';
import { API_URL } from '../../config/api';
import { useAuth } from '../../components/context/AuthContext';

interface Campo {
  name: string;
  type: string;
}

interface DataForgeResponse {
  tableName: string;
  data: Record<string, any>[];
  sql: string;
}

  const tiposDisponiveis = [
  {
    label: "Pessoal",
    items: [
      "nome_completo", "primeiro_nome", "sobrenome", "email", "telefone",
      "celular", "cpf", "cnpj", "rg", "data_nascimento", "idade",
      "genero", "estado_civil", "nacionalidade", "foto_url", "biografia",
      "passaporte", "cnh", "titulo_eleitor", "raca", "etnia",
      "orientacao_sexual", "deficiencia", "tipo_sanguineo", "altura_cm", "peso_kg", "imc"
    ]
  },
  {
    label: "Profissional",
    items: [
      "cargo", "empresa", "universidade", "ocupacao", "setor",
      "salario", "anos_experiencia", "nivel_escolaridade", "habilidades", "linkedin_url",
      "area_estudo", "diploma", "certificacoes", "projetos_url", "portfolio_url", "ramo_atividade"
    ]
  },
  {
    label: "Localização",
    items: [
      "endereco_completo", "nome_rua", "numero_predio", "complemento", "bairro",
      "cidade", "estado", "estado_sigla", "cep", "pais",
      "pais_sigla", "latitude", "longitude", "timezone", "regiao",
      "uf", "distrito", "continente", "fuso_horario_offset", "codigo_postal_internacional"
    ]
  },
  {
    label: "Financeiro",
    items: [
      "valor_monetario", "preco", "desconto", "porcentagem",
      "cartao_credito", "bandeira_cartao", "agencia_bancaria",
      "conta_bancaria", "moeda", "codigo_moeda", "iban", "bitcoin_address",
      "numero_cartao", "validade_cartao", "cvv_cartao", "saldo_conta", "tipo_conta_bancaria",
      "codigo_banco", "swift_bic", "taxa_juros", "imposto", "transacao_id", "status_pagamento"
    ]
  },
  {
    label: "Data/Hora",
    items: [
      "data_passada", "data_futura", "data_nascimento", "timestamp",
      "hora", "mes", "mes_nome", "ano", "dia_da_semana",
      "trimestre", "duracao_minutos", "duracao_horas",
      "data_hora", "data_iso", "hora_iso", "dia_do_ano", "semana_do_ano",
      "dia_do_mes", "dia_da_semana_nome", "periodo_dia"
    ]
  },
  {
    label: "Técnico",
    items: [
      "uuid", "id_sequencial", "booleano", "url", "url_imagem",
      "dominio", "email_corporativo", "ip", "ipv6", "mac_address",
      "http_status", "user_agent", "hash_md5", "hash_sha256",
      "token_jwt", "versao_semver", "mime_type", "cor_hex", "cor_rgb",
      "id_numerico", "id_alfanumerico", "json_string", "xml_string", "base64_string",
      "caminho_arquivo", "sistema_operacional", "linguagem_programacao", "framework", "versao_software",
      "chave_api", "segredo_api", "token_oauth", "certificado_digital", "algoritmo_criptografico",
      "porta_rede", "protocolo_rede", "status_servico", "log_evento", "codigo_erro", "stack_trace"
    ]
  },
  {
    label: "Produto",
    items: [
      "nome_produto", "descricao_produto", "categoria_produto",
      "sku", "ean_barcode", "estoque", "peso_kg",
      "dimensoes", "marca", "modelo", "avaliacao", "num_avaliacoes",
      "id_produto", "url_produto", "imagem_produto_url", "preco_promocional", "disponibilidade",
      "cor_produto", "tamanho_produto", "material_produto", "garantia", "data_lancamento",
      "fabricante", "fornecedor"
    ]
  },
  {
    label: "Internet",
    items: [
      "username", "senha", "avatar_url", "perfil_social",
      "nome_arquivo", "extensao_arquivo", "tamanho_arquivo_kb",
      "mime_type", "slug", "emoji",
      "url_video", "url_audio", "url_documento", "hashtag", "mencao_usuario",
      "post_id", "comentario_id", "seguidores_count", "seguindo_count", "curtidas_count",
      "compartilhamentos_count", "data_publicacao", "navegador", "provedor_internet", "tipo_conexao"
    ]
  },
  {
    label: "Texto",
    items: [
      "palavra", "frase", "paragrafo", "titulo",
      "descricao", "comentario", "tag", "categoria", "nota",
      "texto_longo", "resumo", "citacao", "palavra_chave", "sentenca",
      "codigo_fonte", "markdown_texto", "html_texto", "xml_texto", "json_texto"
    ]
  },
  {
    label: "Customizado",
    items: [
      "inteiro:1-100", "inteiro:1-1000", "decimal:1-100",
      "enum:val1,val2", "enum:ativo,inativo", "enum:pequeno,medio,grande",
      "texto:5-50", "texto:10-200",
      "regex:/[A-Z]{3}[0-9]{4}/", "lista:item1,item2,item3", "objeto:chave1=valor1,chave2=valor2",
      "data_formato:YYYY-MM-DD", "hora_formato:HH:MM:SS"
    ]
  },
  {
    label: "Mídia",
    items: [
      "url_imagem", "url_video", "url_audio", "formato_imagem", "formato_video",
      "formato_audio", "duracao_midia_segundos", "resolucao_imagem", "tamanho_arquivo_mb"
    ]
  },
  {
    label: "Saúde",
    items: [
      "tipo_sanguineo", "pressao_arterial", "frequencia_cardiaca", "glicemia", "colesterol",
      "alergias", "medicamentos", "diagnostico", "procedimento_medico", "data_exame",
      "resultado_exame"
    ]
  },
  {
    label: "Educação",
    items: [
      "nome_curso", "instituicao_ensino", "grau_academico", "data_conclusao", "media_notas",
      "disciplina", "matricula_academica"
    ]
  },
  {
    label: "Comércio Eletrônico/Pedidos",
    items: [
      "id_pedido", "status_pedido", "data_pedido", "valor_total_pedido", "itens_pedido",
      "metodo_pagamento", "endereco_entrega", "codigo_rastreamento", "transportadora"
    ]
  },
  {
    label: "Redes Sociais",
    items: [
      "nome_usuario_rede_social", "id_usuario_rede_social", "url_perfil_rede_social", "numero_seguidores", "numero_seguindo",
      "numero_posts", "data_criacao_perfil"
    ]
  },
  {
    label: "Sistemas/Infraestrutura",
    items: [
      "nome_servidor", "ip_servidor", "sistema_operacional_servidor", "status_servico", "uso_cpu",
      "uso_memoria", "uso_disco", "log_sistema", "versao_kernel"
    ]
  },
  {
    label: "Geometria/Gráficos",
    items: [
      "coordenada_x", "coordenada_y", "coordenada_z", "largura_px", "altura_px",
      "raio", "area", "perimetro", "tipo_forma_geometrica"
    ]
  },
  {
    label: "Unidades de Medida",
    items: [
      "unidade_medida", "valor_medida", "temperatura_celsius", "temperatura_fahrenheit", "distancia_km",
      "distancia_milhas", "volume_litros", "volume_galoes"
    ]
  },
  {
    label: "Criptografia/Segurança",
    items: [
      "chave_publica", "chave_privada", "assinatura_digital", "algoritmo_hash", "tipo_criptografia",
      "data_expiracao_certificado"
    ]
  },
  {
    label: "Automotivo",
    items: [
      "veiculo_marca", "veiculo_modelo", "veiculo_ano", "placa_veiculo", "chassi_veiculo",
      "renavam", "tipo_combustivel", "cor_veiculo", "quilometragem", "numero_portas",
      "tipo_transmissao", "potencia_motor_cv", "capacidade_tanque_litros"
    ]
  },
  {
    label: "Viagens e Turismo",
    items: [
      "numero_voo", "aeroporto_origem_iata", "aeroporto_destino_iata", "companhia_aerea", "assento_aviao",
      "portao_embarque", "terminal_aeroporto", "reserva_hotel_id", "nome_hotel", "checkin_data",
      "checkout_data", "tipo_quarto", "numero_quarto", "ponto_turistico", "atividade_turistica"
    ]
  },
  {
    label: "Jogos",
    items: [
      "id_jogador", "nickname_jogador", "pontuacao", "nivel_jogo", "classe_personagem",
      "habilidade_especial", "id_guilda", "nome_guilda", "id_item_inventario", "nome_item",
      "tipo_item", "raridade_item", "conquista_id", "nome_conquista"
    ]
  },
  {
    label: "Clima",
    items: [
      "temperatura_celsius", "temperatura_fahrenheit", "sensacao_termica_celsius", "umidade_relativa_percentual", "velocidade_vento_kmh",
      "direcao_vento", "pressao_atmosferica_hpa", "precipitacao_mm", "indice_uv", "condicao_climatica",
      "nascer_do_sol_hora", "por_do_sol_hora"
    ]
  },
  {
    label: "Ciência e Natureza",
    items: [
      "nome_especie_cientifico", "reino", "filo", "classe", "ordem",
      "familia", "genero", "elemento_quimico_nome", "simbolo_quimico", "numero_atomico",
      "massa_atomica", "constelacao_nome", "estrela_nome", "planeta_nome", "galaxia_nome",
      "fenomeno_natural"
    ]
  },
  {
    label: "Alimentos e Bebidas",
    items: [
      "nome_receita", "ingredientes", "instrucoes_preparo", "tempo_preparo_minutos", "calorias_por_porcao",
      "tipo_culinaria", "restricao_alimentar", "nome_bebida", "tipo_bebida", "teor_alcoolico_percentual",
      "volume_ml", "safra_vinho"
    ]
  },
  {
    label: "Música e Áudio",
    items: [
      "nome_musica", "nome_artista", "nome_album", "genero_musical", "duracao_musica_segundos",
      "isrc", "upc", "frequencia_amostragem_hz", "taxa_bits_kbps", "formato_audio"
    ]
  },
  {
    label: "Livros e Publicações",
    items: [
      "titulo_livro", "nome_autor", "isbn", "editora", "data_publicacao",
      "numero_paginas", "genero_literario", "edicao", "doi"
    ]
  },
  {
    label: "Eventos",
    items: [
      "nome_evento", "data_evento", "hora_inicio_evento", "local_evento", "tipo_evento",
      "preco_ingresso", "id_ingresso", "nome_palestrante"
    ]
  },
  {
    label: "Jurídico",
    items: [
      "numero_processo", "tribunal", "comarca", "vara", "nome_advogado",
      "oab_numero", "tipo_acao_judicial", "data_distribuicao_processo"
    ]
  },
  {
    label: "Governo e Política",
    items: [
      "nome_politico", "partido_politico", "cargo_eletivo", "id_lei", "data_sancao_lei",
      "orgao_publico", "licitacao_id"
    ]
  },
  {
    label: "Logística e Transporte",
    items: [
      "codigo_rastreamento", "transportadora", "status_entrega", "data_envio", "data_prevista_entrega",
      "modal_transporte", "peso_carga_kg", "volume_carga_m3"
    ]
  },
  {
    label: "Imobiliário",
    items: [
      "tipo_imovel", "endereco_imovel", "area_total_m2", "numero_quartos", "numero_banheiros",
      "valor_venda", "valor_aluguel", "iptu_valor", "matricula_imovel", "cartorio_registro", "indice_cadastral", "zoneamento", "uso_do_solo", "valor_venal", "divida_ativa_iptu"
    ]
  },
  {
    label: "Dispositivos e IoT",
    items: [
      "id_dispositivo", "tipo_dispositivo", "status_dispositivo", "leitura_sensor", "unidade_medida_sensor",
      "nivel_bateria_percentual", "versao_firmware"
    ]
  },
  {
    label: "Militar",
    items: [
      "patente", "posto_graduacao", "numero_identificacao_militar", "unidade_militar", "especialidade_militar"
    ]
  },
  {
    label: "Esportes",
    items: [
      "nome_time", "nome_atleta", "modalidade_esportiva", "posicao_jogador", "resultado_partida",
      "pontuacao_jogo"
    ]
  },
  {
    label: "Astronomia",
    items: [
      "ascensao_reta", "declinacao", "distancia_anos_luz", "magnitude_aparente", "tipo_espectral"
    ]
  },
  {
    label: "Genética",
    items: [
      "sequencia_dna", "sequencia_rna", "nome_gene", "id_cromossomo", "mutacao_genetica"
    ]
  },
  {
    label: "Química",
    items: [
      "formula_molecular", "nome_composto", "ph", "ponto_fusao_celsius", "ponto_ebulicao_celsius"
    ]
  },
  {
    label: "Física",
    items: [
      "velocidade_ms", "aceleracao_ms2", "forca_newton", "massa_kg", "energia_joule",
      "potencia_watt", "pressao_pascal", "frequencia_hertz"
    ]
  },
  {
    label: "Recursos Humanos",
    items: [
      "id_funcionario", "data_admissao", "data_demissao", "departamento", "cargo_confianca",
      "salario_bruto", "beneficios", "avaliacao_desempenho", "feedback_360", "horas_extras",
      "banco_de_horas", "ferias_agendadas", "absenteismo_dias"
    ]
  },
  {
    label: "Marketing e Vendas",
    items: [
      "id_lead", "origem_lead", "status_lead", "id_campanha", "nome_campanha",
      "custo_por_clique", "taxa_conversao", "valor_vida_cliente_ltv", "id_cliente", "data_ultima_compra",
      "ticket_medio", "produto_mais_vendido"
    ]
  },
  {
    label: "Manufatura",
    items: [
      "id_ordem_producao", "linha_producao", "id_maquina", "status_maquina", "operador_maquina",
      "quantidade_produzida", "quantidade_defeituosa", "tempo_ciclo_segundos", "eficiencia_geral_equipamento_oee"
    ]
  },
  {
    label: "Agricultura",
    items: [
      "tipo_cultura", "area_plantada_hectares", "data_plantio", "data_colheita_prevista", "umidade_solo_percentual",
      "ph_solo", "tipo_fertilizante", "quantidade_fertilizante_kg_ha", "previsao_safra_toneladas"
    ]
  },
  {
    label: "Artes e Cultura",
    items: [
      "nome_obra_arte", "nome_artista_plastico", "data_criacao_obra", "estilo_artistico", "dimensoes_obra",
      "meio_artistico", "id_museu", "nome_exposicao"
    ]
  },
  {
    label: "Seguros",
    items: [
      "numero_apolice", "tipo_seguro", "data_inicio_vigencia", "data_fim_vigencia", "valor_premio",
      "valor_franquia", "coberturas", "sinistro_id", "data_sinistro", "status_sinistro"
    ]
  },
  {
    label: "Telecomunicações",
    items: [
      "numero_linha_fixa", "numero_celular_com_ddd", "id_assinante", "plano_servico", "velocidade_internet_mbps",
      "consumo_dados_gb", "data_vencimento_fatura"
    ]
  },
  {
    label: "Outros",
    items: [
      "cor_nome", "cor_pantone", "codigo_idioma", "nome_idioma", "codigo_pais",
      "nome_pais", "fuso_horario_nome", "tipo_generico"
    ]
  }
];


const API = API_URL;

const Started: React.FC = () => {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [novoCampo, setNovoCampo] = useState('');
  const [novoTipo, setNovoTipo] = useState('');
  const [tableName, setTableName] = useState('');
  const [count, setCount] = useState<number>(5);
  const [response, setResponse] = useState<DataForgeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'json' | 'sql'>('json');
  const { token } = useAuth();

  const handleAdicionarCampo = () => {
    if (novoCampo.trim() && novoTipo) {
      setCampos([...campos, { name: novoCampo.trim(), type: novoTipo }]);
      setNovoCampo('');
      setNovoTipo('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdicionarCampo();
  };

  const handleRemoverCampo = (index: number) => {
    setCampos(campos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${API}/api/json/generate-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tableName, fields: campos, count })
      });

      if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);

      const json: DataForgeResponse = await res.json();
      setResponse(json);
      setPreviewType('json');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !loading && campos.length > 0 && tableName.trim() !== '';

  const getTipoBadgeColor = (tipo: string) => {
    if (tipo.startsWith('inteiro') || tipo.startsWith('enum') || tipo.startsWith('texto')) return 'badge-custom';
    const group = tiposDisponiveis.find(g => g.items.includes(tipo));
    const colors = ['badge-pessoal', 'badge-profissional', 'badge-localizacao', 'badge-financeiro', 'badge-data', 'badge-tecnico', 'badge-custom'];
    const idx = tiposDisponiveis.indexOf(group!);
    return colors[idx] ?? 'badge-custom';
  };

  return (
    <div className="df-page">
      <div className="df-header">
        <div className="df-header-icon"><FaDatabase /></div>
        <div>
          <h1 className="df-title">DataForge</h1>
          <p className="df-subtitle">Gere dados de teste realistas para qualquer tabela</p>
        </div>
      </div>

      <div className="df-layout">
        <div className="df-panel df-panel-left">
          <div className="df-section">
            <label className="df-label">Nome da Tabela</label>
            <input
              className="df-input"
              type="text"
              placeholder="ex: usuarios, produtos, pedidos"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
          </div>

          <div className="df-section">
            <label className="df-label">Adicionar Campo</label>
            <div className="df-field-row">
              <div className="df-input-wrapper">
                <input
                  className="df-input"
                  type="text"
                  placeholder="Nome do campo"
                  value={novoCampo}
                  onChange={(e) => setNovoCampo(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <select
                className={`df-select ${novoTipo ? 'has-value' : ''}`}
                value={novoTipo}
                onChange={(e) => setNovoTipo(e.target.value)}
              >
                <option value="" disabled>Tipo</option>
                {tiposDisponiveis.map(group => (
                  <optgroup key={group.label} label={group.label}>
                    {group.items.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <button className="df-btn-add" onClick={handleAdicionarCampo} title="Adicionar campo">
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="df-section df-fields-section">
            <div className="df-fields-header">
              <label className="df-label">Campos definidos</label>
              <span className="df-badge-count">{campos.length}</span>
            </div>

            {campos.length === 0 ? (
              <div className="df-empty">
                <FaDatabase className="df-empty-icon" />
                <p>Nenhum campo adicionado</p>
              </div>
            ) : (
              <div className="df-fields-list">
                {campos.map((campo, index) => (
                  <div key={index} className="df-field-item">
                    <div className="df-field-left">
                      <span className="df-field-index">{String(index + 1).padStart(2, '0')}</span>
                      <div className="df-field-info">
                        <span className="df-field-name">{campo.name}</span>
                        <span className={`df-field-type ${getTipoBadgeColor(campo.type)}`}>{campo.type}</span>
                      </div>
                    </div>
                    <button className="df-btn-remove" onClick={() => handleRemoverCampo(index)}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="df-section df-generate-section">
            <div className="df-count-row">
              <label className="df-label">Quantidade de registros</label>
              <div className="df-count-controls">
                {[5, 10, 25, 50].map(n => (
                  <button
                    key={n}
                    className={`df-count-btn ${count === n ? 'active' : ''}`}
                    onClick={() => setCount(n)}
                  >{n}</button>
                ))}
                <input
                  className="df-count-input"
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
                  min={1}
                  max={100}
                  placeholder="Outro"
                />
              </div>
            </div>

            <button className="df-btn-generate" onClick={handleSubmit} disabled={!canSubmit}>
              {loading ? (
                <><span className="df-spinner" /> Gerando dados...</>
              ) : (
                <><FaBolt /> Gerar Dados</>
              )}
            </button>

            {error && <div className="df-error">{error}</div>}
          </div>
        </div>

        <div className="df-panel df-panel-right">
          <div className="df-preview-header">
            <div className="df-preview-tabs">
              <button
                className={`df-tab ${previewType === 'json' ? 'active' : ''}`}
                onClick={() => setPreviewType('json')}
              >
                <FaCode /> JSON
              </button>
              <button
                className={`df-tab ${previewType === 'sql' ? 'active' : ''}`}
                onClick={() => setPreviewType('sql')}
                disabled={!response?.sql}
              >
                <FaDatabase /> SQL
              </button>
            </div>
            {response && (
              <div className="df-preview-meta">
                <span className="df-meta-badge">{response.tableName}</span>
                <span className="df-meta-badge">{response.data.length} registros</span>
              </div>
            )}
          </div>

          <div className="df-preview-body">
            {!response && !loading && (
              <div className="df-preview-placeholder">
                <FaDatabase className="df-placeholder-icon" />
                <p>Configure os campos e clique em <strong>Gerar Dados</strong></p>
                <p className="df-placeholder-sub">O resultado aparecerá aqui em JSON e SQL</p>
              </div>
            )}

            {loading && (
              <div className="df-preview-placeholder">
                <div className="df-loading-dots">
                  <span /><span /><span />
                </div>
                <p>Gerando dados realistas...</p>
              </div>
            )}

            {response && previewType === 'json' && (
              <div className="df-code-wrapper">
                <CopyButton textToCopy={JSON.stringify(response.data, null, 2)} />
                <SyntaxHighlighter language="json" style={nord} showLineNumbers customStyle={{ margin: 0, borderRadius: '8px', fontSize: '13px' }}>
                  {JSON.stringify(response.data, null, 2)}
                </SyntaxHighlighter>
              </div>
            )}

            {response && previewType === 'sql' && (
              <div className="df-code-wrapper">
                <CopyButton textToCopy={response.sql} />
                <SyntaxHighlighter language="sql" style={nord} showLineNumbers customStyle={{ margin: 0, borderRadius: '8px', fontSize: '13px' }}>
                  {response.sql}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Started;