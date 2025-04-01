import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    private apiUrl = 'http://localhost:9000/api/ratings'; // URL base del endpoint de valoraciones

    constructor(private http: HttpClient) {}

    // Crear una nueva valoración
    createRating(rating: Rating): Observable<Rating> {
        return this.http.post<Rating>(this.apiUrl, rating);
    }

    getRatingsByUser(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${userId}`);
    }

    // Actualizar una valoración
    updateRating(id: string, rating: Partial<Rating>): Observable<Rating> {
        return this.http.put<Rating>(`${this.apiUrl}/${id}`, rating);
    }

    // Eliminar una valoración
    deleteRating(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}