 //0B2C59, 00776 e 00B4D8, mesmo molde do de RH

function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-gray-900"
      style={{
        background: "linear-gradient(135deg, #0B2C59 0%, #0077B6 50%, #00B4D8 100%)"
      }}
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-20 items-center text-white">

      
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Simplifique e fortaleça o relacionamento com seus clientes
          </h1>
          <p className="text-lg text-gray-200 max-w-md">
            O <span className="font-semibold text-cyan-300">AxiaCRM</span> é a solução completa para gestão de relacionamento com clientes. 
            Organize contatos, acompanhe oportunidades e automatize processos para impulsionar suas vendas.
          </p>

          <div className="flex gap-4">
            <button className="bg-linear-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300">
              Começar agora
            </button>
            <button className="border border-cyan-300 text-cyan-200 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Ver demonstração
            </button>
          </div>
        </div>

  
        <div className="flex justify-center">
          <img
            src="./src/assets/grafico2.png"
            alt="Ilustração AxiaCRM"
            className="w-4/5 md:w-3/4 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </div>
  );
}

export default Home;