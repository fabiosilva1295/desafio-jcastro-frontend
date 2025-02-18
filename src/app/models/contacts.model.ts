export interface Contact {
    _id?: string;
    nome?: string;
    email?: string;
    celular: string;
    telefone?: string;
    favorito?: boolean;
    ativo?: boolean;
    last_updated?: Date;
    createdAt?: Date;
}