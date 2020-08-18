using System;

namespace SistemaApontamentoPhilco.Model.Model
{
    public class LogAcesso
    {
        public long Id { get; set; }
        public DateTime Data { get; set; }

        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
