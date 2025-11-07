import { useNavigate } from "react-router-dom";
import graficoImg from "../../assets/grafico2.png";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#0B2D5C] via-[#1B5A9E] to-[#3BA3D8] text-white min-h-screen flex items-center py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Texto e Conteúdo à Esquerda */}
        <div className="space-y-8">
          <h1 className="text-6xl font-bold leading-tight">
            Simplifique e fortaleça o relacionamento com seus clientes
          </h1>

          <p className="text-lg text-blue-50 leading-relaxed">
            O <span className="font-semibold">AxiaCRM</span> é a solução
            completa para gestão de relacionamento com clientes. Organize
            contatos, acompanhe oportunidades e automatize processos para
            impulsionar suas vendas.
          </p>

          <ul className="space-y-3 text-base">
            <li className="flex items-start">
              <span className="text-green-400 mr-3 mt-1">✓</span>
              <span>Gestão de Leads e Oportunidades</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3 mt-1">✓</span>
              <span>Funil de Vendas Personalizado</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3 mt-1">✓</span>
              <span>Automação de Tarefas e Follow-ups</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3 mt-1">✓</span>
              <span>Relatórios e Insights em Tempo Real</span>
            </li>
          </ul>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => navigate("/oportunidades")}
              className="bg-[#00D4FF] hover:bg-[#00B8E0] text-gray-900 px-8 py-3.5 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Começar agora
            </button>

            <button
              onClick={() => navigate("/solicitar-demonstracao")}
              className="border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold transition-all duration-300"
            >
              Solicitar demonstração
            </button>
          </div>
        </div>

        {/* Imagem do Gráfico à Direita */}
        <div className="flex justify-center items-center">
          <img
            src={graficoImg}
            alt="Gráfico de crescimento"
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
