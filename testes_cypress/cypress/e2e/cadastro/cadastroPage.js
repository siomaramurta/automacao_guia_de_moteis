class CadastroPage {
  visit() {
    cy.visit('https://www.guiademoteis.com.br/usuario/cadastro');
  }

  preencherNome(nome) {
    cy.get('#Nome').type(nome);
  }

  selecionarGenero(genero) {
    cy.get(`input[type="radio"][value="${genero}"]`).click();
  }

  preencherDataNascimento(dataNascimento) {
    cy.get('#DataNascimento').type(dataNascimento);
  }

  preencherCep(cep) {
    cy.get('#Cep').type(cep);
  }

  preencherEmail(email) {
    cy.get('#Email').type(email);
  }

  preencherConfirmacaoEmail(confirmacaoEmail) {
    cy.get('#ConfEmail').type(confirmacaoEmail);
  }

  preencherSenha(senha) {
    cy.get('#Senha').type(senha);
  }

  aceitarTermos() {
    cy.get('#checkbox-privacy').check();
  }

  submeterFormulario() {
    cy.get('input[type="submit"][value="Confirmar cadastro"]').click();
  }

  verificarMensagemSucesso() {
    cy.contains('Tudo Ok! Seu cadastro VIP Guia de Motéis foi concluido com sucesso.Para continuar navegando, clique aqui.').should('be.visible');
  }

  verificarMensagemErro(mensagem) {
    cy.contains('span', mensagem).should('be.visible');
  }

  preencherFormulario(registro) {
    this.preencherNome(registro.nome);
    this.selecionarGenero(registro.genero);
    this.preencherDataNascimento(registro.dataNascimento);
    this.preencherCep(registro.cep);
    this.preencherEmail(registro.email);
    this.preencherConfirmacaoEmail(registro.confirmacaoEmail);
    this.preencherSenha(registro.senha);
    this.aceitarTermos();
  }
}

export default CadastroPage;