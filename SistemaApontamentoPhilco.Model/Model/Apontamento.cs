using System;

namespace SistemaApontamentoPhilco.Model.Model
{
    public class Apontamento
    {
        public int Id { get; set; }
        public string NumeroSerie { get; set; }
        public string Sequencial { get; set; }
        public DateTime Data { get; set; }

        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
