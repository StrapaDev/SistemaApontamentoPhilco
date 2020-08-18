using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Context;
using SistemaApontamentoPhilco.Service.Contract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SistemaApontamentoPhilco.Service.Service
{
    public class PerfilService : ISistemaApontamentoPhilco<Perfil>
    {
        SistemaApontamentoPhilcoContext _context;
        public PerfilService() => _context = new SistemaApontamentoPhilcoContext();

        public void Create(Perfil entity)
        {
            _context.Perfis.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(Perfil entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Perfil> GetAll()
        {
            return _context.Perfis.ToList();
        }

        public void Update(Perfil entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();
        }

        public Perfil GetById(int id)
        {
            return _context.Perfis.Include("Menu").Include("Usuario").FirstOrDefault(p => p.Id == id);
        }
    }
}
