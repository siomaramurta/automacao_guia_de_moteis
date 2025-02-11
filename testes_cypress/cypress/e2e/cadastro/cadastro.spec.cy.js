import CadastroPage from './cadastroPage';

describe('Cadastro de usuário', () => {
  const cadastroPage = new CadastroPage();

  beforeEach(() => {
    cy.fixture('cadastro_usuarios').as('cadastro_usuarios');
    cadastroPage.visit();
  });

  it('Deve cadastrar um usuário com sucesso', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_valido);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemSucesso();
  });

  it('Deve exibir erro ao tentar submeter formulário sem preencher os campos obrigatórios', () => {
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('Por favor, verifique se todos os campos obrigatórios estão preenchidos!');
  });

  it('Deve exibir erro ao inserir uma data de nascimento futura', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_data_nascimento_futura);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('Data de nascimento inválida');
  });

  it('Deve exibir erro ao inserir uma idade menor que 18 anos', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_usuario_menor);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('Apenas maiores de 18 anos.');
  });

  it('Deve exibir erro ao inserir um CEP inválido', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_cep_invalido);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('CEP inválido');
  });

  it('Deve exibir erro ao inserir um e-mail inválido', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_email_invalido);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('E-mail inválido');
  });

  it('Deve exibir erro ao inserir e-mail diferente com campo de confirmação de e-mail', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_confirmacao_email_diferente);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('O campo confirmação de email deve ser identico ao campo email.');
  });

  it('Deve exibir erro ao inserir uma senha fora do padrão', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_senha_invalida);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número');
  });

  it('Deve exibir erro ao tentar cadastrar com espaços em branco nos campos obrigatórios', function () {
    cadastroPage.preencherFormulario(this.cadastro_usuarios.registro_em_branco);
    cadastroPage.submeterFormulario();
    cadastroPage.verificarMensagemErro('Por favor, verifique se todos os campos obrigatórios estão preenchidos!');
  });
});