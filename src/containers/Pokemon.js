import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemon } from '../redux/actions';
import _ from 'lodash';

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch()
    const pokemonState = useSelector(state => state.pokemon)

    useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, [])

    const ShowData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName]
            return (
                <div className={'pokemon-wrapper'}>
                    <div className={'item'}>
                        <h1>Sprites</h1>
                        <img src={pokeData.sprites.front_default} alt='' />
                        <img src={pokeData.sprites.back_default} alt='' />
                        <img src={pokeData.sprites.front_shiny} alt='' />
                        <img src={pokeData.sprites.back_shiny} alt='' />
                    </div>
                    <div className={'item'}>
                        <h1>Stats</h1>
                        {pokeData.stats.map(stat => {
                            return <p>{stat.stat.name} - {stat.base_stat}</p>
                        })}
                    </div>
                    <div className={'item'}>
                        <h1>Abilities</h1>
                        {pokeData.abilities.map(ability => {
                            return <p>{ability.ability.name}</p>
                        })}
                    </div>
                </div>
            )
        }
        if (pokemonState.loading) {
            return <p>loading...</p>
        }
        if (pokemonState.errorMsg !== '') {
            return <p>{pokemonState.errorMsg}</p>
        }
        return <p>unable to get data</p>
    }
    return (
        <div className={'pokemon'}>
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    )
};

export default Pokemon