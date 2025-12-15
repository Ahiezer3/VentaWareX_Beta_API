export class MyResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
  
    constructor() {
      this.success = false;
      this.message = "Respuesta incompleta.";
      this.data = null;
    }
  
    async generateResponse(resultFunction: () => Promise<T>): Promise<MyResponse<T>> {
      try {
        const result = await resultFunction();
        this.success = true;
        this.message = "Operación exitosa.";
        this.data = result;
      } catch (error) {
        this.message = "Ocurrió un error. " + error.message;
        console.log("Ocurrió un error. "+error.stack);
      }
  
      return this;
    }
  }
  