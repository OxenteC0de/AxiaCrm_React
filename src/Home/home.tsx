import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-300 text-white py-16 px-6 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texto à esquerda */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Transforme sua gestão de clientes com um CRM completo e intuitivo
          </h1>
          <p className="text-blue-100 text-2xl">
            Organize, acompanhe e potencialize o relacionamento com seus clientes em uma única plataforma integrada, com dados centralizados e automações inteligentes.
          </p>

          <ul className="space-y-2 text-2x1 blue-200">
            <li>✓ Gestão de Leads e Oportunidades</li>
            <li>✓ Funil de Vendas Personalizado</li>
            <li>✓ Automação de Tarefas e Follow-ups</li>
            <li>✓ Relatórios e Insights em Tempo Real</li>
          </ul>
        </div>

        {/* Formulário à direita */}
        <form className="bg-blue-950 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold mb-4">Solicite uma demonstração gratuita</h2>

          <input
            type="text"
            placeholder="Seu nome*"
            className="w-full p-3 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="E-mail corporativo*"
            className="w-full p-3 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            placeholder="Telefone com DDD*"
            className="w-full p-3 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            className="w-full p-3 rounded bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Número de clientes gerenciados*</option>
            <option value="1-50">1–50</option>
            <option value="51-200">51–200</option>
            <option value="201-1000">201–1000</option>
            <option value="1000+">Mais de 1000</option>
          </select>
          <select
            className="w-full p-3 rounded bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seu cargo*</option>
            <option value="Vendas">Vendas</option>
            <option value="Marketing">Marketing</option>
            <option value="Gestor">Gestor</option>
            <option value="Outro">Outro</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 rounded transition-colors"
          >
            Solicitar demonstração
          </button>
        </form>
      </div>
    </section>
  );
}

export default Home;
