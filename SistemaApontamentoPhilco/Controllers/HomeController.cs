using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Service;
using SistemaApontamentoPhilco.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaApontamentoPhilco.Controllers
{
    public class HomeController : Controller
    {
        UsuarioService _usuarioService = new UsuarioService();
        ApontamentoService _apontamentoService = new ApontamentoService();

        [CustomAuthorization]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Salvar(string numeroSerie, string sequencial)
        {
            if (string.IsNullOrEmpty(numeroSerie) || string.IsNullOrEmpty(sequencial))
                return Json(true, JsonRequestBehavior.AllowGet);

            Apontamento apontamento = _apontamentoService.GetByNumeroSerieAndSequencial(numeroSerie, sequencial);
            if (apontamento != null)
                return Json(new { erro = true, msg = string.Format("O número de serie '{0}' já está vinculado ao sequencial '{1}'.", numeroSerie, sequencial) }, JsonRequestBehavior.AllowGet);

            apontamento = _apontamentoService.GetByNumeroSerie(numeroSerie);
            if (apontamento != null)
                return Json(new { erro = true, msg = string.Format("O número de serie '{0}' já existe.", numeroSerie) }, JsonRequestBehavior.AllowGet);

            apontamento = _apontamentoService.GetBySequencial(sequencial);
            if (apontamento != null)
                return Json(new { erro = true, msg = string.Format("O sequencial '{0}' já existe.", sequencial) }, JsonRequestBehavior.AllowGet);


            apontamento = new Apontamento();
            apontamento.NumeroSerie = numeroSerie;
            apontamento.Sequencial = sequencial;
            apontamento.Data = DateTime.Now;
            apontamento.UsuarioId = _usuarioService.GetUsuario(User.Identity.Name).Id;

            try
            {
                _apontamentoService.Create(apontamento);
            }
            catch (Exception)
            {
                return Json(new { erro = true, msg = string.Format("Ocorreu um erro ao salvar.") }, JsonRequestBehavior.AllowGet);
            }

            return View("Index");
        }
    }
}