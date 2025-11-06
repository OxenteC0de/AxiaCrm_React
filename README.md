</head>
<body>

  <h1>📊 AxiaCRM – Sistema de Gestão de Relacionamento com o Cliente (Frontend)</h1>

  <h2>📖 Descrição Geral</h2>
  <p>
    O <strong>AxiaCRM</strong> é um sistema de <em>Customer Relationship Management</em> (Gestão de Relacionamento com o Cliente) 
    desenvolvido para facilitar a organização de contatos, clientes, oportunidades e interações comerciais.
  </p>
  <p>
    Esta é a interface <strong>frontend</strong> do projeto, responsável por oferecer uma experiência moderna, intuitiva e responsiva 
    para os usuários do sistema. O objetivo principal é centralizar dados de clientes, acompanhar o ciclo de vida das oportunidades 
    e otimizar o trabalho da equipe comercial, garantindo eficiência e organização.
  </p>

  <h2>🚀 Funcionalidades Existentes</h2>
  <ul>
    <li>✅ Autenticação de Usuário: Login e controle de acesso ao sistema.</li>
    <li>✅ Gestão de Clientes: CRUD completo de clientes (nome, e-mail, telefone, status de contrato).</li>
    <li>✅ Gestão de Oportunidades: Cadastro e acompanhamento de oportunidades de negócio vinculadas aos clientes.</li>
    <li>✅ Responsividade: Interface adaptada para desktop e dispositivos móveis.</li>
  </ul>

  <h2>📝 Implementações Futuras</h2>
  <p>🔜 Gestão de Tarefas (Atividades e Interações): Cadastro de tarefas vinculadas a clientes e usuários, permitindo rastreabilidade e controle das interações comerciais.</p>

  <h2>🗂️ Estrutura de Dados (Entidades)</h2>
  <table border="1" cellpadding="5" cellspacing="0">
    <tr>
      <th>Entidade</th>
      <th>Atributos Principais</th>
    </tr>
    <tr>
      <td>Usuário</td>
      <td>id, nome, email, senha, foto, cargo</td>
    </tr>
    <tr>
      <td>Cliente</td>
      <td>id, nome, email, telefone, statusContrato, usuario_id</td>
    </tr>
    <tr>
      <td>Oportunidade</td>
      <td>id, título, valor, status, data, cliente_id, usuario_id</td>
    </tr>
    <tr>
      <td>Tarefa (Futura)</td>
      <td>id, tipo, descrição, data, cliente_id, usuario_id</td>
    </tr>
  </table>

  <h2>🧩 Tecnologias Utilizadas</h2>
  <h3>Frontend</h3>
  <ul>
    <li>React (com Vite)</li>
    <li>TailwindCSS</li>
    <li>React Router DOM</li>
    <li>Axios</li>
    <li>Phosphor Icons</li>
  </ul>

  <h3>Backend (para integração)</h3>
  <ul>
    <li>Node.js</li>
    <li>NestJS</li>
    <li>TypeORM</li>
    <li>TypeScript</li>
    <li>PostgreSQL</li>
    <li>Passport / JWT</li>
  </ul>

  <h2>🧭 Como Executar o Projeto</h2>

  <h3>⚙️ Pré-requisitos</h3>
  <ul>
    <li>Node.js (versão 18 ou superior)</li>
    <li>npm ou yarn</li>
    <li>PostgreSQL</li>
  </ul>

  <h3>🗃️ 1. Configurar o Banco de Dados</h3>
  <p>Crie um banco de dados no PostgreSQL (exemplo: <code>db_axiacrm</code>).</p>
  <pre><code>CREATE DATABASE db_axiacrm;</code></pre>

  <p>Em seguida, configure o arquivo <code>.env</code> do backend com as credenciais:</p>
  <pre><code>DATABASE_HOST=localhost
DATABASE_PORT=3036
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=db_axiacrm</code></pre>

  <h3>🖥️ 2. Clonar os Repositórios</h3>
  <pre><code>
  
# Clonar o backend
git clone https://github.com/seu-usuario/AxiaCrm.git
cd axiacrm

# Clonar o frontend
git clone https://github.com/seu-usuario/AxiaCrm_React.git
cd axiacrm_react
</code></pre>

  <h3>🔧 3. Instalar Dependências</h3>
  <p><strong>Backend:</strong></p>
  <pre><code>cd axiacrm
npm install
</code></pre>

  <p><strong>Frontend:</strong></p>
  <pre><code>cd axiacrm_react
npm install
</code></pre>

  <h3>▶️ 4. Executar o Projeto</h3>
  <p><strong>Backend:</strong></p>
  <pre><code>npm run start:dev</code></pre>
  <p>Por padrão, o backend estará em: <a href="http://localhost:3000">http://localhost:3000</a></p>

  <p><strong>Frontend:</strong></p>
  <pre><code>npm run dev</code></pre>
  <p>Por padrão, o frontend estará em: <a href="http://localhost:5173">http://localhost:5173</a></p>
