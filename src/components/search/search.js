import { AsyncPaginate } from 'react-select-async-paginate'
import { useState } from 'react'
import { GEO_API_URL, geoApiOptions } from '../../api'

const Search = ({onSearchChange}) =>{
    const [search, setSearch] = useState(null)

    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
            const result = await response.json();
            const formatted_result = result.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode},`
                };
            });
            return { options: formatted_result }; // Cambio la chiave da "formatted_result" a "options"
        } catch (error) {
            console.error(error);
            return { options: [] };
        }
    };

    return(
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search