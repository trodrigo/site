import React from 'react';

import Head from 'next/head';
import Menu from '../components/Menu';
import Rodape from '../components/Rodape';

import { Jumbotron, Container } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function Home({ data }) {
    return (
        <div>
            <Head>
                <title>Home - Celke</title>
                <meta name="description" content="Site de ... sobre ..." />
            </Head>

            <Menu />

            <Jumbotron fluid className="descr-top">
                <style>
                    {`.descr-top{
                        background-color: #050c3d;
                        color: #00a1fc;
                        margin-bottom: 0rem !important;
                    }`}
                </style>
                <Container className="text-center">
                    <h1 className="display-4">{ data.home.topTitulo }</h1>
                    <p className="lead">{ data.home.topSubTitulo }</p>
                    <p className="lead">
                        <a href={ data.home.topLinkBtn } className="btn btn-outline-primary btn-lg mt-4">{ data.home.topTextBtn }</a>
                    </p>
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="servicos">
                <style>
                    {`.servicos{
                        background-color: #fff;
                        margin-bottom: 0rem !important;
                    }.circulo{
                        width: 140px;
                        height: 140px;
                        background-color: #0A197D;
                        font-size: 52px;
                        color: #fff;
                        padding-top: 24px;
                    }.centralizar{
                        margin: 0 auto !important;
                        float: none !important;
                    }`}
                </style>
                <Container className="text-center">
                    <div>
                        <h2 className="display-4">{ data.home.servTitulo }</h2>
                        <p className="lead pb-4">{ data.home.servSubTitulo }</p>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="rounded-circle circulo centralizar">
                                <FontAwesomeIcon icon={ data.home.servUmIcone } />
                            </div>
                            <h2 className="mt-4 mb-4">{ data.home.servUmTitulo }</h2>
                            <p>
                            { data.home.servUmDesc }
                            </p>
                        </div>
                        <div className="col-md-4">
                            <div className="rounded-circle circulo centralizar">
                                <FontAwesomeIcon icon={ data.home.servDoisIcone }/>
                            </div>
                            <h2 className="mt-4 mb-4">{ data.home.servDoisTitulo }</h2>
                            <p>
                            { data.home.servDoisDesc }
                            </p>
                        </div>
                        <div className="col-md-4">
                            <div className="rounded-circle circulo centralizar">
                                <FontAwesomeIcon icon={ data.home.servTresIcone } />
                            </div>
                            <h2 className="mt-4 mb-4">{ data.home.servTresTitulo }</h2>
                            <p>
                            { data.home.servTresDesc }
                            </p>
                        </div>
                    </div>
                </Container>
            </Jumbotron>

            <Rodape />
        </div>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3100/home`)
    const data = await res.json()
    //console.log(data);
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { data }, // will be passed to the page component as props
    }
  }

export default Home;