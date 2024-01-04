import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BdService {
  private baseUrl = 'https://mboaculture.ossu-technology.com/api';

  constructor(private storage:Storage, private http : HttpClient) { }
  getNiveaux() {
    return this.http.get(this.baseUrl+"/niveaux")
   }
   async getStoredNiveau(): Promise<any> {
    return this.storage.get('niveau');
  }

  async setStoredNiveau(niveau: any): Promise<void> {
    return this.storage.set('niveau', niveau);
  }

  async getStoredCategorie(): Promise<any> {
    return this.storage.get('categorie');
  }

  async setStoredCategorie(categorie: any): Promise<void> {
    return this.storage.set('categorie', categorie);
  }

  getListQuestions() {
    return this.http.get(this.baseUrl+"/questions")
   }

    getListReponses() {
    return this.http.get(this.baseUrl+"/reponses")
   }
   getCategories() {
    return this.http.get(this.baseUrl+"/categories")
   }
   async getListReponsesByQuestionIdAndCategory(questionId: number, levelId: number, categoryId: number): Promise<any> {
    try {
      // Use the HttpClient service to retrieve all responses from the API
      const allReponses = await (await this.getListReponses()).toPromise();
  
      // Ensure that allReponses is an array
      if (Array.isArray(allReponses)) {
        // Filter the responses for those related to the specified question ID, level, and category
        const filteredReponses = allReponses.filter((reponse: any) =>
          reponse.questions_id === questionId &&
          reponse.niveaux_id === levelId &&
          reponse.categories_id === categoryId
        );
  
        return filteredReponses;
      } else {
        // Handle the case when allReponses is not an array
        console.error('Unexpected response format from getListReponses API call');
        return [];
      }
    } catch (error) {
      console.error('Error retrieving responses by question ID, level, and category', error);
      throw error; // Propagate the error to be handled at a higher level if necessary
    }
  }
  
  getJoueurs(): Promise<any[]> {
    // Vous devrez implémenter cette méthode pour récupérer les joueurs de votre API ou du stockage
    return Promise.resolve([]); // Placeholder, vous devez adapter cela à votre situation
  }

   async getListReponsesByQuestionId(questionId: number): Promise<any> {
    try {
      // Use the HttpClient service to retrieve all responses from the API
      const allReponses = await (await this.getListReponses()).toPromise();
      const storedNiveau = await this.getStoredNiveau();
      const storedCategorie = await this.getStoredCategorie();
      // Ensure that allReponses is an array
      if (Array.isArray(allReponses)) {
        // Filter the responses for those related to the specified question ID
        const filteredReponses = allReponses.filter((reponse: any) => reponse.questions_id === questionId);

        return filteredReponses;
      } else {
        // Handle the case when allReponses is not an array
        console.error('Unexpected response format from getListReponses API call');
        return [];
      }
    } catch (error) {
      console.error('Error retrieving responses by question ID', error);
      throw error; // Propagate the error to be handled at a higher level if necessary
    }
  }
     
  async createDatabase(){
    await this.storage.create()
    await this.storage.defineDriver(cordovaSQLiteDriver);
  }

  setIng4(){
   const etudiant =[{id:1, nom:"Djuomo"},{id:1, nom:"Deumeni"}]
   this.storage.set("students",etudiant)
  }

 async deleteING4(nametable:string){
    this.storage.remove(nametable)
  }

 async getIng4(nomtable:string): Promise<any> {
    return this.storage.get(nomtable)
  }
  async getRubriqueById(rubriqueId: number): Promise<any> {
    try {
      const rubriqueData = await this.http.get<any>(`${this.baseUrl}/rubriques/${rubriqueId}`).toPromise();
      return rubriqueData;
    } catch (error) {
      console.error('Erreur lors de la récupération de la rubrique par ID:', error);
      throw error;
    }
  }
  
  async addIng4(objet:any , nameTable:string){
    
    let etud:any[]=[];
    const rep =await this.getIng4(nameTable);
    etud=rep?rep:[]
    etud.push(objet)
    this.storage.set("nameTable",etud)
  }

  

}
