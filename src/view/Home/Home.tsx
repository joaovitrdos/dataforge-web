import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Recursos from "../../components/Recursos/Recursos";
import Footer from "../../components/Footer/Footer";
import InfoCards from "../../components/InfoCards/InfoCards";
import Codigo from '../../components/Codigo/Codigo';

function Home() {
    return (
        <>
            <Container />
            <InfoCards />
            <Codigo/>
            <Recursos />
            <Footer />
        </>
    );
}

export default Home;