using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Context;
using SistemaApontamentoPhilco.Service.Contract;
using System;
using System.Collections.Generic;

namespace SistemaApontamentoPhilco.Service.Service
{
    public class LogAcessoService : ISistemaApontamentoPhilco<LogAcesso>
    {
        SistemaApontamentoPhilcoContext _context;

        public LogAcessoService() => _context = new SistemaApontamentoPhilcoContext();

        public void Create(LogAcesso entity)
        {
            _context.LogAcessos.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(LogAcesso entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<LogAcesso> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(LogAcesso entity)
        {
            throw new NotImplementedException();
        }
    }
}
