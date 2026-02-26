import Icon from "./Icon"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"

type ListadoActividadesProps = {
    activities: Activity[]
    setActiveId: (id: Activity['id']) => void
    deleteActivity: (id: Activity['id']) => void
}

export default function ListadoActividades({activities, setActiveId, deleteActivity} : ListadoActividadesProps) {

    const categoryName = useMemo(() => 
        (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '')
    , [])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <div className="space-y-10">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">
                    Historial de <span className="text-lime-500 not-italic">Actividad</span>
                </h2>
                <div className="h-1 w-12 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {isEmptyActivities ? 
                <p className="text-center my-5 text-gray-400">No hay actividades aún...</p> : 
                
                activities.map( activity => (
                    <div key={activity.id} className="relative bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all hover:scale-[1.01]">
                        <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    activity.category === 1 
                                    ? 'bg-lime-100 text-lime-700' 
                                    : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {categoryName(+activity.category)}
                                </span>
                                {activity.category === 1 && (
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">
                                        {activity.quantity || 1} {activity.unit === 'ml' ? 'ml' : (activity.unit === 'g' ? 'g' : (activity.quantity === 1 ? 'Unidad' : 'Unidades'))}
                                    </span>
                                )}
                            </div>

                            <p className="text-2xl font-black text-slate-800 tracking-tight">
                                {activity.name.replace(/\s\(\d+\w+\)|\s\(1 unidad\)/g, '')}
                            </p>

                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-lime-500 tracking-tighter">
                                    {typeof activity.calories === 'number' ? Number(activity.calories).toFixed(2).replace(/\.00$/, '') : activity.calories}
                                </span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calorías</span>
                            </div>

                            {activity.category === 1 && (
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-4 border-t border-slate-50">
                                    {[
                                        {label: 'Gra', value: activity.fat, color: 'text-yellow-600'},
                                        {label: 'Azú', value: activity.sugar, color: 'text-purple-600'},
                                        {label: 'Pro', value: activity.protein, color: 'text-red-600'},
                                        {label: 'Car', value: activity.carbs, color: 'text-blue-600'},
                                        {label: 'Fib', value: activity.fiber, color: 'text-emerald-600'},
                                        {label: 'Sod', value: activity.sodium, color: 'text-pink-600', unit: 'mg'}
                                    ].map(n => (
                                        <div key={n.label} className="text-center">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mb-0.5">{n.label}</p>
                                            <p className={`text-xs font-bold ${n.color}`}>
                                                {typeof n.value === 'number' ? Number(n.value).toFixed(2).replace(/\.00$/, '') : n.value || 0}
                                                <span className="text-[8px] ml-0.5">{n.unit || 'g'}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex md:flex-col gap-3 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-50 md:pl-8">
                            <button
                                onClick={() => setActiveId(activity.id)}
                                className="flex-1 md:flex-none p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-lime-50 hover:text-lime-600 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                            >
                                <Icon name="pencil-square" className="h-5 w-5" />
                                <span className="md:hidden">Editar</span>
                            </button>

                            <button
                                onClick={() => deleteActivity(activity.id)}
                                className="flex-1 md:flex-none p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                            >
                                <Icon name="x-circle" className="h-5 w-5" />
                                <span className="md:hidden">Borrar</span>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
