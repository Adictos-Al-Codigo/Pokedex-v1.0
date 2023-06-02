export class Pokemons {
    id!:number;
    name!:string;
    type1!:string;
    type2?:string;
    sprite!:string;
    height!:number;
    peso!:number;
    abilities!: any[];
    stats!: any[];

    hasHiddenAbility(){
        return this.abilities.find(ab => ab.is_hidden)
    }

    getHiddenAbility(){
        const ability = this.abilities.find(ab => ab.is_hidden);
        return ability.ability.name;
    }

    getAbilities(){
        const abilities = this.abilities.filter(ab => !ab.is_hidden);
        return abilities;
    }

    getStat(nameStat: string){
        const statFound = this.stats.find(s => s.stat.name === nameStat);
        return statFound.base_stat;
    }

    getHeigthToMetres(){
        return this.height / 10;
    }

    getWeigthToKg(){
        return this.peso / 10;
    }
}
