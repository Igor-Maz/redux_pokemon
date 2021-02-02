import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemonList } from '../redux/actions';
import { Link } from 'react-router-dom';

const PokemonList = (props) => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList);

    useEffect(() => {
        FetchData(1)
    }, []);

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    const ShowData = () => {
        if (!_.isEmpty(pokemonList.data)) {
            return (
                <div className={'list-wrapper'}>
                    {pokemonList.data.map(item => {
                        return (
                            <div className={'pokemon-item'}>
                                <p>{item.name}</p>
                                <Link to={`/pokemon/${item.name}`}>View</Link>
                            </div>
                        )
                    })}
                </div>
            )
        }
        if (pokemonList.loading) {
            return <p>loading...</p>
        }
        if (pokemonList.errorMsg !== '') {
            return <p>{pokemonList.errorMsg}</p>
        }
        return <p>unable to get data</p>
    }

    return (
        <div>
            <div className={'search-wrapper'}>
                <p>Search: </p>
                <input type='text' onChange={e=>setSearch(e.target.value)}/>
                <button onClick={()=> props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {ShowData()}
        </div>)
};

export default PokemonList