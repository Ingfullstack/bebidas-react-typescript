import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard";

function IndexPage() {

  const drinks = useAppStore(state => state.drinks);
  const hasDrinks = useMemo(() => drinks.drinks.length ,[drinks]);

  return (
    <>
      <h1 className=" mx-3 text-6xl font-extrabold">Recetas</h1>

      { hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
          { drinks.drinks.map(drink => (
            <DrinkCard key={ drink.idDrink } drink={ drink } />
          ))}
        </div>
      ): (
        <p className="my-10 text-center text-2xl uppercase">No hay resultados</p>
      )}
    </>
  )
}

export default IndexPage