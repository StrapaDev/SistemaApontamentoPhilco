using System.Security.Cryptography;
using System.Text;

namespace SistemaApontamentoPhilco.Utils
{
    public class Util
    {
        public static string CalculaSHA256Hash(string senha)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(senha));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("X2"));
                }
                return builder.ToString();
            }
        }
    }
}