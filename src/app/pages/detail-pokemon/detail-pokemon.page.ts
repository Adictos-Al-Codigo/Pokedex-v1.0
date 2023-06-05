import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Pokemons } from 'src/app/models/pokemons';



@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
})
export class DetailPokemonPage implements OnInit {

  public pokemom:any;

  constructor(private navParams:NavParams,private navController:NavController) {
    this.pokemom = this.navParams.data;
   }

  ngOnInit() {

  }

  goToHome(){
    this.navController.pop();
  }

}
