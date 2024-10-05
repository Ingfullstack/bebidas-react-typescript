import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

type Props = {
  drink: Drink;
};

function DrinkCard({ drink }: Props) {

    const selectRecipe = useAppStore(state => state.selectRecipe);

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img src={drink.strDrinkThumb} alt="" className="hover:scale-125 transition-transform hover:rotate-2" />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 mt-5 w-full p-2 font-bold text-white text-lg"
          type="button"
          onClick={ () => selectRecipe(drink.idDrink)}
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
}

export default DrinkCard;
