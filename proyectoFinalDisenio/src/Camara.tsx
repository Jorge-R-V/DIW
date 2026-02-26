export default function Camara() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans overflow-hidden select-none relative">

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(132, 204, 22, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(132, 204, 22, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      ></div>
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-lime-100/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl w-full mx-6">
        <div className="relative group">

          <div className="backdrop-blur-3xl bg-white/60 p-12 md:p-24 rounded-[3rem] border border-white shadow-2xl shadow-lime-900/5 relative overflow-hidden transition-all duration-500 group-hover:bg-white/80">

            <div className="absolute top-0 left-0 h-[3px] w-full z-10 opacity-0 animate-scan bg-gradient-to-r from-transparent via-lime-500/50 to-transparent shadow-[0_0_20px_rgba(132,204,22,0.4)]"></div>

            <div className="relative flex flex-col items-center">

              <div className="mb-12 relative animate-float">
                <div className="absolute inset-0 bg-lime-400 blur-3xl opacity-20"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-3xl flex items-center justify-center relative z-10 shadow-xl shadow-lime-200/50 rotate-3 transition-transform hover:rotate-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-50 rounded-full border border-lime-100 mb-6">
                  <span className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse"></span>
                  <span className="text-lime-700 text-[10px] font-black uppercase tracking-widest">
                    AI Vision v2.0
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                  Cámara{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600">
                    Inteligente
                  </span>
                </h1>

                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm mx-auto mb-12">
                  Analizando texturas y volúmenes. La red neuronal está
                  aprendiendo a reconocer tus platos favoritos.
                </p>

                <div className="flex flex-col items-center">
                  <div className="px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-slate-200 mb-10 transition-transform hover:scale-105 cursor-default">
                    Próximamente
                  </div>

                  <a
                    href="index.html"
                    className="flex items-center gap-3 text-slate-400 hover:text-lime-600 transition-all font-black text-[10px] uppercase tracking-[0.3em] group/link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="w-4 h-4 transform group-hover/link:-translate-x-1 transition-transform"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                    Volver al inicio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
