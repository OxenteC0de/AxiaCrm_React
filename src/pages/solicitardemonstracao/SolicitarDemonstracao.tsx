import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SolicitarDemonstracao() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    numClientes: "",
    cargo: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    setEnviado(true);

    // Limpar formulário após 3 segundos
    setTimeout(() => {
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        numClientes: "",
        cargo: "",
      });
      setEnviado(false);
    }, 3000);
  };

  return (
    <section className="bg-gradient-to-r from-[#0B2D5C] via-[#1B5A9E] to-[#3BA3D8] text-white min-h-screen flex items-center py-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Solicite uma Demonstração</h1>
          <p className="text-xl text-blue-100">
            Preencha o formulário abaixo e nossa equipe entrará em contato para
            agendar uma demonstração personalizada do AxiaCRM.
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-[#2C4563] bg-opacity-95 p-10 rounded-2xl shadow-2xl">
          {enviado && (
            <div className="bg-green-500 text-white p-4 rounded-lg mb-6 text-center animate-pulse">
              ✓ Demonstração solicitada com sucesso! Entraremos em contato em
              breve.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-semibold mb-2"
              >
                Nome Completo*
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                className="w-full p-4 rounded-lg bg-[#3A5A7D] text-white placeholder-blue-200 border-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF] transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                E-mail Corporativo*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seuemail@empresa.com"
                className="w-full p-4 rounded-lg bg-[#3A5A7D] text-white placeholder-blue-200 border-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF] transition-all"
                required
              />
            </div>

            {/* Telefone */}
            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-semibold mb-2"
              >
                Telefone com DDD*
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 98765-4321"
                className="w-full p-4 rounded-lg bg-[#3A5A7D] text-white placeholder-blue-200 border-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF] transition-all"
                required
              />
            </div>

            {/* Grid com 2 colunas para os selects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Número de Clientes */}
              <div>
                <label
                  htmlFor="numClientes"
                  className="block text-sm font-semibold mb-2"
                >
                  Clientes Gerenciados*
                </label>
                <select
                  id="numClientes"
                  name="numClientes"
                  value={formData.numClientes}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-[#3A5A7D] text-white border-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF] transition-all cursor-pointer"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="1-50">1–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-1000">201–1000</option>
                  <option value="1000+">Mais de 1000</option>
                </select>
              </div>

              {/* Cargo */}
              <div>
                <label
                  htmlFor="cargo"
                  className="block text-sm font-semibold mb-2"
                >
                  Seu Cargo*
                </label>
                <select
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-[#3A5A7D] text-white border-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF] transition-all cursor-pointer"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Gestor">Gestor/Diretor</option>
                  <option value="CEO">CEO/Proprietário</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#00D4FF] hover:bg-[#00B8E0] text-gray-900 font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Demonstração
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex-1 border-2 border-white hover:bg-white/10 text-white font-bold py-4 rounded-lg transition-all duration-300"
              >
                Voltar
              </button>
            </div>
          </form>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 text-center">
          <p className="text-blue-100 text-lg mb-4">
            🎯 <strong>Por que solicitar uma demonstração?</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-[#2C4563] bg-opacity-70 p-6 rounded-lg">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Rápido e Personalizado</h3>
              <p className="text-blue-200">
                Demonstração de 30 minutos adaptada às suas necessidades
              </p>
            </div>
            <div className="bg-[#2C4563] bg-opacity-70 p-6 rounded-lg">
              <div className="text-4xl mb-2">🎓</div>
              <h3 className="font-semibold mb-2">Sem Compromisso</h3>
              <p className="text-blue-200">
                Conheça todas as funcionalidades sem obrigação de compra
              </p>
            </div>
            <div className="bg-[#2C4563] bg-opacity-70 p-6 rounded-lg">
              <div className="text-4xl mb-2">💼</div>
              <h3 className="font-semibold mb-2">Especialista Dedicado</h3>
              <p className="text-blue-200">
                Um consultor experiente irá guiá-lo pela plataforma
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolicitarDemonstracao;
