using System.Collections.Generic;

namespace SistemaApontamentoPhilco.Model.Model
{
    public class Perfil
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public bool Inativo { get; set; }

        public ICollection<Usuario> Usuario { get; set; }
        public ICollection<Menu> Menu { get; set; }
    }
}
