using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Service;
using SistemaApontamentoPhilco.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SistemaApontamentoPhilco.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        PerfilService _perfilService = new PerfilService();
        UsuarioService _usuarioService = new UsuarioService();

        [CustomAuthorization]
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorization]
        public ActionResult Create()
        {
            ViewBag.ListaPerfil = _perfilService.GetAll().Where(p => p.Inativo == false).ToList();

            return View(new Usuario() { SenhaIntegrada = true });
        }

        public ActionResult Pesquisar(string nome, string login, int? perfilId)
        {
            try
            {
                List<Usuario> listaUsuario = _usuarioService.GetAll().Where(u => u.Inativo == false && u.Nome.ToLower().Contains(nome.ToLower()) && u.Login.ToLower().Contains(login.ToLower()) && (!perfilId.HasValue || (perfilId.HasValue && u.PerfilId == perfilId))).ToList();
                return PartialView("_Grid", listaUsuario);
            }
            catch (Exception ex)
            {
                return RedirectToAction("ErroPartial", "Erro", ex.Message);
            }
        }

        public ActionResult Salvar(Usuario usuario)
        {
            Usuario _usuario = _usuarioService.GetById(usuario.Id);

            _usuario.Login = usuario.Login.ToLower();
            _usuario.Nome = usuario.Nome;
            _usuario.PerfilId = usuario.PerfilId;
            _usuario.SenhaIntegrada = usuario.SenhaIntegrada;

            if (_usuario.SenhaIntegrada)
                _usuario.Senha = null;
            else
            {
                if (!string.IsNullOrEmpty(usuario.Senha))
                    _usuario.Senha = Util.CalculaSHA256Hash(usuario.Senha);
            }

            try
            {
                if (usuario.Id == 0)
                    _usuarioService.Create(_usuario);
                else
                    _usuarioService.Update(_usuario);

                TempData["MensagemSucesso"] = "Usuário salvo com sucesso.";
            }
            catch (Exception)
            {
                TempData["MensagemErro"] = "Ocorreu um erro ao salvar.";
            }

            return RedirectToAction("Index");
        }

        public ActionResult Editar(int id)
        {
            ViewBag.ListaPerfil = _perfilService.GetAll().Where(p => p.Inativo == false).ToList();

            return View("Create", _usuarioService.GetById(id));
        }

        public ActionResult Excluir(int id)
        {
            Usuario usuario = _usuarioService.GetById(id);
            usuario.Inativo = true;
            _usuarioService.Update(usuario);

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}