import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './About.css';

const sections = [
  {
    tag: '01',
    titulo: 'O DataForge',
    texto: 'Em cada projeto de software, há uma fase inevitável e muitas vezes tediosa: a criação de dados de teste. A DataForge nasceu da frustração com esse processo, com uma missão clara: permitir que qualquer tipo de dado de teste seja gerado com apenas uma requisição – de forma rápida, realista e elegante.',
  },
  {
    tag: '02',
    titulo: 'Da Ideia à Arquitetura',
    texto: 'Nosso foco sempre foi a simplicidade. Em vez de múltiplos endpoints, centralizamos tudo em um único: /api/json/generate-ai. Com isso, o desenvolvedor define toda a estrutura de dados usando um schema JSON. A experiência é intuitiva, leve e incrivelmente rápida.',
    code: '/api/json/generate-ai',
  },
  {
    tag: '03',
    titulo: 'A Jornada de Desenvolvimento',
    texto: 'Construir a DataForge foi um trabalho de amor e atenção aos detalhes. Cada tipo de dado – de nomes completos a CPFs válidos – foi cuidadosamente projetado para parecer real. Implementamos algoritmos de validação, lógica cultural e até regras de sonoridade.',
  },
  {
    tag: '04',
    titulo: 'A Missão Continua',
    texto: 'A DataForge é mais do que uma API. É um aliado no ciclo de desenvolvimento. Libertamos desenvolvedores da tarefa repetitiva de gerar dados manualmente, permitindo foco no que realmente importa: lógica, interfaces e inovação.',
  },
];

const About: React.FC = () => {
  return (
    <div className="about-page">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-badge">
          <span className="about-hero-dot" />
          Sobre o projeto
        </div>
        <h1>Construído para <span className="about-highlight">desenvolvedores</span></h1>
        <p>A história por trás da ferramenta que elimina a criação manual de dados de teste.</p>
      </section>

      {/* ── Sections ─────────────────────────────────── */}
      <div className="about-sections">
        {sections.map((s) => (
          <div key={s.tag} className="about-card">
            <span className="about-card-tag">{s.tag}</span>
            <div className="about-card-body">
              <h2>{s.titulo}</h2>
              <p>
                {s.code
                  ? s.texto.replace(s.code, '')
                  : s.texto}
                {s.code && <code className="about-code">{s.code}</code>}
                {s.code && '.'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="about-cta">
        <h2>Pronto para começar?</h2>
        <p>Gere seus primeiros dados de teste em menos de um minuto.</p>
        <Link to="/started" className="about-btn-primary">Experimentar agora</Link>
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
};

export default About;