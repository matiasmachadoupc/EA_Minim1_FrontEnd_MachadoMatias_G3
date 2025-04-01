export interface Rating {
    _id?: string; // ID de la valoración
    user: { _id: string; name: string; email: string }; // Información del usuario que recibe la valoración
    rater: { _id: string; name: string; email: string }; // Información del usuario que realiza la valoración
    score: number; // Puntuación (1-5)
    comment?: string; // Comentario opcional
    createdAt?: Date; // Fecha de creación
}