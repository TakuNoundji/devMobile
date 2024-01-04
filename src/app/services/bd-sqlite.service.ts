// import { Injectable } from '@angular/core';
// import { SQLiteDBConnection, SQLiteConnection, CapacitorSQLite } from '@capacitor-community/sqlite';
// import { RubriquesService } from './rubriques.service';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs'



// @Injectable({
//   providedIn: 'root',
// })
// export class BdSQLiteService {
//   private readonly BD_NAME = '';
//   private sqlObject: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
//   private sqlBD: SQLiteDBConnection;
//   private etudiantsSubject = new BehaviorSubject<Etudiant[]>([]);
//   private readonly API_URL = 'https://votre-api.com/etudiants';

//   constructor(private http: HttpClient) {}

//   async initializeBD() {
//     this.sqlBD = await this.sqlObject.createConnection(this.BD_NAME, false, 'no-encryption', 1, false);
//     await this.sqlBD.open();
//     await this.creatTable();
//     this.retrieveData();
//   }

//   async creatTable() {
//     const schema = `CREATE TABLE IF NOT EXISTS etudiants ( 
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       nom TEXT NOT NULL,
//       filiere TEXT ,
//       niveau INTEGER DEFAULT 1,
//       age INTEGER NOT NULL 
//     )`;
//     await this.sqlBD.execute(schema);
//   }

//   async retrieveData() {
//     const data = await this.sqlBD.query('SELECT * FROM etudiants');
//     this.etudiantsSubject.next(data.values || []);
//     this.syncData();
//   }

//   async syncData() {
//     // Récupérer les données de l'API
//     this.http.get<Etudiant[]>(this.API_URL).subscribe(
//       (apiData) => {
//         // Comparer les données locales avec les données de l'API
//         // Mettre à jour, ajouter ou supprimer les enregistrements en conséquence
//         this.updateLocalData(apiData);
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des données de l\'API', error);
//       }
//     );
//   }

//   async updateLocalData(apiData: Etudiant[]) {
//     // Comparer les données locales avec les données de l'API
//     // Mettre à jour, ajouter ou supprimer les enregistrements en conséquence
//     // ...

//     // Ensuite, récupérer les données mises à jour de la base de données locale
//     const updatedData = await this.sqlBD.query('SELECT * FROM etudiants');
//     this.etudiantsSubject.next(updatedData.values || []);
//   }

//   async addEtudiant(etudiant: Etudiant): Promise<any> {
//     const query = `INSERT INTO etudiants (nom, filiere, niveau, age) VALUES (?, ?, ?, ?)`;
//     await this.sqlBD.query(query, [etudiant.nom, etudiant.filiere, etudiant.niveau, etudiant.age]);
//     this.retrieveData();
//   }

//   async updateEtudiant(id: number, niveau: number): Promise<any> {
//     const query = `UPDATE etudiants SET niveau = ? WHERE id = ?`;
//     await this.sqlBD.query(query, [niveau, id]);
//     this.retrieveData();
//   }

//   async deleteEtudiant(id: number): Promise<any> {
//     const query = `DELETE FROM etudiants WHERE id = ?`;
//     await this.sqlBD.query(query, [id]);
//     this.retrieveData();
//   }

//   getEtudiants(): Observable<Etudiant[]> {
//     return this.etudiantsSubject.asObservable();
//   }
// }


