using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Context;
using SistemaApontamentoPhilco.Service.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApontamentoPhilco.Service.Service
{
    public class MenuService : ISistemaApontamentoPhilco<Menu>
    {
        SistemaApontamentoPhilcoContext _context;

        public MenuService() => _context = new SistemaApontamentoPhilcoContext();

        public void Create(Menu entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Menu entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Menu> GetAll()
        {
            return _context.Menus.Where(o => o.Inativo == false).ToList();
        }

        public void Update(Menu entity)
        {
            throw new NotImplementedException();
        }
    }
}
