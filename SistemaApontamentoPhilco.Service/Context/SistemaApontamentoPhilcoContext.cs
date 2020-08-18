using SistemaApontamentoPhilco.Model.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApontamentoPhilco.Service.Context
{
    public class SistemaApontamentoPhilcoContext : DbContext
    {
        public SistemaApontamentoPhilcoContext() : base("SistemaApontamentoPhilcoDB")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<SistemaApontamentoPhilcoContext, AdminConfiguration>());
            //Deixar LazyLoading sempre false
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Perfil> Perfis { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<LogAcesso> LogAcessos { get; set; }
        public DbSet<Apontamento> Apontamentos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }
    }
}
