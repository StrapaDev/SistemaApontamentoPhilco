using System.Collections.Generic;

namespace SistemaApontamentoPhilco.Model.Model
{
    public class Menu
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Url { get; set; }
        public string Icone { get; set; }
        public int? MenuFilho { get; set; }
        public int Ordem { get; set; }
        public bool Inativo { get; set; }

        public virtual ICollection<Perfil> Perfil { get; set; }
    }
}
