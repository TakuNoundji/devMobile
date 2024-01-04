import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, find, filter } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { catchError, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RubriquesService {
  private baseUrl = 'https://mboaculture.ossu-technology.com/api';
  private storage: Storage | null = null;

  constructor(private http: HttpClient, private storageService: Storage) {
    //this.initStorage();
  }

  async initStorage() {
    this.storage = await this.storageService.create();
  }

  async getNiveaux(): Promise<any[]> {
    try {
      // Essayez d'abord de récupérer les niveaux depuis le stockage local
      const cachedNiveaux = await this.storage?.get('niveaux');
  
      if (cachedNiveaux) {
        // Si les niveaux sont déjà en cache, retournez-les directement
        return cachedNiveaux;
      } else {
        // Sinon, récupérez-les depuis l'API et mettez-les en cache dans Ionic Storage
        const niveauxFromApi = await this.http.get<any[]>(`${this.baseUrl}/niveaux`).toPromise();
  
        if (this.storage) {
          await this.storage.set('niveaux', niveauxFromApi);
        } else {
          console.error('Erreur: storage est null');
        }
  
        // Vérifiez si niveauxFromApi est défini avant de le retourner
        return niveauxFromApi || [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des niveaux:', error);
      return []; // Retournez une liste vide en cas d'erreur
    }
  }
    


  async getAllResponses(): Promise<any[] | undefined> {
    try {
      // Vérifiez d'abord si les réponses sont mises en cache
      const cachedResponses = await this.storage?.get('allResponses');
  
      if (cachedResponses) {
        return cachedResponses;
      } else {
        // Si les réponses ne sont pas en cache, récupérez-les depuis l'API
        const responsesFromApi = await this.http.get<any[]>(`${this.baseUrl}/responses`).toPromise();
  
        // Enregistrez les réponses dans le stockage local
        if (this.storage) {
          await this.storage.set('allResponses', responsesFromApi);
        } else {
          console.error('Erreur: storage est null');
        }
  
        return responsesFromApi || [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les réponses:', error);
      throw error;
    }
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
  

  async getReponsesByQuestionId(id: number): Promise<any[] | undefined> {
    try {
      // Use a single key for all responses, differentiating by question ID
      const allResponses = await this.storage?.get('allResponses') || [];
  
      const cachedReponses = allResponses.find((response: { id: number; reponses: any[] }) => response.id === id)?.reponses;
  
      if (cachedReponses) {
        return cachedReponses;
      } else {
        const reponsesFromApi = await this.http.get<any[]>(`${this.baseUrl}/reponse/${id}`).toPromise();
  
        // Add or update the response for the specific question in the allResponses array
        const updatedAllResponses = allResponses.filter((response: { id: number; reponses: any[] }) => response.id !== id);
        updatedAllResponses.push({ id, reponses: reponsesFromApi });
  
        if (this.storage) {
          await this.storage.set('allResponses', updatedAllResponses);
        } else {
          console.error('Erreur: storage est null');
        }
  
        return reponsesFromApi || [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses par question:', error);
      return [];
    }
  }



  getNiveauById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/niveaux/${id}`);
  }

  async getCategories(): Promise<any[] | undefined> {
    const url = `${this.baseUrl}/categories`;

    try {
      // Récupérez les catégories depuis l'API
      const categories = await this.http.get<any[]>(url).toPromise();

      // Enregistrez les catégories dans le stockage local
      if (this.storage) {
        await this.storage.set('categories', categories);
      } else {
        console.error('Erreur: storage est null');
      }

      return categories; // Retournez également les catégories pour une utilisation immédiate dans le composant
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error; // Vous pouvez choisir de gérer l'erreur de manière appropriée ici
    }
  }


  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories/${id}`);
  }

  async getQuestions(): Promise<Observable<any[]>> {
    // Essayez d'abord de récupérer les questions depuis le stockage local
    if (this.storage) {
      const storedQuestions = await this.storage.get('questions');
      if (storedQuestions) {
        return new Observable<any[]>((observer) => {
          observer.next(storedQuestions);
          observer.complete();
        });
      }
    }

    // Si les questions ne sont pas stockées localement, récupérez-les depuis l'API
    const apiObservable = this.http.get<any[]>(`${this.baseUrl}/questions`);

    // Enregistrez les questions dans le stockage local une fois récupérées de l'API
    apiObservable.subscribe((questions) => {
      if (this.storage) {
        this.storage.set('questions', questions);
      }
    });

    return apiObservable;
  }

 


// rubriques.service.ts

// Ajoutez la fonction pour récupérer les questions par catégorie et niveau
// rubriques.service.ts

// rubriques.service.ts

async getQuestionsParCategorieEtNiveau(idCategorie: number, idNiveau: string): Promise<any> {
  try {
    const cachedQuestionsAndReponses = await this.storage?.get(`questions_${idCategorie}_${idNiveau}`);

    if (cachedQuestionsAndReponses) {
      return cachedQuestionsAndReponses;
    } else {
      const questionsAndReponsesFromApi = await this.http
        .get<any[]>(`${this.baseUrl}/questionsCatNiv/${idCategorie}/${idNiveau}`)
        .toPromise();

      if (this.storage) {
        await this.storage.set(`questions_${idCategorie}_${idNiveau}`, questionsAndReponsesFromApi);
      } else {
        console.error('Erreur: storage est null');
      }

      return questionsAndReponsesFromApi || [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des questions et réponses:', error);
    throw error;
  }
}

async saveQuestionWithResponses(questionData: any): Promise<void> {
  try {
    // Save the question and responses to the API
    const savedQuestion = await this.http.post<any>(`${this.baseUrl}/questionsCatNiv`, questionData).toPromise();

    // Update the locally stored questions and responses
    if (this.storage) {
      const updatedQuestions = await this.getQuestionsParCategorieEtNiveau(questionData.categories_id, questionData.niveaux_id);
      this.storage.set(`questions_${questionData.categories_id}_${questionData.niveaux_id}`, updatedQuestions);
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la question avec réponses:', error);
    throw error;
  }
}



  // Autres méthodes pour CRUD

  // Par exemple, pour ajouter une question avec gestion du stockage local
  async addQuestion(questionData: any): Promise<Observable<any>> {
    return new Observable<any>((observer) => {
      this.http.post<any>(`${this.baseUrl}/questions`, questionData).subscribe(
        async (response) => {
          // Mettez à jour les questions stockées localement
          if (this.storage) {
            (await this.getQuestions()).subscribe((response:any)=>{

            }); // Cela mettra à jour les questions dans le stockage local
          }

          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
