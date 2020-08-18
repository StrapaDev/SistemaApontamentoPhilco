using System.Data.Entity.Migrations;

namespace SistemaApontamentoPhilco.Service.Context
{
    internal sealed class AdminConfiguration : DbMigrationsConfiguration<SistemaApontamentoPhilcoContext>
    {
        public AdminConfiguration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
    }
}
