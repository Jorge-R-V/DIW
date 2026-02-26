import { useEffect } from "react"
import Icon from "./components/Icon"
import FormularioActividades from "./components/FormularioActividades"
import ListadoActividades from "./components/ListadoActividades"
import RegistroCalorias from "./components/RegistroCalorias"
import { useActivity } from "./hooks/useActivity"

function App() {

  // Hook personalizado que maneja toda la lógica del estado (activities, totales, acciones)
  const {
    activities,
    activeId,
    setActiveId,
    saveActivity,
    deleteActivity,
    restartApp,
    netCalories,
    caloriesConsumed, 
    caloriesBurned, 
    totalFat, 
    totalSugar,
    totalProtein,
    totalCarbs,
    totalFiber,
    totalSodium,
    isEmptyActivities
  } = useActivity()

  // Cuando se pulsa "Editar", hacemos scroll suave hacia arriba para ver el formulario
  useEffect(() => {
    if(activeId) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [activeId])

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-lime-200">

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[40vw] h-[40vw] bg-lime-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] bg-emerald-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob [animation-delay:4s]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-yellow-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob [animation-delay:8s]"></div>
      </div>

      <header className="w-full transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center transition-all">
          <a href="index.html" className="flex items-center gap-3 animate-fade-in-up hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-lime-200 rotate-3 transform transition-transform hover:rotate-0">
              <Icon name="fire" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Nutri<span className="text-lime-500">Track</span>
            </h1>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">
        <section className="animate-fade-in-up">
          <FormularioActividades 
            saveActivity={saveActivity}
            activeId={activeId}
            activities={activities}
            key={activeId}
          />
        </section>

        <section className="animate-fade-in-up [animation-delay:200ms]">
          <RegistroCalorias 
            caloriesConsumed={caloriesConsumed}
            caloriesBurned={caloriesBurned}
            netCalories={netCalories}
            totalFat={totalFat}
            totalSugar={totalSugar}
            totalProtein={totalProtein}
            totalCarbs={totalCarbs}
            totalFiber={totalFiber}
            totalSodium={totalSodium}
          />

          {!isEmptyActivities && (
            <div className="mt-12 flex justify-center">
              <button
                className="btn-secondary"
                onClick={restartApp}
              >
                Reiniciar Aplicación
              </button>
            </div>
          )}
        </section>

        <section className="animate-fade-in-up [animation-delay:400ms]">
          <ListadoActividades 
            activities={activities}
            setActiveId={setActiveId}
            deleteActivity={deleteActivity}
          />
        </section>
      </main>

      <footer className="py-20 border-t border-slate-100 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300 mb-4">NutriTrack Digital</p>
        <p className="text-slate-400 text-sm italic">&copy; Jorge-R-V</p>
      </footer>
    </div>
  )
}

export default App
