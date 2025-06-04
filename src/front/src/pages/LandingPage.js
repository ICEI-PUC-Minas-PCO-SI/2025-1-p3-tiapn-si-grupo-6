import { BotaoCadastrar } from "../components/ui/BotaoCadastrar";
import { Link } from "react-router-dom";

export default function ERPetLandingPage() {
    const testimonials = [
        {
            avatar: "/avatar-lily.png",
            username: "lily761",
            text: "Fácil, rápido e prático! Agora meu humano não esquece mais da minha ração!"
        },
        {
            avatar: "/avatar-lucya.png",
            username: "lucya_gatuna",
            text: "O sistema é mais rápido que eu correndo atrás do laser!"
        },
        {
            avatar: "/avatar-leo.png",
            username: "pequenoleo",
            text: "Adoro quando minha ração chega sem atraso. Obrigado, ERPet!"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navbar */}
            <header className="flex items-center justify-between p-6 bg-white shadow">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="ERPet Logo" className="h-8 w-8" />
                    <span className="text-xl font-semibold">ERPet</span>
                </div>
                <nav className="hidden md:flex gap-6 text-gray-700">
                    <a href="#home" className="hover:text-purple-600">Home</a>
                    <a href="#sobre" className="hover:text-purple-600">Sobre</a>
                    <a href="#contato" className="hover:text-purple-600">Contato</a>
                    <a href="#servicos" className="hover:text-purple-600">Serviços</a>
                </nav>
                <BotaoCadastrar className="bg-gray-200 text-gray-800 hover:bg-gray-300">Login</BotaoCadastrar>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between flex-1 p-10 bg-gradient-to-r from-white to-purple-200">
                <div className="max-w-xl space-y-6">
                    <h1 className="text-3xl font-semibold">
                        <span className="font-bold">ERPet</span> – o sistema inteligente para pet shops
                    </h1>
                    <p className="text-gray-700">
                        Organize e automatize a <strong>gestão do seu pet shop</strong> com praticidade.
                    </p>
                    <p className="text-gray-700">
                        Com o ERPet, você controla vendas, estoque, cadastros, agendamentos e muito mais – tudo em um só lugar.
                    </p>
                    <BotaoCadastrar className="bg-purple-600 text-white hover:bg-purple-700">
                        Entre para cuidar do seu pet shop
                    </BotaoCadastrar>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center">
                    <img src="/mascotes.png" alt="Mascotes ERPet" className="max-w-xs md:max-w-md" />
                </div>
            </section>

            {/* CTA Principal */}
            <section className="bg-purple-700 text-white py-16 text-center">
                <h1 className="text-3xl md:text-4xl font-bold">
                    SIMPLIFIQUE A GESTÃO DO SEU PET SHOP COM O ERPET!
                </h1>
                <p className="mt-6 max-w-2xl mx-auto">
                    O ERPet é um sistema feito para facilitar o dia a dia do seu pet shop. Controle estoque, registre vendas, cadastre produtos e clientes — tudo de forma rápida e eficiente!
                </p>
                <Link to="/home">
                    <BotaoCadastrar className="mt-8 bg-yellow-400 text-white hover:bg-yellow-500">
                        Fale com o time ERPet
                    </BotaoCadastrar>
                </Link>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 flex flex-col md:flex-row justify-center gap-6">
                <div className="bg-white shadow-lg p-6 rounded-lg flex items-start gap-4">
                    <img src="/icon-organizado.png" alt="Tudo Organizado" className="w-12 h-12" />
                    <div>
                        <h3 className="font-bold">Tudo Organizado</h3>
                        <p className="text-sm">Cadastro de produtos, pets, fornecedores e mais.</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg flex items-start gap-4">
                    <img src="/icon-estoque.png" alt="Estoque Inteligente" className="w-12 h-12" />
                    <div>
                        <h3 className="font-bold">Estoque Inteligente</h3>
                        <p className="text-sm">Avisa vencimentos e baixa o estoque automaticamente.</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg flex items-start gap-4">
                    <img src="/icon-vendas.png" alt="Registro de Vendas" className="w-12 h-12" />
                    <div>
                        <h3 className="font-bold">Registro de Vendas</h3>
                        <p className="text-sm">Venda com ou sem cliente. Tudo simples e ágil.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-6 text-center space-y-10">
                <h2 className="text-2xl md:text-3xl font-bold">Opiniões De Clientes Sobre Nós</h2>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-orange-400 rounded-[40%] p-6 w-64 h-64 flex flex-col justify-between relative shadow-lg">
                            <div className="flex items-center gap-2">
                                <img src={item.avatar} alt={item.username} className="w-10 h-10 rounded-full border-2 border-white" />
                                <span className="font-semibold text-white">{item.username}</span>
                            </div>
                            <p className="text-white text-sm mt-4">{item.text}</p>
                            <div className="absolute bottom-4 right-4 text-white text-xl">♥</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}