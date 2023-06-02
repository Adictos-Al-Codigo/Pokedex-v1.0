import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { Pokemons } from '../models/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _nexturl!: string;

  constructor() {
    this.nexturl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
   }

  public get nexturl(): string {
    return this._nexturl;
  }
  public set nexturl(value: string) {
    this._nexturl = value;
  }

  getPokemons(){
    const url = this.nexturl;
    if (url) {
      const options = {
        url,
        headers: {

        },
        params: {}
      }
      return Http.get(options).then(async (response) =>{
        let pokemons_array:any = []

        if (response.data) {
          const result = response.data.results;
          this.nexturl = response.data.next;


          for (let index = 0; index < result.length; index++) {
            const pokemons = result[index];
            const urlPokemon = pokemons.url;
            const options = {
              url: urlPokemon,
              headers: {},
              params: {}
            };
            await Http.get(options).then(pok =>{
              const pokData = pok.data;
              // console.log(pokData);
              const pokObj = new Pokemons();
              pokObj.id = pokData.order;
              pokObj.name = pokData.name;
              pokObj.type1 = pokData.types[0].type.name;
              if (pokData.types[1]) {
                pokObj.type2 = pokData.types[1].type.name;
              }

              pokObj.sprite = pokData.sprites.front_default;
              pokObj.peso = pokData.weight;
              pokObj.height = pokData.height;
              pokObj.stats = pokData.stats;
              pokObj.abilities = pokData.abilities;

              pokemons_array.push(pokObj);
            });
          }

          return pokemons_array;
        }
      });
    }

    return null;
  }
}
