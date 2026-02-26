import { useState, type ChangeEvent, type FormEvent } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { products } from "../data/products"

type FormularioActividadesProps = {
    saveActivity: (activity: Activity) => void
    activeId: Activity['id']
    activities: Activity[]
}

// Estado inicial del formulario vacío
const initialState : Activity = {
    id: '',
    category: 1,
    name: '',
    calories: 0,
    fat: 0,
    sugar: 0,
    protein: 0,
    carbs: 0,
    fiber: 0,
    sodium: 0,
    quantity: 1,
    unit: 'unid'
}

export default function FormularioActividades({saveActivity, activeId, activities} : FormularioActividadesProps) {

    // Inicializa el estado 'activity'
    const [activity, setActivity] = useState<Activity>(() => {
        // Si hay un activeId, significa que estamos editando: busca la actividad en el array
        if (activeId) {
            return activities.find(stateActivity => stateActivity.id === activeId)!
        }
        

        // Si no, revisa si hay un parámetro 'category' en la URL para pre-seleccionar (1: Comida, 2: Ejercicio)
        const params = new URLSearchParams(window.location.search)
        const categoryParam = params.get('category')
        if (categoryParam && (categoryParam === '1' || categoryParam === '2')) {
            return {
                ...initialState,
                category: +categoryParam
            }
        }
        
        return initialState
    })

    const [baseNutrients, setBaseNutrients] = useState({
        calories: activity.calories / (activity.quantity || 1),
        fat: activity.fat / (activity.quantity || 1),
        sugar: activity.sugar / (activity.quantity || 1),
        protein: activity.protein / (activity.quantity || 1),
        carbs: activity.carbs / (activity.quantity || 1),
        fiber: activity.fiber / (activity.quantity || 1),
        sodium: activity.sodium / (activity.quantity || 1),
    })

    // Maneja los cambios en los inputs del formulario
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id
        const value = e.target.value
        // Determina si el campo debe ser tratado como número
        const isNumberField = ['category', 'calories', 'fat', 'sugar', 'quantity', 'protein', 'carbs', 'fiber', 'sodium'].includes(id)

        // Lógica especial para cuando cambia la 'cantidad' de un alimento
        if (id === 'quantity' && activity.category === 1) {
            const newQuantity = +value
            
            if (newQuantity <= 0) {
                setActivity({ ...activity, quantity: newQuantity })
                return
            }

            // Recalcula automáticamente todos los nutrientes basándose en la nueva cantidad y los valores base
            setActivity({
                ...activity,
                quantity: newQuantity,
                calories: Number((baseNutrients.calories * newQuantity).toFixed(2)),
                fat: Number((baseNutrients.fat * newQuantity).toFixed(2)),
                sugar: Number((baseNutrients.sugar * newQuantity).toFixed(2)),
                protein: Number((baseNutrients.protein * newQuantity).toFixed(2)),
                carbs: Number((baseNutrients.carbs * newQuantity).toFixed(2)),
                fiber: Number((baseNutrients.fiber * newQuantity).toFixed(2)),
                sodium: Number((baseNutrients.sodium * newQuantity).toFixed(2)),
            })
            return
        }

        const newValue = isNumberField ? +value : value

        // Si se cambia manualemente un nutriente, actualizamos los valores base proporcionalmente
        if (['calories', 'fat', 'sugar', 'protein', 'carbs', 'fiber', 'sodium'].includes(id) && activity.category === 1) {
            const qty = activity.quantity || 1
            setBaseNutrients({
                ...baseNutrients,
                [id]: +value / qty
            })
        }

        setActivity({
            ...activity,
            [id]: newValue
        })
    }

    // Función para poblar el formulario cuando se selecciona un producto predefinido
    const handleProductSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === 'manual') {
            // Reinicia el formulario para entrada manual
            const resetActivity = {
                ...initialState,
                category: activity.category,
                id: activity.id
            }
            setActivity(resetActivity)
            setBaseNutrients({
                calories: 0, fat: 0, sugar: 0, protein: 0, carbs: 0, fiber: 0, sodium: 0
            })
            return
        }

        const selectedProd = products.find(p => p.name === e.target.value)
        if(selectedProd) {
            // Carga todos los datos del producto seleccionado
            setActivity({
                ...activity,
                name: selectedProd.name,
                calories: selectedProd.calories,
                fat: selectedProd.fat,
                sugar: selectedProd.sugar,
                protein: selectedProd.protein,
                carbs: selectedProd.carbs,
                fiber: selectedProd.fiber,
                sodium: selectedProd.sodium,
                quantity: selectedProd.quantity,
                unit: selectedProd.unit
            })
            setBaseNutrients({
                calories: selectedProd.calories / (selectedProd.quantity || 1),
                fat: selectedProd.fat / (selectedProd.quantity || 1),
                sugar: selectedProd.sugar / (selectedProd.quantity || 1),
                protein: selectedProd.protein / (selectedProd.quantity || 1),
                carbs: selectedProd.carbs / (selectedProd.quantity || 1),
                fiber: selectedProd.fiber / (selectedProd.quantity || 1),
                sodium: selectedProd.sodium / (selectedProd.quantity || 1)
            })
        }
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        saveActivity(activity)
        setActivity({
            ...initialState
        })
        setBaseNutrients({
            calories: 0, fat: 0, sugar: 0, protein: 0, carbs: 0, fiber: 0, sodium: 0
        })
    }

    return (
        <form 
            className="card-glass space-y-8"
            onSubmit={handleSubmit}
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black tracking-tight text-slate-800">
                    Registrar <span className="text-lime-500">Actividad</span>
                </h2>
                <p className="text-slate-400 text-sm mt-2">Dinos qué has comido o cuánto has entrenado hoy.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <label htmlFor="category" className="label-uppercase">Categoría</label>
                <div className="flex p-1 bg-slate-100 rounded-2xl">
                    {categories.map(category => (
                        <button
                            type="button"
                            key={category.id}
                            onClick={() => setActivity({...activity, category: category.id})}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                                activity.category === category.id 
                                ? 'bg-white text-slate-900 shadow-sm' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div key={activity.category} className="space-y-8 animate-switch">
                <div className="grid grid-cols-1 gap-4">
                    <label htmlFor="product-hint" className="label-uppercase">
                        {activity.category === 1 ? 'Seleccionar Alimento' : 'Seleccionar Ejercicio'}
                    </label>
                    <div className="relative group">
                        <select 
                            id="product-hint"
                            className="input-field appearance-none cursor-pointer"
                            onChange={handleProductSelect}
                            value=""
                        >
                            <option value="" disabled>-- Selecciona del catálogo --</option>
                            {products
                                .filter(p => p.category === activity.category)
                                .map(p => (
                                    <option key={p.name} value={p.name}>{p.name}</option>
                                ))
                            }
                            <option disabled>──────────</option>
                            <option value="manual">+ Otros / Entrada Manual</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <label htmlFor="name" className="label-uppercase">
                        {activity.category === 1 ? 'Alimento' : 'Actividad'}
                    </label>
                    <input 
                        id="name"
                        type="text"
                        className="input-field"
                        placeholder={activity.category === 1 ? 'Ej. Manzana, Tostadas...' : 'Ej. Correr, Natación...'}
                        value={activity.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activity.category === 1 && (
                        <div className="grid grid-cols-1 gap-4">
                            <label htmlFor="quantity" className="label-uppercase">
                                {activity.unit === 'ml' ? 'Mililitros (ml)' : (activity.unit === 'g' ? 'Gramos (g)' : 'Cantidad')}
                            </label>
                            <div className="relative">
                                <input 
                                    id="quantity"
                                    type="number"
                                    className="w-full bg-lime-50/50 border-none p-4 rounded-2xl text-lime-700 font-bold focus:ring-2 focus:ring-lime-500/20 transition-all"
                                    value={activity.quantity}
                                    onChange={handleChange}
                                    min="1"
                                />
                                {activity.unit === 'ml' && (
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-lime-600/40 uppercase tracking-widest pointer-events-none">ml</span>
                                )}
                                {activity.unit === 'g' && (
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-lime-600/40 uppercase tracking-widest pointer-events-none">g</span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        <label htmlFor="calories" className="label-uppercase">
                            {activity.category === 1 ? 'Calorías Base' : 'Calorías Quemadas'}
                        </label>
                        <input 
                            id="calories"
                            type="number"
                            className="input-field font-bold"
                            placeholder="0"
                            value={activity.calories}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {activity.category === 1 && (
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Desglose Nutricional</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                {id: 'fat', label: 'Grasas', unit: 'g'},
                                {id: 'sugar', label: 'Azúcares', unit: 'g'},
                                {id: 'protein', label: 'Proteínas', unit: 'g'},
                                {id: 'carbs', label: 'Carbos', unit: 'g'},
                                {id: 'fiber', label: 'Fibra', unit: 'g'},
                                {id: 'sodium', label: 'Sodio', unit: 'mg'}
                            ].map(nutrient => (
                                <div key={nutrient.id} className="grid grid-cols-1 gap-2">
                                    <label htmlFor={nutrient.id} className="label-uppercase !ml-1 !text-[10px]">{nutrient.label}</label>
                                    <div className="relative">
                                        <input 
                                            id={nutrient.id}
                                            type="number"
                                            className="w-full bg-slate-50 border-none p-3 pr-8 rounded-xl text-sm text-slate-700 font-medium focus:ring-2 focus:ring-lime-500/20 transition-all"
                                            value={activity[nutrient.id as keyof Activity]}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300 uppercase">{nutrient.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="btn-dark"
                disabled={!isValidActivity()}
            >
                {activity.category === 1 ? 'Guardar Alimento' : 'Guardar Actividad'}
            </button>
        </form>
    )
}
