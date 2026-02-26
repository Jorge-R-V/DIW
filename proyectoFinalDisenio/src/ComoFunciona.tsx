import Icon from "./components/Icon"

export default function ComoFunciona() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-lime-200">

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[40vw] h-[40vw] bg-lime-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] bg-emerald-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob [animation-delay:4s]"></div>
      </div>

      <header className="w-full">
        <nav className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center">
          <a href="index.html" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-lime-200 rotate-3 transform transition-transform hover:rotate-0">
              <Icon name="fire" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">
              Nutri<span className="text-lime-500">Track</span>
            </span>
          </a>
          <a href="index.html" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-lime-600 transition-colors">
            Volver
          </a>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <section className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            ¿Cómo funciona <span className="text-lime-500">NutriTrack</span>?
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Nuestra plataforma combina precisión científica con una interfaz intuitiva para ayudarte a alcanzar tus objetivos nutricionales.
          </p>
        </section>

        <div className="grid gap-12 animate-fade-in-up [animation-delay:200ms]">
          {[
            {
              title: "1. Todo empieza con un clic",
              desc: "Añade tus comidas favoritas sin complicaciones. Nuestra tecnología entiende si estás pesando alimentos o si es tu bebida favorita, calculándolo todo en segundos.",
              icon: "pencil-square"
            },
            {
              title: "2. La tranquilidad de lo automático",
              desc: "Olvídate de buscar tablas nutricionales o hacer cuentas difíciles. Recibe un análisis preciso de calorías y nutrientes de forma instantánea, para que tú solo disfrutes.",
              icon: "check"
            },
            {
              title: "3. Toma el control de tu bienestar",
              desc: "Visualiza tus avances cada día. Te damos la claridad necesaria para saber que vas por el buen camino hacia tus objetivos, sin estrés y con total control.",
              icon: "chart"
            }
          ].map((step, i) => (
            <div key={i} className="relative overflow-hidden bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white group hover:scale-[1.02] transition-all min-h-[200px] flex flex-col justify-center">
              <div className="relative z-10 space-y-3 max-w-2xl">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
              <Icon 
                name={step.icon} 
                className="absolute -right-6 -bottom-6 size-48 text-slate-100 group-hover:text-lime-500/10 -rotate-12 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500" 
              />
            </div>
          ))}
        </div>

        <section className="mt-32 text-center bg-slate-900 text-white p-12 md:p-20 rounded-[3rem] shadow-2xl animate-fade-in-up [animation-delay:400ms]">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">¿Listo para empezar?</h2>
          <a 
            href="calculadora.html"
            className="inline-block px-12 py-5 bg-lime-500 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl shadow-lime-900/20 hover:bg-lime-400 transition-all hover:-translate-y-1"
          >
            Ir a la calculadora
          </a>
        </section>
      </main>

      <footer className="py-20 text-center">
        <p className="text-slate-400 text-sm italic">&copy; Jorge-R-V</p>
      </footer>
    </div>
  )
}
