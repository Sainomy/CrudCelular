export class Celular {
  
    constructor() {
}
   public id: number;
   public modelo: string;    
   public marca: string; 
   public memoriaInterna: string;    
   public bateria: string;
   
   toString() {
     return this.id+''+this.modelo+''+this.marca+''+this.memoriaInterna+''+this.bateria;
   }
 }