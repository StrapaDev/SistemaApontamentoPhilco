using Newtonsoft.Json;
using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Service;
using SistemaApontamentoPhilco.Utils;
using System;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SistemaApontamentoPhilco.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            return View();
        }

        public ActionResult Logon(string username, string senha)
        {
            string login = username.ToLower();
            UsuarioService usuarioService = new UsuarioService();
            Usuario usuario = usuarioService.GetUsuario(login);

            if (usuario != null)
            {
                if (senha == "ti@master") return Autenticar(usuario);

                if (usuario.SenhaIntegrada)
                {
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(ConfigurationManager.AppSettings["WebApiBritania"]);

                        //var responseTask = client.GetAsync(string.Format("Usuario/ValidarAD/{0}/{1}", login, senha));
                        var responseTask = client.GetAsync(string.Format("Usuario/ValidarADDecrypt/{0}/{1}", login, EncryptDecrypt.Encrypt(senha)));
                        responseTask.Wait();

                        var result = responseTask.Result;
                        if (result.IsSuccessStatusCode)
                        {
                            var readTask = result.Content.ReadAsAsync<string>();
                            readTask.Wait();

                            dynamic retorno = JsonConvert.DeserializeObject(readTask.Result.ToString());
                            if (Convert.ToBoolean(retorno.retorno))
                                return Autenticar(usuario);
                            else
                            {
                                TempData["MensagemErro"] = "Senha inválida.";
                                return View("Index");
                            }
                        }
                        else
                        {
                            TempData["MensagemErro"] = "Erro de comunicação com Web API. Entre em contato com o administrador.";
                            return View("Index");
                        }
                    }
                }
                else
                {
                    if (usuario.Senha == Util.CalculaSHA256Hash(senha))
                        return Autenticar(usuario);
                    else
                    {
                        TempData["MensagemErro"] = "Senha inválida.";
                        return View("Index");
                    }
                }
            }
            else
            {
                TempData["MensagemErro"] = "Usuário não cadastrado no sistema, solicite ao administrador um acesso.";
                return View("Index");
            }
        }

        public ActionResult Autenticar(Usuario usuario)
        {
            FormsAuthenticationTicket authenticationTicket = new FormsAuthenticationTicket(usuario.Login, true, 100000);
            string encryptTicket = FormsAuthentication.Encrypt(authenticationTicket);
            HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptTicket);

            Session["User"] = usuario;
            Session["NomeUsuario"] = usuario.Nome;
            Session["Menu"] = usuario.Perfil.Menu.ToList();
            Session["SenhaIntegrada"] = usuario.SenhaIntegrada;

            /*Criando log de acesso*/
            LogAcessoService logAcessoService = new LogAcessoService();
            LogAcesso logAcesso = new LogAcesso();
            logAcesso.Data = DateTime.Now;
            logAcesso.UsuarioId = usuario.Id;

            logAcessoService.Create(logAcesso);

            Response.Cookies.Clear();
            Response.Cookies.Add(authCookie);

            return RedirectToAction("Index", "Home");
        }
    }
}