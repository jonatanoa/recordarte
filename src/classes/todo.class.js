
export class Todo{

    constructor (tarea){
        this.tarea      = tarea;
        this.id         = new Date().getTime();//esto lo vamos a tomar como id
        this.completado = false;
        this.creado     = new Date(); 

    }
}