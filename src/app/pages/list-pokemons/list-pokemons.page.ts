import { Component, OnInit } from '@angular/core';
import { Pokemons } from 'src/app/models/pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';
import { LoadingController, NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {

  public pokemons!: Pokemons[];

  constructor(private ps:PokemonService, private loadingController:LoadingController, private navController:NavController, private navParams:NavParams) { 
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemon(null);
  }

  async morePokemon($event:any){
    const promise =  this.ps.getPokemons();
    if (promise) {
      let loading:any  = null;
      if (!$event) {
        const loading = await this.loadingController.create({
          message: 'Cargando',
          duration: 3000,
        });
    
        loading.present(); 
      }

      


      promise.then( (result:Pokemons[]) =>{
        this.pokemons =  this.pokemons.concat(result);
        this.pokemons = this.pokemons.sort((p1,p2) => p1.id - p2.id);

        if ($event) {
          $event.target.complete();
        }

        if (loading) {
           loading.dismiss();
        }
      });
    }
  }

  goTodetails(pokemon:any){
    this.navParams.data['pokemon'] = pokemon;
    this.navController.navigateForward('detail-pokemon')
  }
  

}
