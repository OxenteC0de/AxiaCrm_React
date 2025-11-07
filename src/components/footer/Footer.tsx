import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Seção Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-2xl font-bold mb-4">AxiaCRM</h3>
            <p className="text-cyan-100 text-sm">
              Transforme sua gestão de clientes com um CRM completo e intuitivo.
              Organize, acompanhe e potencialize o relacionamento com seus
              clientes.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-cyan-100">
              <li>
                <a
                  href="/home"
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/oportunidades"
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  Oportunidades
                </a>
              </li>
              <li>
                <a
                  href="/usuarios"
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  Usuários
                </a>
              </li>
              <li>
                <a
                  href="/contato"
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-cyan-100 text-sm">
              <li>📧 contato@oxentecode.com</li>
              <li>📞 (70) 7070-7070</li>
              <li>📍 Brasil</li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-cyan-400/30 my-6"></div>

        {/* Seção Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">AxiaCRM © {currentYear}</p>
            <p className="text-sm text-cyan-100">
              Desenvolvido por:{" "}
              <span className="font-semibold">OxenteC0de</span>
            </p>
          </div>

          {/* Redes Sociais */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={40} weight="bold" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <InstagramLogo size={40} weight="bold" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <FacebookLogo size={40} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
