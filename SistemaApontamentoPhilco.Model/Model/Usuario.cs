using System.Collections.Generic;

namespace SistemaApontamentoPhilco.Model.Model
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Nome { get; set; }
        public bool SenhaIntegrada { get; set; }
        public string Senha { get; set; }
        public bool Inativo { get; set; }

        public int PerfilId { get; set; }
        public virtual Perfil Perfil { get; set; }

        public ICollection<LogAcesso> LogAcesso { get; set; }
        public ICollection<Apontamento> Apontamento { get; set; }
    }
}
