using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Context;
using SistemaApontamentoPhilco.Service.Contract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SistemaApontamentoPhilco.Service.Service
{
    public class ApontamentoService : ISistemaApontamentoPhilco<Apontamento>
    {
        SistemaApontamentoPhilcoContext _context;
        public ApontamentoService() => _context = new SistemaApontamentoPhilcoContext();

        public void Create(Apontamento entity)
        {
            _context.Apontamentos.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(Apontamento entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Apontamento> GetAll()
        {
            return _context.Apontamentos.ToList();
        }

        public void Update(Apontamento entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();
        }

        public Apontamento GetByNumeroSerie(string numeroSerie)
        {
            if (string.IsNullOrEmpty(numeroSerie))
                return new Apontamento();
            return _context.Apontamentos.Where(o => o.NumeroSerie == numeroSerie).FirstOrDefault();
        }

        public Apontamento GetBySequencial(string sequencial)
        {
            if (string.IsNullOrEmpty(sequencial))
                return new Apontamento();
            return _context.Apontamentos.Where(o => o.Sequencial == sequencial).FirstOrDefault();
        }

        public Apontamento GetByNumeroSerieAndSequencial(string numeroSerie, string sequencial)
        {
            return _context.Apontamentos.Where(o => o.NumeroSerie == numeroSerie && o.Sequencial == sequencial).FirstOrDefault();
        }
    }
}
