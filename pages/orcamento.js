import React, { useState } from 'react';

import Head from 'next/head';
import Menu from '../components/Menu';
import Rodape from '../components/Rodape';

import { Container, Jumbotron, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

function Orcamento() {
  const [orcamento, setOrcamento] = useState({
    name: '',
    email: '',
    phone: '',
    whatsApp: '',
    projeto: ''
  });

  const [response, setResponse] = useState({
    formSave: false,
    type: '',
    message: ''
  })

  const onChangeInput = e => setOrcamento({...orcamento, [e.target.name]: e.target.value});

  const sendOrcamento = async e => {
    e.preventDefault();
    console.log(orcamento);

    setResponse({ formSave: true });
    try {
      const resp = await fetch('http://localhost:3100/orcamento', {
        method: 'POST',
        body: JSON.stringify(orcamento),
        headers: {'Content-Type': 'application/json'}
      })

      const responseEnv = await resp.json();

      if (responseEnv.error) {
        setResponse({
          formSave: false,
          type: 'error',
          message: responseEnv.message
        });
        //alert(responseEnv.message);
      } else {
        setResponse({
          formSave: false,
          type: 'success',
          message: responseEnv.message
        });
        //alert(responseEnv.message);
      }
    } catch(err) {
      setResponse({
        formSave: false,
        type: 'error',
        message: 'Erro: Orçamento não enviado'
      });      
      //alert('Erro: Orçamento não enviado')
    }

  }

  return (
    <div>
    <Head>
        <title>Orcamento - Celke</title>
        <meta name="description" content="Solicitar orcamento para ..." />
    </Head>

  
      <Menu />

      <Jumbotron fluid className="descr-top">
        <style>
          {`.descr-top{
              background-color: #050c3d;
              color: #00a1fc;
              padding-top: 40px;
              padding-bottom: 40px;
              margin-bottom: 0rem !important;
          }`}
        </style>
        <Container className="text-center">
          <h1 className="display-4">Orçamento</h1>
        </Container>
      </Jumbotron>

      <Jumbotron fluid className="form-orcamento">
        <style>
          {`.form-orcamento{
              padding-top: 80px;
              padding-bottom: 80px;
              background-color: #fff;
              margin-bottom: 0rem !important;
            }`}
        </style>
        <Container>
          { response.type === 'error' ? <Alert color="danger"> {response.message }</Alert>: "" }
          { response.type === 'success' ? <Alert color="success"> {response.message }</Alert>: "" }

          <Form onSubmit={sendOrcamento}>
            <FormGroup>
              <Label for="name">Nome</Label>
              <Input type="text" name="name" id="name" placeholder="Prencha com o nome completo" onChange={onChangeInput}/>
            </FormGroup>

            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input type="email" name="email" id="email" placeholder="Prencha com o seu melhor e-mail" onChange={onChangeInput}/>
            </FormGroup>

            <FormGroup>
              <Label for="phone">Telefone</Label>
              <Input type="text" name="phone" id="phone" placeholder="(XX) XXXX-XXXX" onChange={onChangeInput}/>
            </FormGroup>

            <FormGroup>
              <Label for="whatsApp">WhatsApp</Label>
              <Input type="text" name="whatsApp" id="whatsApp" placeholder="(XX) XXXX-XXXX" onChange={onChangeInput}/>
            </FormGroup>

            <FormGroup>
              <Label for="projeto">Projeto</Label>
              <Input type="textarea" name="projeto" id="projeto" placeholder="Fale um pouco do seu projeto" onChange={onChangeInput}/>
            </FormGroup>

            { response.formSave
                ? <Button type="submit" outline color="danger" disabled>Enviando</Button> 
                : <Button type="submit" outline color="primary">Solicitar</Button> 
            }
          </Form>
        </Container>
      </Jumbotron>

      <Rodape />
    </div>
  );
}

export default Orcamento;