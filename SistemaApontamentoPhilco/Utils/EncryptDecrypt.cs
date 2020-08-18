using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace SistemaApontamentoPhilco.Utils
{
    public class EncryptDecrypt
    {
        static string password = "BritaniA";

        public static string Encrypt(string text)
        {
            if (text == null)
                return null;

            if (password == null)
                password = String.Empty;

            var bytesToBeEncrypted = Encoding.UTF8.GetBytes(text);
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

            var bytesEncrypted = new byte[] { };
            try
            {
                bytesEncrypted = EncryptDecrypt.Encrypt(bytesToBeEncrypted, passwordBytes);
            }
            catch
            {
            }

            return Convert.ToBase64String(bytesEncrypted);
        }

        public static string Decrypt(string encryptedText)
        {
            if (encryptedText == null)
                return null;

            if (password == null)
                password = String.Empty;

            var bytesToBeDecrypted = Convert.FromBase64String(encryptedText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

            var bytesDecrypted = new byte[] { };
            try
            {
                bytesDecrypted = EncryptDecrypt.Decrypt(bytesToBeDecrypted, passwordBytes);
            }
            catch
            {
            }

            return Encoding.UTF8.GetString(bytesDecrypted);
        }

        private static byte[] Encrypt(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        {
            byte[] encryptedBytes = null;

            var saltBytes = new byte[] { 1, 1, 3, 4, 5, 6, 8, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);

                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                        cs.Close();
                    }

                    encryptedBytes = ms.ToArray();
                }
            }

            return encryptedBytes;
        }

        private static byte[] Decrypt(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;

            var saltBytes = new byte[] { 1, 1, 3, 4, 5, 6, 8, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);
                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                        cs.Close();
                    }

                    decryptedBytes = ms.ToArray();
                }
            }

            return decryptedBytes;
        }
    }
}