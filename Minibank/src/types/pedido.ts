export interface Pedido {
    id: number;
    nome: string;
    valor: number;
    status: 'Aprovado' | 'Pendente' | 'Rejeitado';
    data: string;
}