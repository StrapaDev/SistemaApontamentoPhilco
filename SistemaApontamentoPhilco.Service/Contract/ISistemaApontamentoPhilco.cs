using System.Collections.Generic;

namespace SistemaApontamentoPhilco.Service.Contract
{
    public interface ISistemaApontamentoPhilco<T>
    {
        void Create(T entity);
        void Delete(T entity);
        IEnumerable<T> GetAll();
        void Update(T entity);
    }
}
