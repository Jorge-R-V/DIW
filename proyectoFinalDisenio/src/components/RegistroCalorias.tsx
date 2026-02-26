type RegistroCaloriasProps = {
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    totalFat: number
    totalSugar: number
    totalProtein: number
    totalCarbs: number
    totalFiber: number
    totalSodium: number
}

export default function RegistroCalorias({
    caloriesConsumed, 
    caloriesBurned, 
    netCalories, 
    totalFat, 
    totalSugar,
    totalProtein,
    totalCarbs,
    totalFiber,
    totalSodium
} : RegistroCaloriasProps) {
    
    return (
        <div className="space-y-10">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">
                    Dashboard <span className="text-lime-500 not-italic">Nutricional</span>
                </h2>
                <div className="h-1 w-12 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {label: 'Consumidas', value: caloriesConsumed, color: 'text-lime-500', bg: 'bg-lime-50/50'},
                    {label: 'Quemadas', value: caloriesBurned, color: 'text-orange-500', bg: 'bg-orange-50/50'},
                    {label: 'Balance', value: netCalories, color: 'text-sky-500', bg: 'bg-sky-50/50'}
                ].map(stat => (
                    <div key={stat.label} className={`p-8 rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/50 border border-white text-center transition-all hover:scale-[1.02]`}>
                        <span className={`block font-black text-6xl tracking-tighter ${stat.color}`}>{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 mt-2 block">{stat.label}</span>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 text-center">Desglose de Macronutrientes</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {[
                        {label: 'Grasas', value: totalFat, color: 'text-yellow-400', unit: 'g'},
                        {label: 'Azúcares', value: totalSugar, color: 'text-purple-400', unit: 'g'},
                        {label: 'Proteínas', value: totalProtein, color: 'text-red-400', unit: 'g'},
                        {label: 'Carbos', value: totalCarbs, color: 'text-blue-400', unit: 'g'},
                        {label: 'Fibra', value: totalFiber, color: 'text-emerald-400', unit: 'g'},
                        {label: 'Sodio', value: totalSodium, color: 'text-pink-400', unit: 'mg'}
                    ].map(nutrient => (
                        <div key={nutrient.label} className="text-center group">
                            <span className={`block font-black text-2xl mb-1 transition-transform group-hover:scale-110 ${nutrient.color}`}>
                                {nutrient.value}
                                <span className="text-[10px] ml-0.5 opacity-50">{nutrient.unit}</span>
                            </span>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">{nutrient.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
