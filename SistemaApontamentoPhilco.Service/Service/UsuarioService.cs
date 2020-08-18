using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Context;
using SistemaApontamentoPhilco.Service.Contract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SistemaApontamentoPhilco.Service.Service
{
    public class UsuarioService : ISistemaApontamentoPhilco<Usuario>
    {
        SistemaApontamentoPhilcoContext _context;
        public UsuarioService() => _context = new SistemaApontamentoPhilcoContext();

        public void Create(Usuario entity)
        {
            _context.Usuarios.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(Usuario entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Usuario> GetAll()
        {
            return _context.Usuarios.Include("Perfil").Include("Perfil.Menu").ToList();
        }

        public void Update(Usuario entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();
        }

        public Usuario GetById(int id)
        {
            if (id == 0)
                return new Usuario();
            return _context.Usuarios.Find(id);
        }

        public Usuario GetUsuario(string login)
        {
            return _context.Usuarios.Include("Perfil").Include("Perfil.Menu").FirstOrDefault(u => u.Login == login && u.Inativo == false);
        }
    }
}
