import React from 'react';
import './About.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const About: React.FC = () => {
  return (
    <div className="about-container">
        <Navbar/>
      <section className="about-section">
        <h1>O DataForge</h1>
        <p>
          Em cada projeto de software, há uma fase inevitável e muitas vezes tediosa: a criação de dados de teste.
          A DataForge nasceu da frustração com esse processo, com uma missão clara: permitir que qualquer tipo de dado
          de teste seja gerado com apenas uma requisição – de forma rápida, realista e elegante.
        </p>
      </section>

      <section className="about-section">
        <h1>Da Ideia à Arquitetura</h1>
        <p>
          Nosso foco sempre foi a simplicidade. Em vez de múltiplos endpoints, centralizamos tudo em um único: <code>/generate-data</code>.
          Com isso, o desenvolvedor define toda a estrutura de dados usando um schema JSON. A experiência é intuitiva, leve e incrivelmente rápida.
        </p>
      </section>

      <section className="about-section">
        <h1>A Jornada de Desenvolvimento</h1>
        <p>
          Construir a DataForge foi um trabalho de amor e atenção aos detalhes. Cada tipo de dado – de nomes completos a CPFs válidos –
          foi cuidadosamente projetado para parecer real. Implementamos algoritmos de validação, lógica cultural e até regras de sonoridade.
        </p>
      </section>

      <section className="about-section">
        <h1>A Missão Continua</h1>
        <p>
          A DataForge é mais do que uma API. É um aliado no ciclo de desenvolvimento. Libertamos desenvolvedores da tarefa repetitiva
          de gerar dados manualmente, permitindo foco no que realmente importa: lógica, interfaces e inovação.
        </p>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
