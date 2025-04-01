import { Component, Input, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service';
import { Rating } from '../models/rating.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-rating',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() userId!: string; // ID del usuario que recibe las valoraciones
    ratings: Rating[] = []; // Lista de valoraciones
    newRating: Rating = { user: { _id: '', name: '', email: '' }, rater: { _id: '', name: '', email: '' }, score: 0, comment: '' }; // Nueva valoración
    page: number = 1; // Página actual
    pageSize: number = 10; // Tamaño de página
    totalRatings: number = 0; // Total de valoraciones

    constructor(private ratingService: RatingService) {}

    ngOnInit(): void {
        this.loadRatings();
    }

    // Cargar las valoraciones del usuario
    loadRatings(): void {
        this.ratingService.getRatingsByUser(this.userId).subscribe(
            (data) => {
                this.ratings = data.ratings;
                this.totalRatings = data.totalRatings;
            },
            (error) => {
                console.error('Error al cargar valoraciones:', error);
            }
        );
    }

    // Añadir una nueva valoración
    addRating(): void {
      // Simula el ID del usuario autenticado que realiza la valoración (rater)
      const loggedInUserId = '67dbe03dbf4d3aa730fafd3e'; // Reemplaza esto con el ID real del usuario autenticado
  
      this.newRating.user._id = this.userId; // Asignar el ID del usuario que recibe la valoración
      this.newRating.rater = { _id: loggedInUserId, name: '', email: '' }; // Asignar el ID del usuario que realiza la valoración
  
      this.ratingService.createRating(this.newRating).subscribe(
          () => {
              this.loadRatings(); // Recargar las valoraciones
              this.newRating = { user: { _id: '', name: '', email: '' }, rater: { _id: '', name: '', email: '' }, score: 0, comment: '' }; // Resetear el formulario
          },
          (error) => {
              console.error('Error al añadir valoración:', error);
          }
      );
  }

    // Eliminar una valoración
    deleteRating(id: string): void {
        this.ratingService.deleteRating(id).subscribe(() => {
            this.loadRatings(); // Recargar las valoraciones
        });
    }

    updateRating(rating: Rating): void {
      this.ratingService.updateRating(rating._id!, { score: rating.score, comment: rating.comment }).subscribe(
          (updatedRating) => {
              const index = this.ratings.findIndex((r) => r._id === updatedRating._id);
              if (index !== -1) {
                  this.ratings[index] = updatedRating;
              }
          },
          (error) => {
              console.error('Error al actualizar la valoración:', error);
          }
      );
  }
}