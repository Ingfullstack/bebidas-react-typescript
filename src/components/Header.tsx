import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { SearchFilter } from "../types";

function Header() {
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    ingredient: '',
    category: ''
  })
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const fetchCategories = useAppStore(state => state.fetchCategories);
  const categories = useAppStore(state => state.categories);
  const searchRecipes = useAppStore(state => state.searchRecipes);
  const showNotification = useAppStore(state => state.showNotification);

  useEffect(() => {
    fetchCategories()
  },[]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Validar
    if (Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true,
      })
      return;
    }

    searchRecipes(searchFilters);

    setSearchFilters({
      ingredient: '',
      category: ''
    })
  }

  return (
    <header className={ isHome ? 'bg-header bg-cover bg-center bg-no-repeat' : 'bg-slate-800'}>
      <div className="container mx-auto px-5 py-10">
        <div className="flex justify-between items-center">
          <div className="">
            <img src="/logo.svg" alt="" className="w-32" />
          </div>

          <nav className="flex gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form onSubmit={ handleSubmit } className="w-full md:w-1/2 lg:w-1/3 bg-orange-400 my-20 p-6 rounded shadow">
            <div className="mb-5">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg mb-2"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                className="p-3 w-full rounded focus:outline-none"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Cafe"
                value={searchFilters.ingredient}
                onChange={ handleChange }
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg mb-2"
              >
                Categorias
              </label>
              <select
                name="category"
                id="category"
                className="p-3 w-full rounded focus:outline-none"
                value={searchFilters.category}
                onChange={ handleChange}
              >
                <option value="">Seleccione</option>
                { categories.drinks.map(item => (
                  <option key={item.strCategory} value={item.strCategory}>{ item.strCategory }</option>
                ))}
              </select>
            </div>

            <input type="submit" value="Buscar Recetas" className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded uppercase"/>

          </form>
        )}
      </div>
    </header>
  );
}

export default Header;
